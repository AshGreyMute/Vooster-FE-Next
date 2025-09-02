import AgentCard from '@/components/agent/agent-card';
import CreateAgentDialog from '@/components/agent/create-agent-dialog';
import { MOCK_AGENTS } from '@/lib/mock-data';

export default function AgentsPage() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">에이전트</h2>
          <p className="text-muted-foreground">
            AI 에이전트를 검색, 생성 및 관리합니다.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <CreateAgentDialog />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {MOCK_AGENTS.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </>
  );
}
