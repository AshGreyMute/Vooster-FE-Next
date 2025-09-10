
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AgentBlueprint from '@/components/agent/agent-blueprint';
import AgentToolList from '@/components/agent/agent-tool-list';
import type { Agent } from '@/types';
import { BrainCircuit, Wrench, Info, ChevronDown } from 'lucide-react';
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface AgentDetailsSectionProps {
  agent: Agent;
  onModified: () => void;
}

export default function AgentDetailsSection({ agent, onModified }: AgentDetailsSectionProps) {
  return (
    <Card className="rounded-2xl">
        <Accordion type="single" collapsible className="w-full" defaultValue="details">
            <AccordionItem value="details" className="border-b-0">
                <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                         <div className="flex items-center gap-2">
                            <Info className="h-5 w-5" />
                            <span className="text-lg font-semibold">에이전트 세부정보</span>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-6">
                    <Separator className="mb-6" />
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2">
                             <div className="flex items-center gap-2 mb-2">
                                <BrainCircuit className="h-5 w-5 text-muted-foreground" />
                                <h3 className="text-md font-semibold">에이전트 Blueprint</h3>
                            </div>
                            <p className="text-muted-foreground text-sm mb-4">
                                이 에이전트가 내부적으로 어떻게 작동하는지에 대한 개요입니다.
                            </p>
                            <AgentBlueprint agent={agent} />
                        </div>
                        <div className="col-span-1 border-l pl-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Wrench className="h-5 w-5 text-muted-foreground" />
                                <h3 className="text-md fontsemibold">연동된 도구</h3>
                            </div>
                             <p className="text-muted-foreground text-sm mb-4">
                                이 에이전트가 작업을 수행하는 데 사용할 수 있는 도구입니다.
                            </p>
                            <AgentToolList agent={agent} onModified={onModified} />
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </Card>
  );
}
