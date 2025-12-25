import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import { AudioPlayer } from './AudioPlayer';
import { CSVDownload } from './CSVDownload';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ResultsCard } from './ResultsCard';
import { Loader2 } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isAudio = message.type === 'audio';

  return (
    <div className={cn(
      'flex w-full mb-4 animate-fade-in',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      <div className={cn(
        'max-w-[80%] rounded-lg px-4 py-3 shadow-sm',
        isUser 
          ? 'bg-ikargos-orange text-white' 
          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100'
      )}>
        {message.isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Processing...</span>
          </div>
        ) : (
          <>
            {isAudio && message.audioUrl ? (
              <AudioPlayer audioUrl={message.audioUrl} />
            ) : isUser ? (
              <div className="whitespace-pre-wrap break-words">
                {message.content}
              </div>
            ) : (
              <ResultsCard content={message.content}>
                <MarkdownRenderer content={message.content} />
              </ResultsCard>
            )}
            
            {!isUser && message.hasData && message.rawData && (
              <div className="mt-3">
                <CSVDownload data={message.rawData} />
              </div>
            )}
            
            <div className={cn(
              'text-xs mt-2',
              isUser ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
            )}>
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
