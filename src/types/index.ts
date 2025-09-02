export type Agent = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  executionCount: number;
  status: 'in-operation' | 'building';
  graph?: {
    nodes: any[];
    edges: any[];
  };
};

export type Tool = {
  id: string;
  name: string;
  description: string;
  registeredAt: string;
  status: 'active' | 'inactive';
};

export type StatCard = {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
};

export type Message = {
  id: string;
  content: React.ReactNode;
  role: 'user' | 'assistant' | 'system';
};
