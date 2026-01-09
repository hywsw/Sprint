from fastapi import FastAPI, UploadFile, File, Form  # type: ignore[reportMissingImports]
from fastapi.responses import JSONResponse  # type: ignore[reportMissingImports]
from typing import Optional, List
import tempfile
import os
import shutil
import traceback

app = FastAPI(title="Resume Screener (PoC)")

# Try to import the ResumeScreenerPack if the repo deps are installed
HAS_PY_PACK = False
try:
    from resume_screener_pack.llama_index.packs.resume_screener.base import ResumeScreenerPack  # type: ignore[reportMissingImports]
    from llama_index.llms.openai import OpenAI  # type: ignore[reportMissingImports]
    HAS_PY_PACK = True
except Exception as e:
    print("ResumeScreenerPack not available, running in fallback mode:", e)


def fallback_screen(job_description: str, criteria_text: str, resume_text: str):
    items = [c.strip() for c in (criteria_text or "").splitlines() if c.strip()]
    lowered = (resume_text or "").lower()
    decisions = []
    matched = 0
    for c in items:
        key = c.lower()
        ok = all(tok in lowered for tok in key.split())
        if ok:
            matched += 1
        reasoning = (f"Found evidence for '{c}'" if ok else f"No clear evidence for '{c}'")
        decisions.append({"criteria": c, "decision": bool(ok), "reasoning": reasoning})

    overall_decision = len(items) > 0 and matched >= (len(items) + 1) // 2
    overall_reasoning = f"Matched {matched} of {len(items)} criteria" + (", recommend passing." if overall_decision else ", recommend rejecting.")
    return {"criteria_decisions": decisions, "overall_decision": overall_decision, "overall_reasoning": overall_reasoning}


@app.post("/screen")
async def screen(
    jobDescription: str = Form(...),
    criteria: str = Form(...),
    resumeText: Optional[str] = Form(None),
    resume: Optional[UploadFile] = File(None),
):
    tmp_path = None
    try:
        text_accum = resumeText or ""
        if resume is not None:
            # save to temp file
            suffix = os.path.splitext(resume.filename or "")[1] or ".pdf"
            tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
            tmp_path = tmp.name
            contents = await resume.read()
            tmp.write(contents)
            tmp.close()
            # try to extract text using pypdf if available
            try:
                from pypdf import PdfReader
                reader = PdfReader(tmp_path)
                pages = []
                for p in reader.pages:
                    try:
                        pages.append(p.extract_text() or "")
                    except Exception:
                        pass
                text_accum += "\n" + "\n".join(pages)
            except Exception as e:
                print("pypdf not available or extraction failed:", e)

        # If python pack available, use it
        if HAS_PY_PACK:
            try:
                # criteria may be a string of lines; convert to list
                crit_list = [c.strip() for c in criteria.splitlines() if c.strip()]
                # If OPENAI env available, pass an OpenAI instance
                llm = None
                if os.getenv("OPENAI_API_KEY"):
                    llm = OpenAI(api_key=os.getenv("OPENAI_API_KEY"), model="gpt-4o-mini")
                pack = ResumeScreenerPack(job_description=jobDescription, criteria=crit_list or criteria, llm=llm)
                # pack.run expects a path; use tmp_path if present or resumeText not empty -> write to a temp pdf
                if tmp_path is None and text_accum:
                    # write text to a temp file? The pack's reader expects a PDF path; fallback to returning fallback result if no pdf
                    return JSONResponse({"success": True, "data": fallback_screen(jobDescription, criteria, text_accum)})
                res = pack.run(tmp_path)
                # res is likely a pydantic model; try to turn into dict
                if hasattr(res, "dict"):
                    data = res.dict()
                else:
                    data = res
                return JSONResponse({"success": True, "data": data})
            except Exception as e:
                print("Error running ResumeScreenerPack:", e)
                traceback.print_exc()
                # fall through to fallback

        # fallback
        out = fallback_screen(jobDescription, criteria, text_accum)
        return JSONResponse({"success": True, "data": out})

    finally:
        if tmp_path and os.path.exists(tmp_path):
            try:
                os.unlink(tmp_path)
            except Exception:
                pass


@app.get("/health")
async def health():
    return {"success": True, "py_pack": HAS_PY_PACK}