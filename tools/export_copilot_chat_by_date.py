from __future__ import annotations

import json
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Iterable


ROOT = Path(__file__).resolve().parents[1]
EXPORT_DIR = ROOT / "copilot_chat_exports"
OUT = ROOT / "Sprint" / "codex" / "CHAT_TRANSCRIPTS_BY_DATE.md"


@dataclass
class Session:
    source_path: Path
    title: str
    session_id: str
    creation_ms: int | None
    last_ms: int | None
    model_id: str
    turns: list[tuple[str, str]]


def ms_to_date(ms: int) -> str:
    return datetime.fromtimestamp(ms / 1000).strftime("%Y-%m-%d")


def ms_to_dt(ms: int | None) -> str:
    if not isinstance(ms, int):
        return "unknown"
    return datetime.fromtimestamp(ms / 1000).strftime("%Y-%m-%d %H:%M")


def extract_user_text(req: dict[str, Any]) -> str:
    msg = req.get("message")
    if isinstance(msg, str):
        return msg
    if isinstance(msg, dict):
        text = msg.get("text")
        if isinstance(text, str):
            return text
        parts = msg.get("parts")
        if isinstance(parts, list):
            texts: list[str] = []
            for part in parts:
                if isinstance(part, dict) and isinstance(part.get("text"), str):
                    texts.append(part["text"])
            if texts:
                return "\n".join(texts)
    return ""


def extract_assistant_text(req: dict[str, Any]) -> str:
    resp = req.get("response")
    if isinstance(resp, str):
        return resp
    if isinstance(resp, dict):
        for k in ("response", "text", "value", "result"):
            v = resp.get(k)
            if isinstance(v, str) and v.strip():
                return v
        for k in ("response", "result", "message"):
            v = resp.get(k)
            if isinstance(v, dict):
                for kk in ("text", "value", "response"):
                    vv = v.get(kk)
                    if isinstance(vv, str) and vv.strip():
                        return vv

    result = req.get("result")
    if isinstance(result, dict):
        meta = result.get("metadata")
        if isinstance(meta, dict):
            tcr = meta.get("toolCallRounds")
            if isinstance(tcr, list):
                for round_ in reversed(tcr):
                    if isinstance(round_, dict):
                        r = round_.get("response")
                        if isinstance(r, str) and r.strip():
                            return r

    return ""


def read_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def parse_session(path: Path) -> Session:
    obj = read_json(path)

    creation_ms = obj.get("creationDate")
    last_ms = obj.get("lastMessageDate")
    creation_ms_i = int(creation_ms) if isinstance(creation_ms, (int, float)) else None
    last_ms_i = int(last_ms) if isinstance(last_ms, (int, float)) else None

    title = obj.get("customTitle") or obj.get("sessionId") or path.name
    session_id = obj.get("sessionId") or ""

    model_id = ""
    reqs = obj.get("requests")
    if isinstance(reqs, list) and reqs:
        last_req = reqs[-1]
        if isinstance(last_req, dict) and isinstance(last_req.get("modelId"), str):
            model_id = last_req["modelId"]

    turns: list[tuple[str, str]] = []
    if isinstance(reqs, list):
        for req in reqs:
            if not isinstance(req, dict):
                continue
            u = extract_user_text(req).strip()
            a = extract_assistant_text(req).strip()
            if not u and not a:
                continue
            turns.append((u, a))

    return Session(
        source_path=path,
        title=str(title),
        session_id=str(session_id),
        creation_ms=creation_ms_i,
        last_ms=last_ms_i,
        model_id=model_id,
        turns=turns,
    )


def render_md(sessions: Iterable[Session]) -> str:
    sessions_by_date: dict[str, list[Session]] = defaultdict(list)
    for s in sessions:
        date_key = ms_to_date(s.creation_ms) if isinstance(s.creation_ms, int) else "unknown"
        sessions_by_date[date_key].append(s)

    lines: list[str] = []
    lines.append("# Copilot Chat 대화 기록 (일자별)")
    lines.append("")
    lines.append(
        "이 문서는 로컬 VS Code에 저장된 Copilot Chat 세션을 `copilot_chat_exports/`로 export한 뒤, 날짜별로 묶어 정리한 ‘대화 기록’입니다."
    )
    lines.append("")
    lines.append("- 원본 JSON: `copilot_chat_exports/*.json`")
    lines.append("- 산업군별 스프린트 아이디어 발췌본: `Sprint/codex/IDEAS_BY_INDUSTRY_FROM_CHAT_2026-01-21.md`")
    lines.append("")

    for date_key in sorted(sessions_by_date.keys()):
        lines.append(f"## {date_key}")
        lines.append("")
        day_sessions = sorted(
            sessions_by_date[date_key],
            key=lambda s: (s.creation_ms or 0, s.title),
        )
        for s in day_sessions:
            rel = s.source_path.relative_to(ROOT).as_posix()
            lines.append(f"### {s.title}")
            lines.append("")
            lines.append(f"- source: `{rel}`")
            lines.append(f"- created: {ms_to_dt(s.creation_ms)}")
            lines.append(f"- last: {ms_to_dt(s.last_ms)}")
            if s.session_id:
                lines.append(f"- sessionId: `{s.session_id}`")
            if s.model_id:
                lines.append(f"- modelId: `{s.model_id}`")
            lines.append("")

            lines.append("<details>")
            lines.append("<summary>대화 내용 펼치기</summary>")
            lines.append("")

            if not s.turns:
                lines.append("_대화 텍스트를 추출하지 못했습니다(세션 구조가 다른 경우)._\n")
            else:
                for i, (u, a) in enumerate(s.turns, start=1):
                    if u:
                        lines.append(f"**User {i}**")
                        lines.append("```")
                        lines.append(u)
                        lines.append("```")
                        lines.append("")
                    if a:
                        lines.append(f"**Assistant {i}**")
                        lines.append("```")
                        lines.append(a)
                        lines.append("```")
                        lines.append("")

            lines.append("</details>")
            lines.append("")

    return "\n".join(lines)


def main() -> None:
    if not EXPORT_DIR.exists():
        raise SystemExit(f"Missing export dir: {EXPORT_DIR}")

    paths = sorted(EXPORT_DIR.glob("*.json"))
    if not paths:
        raise SystemExit(f"No session JSON found in: {EXPORT_DIR}")

    sessions: list[Session] = []
    for p in paths:
        try:
            sessions.append(parse_session(p))
        except Exception as e:
            print(f"WARN: failed to parse {p.name}: {e}")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(render_md(sessions), encoding="utf-8")
    print(f"Wrote: {OUT}")


if __name__ == "__main__":
    main()
