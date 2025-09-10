
"use client";

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';

interface FileUploadRequestProps {
  onFileSelect: (file: File) => void;
}

export default function FileUploadRequest({ onFileSelect }: FileUploadRequestProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <p>보고서를 생성하는 데 사용할 샘플 데이터 파일(예: CSV)을 업로드해 주세요. 이 파일은 에이전트의 데이터 처리 논리를 구성하는 데 도움이 됩니다.</p>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".csv,.json,.txt"
      />
      <Button onClick={handleButtonClick}>
        <UploadCloud className="mr-2 h-4 w-4" />
        파일 업로드
      </Button>
    </div>
  );
}
