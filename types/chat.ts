export type MessageRole = 'user' | 'assistant';
export type MessageType = 'text' | 'audio';

export interface Message {
  id: string;
  role: MessageRole;
  type: MessageType;
  content: string;
  audioUrl?: string;
  timestamp: Date;
  hasData?: boolean;
  rawData?: any;
  isLoading?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
