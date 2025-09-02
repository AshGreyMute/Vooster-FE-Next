import { MOCK_STATS, MOCK_CHART_DATA, MOCK_AGENTS } from '@/lib/mock-data';
import StatsCard from '@/components/dashboard/stats-card';
import ExecutionChart from '@/components/dashboard/execution-chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import CreateAgentDialog from '@/components/agent/create-agent-dialog';

export default function DashboardPage() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
          <p className="text-muted-foreground">
            에이전트 활동에 대한 요약입니다.
          </p>
        </div>
        <CreateAgentDialog />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {MOCK_STATS.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 rounded-2xl">
          <CardHeader>
            <CardTitle>에이전트 실행</CardTitle>
            <CardDescription>월별 실행 및 실패율입니다.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ExecutionChart data={MOCK_CHART_DATA} />
          </CardContent>
        </Card>
        <Card className="col-span-3 rounded-2xl">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>최근 에이전트</CardTitle>
              <CardDescription>
                최근에 생성되거나 업데이트된 에이전트입니다.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/agents">
                모두 보기
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>에이전트</TableHead>
                  <TableHead className="text-right">실행 횟수</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_AGENTS.slice(0, 5).map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <Link href={`/agents/${agent.id}`}>
                        <div className="font-medium hover:underline">{agent.name}</div>
                      </Link>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {agent.description.substring(0, 40)}...
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{agent.executionCount.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
