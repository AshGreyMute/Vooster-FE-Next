
"use client";

import { useState, useRef, useEffect } from 'react';
import { Play, Loader2, Square, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const mockLogs = [
  "에이전트 실행 시작...",
  "입력 수신: '내 주문 상태는?'",
  "도구 'IntentClassifier' 호출됨.",
  "의도 'ORDER_STATUS'로 분류됨. 신뢰도: 0.98",
  "도구 'DatabaseConnector' 호출됨.",
  "SQL 쿼리 실행: SELECT status FROM orders WHERE user_id = 'user123' ORDER BY created_at DESC LIMIT 1;",
  "쿼리 성공. 상태: '배송됨'",
  "응답 생성 중...",
  "에이전트 실행이 성공적으로 완료되었습니다.",
];

export default function AgentExecution() {
  const [input, setInput] = useState('내 주문 상태는?');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [logs]);

  const handleRun = () => {
    setIsRunning(true);
    setLogs([]);
    let logIndex = 0;
    let intervalId: NodeJS.Timeout | null = null;

    const processLog = () => {
      if (logIndex < mockLogs.length) {
        const logEntry = mockLogs[logIndex];
        if (logEntry) {
            setLogs(prev => [...prev, logEntry.replace("'내 주문 상태는?'", `'${input}'`)]);
        }
        logIndex++;
      } else {
        if (intervalId) clearInterval(intervalId);
        setIsRunning(false);
      }
    };
    
    intervalId = setInterval(processLog, 500);
  };
  
  const handleStop = () => {
    setIsRunning(false);
    // 실제 앱에서는 백엔드 프로세스를 중지하지만 여기서는 UI만 업데이트합니다.
    setLogs(prev => [...prev, '--- 사용자에 의해 실행 중지됨 ---']);
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>실행 및 로그</CardTitle>
        <CardDescription>
          에이전트를 테스트하고 실시간 실행 로그를 보려면 입력을 제공하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-foreground mb-2">
            테스트 입력
          </label>
          <Input
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='예: 내 주문 상태는?'
          />
        </div>
        <Card className="bg-background">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
            <h3 className="font-semibold">실행 로그</h3>
            {isRunning ? (
               <Button variant="destructive" size="sm" onClick={handleStop}>
                 <Square className="mr-2 h-4 w-4" />
                 중지
               </Button>
            ) : (
              <Button size="sm" onClick={handleRun} disabled={isRunning || !input.trim()}>
                <Play className="mr-2 h-4 w-4" />
                에이전트 실행
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea ref={scrollAreaRef} className="h-72 w-full">
              <div className="p-4 font-code text-sm">
                {logs.length === 0 && !isRunning && (
                  <p className="text-muted-foreground">로그를 보려면 "에이전트 실행"을 클릭하세요.</p>
                )}
                {logs.map((log, index) => (
                  <div key={index} className="flex items-start">
                    <ChevronsRight className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <p className="flex-grow">{log}</p>
                  </div>
                ))}
                {isRunning && <Loader2 className="h-5 w-5 animate-spin mt-2 text-muted-foreground" />}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
