
"use client";

import { useState } from 'react';
import { Wrench, PlusCircle, X, Loader2 } from 'lucide-react';
import { MOCK_TOOLS } from '@/lib/mock-data';
import type { Agent, Tool } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '../ui/scroll-area';
import { Card, CardContent } from '../ui/card';

interface AgentToolListProps {
  agent: Agent;
  onModified: () => void;
}

export default function AgentToolList({ agent, onModified }: AgentToolListProps) {
  const [connectedTools, setConnectedTools] = useState<Tool[]>(
    MOCK_TOOLS.filter(t => agent.toolIds?.includes(t.id))
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTools, setSelectedTools] = useState<string[]>(agent.toolIds || []);
  const [isSaving, setIsSaving] = useState(false);

  const availableTools = MOCK_TOOLS.filter(t => t.status === 'active');

  const handleToolSelection = (toolId: string) => {
    setSelectedTools(prev =>
      prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId]
    );
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    // Mock saving process
    await new Promise(resolve => setTimeout(resolve, 1000));
    setConnectedTools(MOCK_TOOLS.filter(t => selectedTools.includes(t.id)));
    
    onModified();
    setIsSaving(false);
    setIsAddDialogOpen(false);
  };

  const handleRemoveTool = (toolId: string) => {
    setSelectedTools(prev => prev.filter(id => id !== toolId));
    setConnectedTools(prev => prev.filter(t => t.id !== toolId));
    onModified();
  }

  return (
    <div className="h-[400px] flex flex-col">
        <ScrollArea className="h-full pr-4 flex-grow">
          <div className="space-y-4">
            {connectedTools.length > 0 ? (
              <ul className="space-y-3">
                {connectedTools.map(tool => (
                  <li key={tool.id}>
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                          <div className='flex items-center gap-4'>
                              <div className="p-2 bg-muted rounded-md">
                                  <Wrench className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                  <h4 className="font-semibold">{tool.name}</h4>
                                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                              </div>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveTool(tool.id)}>
                              <X className="h-4 w-4" />
                          </Button>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-10 border-2 border-dashed rounded-lg h-full flex flex-col justify-center items-center">
                <Wrench className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">연동된 도구 없음</h3>
                <p className="mt-1 text-sm text-gray-500">이 에이전트에 도구를 추가하여 기능을 확장하세요.</p>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="pt-4 mt-auto">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    도구 추가/제거
                </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>에이전트에 도구 추가</DialogTitle>
                    <DialogDescription>
                    이 에이전트가 사용할 도구를 선택하세요. 활성 도구만 표시됩니다.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                    {availableTools.map(tool => (
                    <div key={tool.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <Checkbox
                        id={`tool-${tool.id}`}
                        checked={selectedTools.includes(tool.id)}
                        onCheckedChange={() => handleToolSelection(tool.id)}
                        className='mt-1'
                        />
                        <label
                        htmlFor={`tool-${tool.id}`}
                        className="flex-grow grid gap-1.5 leading-none cursor-pointer"
                        >
                        <span className="font-medium">{tool.name}</span>
                        <span className="text-sm text-muted-foreground">{tool.description}</span>
                        </label>
                    </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>취소</Button>
                    <Button onClick={handleSaveChanges} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    변경사항 저장
                    </Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    </div>
  );
}
