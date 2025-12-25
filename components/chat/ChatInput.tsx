'use client';

import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VoiceRecorder } from './VoiceRecorder';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onSendAudio: (audioBlob: Blob) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, onSendAudio, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          placeholder={disabled ? 'Processing...' : 'Ask me about your database...'}
          className={cn(
            'flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600',
            'focus:outline-none focus:ring-2 focus:ring-ikargos-orange focus:border-transparent',
            'disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed',
            'text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400',
            'bg-white dark:bg-gray-800'
          )}
        />

        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className={cn(
            'p-3 rounded-full bg-ikargos-orange text-white transition-all',
            'hover:bg-ikargos-orange/90 focus:outline-none focus:ring-2 focus:ring-ikargos-orange focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>

        <VoiceRecorder 
          onRecordingComplete={onSendAudio}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
