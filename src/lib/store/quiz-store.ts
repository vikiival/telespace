import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuizState } from '../types';
import { questions } from '../data/questions';

interface QuizStore extends QuizState {
  selectAnswer: (answer: number) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
}

const initialState: QuizState = {
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  isComplete: false,
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      selectAnswer: (answer: number) => {
        const state = get();
        const isCorrect = questions[state.currentQuestionIndex].correctAnswer === answer;
        
        set({
          answers: [...state.answers, answer],
          score: isCorrect ? state.score + 1 : state.score,
        });
      },
      nextQuestion: () => {
        const state = get();
        const isLastQuestion = state.currentQuestionIndex === questions.length - 1;
        
        set({
          currentQuestionIndex: isLastQuestion ? state.currentQuestionIndex : state.currentQuestionIndex + 1,
          isComplete: isLastQuestion,
        });
      },
      resetQuiz: () => {
        set(initialState);
      },
    }),
    {
      name: 'quiz-storage',
    }
  )
);