
"use client";

import { useState, useEffect } from 'react';
import type { Agent } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Bot, Zap, Clock, Server } from 'lucide-react';

interface AgentInfoModalProps {
  agent: Agent;
  agentStatus: 'in-operation' | 'building';
  children: React.ReactNode;
}

export default function AgentInfoModal({ agent, agentStatus, children }: AgentInfoModalProps) {
  const [creationDate, setCreationDate] = useState('');

  useEffect(() => {
    setCreationDate(new Date(agent.createdAt).toLocaleDateString());
  }, [agent.createdAt]);

  const apiUrl = `https://api.agentflow.ai/v1/run/${agent.id}`;
  const curlExample = `curl -X POST ${apiUrl} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"input": "YOUR_QUERY_HERE"}'`;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            {agent.name} 운영 정보
          </DialogTitle>
          <DialogDescription>
            에이전트의 현재 상태, 통계 및 배포 세부 정보입니다.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">상태</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant={agentStatus === 'in-operation' ? 'default' : 'outline'} className="capitalize">
                  {agentStatus === 'in-operation' ? '운영 중' : '빌드 중'}
                </Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">총 실행 횟수</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold flex items-center gap-2">
                  <Zap className="h-5 w-5" /> {agent.executionCount.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
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
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                배포 정보
              </CardTitle>
              <CardContent className="space-y-4 pt-4 px-0 pb-0">
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
            </CardHeader>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
