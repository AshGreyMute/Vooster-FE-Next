
"use client";

import { BrainCircuit } from 'lucide-react';
import type { Agent } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AgentBlueprintProps {
  agent: Agent;
}

export default function AgentBlueprint({ agent }: AgentBlueprintProps) {
  return (
    <div className="h-[400px] flex flex-col">
        {agent.blueprint ? (
          <ScrollArea className="h-full pr-4">
            <div
              className="whitespace-pre-wrap font-code text-sm"
            >{agent.blueprint}</div>
          </ScrollArea>
        ) : (
          <div className="text-center py-10 border-2 border-dashed rounded-lg h-full flex flex-col justify-center items-center">
            <BrainCircuit className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Blueprint를 사용할 수 없음</h3>
            <p className="mt-1 text-sm text-gray-500">이 에이전트에 대한 Blueprint가 정의되지 않았습니다.</p>
          </div>
        )}
    </div>
  );
}
