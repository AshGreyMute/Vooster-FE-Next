"use client";

import React from 'react';
import { ReactFlow, Background, Controls, MiniMap, type Node, type Edge } from '@xyflow/react';

const defaultNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '그래프 데이터 없음' } },
];
const defaultEdges: Edge[] = [];

interface AgentGraphProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
}

export default function AgentGraph({ initialNodes = defaultNodes, initialEdges = defaultEdges }: AgentGraphProps) {
  if (!initialNodes || initialNodes.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted/50">
        <p className="text-muted-foreground">이 에이전트에 대한 그래프 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='h-full w-full rounded-lg overflow-hidden border'>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
