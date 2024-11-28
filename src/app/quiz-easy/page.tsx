"use client";

import { EasyQuiz } from "@/components/Quiz/EasyQuiz/EasyQuiz"
import { QuizResults } from "@/components/Quiz/QuizResults/QuizResults"
import { useQuizStore } from "@/lib/store/quiz-store";


export default function EasyQuizPage() {
  const { isComplete } = useQuizStore();
  return isComplete ? <QuizResults /> : <EasyQuiz />;
}