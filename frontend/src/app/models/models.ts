// Models for API responses

export interface TextSnippet {
  id: number;
  content: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface TypingResult {
  id?: number;
  playerName: string;
  wpm: number;
  accuracy: number;
  difficulty: string;
  createdAt?: string;
}
