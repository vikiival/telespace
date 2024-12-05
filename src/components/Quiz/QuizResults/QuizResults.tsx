"use client";

import {
  Button,
  List,
  Section
} from "@telegram-apps/telegram-ui"

import { DisplayData } from "@/components/DisplayData/DisplayData"
import { Page } from "@/components/Page"
import { WalletConnection } from "@/components/Wallet/WalletConnection"
import { useAuth } from "@/context/AuthContext"
import { questions } from "@/lib/data/questions"
import { useQuizStore } from "@/lib/store/quiz-store"

export function QuizResults() {
  const { score, resetQuiz, answers } = useQuizStore();
  const { connected, logIn } = useAuth();
  const percentage = Math.ceil((score / questions.length) * 100);

  const rows = questions.map((question, index) => {
    const isCorrect = answers[index] === question.correctAnswer;
    return {
      title: question.question,
      value: (
        <>
          <div>
            Answer: {question.options[question.correctAnswer]}
          </div>
          <div
            style={{
              color: isCorrect ? "green" : "red",
            }}
          >
            You answered: {question.options[answers[index]]}
          </div>
        </>
      ),
    };
  });

  return (
    <Page>
      <List>
        <Section
          header={
            <Section.Header>
              Quiz Easy Results
            </Section.Header>
          }
          footer={
            <Section.Footer centered>
              Your amazing result will give you
              <div className="text-2xl">{score * 6} SPC</div>
              <div className="mt-3">
                <Button
                  onClick={connected ? () => {} : logIn}
                  mode="bezeled"
                  stretched
                >
                  {connected
                    ? "Claim tokens now"
                    : "Connect OKX Wallet to claim"}
                </Button>
              </div>
            </Section.Footer>
          }
        >
          <WalletConnection />
        </Section>
        <Section
          header={
            <>
              <Section.Header large>
                Results ({score} correct)
              </Section.Header>
            </>
          }
          footer={
            <Section.Footer>
              <Button onClick={resetQuiz}>
                Wanna try again?
              </Button>
            </Section.Footer>
          }
        >
          <DisplayData
            rows={rows}
          />
        </Section>
      </List>
    </Page>
  );
}
