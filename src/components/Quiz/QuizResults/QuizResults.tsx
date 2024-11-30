"use client";

import {
  Button,
  Cell,
  Image,
  List,
  Progress,
  Section,
  Selectable,
  Title,
} from "@telegram-apps/telegram-ui";
import { Link } from "@/components/Link/Link";

import { DisplayData } from "@/components/DisplayData/DisplayData";
import { Page } from "@/components/Page";
import { useQuizStore } from "@/lib/store/quiz-store";
import { questions } from "@/lib/data/questions";
import tonSvg from "../../../app/_assets/spacecoin.svg";

export function QuizResults() {
  const { score, resetQuiz, answers } = useQuizStore();
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
          <div style={{
            color: isCorrect ? 'green' : 'red'
          }}>You answered: {question.options[answers[index]]}</div>
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
              <Title>{score * 6} SPC</Title>
            </Section.Footer>
          }
        >
          <Link href="/ton-connect">
            <Cell
              before={
                <Image
                  src={tonSvg.src}
                  style={{ backgroundColor: "#007AFF" }}
                />
              }
              subtitle="Connect your ETH wallet"
            >
              SPC Connect
            </Cell>
          </Link>
        </Section>
        <Section
          header={
            <Section.Header large> 
              Results ({score} correct)
            </Section.Header>
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
