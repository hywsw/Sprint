# Sprint Frontend (Vite)

Sprint의 프론트엔드(Vite + React + Tailwind) 앱입니다. 인트로 → 메인 랜딩 → 제품 페이지 흐름을 제공합니다.

## 실행
```bash
npm install
npm run dev
```

## 주요 라우트
- `/` 인트로/매니페스토
- `/home` 메인 랜딩
- `/sprints` 스프린트 목록/필터
- `/sprints/:id` 상세
- `/company/create` 스프린트 생성
- `/company` 기업 대시보드
- `/apply` 지원자 온보딩
- `/terms`, `/privacy` 플레이스홀더

## 폴더 구조 (요약)
- `src/pages`: 각 화면 라우트
- `src/components`: 재사용 컴포넌트
- `src/data`: 샘플 스프린트 데이터
