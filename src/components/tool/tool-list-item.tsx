"use client";

import { MoreHorizontal } from 'lucide-react';
import type { Tool } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import ToolDialog from './tool-dialog';

interface ToolListItemProps {
  tool: Tool;
  onToggleStatus: (toolId: string) => void;
}

export default function ToolListItem({ tool, onToggleStatus }: ToolListItemProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{tool.name}</div>
        <div className="text-sm text-muted-foreground">{tool.description}</div>
      </TableCell>
      <TableCell>
        <Badge variant={tool.status === 'active' ? 'default' : 'outline'} className="capitalize">
          {tool.status === 'active' ? '활성' : '비활성'}
        </Badge>
      </TableCell>
      <TableCell>{new Date(tool.registeredAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">메뉴 토글</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>작업</DropdownMenuLabel>
              <ToolDialog tool={tool}>
                 <DropdownMenuItem onSelect={(e) => e.preventDefault()}>편집</DropdownMenuItem>
              </ToolDialog>
              <DropdownMenuItem onClick={() => onToggleStatus(tool.id)}>
                {tool.status === 'active' ? '비활성화' : '활성화'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
}
