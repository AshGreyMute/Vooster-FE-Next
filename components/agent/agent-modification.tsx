
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChatLayout } from '@/components/chat/chat-layout';
import type { Agent, Message } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Wand2 } from 'lucide-react';

interface AgentModificationProps {
  agent: Agent;
  onModified: () => void;
}

export default function AgentModification({ agent, onModified }: AgentModificationProps) {
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: (
        <span className="text-center w-full block">
          <strong>{agent.name}</strong> 에이전트에 적용할 변경 사항을 설명해주세요.
        </span>
      ),
    },
  ]);

  const handleSendMessage = async (input: string) => {
    setIsSending(true);
    setMessages(prev => [...prev, {id: Date.now().toString(), role: 'user', content: input}]);

    // 모의 AI 상호작용
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockReasoning = `네, 에이전트를 업데이트했습니다. 환불을 처리하기 전에 사용자의 신원을 확인하는 새로운 단계를 추가했습니다. 이를 통해 보안이 강화됩니다. 이제 에이전트 그래프에는 '의도 분류'와 '환불 처리' 노드 사이에 '신원 확인' 노드가 표시됩니다.`;

    const aiResponse: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>변경 이유</AlertTitle>
          <AlertDescription>
            {mockReasoning}
          </AlertDescription>
        </Alert>
      ),
    };

    setMessages(prev => [...prev, aiResponse]);
    
    onModified();
    setIsSending(false);
  };

  return (
    <Card className="rounded-2xl flex flex-col h-[800px] overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Wand2 className="h-5 w-5" />자연어로 수정</CardTitle>
        <CardDescription>
          채팅을 통해 에이전트의 동작을 수정하고 즉시 변경사항을 확인하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 flex-grow min-h-0">
        <ChatLayout
          initialMessages={messages}
          onSendMessage={handleSendMessage}
          isSending={isSending}
          chatContainerClassName="h-full border-t"
        />
      </CardContent>
    </Card>
  );
}
