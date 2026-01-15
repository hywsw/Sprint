export type Sprint = {
  id: string;
  title: string;
  company: string;
  duration: string;
  deliverable: string;
  skills: string[];
  reward: string;
  tags: string[];
  summary: string;
  note: string;
  sample?: boolean;
};

export const sprints: Sprint[] = [
  {
    id: "ops-automation",
    title: "운영 병목 자동화: 인바운드 리포트 파이프라인",
    company: "SaaS Ops 팀",
    duration: "7일",
    deliverable: "자동화 스크립트 + 운영 대시보드",
    skills: ["Python", "SQL", "Automation"],
    reward: "인턴십 인터뷰 패스트트랙",
    tags: ["Operations", "Automation"],
    summary: "주간 리포트 생성과 배포를 자동화해 반복 업무 시간을 줄입니다.",
    note: "샘플 데이터 기반으로 동일 로직을 구현합니다.",
    sample: true,
  },
  {
    id: "growth-experiment",
    title: "Growth 실험 설계와 크리에이티브 테스트",
    company: "모바일 커머스팀",
    duration: "10일",
    deliverable: "실험 설계안 + 인사이트 리포트",
    skills: ["Analytics", "Copywriting", "Research"],
    reward: "유급 인턴십 제안",
    tags: ["Growth", "Data"],
    summary: "신규 유저 획득을 위한 실험 가설과 실행안을 설계합니다.",
    note: "실제 제품 시나리오를 기반으로 가설 검증 플랜을 만듭니다.",
    sample: true,
  },
  {
    id: "prototype",
    title: "신규 대시보드 프로토타입 제작",
    company: "B2B 플랫폼 팀",
    duration: "2주",
    deliverable: "인터랙션 프로토타입 + 핵심 흐름",
    skills: ["Figma", "UX", "Product"],
    reward: "인턴십 우선 고려",
    tags: ["Prototype", "Product"],
    summary: "고객의 실제 작업 흐름을 반영한 대시보드 시안을 제작합니다.",
    note: "UI 방향성만 제시되는 상태에서 구조를 제안합니다.",
    sample: true,
  },
  {
    id: "data-diagnosis",
    title: "고객 이탈 구간 분석",
    company: "핀테크 팀",
    duration: "2주",
    deliverable: "이탈 원인 분석 + 개선 제안",
    skills: ["SQL", "BI", "Storytelling"],
    reward: "인터뷰 + 과제 면제",
    tags: ["Data", "Retention"],
    summary: "유저 이탈 구간을 파악하고 개선 아이디어를 제안합니다.",
    note: "익명화된 로그 데이터를 활용합니다.",
    sample: true,
  },
  {
    id: "support-playbook",
    title: "고객 지원 플레이북 구축",
    company: "B2B SaaS",
    duration: "7일",
    deliverable: "플레이북 + 운영 템플릿",
    skills: ["Documentation", "Ops", "CS"],
    reward: "인턴십 제안 가능",
    tags: ["Operations", "Process"],
    summary: "자주 발생하는 요청을 구조화하고 대응 프로세스를 만듭니다.",
    note: "실제 상황 기반으로 템플릿을 설계합니다.",
    sample: true,
  },
];
