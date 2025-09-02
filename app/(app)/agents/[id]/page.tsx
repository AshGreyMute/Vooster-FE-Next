
"use client";

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { Bot, Zap, Clock, Activity, BrainCircuit, Rocket, Server, ChevronDown, Wand2 } from 'lucide-react';
import { MOCK_AGENTS } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import AgentGraph from '@/components/agent/agent-graph';
import AgentExecution from '@/components/agent/agent-execution';
import AgentModification from '@/components/agent/agent-modification';
import type { Agent } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const agent = MOCK_AGENTS.find((a) => a.id === id) as Agent | undefined;
  
  const [agentStatus, setAgentStatus] = useState(agent?.status || 'building');
  const [isDeployed, setIsDeployed] = useState(agent?.status === 'in-operation');
  const [hasBeenModified, setHasBeenModified] = useState(false);
  const [isDeployInfoOpen, setIsDeployInfoOpen] = useState(false);
  const [creationDate, setCreationDate] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (agent) {
      setCreationDate(new Date(agent.createdAt).toLocaleDateString());
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
    setIsDeployInfoOpen(true);
    toast({
      title: hasBeenModified ? '에이전트 재배포됨' : '에이전트 배포됨',
      description: `${agent.name}이(가) 성공적으로 배포되었습니다.`,
    });
  };

  const handleModified = () => {
    setHasBeenModified(true);
  }

  const apiUrl = `https://api.agentflow.ai/v1/run/${agent.id}`;
  const curlExample = `curl -X POST ${apiUrl} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"input": "YOUR_QUERY_HERE"}'`;

  const canDeploy = !isDeployed || hasBeenModified;

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
        <Button size="lg" onClick={handleDeploy} disabled={!canDeploy}>
          {isDeployed && !hasBeenModified ? (
            <>
              <Rocket className="mr-2 h-5 w-5" />
              배포됨
            </>
          ) : isDeployed && hasBeenModified ? (
             <>
              <Wand2 className="mr-2 h-5 w-5" />
              변경사항 배포
            </>
          ) : (
            <>
              <Rocket className="mr-2 h-5 w-5" />
              배포
            </>
          )}
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">상태</CardTitle>
          </CardHeader>
          <CardContent>
             <Badge variant={agentStatus === 'in-operation' ? 'default' : 'outline'} className="capitalize">
              {agentStatus === 'in-operation' ? '운영 중' : '빌드 중'}
            </Badge>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">총 실행 횟수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold flex items-center gap-2">
              <Zap className="h-5 w-5" /> {agent.executionCount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">생성일</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold flex items-center gap-2">
              <Clock className="h-5 w-5" /> {creationDate || '...'}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {isDeployed && (
        <Collapsible
          open={isDeployInfoOpen}
          onOpenChange={setIsDeployInfoOpen}
          className="w-full"
        >
          <Card className="rounded-2xl">
            <CollapsibleTrigger asChild>
              <div className="p-6 cursor-pointer flex justify-between items-center">
                 <CardHeader className="p-0">
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    배포 정보
                  </CardTitle>
                  <CardDescription>
                    에이전트가 배포되어 API를 통해 사용할 수 있습니다.
                  </CardDescription>
                 </CardHeader>
                 <Button variant="ghost" size="sm">
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDeployInfoOpen ? 'rotate-180' : ''}`} />
                  <span className="sr-only">배포 정보 토글</span>
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                <div>
                  <label className="text-sm font-medium">API 엔드포인트</label>
                  <Input readOnly value={apiUrl} className="font-code mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">cURL 예제</label>
                  <pre className="bg-muted p-4 rounded-md text-sm font-code overflow-x-auto mt-1">
                    <code>{curlExample}</code>
                  </pre>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5" />에이전트 그래프</CardTitle>
          </CardHeader>
          <CardContent className="h-[600px] w-full">
            <AgentGraph initialNodes={agent.graph?.nodes} initialEdges={agent.graph?.edges} />
          </CardContent>
        </Card>
        
        <Tabs defaultValue="execute" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="execute"><Zap className="mr-2 h-4 w-4" />실행 및 로그</TabsTrigger>
            <TabsTrigger value="modify"><BrainCircuit className="mr-2 h-4 w-4" />수정</TabsTrigger>
          </TabsList>
          <TabsContent value="execute">
            <AgentExecution />
          </TabsContent>
          <TabsContent value="modify">
            <AgentModification agent={agent} onModified={handleModified} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
