
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ChatLayout } from '../chat/chat-layout';
import type { Message } from '@/types';
import FileUploadRequest from '../chat/file-upload-request';

const samplePrompts = [
  '환불 요청을 처리하는 고객 서비스 에이전트를 만들어 줘.',
  '주간 소셜 미디어 보고서를 생성하는 에이전트.',
  '사용자 질문을 기반으로 문서를 검색하는 에이전트.',
];

export default function CreateAgentDialog() {
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (open) {
      setMessages([
        {
          id: '1',
          role: 'system',
          content: (
            <span>
              생성하고 싶은 에이전트에 대해 설명해주세요. 최고의 에이전트를 만드는 데 도움이 되도록 명확한 질문을 할 수 있습니다.
            </span>
          ),
        },
      ]);
      setIsFinished(false);
      setIsCreating(false);
      setIsGenerating(false);
    }
  }, [open]);


  const handleSendMessage = async (input: string, file?: File) => {
    setIsCreating(true);
    let content: React.ReactNode = input;
    if (file) {
      content = (
        <>
          {input}
          <div className="mt-2 text-sm text-muted-foreground bg-muted/80 rounded-md px-3 py-2">
            첨부파일: {file.name}
          </div>
        </>
      )
    }

    setMessages(prev => [...prev, {id: Date.now().toString(), role: 'user', content}]);

    // 모의 AI 상호작용
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let aiResponse: Message;

    if (file) {
       aiResponse = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "감사합니다! 제공된 CSV 파일을 기반으로 에이전트의 데이터 처리 논리를 구성하겠습니다. 에이전트가 처리해야 할 다른 특정 데이터 형식이나 소스가 있습니까?",
      };
      setIsFinished(true); // 모의: 이제 충분한 정보가 있다고 가정
    } else if (input.toLowerCase().includes('보고서')) {
       aiResponse = {
        id: Date.now().toString(),
        role: 'assistant',
        content: <FileUploadRequest onFileSelect={handleFileSelect} />,
      };
    } else {
      aiResponse = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "좋은 시작입니다! 더 강력하게 만들기 위해, 에이전트가 '배송됨' 주문에 대한 배송 시간 문의도 처리해야 할까요?",
      };
      setIsFinished(true); // 모의: 이제 충분한 정보가 있다고 가정
    }


    setMessages(prev => [...prev, aiResponse]);
    setIsCreating(false);
  };

  const handleFileSelect = (file: File) => {
    handleSendMessage(`보고서 생성을 위한 샘플 파일입니다: ${file.name}`, file);
  };

  const handleGenerateAgent = async () => {
    setIsGenerating(true);
    // 모의 AI 생성
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({ title: '에이전트 생성됨!', description: '새 에이전트 "고객 문의 에이전트"가 준비되었습니다.' });
    setIsGenerating(false);
    setOpen(false);
    
    router.push('/agents/agent-1');
  };

  const handleSamplePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          에이전트 생성
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl h-[70vh] flex flex-col">
          <DialogHeader>
            <div className="flex justify-between items-start pr-10">
              <div>
                <DialogTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  새 에이전트 생성
                </DialogTitle>
                <DialogDescription>
                  생성하고 싶은 에이전트를 평이한 영어로 설명해주세요. 저희 AI가 생성해 드립니다.
                </DialogDescription>
              </div>
              <Button 
                onClick={handleGenerateAgent} 
                disabled={!isFinished || isGenerating || isCreating}
              >
                {(isGenerating || isCreating) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Wand2 className="mr-2 h-4 w-4" />
                수집된 정보로 에이전트 생성
              </Button>
            </div>
          </DialogHeader>
          <div className="flex-grow min-h-0">
             <ChatLayout
              initialMessages={messages}
              onSendMessage={handleSendMessage}
              isSending={isCreating}
              chatContainerClassName="h-full"
              samplePrompts={samplePrompts}
              onSamplePromptClick={handleSamplePromptClick}
            />
          </div>
      </DialogContent>
    </Dialog>
  );
}
