#!/usr/bin/env python3
"""
Resume screening service using a local Ollama model.
"""

import json
import logging
import os
import re
from io import BytesIO
from pathlib import Path
from typing import Dict, List, Optional

import PyPDF2
import requests
import uvicorn
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("resume_screening.log"),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger(__name__)

# FastAPI
app = FastAPI(title="Resume Screening Service")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ollama
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:7b-instruct")
OLLAMA_TIMEOUT_SEC = int(os.getenv("OLLAMA_TIMEOUT_SEC", "180"))
RESOLVED_OLLAMA_MODEL: Optional[str] = None

logger.info("Ollama Base URL: %s", OLLAMA_BASE_URL)
logger.info("Ollama Model: %s", OLLAMA_MODEL)

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR.parent / "model"
CONFIG_DIR = BASE_DIR / "config"


def load_text_file(path: Path) -> str:
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8", errors="ignore").strip()


def build_job_description_from_config() -> str:
    cfg_path = CONFIG_DIR / "job_description.json"
    if not cfg_path.exists():
        return ""
    try:
        cfg = json.loads(cfg_path.read_text(encoding="utf-8", errors="ignore"))
    except Exception:
        return ""

    title = cfg.get("title", "")
    department = cfg.get("department", "")
    level = cfg.get("level", "")
    location = cfg.get("location", "")
    employment_type = cfg.get("employment_type", "")
    requirements = cfg.get("requirements", [])
    responsibilities = cfg.get("responsibilities", [])
    preferred = cfg.get("preferred_qualifications", [])

    parts: List[str] = []
    header = " / ".join(
        [p for p in [title, department, level, location, employment_type] if p]
    )
    if header:
        parts.append(header)
    if requirements:
        parts.append("Requirements:\n- " + "\n- ".join(requirements))
    if responsibilities:
        parts.append("Responsibilities:\n- " + "\n- ".join(responsibilities))
    if preferred:
        parts.append("Preferred:\n- " + "\n- ".join(preferred))
    return "\n\n".join(parts).strip()


def build_criteria_from_config() -> str:
    cfg_path = CONFIG_DIR / "criteria.json"
    if not cfg_path.exists():
        return ""
    try:
        cfg = json.loads(cfg_path.read_text(encoding="utf-8", errors="ignore"))
    except Exception:
        return ""

    required = cfg.get("required_skills", [])
    preferred = cfg.get("preferred_skills", [])
    min_years = cfg.get("min_experience_years")
    education = cfg.get("required_education", "")

    lines: List[str] = []
    if min_years:
        lines.append(f"{min_years}+ years of relevant experience")
    if education:
        lines.append(f"Education: {education}")
    lines.extend([f"Required: {skill}" for skill in required])
    lines.extend([f"Preferred: {skill}" for skill in preferred])
    return "\n".join(lines).strip()


def get_default_payload() -> Dict[str, str]:
    model_job = load_text_file(MODEL_DIR / "job_description.txt")
    model_criteria = load_text_file(MODEL_DIR / "criteria.txt")

    job_description = model_job or build_job_description_from_config()
    criteria = model_criteria or build_criteria_from_config()

    return {
        "job_description": job_description,
        "criteria": criteria,
    }


def trim_text(text: str, limit: int = 8000) -> str:
    if not text:
        return ""
    if len(text) <= limit:
        return text
    return text[:limit] + "\n...[truncated]"


def extract_text_from_pdf(file_content: bytes) -> str:
    """Extract text from a PDF file."""
    try:
        pdf_reader = PyPDF2.PdfReader(BytesIO(file_content))
        text = ""
        for page in pdf_reader.pages:
            page_text = page.extract_text() or ""
            text += page_text
        return text
    except Exception as exc:
        logger.error("PDF text extraction failed: %s", str(exc))
        return ""


def resolve_ollama_model() -> str:
    """Resolve the model name against Ollama tags if needed."""
    global RESOLVED_OLLAMA_MODEL
    if RESOLVED_OLLAMA_MODEL:
        return RESOLVED_OLLAMA_MODEL

    try:
        resp = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=5)
        if resp.status_code == 200:
            tags = resp.json().get("models", [])
            names = [item.get("name") for item in tags if item.get("name")]

            if OLLAMA_MODEL in names:
                RESOLVED_OLLAMA_MODEL = OLLAMA_MODEL
                return RESOLVED_OLLAMA_MODEL

            with_latest = f"{OLLAMA_MODEL}:latest"
            if with_latest in names:
                RESOLVED_OLLAMA_MODEL = with_latest
                return RESOLVED_OLLAMA_MODEL

            for name in names:
                if name.split(":")[0] == OLLAMA_MODEL:
                    RESOLVED_OLLAMA_MODEL = name
                    return RESOLVED_OLLAMA_MODEL

            if names:
                RESOLVED_OLLAMA_MODEL = names[0]
                return RESOLVED_OLLAMA_MODEL
    except Exception as exc:
        logger.warning("Ollama tags lookup failed: %s", str(exc))

    RESOLVED_OLLAMA_MODEL = OLLAMA_MODEL
    return RESOLVED_OLLAMA_MODEL


def call_ollama(
    prompt: str, model: Optional[str] = None, temperature: float = 0.3
) -> Optional[str]:
    """Call the Ollama generate endpoint."""
    try:
        url = f"{OLLAMA_BASE_URL}/api/generate"
        target_model = model or resolve_ollama_model()
        payload = {
            "model": target_model,
            "prompt": prompt,
            "stream": False,
            "temperature": temperature,
        }

        response = requests.post(url, json=payload, timeout=OLLAMA_TIMEOUT_SEC)

        if response.status_code == 200:
            result = response.json()
            return result.get("response", "")
        logger.error("Ollama request failed: %s - %s", response.status_code, response.text)
        return None

    except requests.exceptions.ConnectionError:
        logger.error("Ollama connection failed: %s", OLLAMA_BASE_URL)
        return None
    except Exception as exc:
        logger.error("Ollama request error: %s", str(exc))
        return None


def parse_llm_response(response_text: str) -> Dict:
    """Parse JSON from the LLM response."""
    try:
        start_idx = response_text.find("{")
        end_idx = response_text.rfind("}") + 1

        if start_idx != -1 and end_idx > start_idx:
            json_str = response_text[start_idx:end_idx]
            return json.loads(json_str)
        logger.warning("No JSON found in LLM response")
        return {}

    except json.JSONDecodeError as exc:
        logger.error("JSON parse failed: %s", str(exc))
        return {}


def detect_sql_keywords(resume_text: str) -> List[str]:
    if not resume_text:
        return []
    lower = resume_text.lower()
    keywords = [
        "mysql",
        "postgresql",
        "postgres",
        "sqlite",
        "mariadb",
        "oracle",
        "mssql",
        "sql server",
    ]
    found = [key for key in keywords if key in lower]
    return found


def apply_sql_override(parsed: Dict, resume_text: str) -> None:
    sql_hits = detect_sql_keywords(resume_text)
    if not sql_hits:
        return
    decisions = parsed.get("criteria_decisions")
    if not isinstance(decisions, list):
        return
    for item in decisions:
        if not isinstance(item, dict):
            continue
        criterion = str(item.get("criteria", "")).lower()
        if "sql" in criterion or "database" in criterion or "데이터베이스" in criterion:
            if item.get("decision") is False:
                item["decision"] = True
                note = f"이력서에 {', '.join(sql_hits)} 경험 언급"
                existing = item.get("reasoning") or ""
                item["reasoning"] = f"{existing} ({note})".strip()


def fallback_screening(resume_text: str, criteria: str, reason: str) -> Dict:
    stopwords = {
        "and",
        "or",
        "of",
        "in",
        "with",
        "the",
        "a",
        "an",
        "to",
        "for",
        "on",
        "is",
        "are",
        "years",
        "year",
        "experience",
    }
    criteria_list = [
        line.strip()
        for line in criteria.split("\n")
        if line.strip() and not line.strip().startswith("-")
    ]
    resume_lower = resume_text.lower()

    criteria_decisions = []
    for criterion in criteria_list:
        tokens = re.findall(r"[A-Za-z0-9\+\.\#]+", criterion.lower())
        keywords = [token for token in tokens if token not in stopwords and len(token) > 1]
        matched_count = sum(1 for token in keywords if token in resume_lower)
        threshold = max(1, len(keywords) // 2)
        matched = matched_count >= threshold
        criteria_decisions.append(
            {
                "criteria": criterion,
                "decision": matched,
                "reasoning": "이력서에 관련 키워드가 있음"
                if matched
                else "이력서에서 관련 키워드를 찾지 못함",
            }
        )

    passed = sum(1 for item in criteria_decisions if item["decision"])
    overall_decision = passed > len(criteria_decisions) / 2 if criteria_decisions else False

    return {
        "success": True,
        "criteria_decisions": criteria_decisions,
        "overall_decision": overall_decision,
        "overall_reasoning": f"{passed}/{len(criteria_decisions)} 기준 충족 ({reason})",
        "fallback_used": True,
    }


def screen_resume_with_ollama(
    resume_text: str, job_description: str, criteria: str
) -> Dict:
    """Screen a resume against criteria using Ollama."""
    if not resume_text:
        return {
            "success": False,
            "error": "이력서 텍스트가 없습니다.",
            "overall_decision": False,
            "overall_reasoning": "이력서 내용이 제공되지 않았습니다.",
            "criteria_decisions": [],
        }

    trimmed_resume = trim_text(resume_text, 6000)
    trimmed_job = trim_text(job_description, 2000)
    trimmed_criteria = trim_text(criteria, 2000)

    prompt = f"""아래 이력서를 채용 공고와 평가 기준으로 평가하고 JSON 형식으로 답해주세요.
참고: MySQL/PostgreSQL/SQLite/MariaDB/SQL Server/Oracle 경험은 SQL 경험으로 간주하세요.

채용 공고:
{trimmed_job}

평가 기준:
{trimmed_criteria}

이력서:
{trimmed_resume}

반드시 아래 JSON 형식으로만 답변하세요:
{{
  "criteria_decisions": [
    {{"criteria": "기준명", "decision": true/false, "reasoning": "사유"}}
  ],
  "overall_decision": true/false,
  "overall_reasoning": "종합 평가"
}}

각 기준은 true/false 판단과 1~2줄 사유를 포함하세요."""

    response = call_ollama(prompt)
    if not response:
        return {
            "success": False,
            "error": "Ollama 서버 응답 없음",
            "overall_decision": False,
            "overall_reasoning": "Ollama 연결 실패로 분석하지 못했습니다.",
            "criteria_decisions": [],
        }

    parsed = parse_llm_response(response)
    if parsed:
        apply_sql_override(parsed, resume_text)
        parsed["success"] = True
        return parsed

    logger.warning("LLM response parse failed; using keyword fallback")
    return fallback_screening(resume_text, criteria, "JSON 파싱 실패")


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "model": resolve_ollama_model(),
        "requested_model": OLLAMA_MODEL,
    }


@app.get("/defaults")
def get_defaults():
    payload = get_default_payload()
    return {
        "job_description": payload.get("job_description", ""),
        "criteria": payload.get("criteria", ""),
    }


@app.post("/analyze-resume")
async def analyze_resume(
    resume: Optional[UploadFile] = File(None),
    resume_text: str = Form(""),
    job_description: str = Form(""),
    criteria: str = Form(""),
) -> JSONResponse:
    """
    Analyze a resume using a PDF upload or pasted text.
    """
    try:
        logger.info(
            "analyze-resume: resume=%s, resume_text=%s, job_description=%s, criteria=%s",
            resume is not None,
            len(resume_text),
            len(job_description),
            len(criteria),
        )

        extracted_text = ""
        if resume:
            file_content = await resume.read()
            extracted_text = extract_text_from_pdf(file_content)
            logger.info("Extracted %s chars from PDF", len(extracted_text))

        if resume_text:
            extracted_text = (
                resume_text if not extracted_text else extracted_text + "\n" + resume_text
            )

        if not extracted_text:
            return JSONResponse(
                status_code=400,
                content={"success": False, "error": "이력서 텍스트를 입력해주세요."},
            )

        if not job_description or not criteria:
            defaults = get_default_payload()
            if not job_description:
                job_description = defaults.get("job_description", "")
            if not criteria:
                criteria = defaults.get("criteria", "")

        if not job_description or not criteria:
            return JSONResponse(
                status_code=400,
                content={
                    "success": False,
                    "error": "채용 공고와 평가 기준을 입력해주세요.",
                },
            )

        logger.info("Running screening...")
        result = screen_resume_with_ollama(extracted_text, job_description, criteria)
        result["extracted_text"] = trim_text(extracted_text)

        logger.info("Screening result: %s", json.dumps(result, ensure_ascii=False))
        return JSONResponse(content=result)

    except Exception as exc:
        logger.error("Analyze failed: %s", str(exc), exc_info=True)
        return JSONResponse(
            status_code=500, content={"success": False, "error": str(exc)}
        )


@app.post("/screen")
async def screen_endpoint(
    job_description: str = Form(""),
    criteria: str = Form(""),
    resume_text: str = Form(""),
    resume: Optional[UploadFile] = File(None),
) -> JSONResponse:
    """Legacy screening endpoint for Node.js clients."""
    return await analyze_resume(resume, resume_text, job_description, criteria)


if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
