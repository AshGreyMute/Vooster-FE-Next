import type { Agent, Tool } from '@/types';
import { Bot, Wrench, Zap, ArrowUpRight } from 'lucide-react';

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: '고객 지원 봇',
    description: '고객 문의 지원, 주문 상태 확인 및 환불 처리를 위한 친절한 봇입니다.',
    createdAt: '2023-10-01',
    executionCount: 1254,
    status: 'in-operation',
    graph: {
      nodes: [
        { id: '1', position: { x: 0, y: 0 }, data: { label: '시작' }, type: 'input' },
        { id: '2', position: { x: 0, y: 100 }, data: { label: '의도 분류' } },
        { id: '3', position: { x: -150, y: 200 }, data: { label: '주문 상태 확인' } },
        { id: '4', position: { x: 0, y: 200 }, data: { label: '환불 처리' } },
        { id: '5', position: { x: 150, y: 200 }, data: { label: '일반 문의' } },
        { id: '6', position: { x: 0, y: 300 }, data: { label: '종료' }, type: 'output' },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e2-4', source: '2', target: '4' },
        { id: 'e2-5', source: '2', target: '5' },
        { id: 'e3-6', source: '3', target: '6' },
        { id: 'e4-6', source: '4', target: '6' },
        { id: 'e5-6', source: '5', target: '6' },
      ],
    },
  },
  {
    id: 'agent-2',
    name: '데이터 분석 에이전트',
    description: 'CSV 파일을 처리하고, 데이터 분석을 수행하며, 보고서를 생성합니다.',
    createdAt: '2023-11-15',
    executionCount: 450,
    status: 'in-operation',
  },
  {
    id: 'agent-3',
    name: '마케팅 캠페인 생성기',
    description: '제품 설명을 기반으로 마케팅 문구와 광고 크리에이티브를 생성합니다.',
    createdAt: '2024-01-20',
    executionCount: 890,
    status: 'in-operation',
  },
  {
    id: 'agent-4',
    name: '코드 검토 도우미',
    description: '스타일 및 오류에 대한 풀 리퀘스트를 자동으로 검토하는 데 사용되었던 비활성 에이전트입니다.',
    createdAt: '2023-09-05',
    executionCount: 2100,
    status: 'building',
  },
];

export const MOCK_TOOLS: Tool[] = [
  { id: 'tool-1', name: '데이터베이스 커넥터', description: '데이터를 가져오기 위해 SQL 데이터베이스에 연결합니다.', registeredAt: '2023-09-01', status: 'active' },
  { id: 'tool-2', name: '이메일 발송기', description: '타사 API를 통해 이메일을 보냅니다.', registeredAt: '2023-09-02', status: 'active' },
  { id: 'tool-3', name: '파일 파서 (CSV)', description: 'CSV 파일을 구조화된 JSON으로 구문 분석합니다.', registeredAt: '2023-09-10', status: 'active' },
  { id: 'tool-4', name: '이미지 생성 API', description: '텍스트 프롬프트에서 이미지를 생성합니다.', registeredAt: '2023-10-05', status: 'inactive' },
];

export const MOCK_CHART_DATA = [
  { date: '1월 24', Executions: 2890, Failed: 230 },
  { date: '2월 24', Executions: 2750, Failed: 200 },
  { date: '3월 24', Executions: 3100, Failed: 280 },
  { date: '4월 24', Executions: 3400, Failed: 320 },
  { date: '5월 24', Executions: 3200, Failed: 250 },
  { date: '6월 24', Executions: 3800, Failed: 350 },
  { date: '7월 24', Executions: 4100, Failed: 400 },
];

export const MOCK_STATS = [
  { title: '총 실행 횟수', value: '12,453', change: '지난달 대비 +12.5%', icon: Zap },
  { title: '운영 중인 에이전트', value: '24', change: '+2개의 새 에이전트', icon: Bot },
  { title: '성공률', value: '98.2%', change: '지난달 대비 +0.5%', icon: ArrowUpRight },
  { title: '사용 가능한 도구', value: '8', change: '1개 비활성', icon: Wrench },
];
