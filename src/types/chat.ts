export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  uiComponent?: 'experience' | 'skills' | 'contact' | 'github';
  uiProps?: any;
  suggestions?: string[];
}
