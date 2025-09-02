import Link from 'next/link';
import { Bot, Zap } from 'lucide-react';
import type { Agent } from '@/types';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <Link href={`/agents/${agent.id}`} className="block h-full">
      <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col rounded-2xl">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{agent.name}</CardTitle>
            <Badge variant={agent.status === 'in-operation' ? 'default' : 'outline'} className="capitalize">
              {agent.status === 'in-operation' ? '운영 중' : '빌드 중'}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2 pt-2">{agent.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow"></CardContent>
        <CardFooter className="text-sm text-muted-foreground flex justify-between">
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            <span>{agent.executionCount.toLocaleString()}회 실행</span>
          </div>
          <div className="flex items-center gap-1">
            <Bot className="h-4 w-4" />
            <span>에이전트</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
