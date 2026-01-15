# Sprint

Sprint는 Hiring Sprint 모델을 소개하는 프론트엔드/백엔드 실험용 레포입니다. 현재 프론트는 Vite + React + Tailwind로 구성되어 있으며, 인트로 → 메인 랜딩 → 제품 페이지 흐름으로 구성됩니다.

## 프론트 위치
- `Sprint/` 폴더

## 프론트 실행
```bash
cd Sprint
npm install
npm run dev
```

## 프론트 페이지 구성 (요약)
- `/` 인트로/매니페스토
- `/home` 메인 랜딩
- `/sprints` 목록/필터
- `/sprints/:id` 상세
- `/company/create` 스프린트 생성
- `/company` 기업 대시보드
- `/apply` 지원자 온보딩

## 노트
- Next.js(App Router) 마이그레이션은 추후 단계적으로 검토합니다.
- 실제 데이터/백엔드는 프론트 완료 후 연결 예정입니다.
