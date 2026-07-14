export type OurWorkTabId = 'overview' | 'mvp' | 'journey' | 'architecture' | 'data';

export const OUR_WORK_TABS = [
  { id: 'overview', label: 'Overview', desc: '페디버스 소개' },
  { id: 'mvp', label: 'MVP Scope', desc: '제품 범위' },
  { id: 'journey', label: 'User Journey', desc: '사용 흐름' },
  { id: 'architecture', label: 'Architecture', desc: '기술 구조' },
  { id: 'data', label: 'Data & Ops', desc: '스키마·운영' },
] as const satisfies readonly {
  id: OurWorkTabId;
  label: string;
  desc: string;
}[];
