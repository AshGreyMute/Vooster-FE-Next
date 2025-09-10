
"use client";

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { Bot, Wand2, Rocket, Info } from 'lucide-react';
import { MOCK_AGENTS } from '@/lib/mock-data';
import AgentExecution from '@/components/agent/agent-execution';
import AgentModification from '@/components/agent/agent-modification';
import AgentInfoModal from '@/components/agent/agent-info-modal';
import type { Agent } from '@/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AgentDetailsSection from '@/components/agent/agent-details-section';

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const agent = MOCK_AGENTS.find((a) => a.id === id) as Agent | undefined;
  
  const [agentStatus, setAgentStatus] = useState(agent?.status || 'building');
  const [isDeployed, setIsDeployed] = useState(agent?.status === 'in-operation');
  const [hasBeenModified, setHasBeenModified] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (agent) {
      if (agent.status === 'in-operation') {
        setIsDeployed(true);
      }
    }
  }, [agent]);

  if (!agent) {
    notFound();
  }

  const handleDeploy = () => {
    setIsDeployed(true);
    setHasBeenModified(false);
    setAgentStatus('in-operation');
  };
  
  const handleSaveChanges = () => {
    setHasBeenModified(false);
    toast({
        title: '에이전트 업데이트됨',
        description: `${agent.name}의 변경사항이 저장되었습니다.`,
    });
  }

  const handleModified = () => {
    setHasBeenModified(true);
  }
  
  return (
    <div className="grid flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary/10 text-primary flex-shrink-0">
          <Bot className="h-8 w-8" />
        </div>
        <div className="flex-grow">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {agent.name}
          </h1>
          <p className="text-muted-foreground">{agent.description}</p>
        </div>
        
        <div className="flex items-center gap-2">
          {!isDeployed ? (
             <Button size="lg" onClick={handleDeploy}>
                <Rocket className="mr-2 h-5 w-5" />
                배포
             </Button>
          ) : (
            <>
              <Button size="lg" onClick={handleSaveChanges} disabled={!hasBeenModified}>
                <Wand2 className="mr-2 h-5 w-5" />
                수정 사항 저장하기
              </Button>
              <AgentInfoModal agent={agent} agentStatus={agentStatus}>
                <Button size="lg" variant="secondary">
                    <Info className="mr-2 h-5 w-5" />
                    운영 정보 보기
                </Button>
              </AgentInfoModal>
            </>
          )}
        </div>
      </div>
      
      <AgentDetailsSection agent={agent} onModified={handleModified} />

      <div className="grid md:grid-cols-2 gap-4">
        <AgentExecution />
        <AgentModification agent={agent} onModified={handleModified} />
      </div>
    </div>
  );
}
