"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MOCK_TOOLS } from '@/lib/mock-data';
import type { Tool } from '@/types';
import ToolListItem from '@/components/tool/tool-list-item';
import ToolDialog from '@/components/tool/tool-dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>(MOCK_TOOLS);

  const handleToggleStatus = (toolId: string) => {
    setTools(prevTools =>
      prevTools.map(tool =>
        tool.id === toolId
          ? { ...tool, status: tool.status === 'active' ? 'inactive' : 'active' }
          : tool
      )
    );
  };

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">도구</h2>
          <p className="text-muted-foreground">
            AI 에이전트가 사용할 수 있는 도구를 관리합니다.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <ToolDialog>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              도구 등록
            </Button>
          </ToolDialog>
        </div>
      </div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>등록된 도구</CardTitle>
          <CardDescription>에이전트에서 사용할 수 있는 모든 도구 목록입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>도구 이름</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>등록일</TableHead>
                <TableHead>
                  <span className="sr-only">작업</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tools.map((tool) => (
                <ToolListItem key={tool.id} tool={tool} onToggleStatus={handleToggleStatus} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
