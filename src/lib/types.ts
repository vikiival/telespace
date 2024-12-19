export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: number[];
  score: number;
  isComplete: boolean;
  hasClaimed: boolean;
  claim: any;
}