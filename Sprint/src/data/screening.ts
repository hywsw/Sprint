export type ScreeningTest = {
  id: string;
  title: string;
  description: string;
  maxScore: number;
  passScore: number;
  category: "coding" | "domain";
};

export type CandidateScreening = {
  id: string;
  name: string;
  sprintId: string;
  resumeScore: number;
  codingTestScore: number;
  domainTestScore: number;
  submittedAt: string;
};

export const screeningTests: ScreeningTest[] = [
  {
    id: "coding-01",
    title: "코딩 테스트 (알고리즘/구현)",
    description: "시간 복잡도·정확도 평가 중심 90분 테스트",
    maxScore: 100,
    passScore: 70,
    category: "coding",
  },
  {
    id: "domain-01",
    title: "직무 테스트 (Growth/PM 과제)",
    description: "지표 분석 + 실험 설계 과제 120분",
    maxScore: 100,
    passScore: 65,
    category: "domain",
  },
];

export const candidateScreeningSamples: CandidateScreening[] = [
  {
    id: "c-101",
    name: "강지원",
    sprintId: "growth-experiment",
    resumeScore: 82,
    codingTestScore: 76,
    domainTestScore: 88,
    submittedAt: "2026-01-18",
  },
  {
    id: "c-102",
    name: "박재윤",
    sprintId: "ops-automation",
    resumeScore: 74,
    codingTestScore: 68,
    domainTestScore: 72,
    submittedAt: "2026-01-18",
  },
  {
    id: "c-103",
    name: "이채원",
    sprintId: "data-diagnosis",
    resumeScore: 91,
    codingTestScore: 84,
    domainTestScore: 79,
    submittedAt: "2026-01-17",
  },
  {
    id: "c-104",
    name: "정민호",
    sprintId: "support-playbook",
    resumeScore: 63,
    codingTestScore: 54,
    domainTestScore: 71,
    submittedAt: "2026-01-16",
  },
  {
    id: "c-105",
    name: "오수연",
    sprintId: "prototype",
    resumeScore: 79,
    codingTestScore: 72,
    domainTestScore: 61,
    submittedAt: "2026-01-16",
  },
];