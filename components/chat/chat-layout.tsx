
"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Bot, User, Sparkles, Paperclip } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import type { Message } from '@/types';
import { ScrollArea } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface ChatLayoutProps {
  initialMessages: Message[];
  onSendMessage: (message: string, file?: File) => Promise<void>;
  isSending: boolean;
  chatContainerClassName?: string;
  samplePrompts?: string[];
  onSamplePromptClick?: (prompt: string) => void;
}

export function ChatLayout({ initialMessages, onSendMessage, isSending, chatContainerClassName, samplePrompts, onSamplePromptClick }: ChatLayoutProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);
  
  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        setTimeout(() => {
          viewport.scrollTop = viewport.scrollHeight;
        }, 0);
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = async () => {
    if (!input.trim() || isSending) return;
    const currentInput = input;
    setInput('');
    await onSendMessage(currentInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSendMessage(`첨부파일: ${file.name}`, file);
    }
    // 동일한 파일을 다시 업로드할 수 있도록 입력 값 초기화
    if(fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const hasMessages = messages.length > 1 || (messages.length === 1 && messages[0].role !== 'system');

  return (
    <TooltipProvider>
    <div className={cn("flex h-full flex-col", chatContainerClassName)}>
      <ScrollArea className="flex-grow" ref={scrollAreaRef}>
        <div className="p-4 space-y-6">
        {messages.map((message, index) => (
          <div
            key={message.id || index}
            className={cn(
              "flex items-start gap-3",
              message.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            {message.role === "assistant" && (
              <Avatar className="h-8 w-8 border">
                <AvatarFallback><Bot className="h-4 w-4"/></AvatarFallback>
              </Avatar>
            )}
             {message.role === 'system' ? (
               <div className="text-center w-full py-4 px-2 text-sm text-muted-foreground rounded-lg bg-muted/50 border border-dashed">
                 {message.content}
               </div>
             ) : (
                <div
                  className={cn(
                    "max-w-xl rounded-lg p-3 text-sm whitespace-pre-wrap",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted rounded-bl-none"
                  )}
                >
                  {message.content}
                </div>
             )}
             {message.role === "user" && (
              <Avatar className="h-8 w-8 border">
                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isSending && (
          <div className="flex items-start gap-3 justify-start">
             <Avatar className="h-8 w-8 border">
                <AvatarFallback><Bot className="h-4 w-4"/></AvatarFallback>
              </Avatar>
            <div className="bg-muted rounded-lg p-3 text-sm flex items-center rounded-bl-none">
                <Loader2 className="h-4 w-4 animate-spin"/>
            </div>
          </div>
        )}
        </div>
        
        {!hasMessages && samplePrompts && samplePrompts.length > 0 && (
          <div className="p-4 pt-0">
            <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2"><Sparkles className="h-4 w-4" /> 몇 가지 예시로 시작해 보세요:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {samplePrompts.map((prompt, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  className="text-left h-auto whitespace-normal"
                  onClick={() => onSamplePromptClick?.(prompt)}
                  disabled={isSending}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
      <div className="relative border-t p-4 flex items-end gap-2">
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        <Tooltip>
          <TooltipTrigger asChild>
             <Button
                variant="ghost"
                size="icon"
                className="shrink-0"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSending}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>파일 첨부</p>
          </TooltipContent>
        </Tooltip>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="만들고 싶은 에이전트에 대해 설명해주세요..."
          className="pr-12 resize-none min-h-0"
          rows={1}
          disabled={isSending}
        />
        <Button
          size="icon"
          className="shrink-0"
          onClick={handleSendMessage}
          disabled={!input.trim() || isSending}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
    </TooltipProvider>
  );
}
