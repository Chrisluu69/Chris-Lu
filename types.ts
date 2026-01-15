
export enum Era {
  CLASSICAL = 'Classical',
  MODERN = 'Modern',
  POST_MODERN = 'Post-Modern'
}

export interface Question {
  id: string;
  era: Era;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  total: number;
  answers: {
    questionId: string;
    isCorrect: boolean;
    userIndex: number;
  }[];
}
