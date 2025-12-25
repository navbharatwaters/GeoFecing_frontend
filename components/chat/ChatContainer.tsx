'use client';

import { useState, useEffect } from 'react';
import { Message } from '@/types/chat';
import { generateId } from '@/lib/utils';
import { saveMessages, loadMessages } from '@/lib/storage';
import { sendTextQuery, sendAudioQuery } from '@/lib/api';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  type: 'text',
  content: 'Welcome to Ikargos i am ur database assitanant',
  timestamp: new Date(),
};

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = loadMessages();
    if (stored.length > 0) {
      setMessages(stored);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 1 || messages[0]?.id !== 'welcome') {
      saveMessages(messages);
    }
  }, [messages]);

  const handleSendTextMessage = async (text: string) => {
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      type: 'text',
      content: text,
      timestamp: new Date(),
    };

    const loadingMessage: Message = {
      id: generateId(),
      role: 'assistant',
      type: 'text',
      content: '',
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setIsLoading(true);

    try {
      const response = await sendTextQuery(text);
      
      let responseContent = '';
      let hasData = false;
      let rawData = null;

      if (typeof response === 'string') {
        responseContent = response;
      } else if (response && typeof response === 'object') {
        // Check if response has an 'output' field (common n8n pattern)
        if (response.output && typeof response.output === 'string') {
          // Extract the output and convert escaped newlines to actual newlines
          responseContent = response.output.replace(/\\n/g, '\n');
          // Keep the original response for CSV export
          hasData = true;
          rawData = response;
        } else if (response.message && typeof response.message === 'string') {
          // Alternative: check for 'message' field
          responseContent = response.message.replace(/\\n/g, '\n');
          hasData = true;
          rawData = response;
        } else {
          // Fallback: stringify the entire response
          responseContent = JSON.stringify(response, null, 2);
          hasData = true;
          rawData = response;
        }
      } else {
        responseContent = 'No response received';
      }

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        type: 'text',
        content: responseContent,
        timestamp: new Date(),
        hasData,
        rawData,
      };

      setMessages((prev) => prev.filter(msg => !msg.isLoading).concat(assistantMessage));
    } catch (error: any) {
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        type: 'text',
        content: `Error: ${error.message || 'Failed to process your query'}`,
        timestamp: new Date(),
      };

      setMessages((prev) => prev.filter(msg => !msg.isLoading).concat(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendAudio = async (audioBlob: Blob) => {
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      type: 'audio',
      content: 'Voice message',
      timestamp: new Date(),
    };

    const loadingMessage: Message = {
      id: generateId(),
      role: 'assistant',
      type: 'audio',
      content: '',
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setIsLoading(true);

    try {
      const responseBlob = await sendAudioQuery(audioBlob);
      const audioUrl = URL.createObjectURL(responseBlob);

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        type: 'audio',
        content: 'Audio response',
        audioUrl,
        timestamp: new Date(),
      };

      setMessages((prev) => prev.filter(msg => !msg.isLoading).concat(assistantMessage));
    } catch (error: any) {
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        type: 'text',
        content: `Error: ${error.message || 'Failed to process your audio query'}`,
        timestamp: new Date(),
      };

      setMessages((prev) => prev.filter(msg => !msg.isLoading).concat(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput
        onSendMessage={handleSendTextMessage}
        onSendAudio={handleSendAudio}
        disabled={isLoading}
      />
    </div>
  );
}
