Resume Screener PoC FastAPI

Quick instructions:

1) Create a virtualenv (recommended):

python3 -m venv .venv
source .venv/bin/activate

2) Install minimal requirements for PoC (does not install heavy LLM deps):

pip install fastapi uvicorn python-multipart pypdf

3) Run the service (development):

uvicorn app:app --host 127.0.0.1 --port 8001 --reload

4) Optional: to use the original Python ResumeScreenerPack, install full requirements from the project root:

pip install -r ../requirements.txt

Then the app will detect the pack and call it (requires OpenAI or Ollama credentials in env to perform LLM-based screening).
