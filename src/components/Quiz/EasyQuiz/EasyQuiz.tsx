
"use client";

import { useLaunchParams } from "@telegram-apps/sdk-react";
import {
  Cell,
  Image,
  List,
  Progress,
  Section,
  Selectable,
  Title,
} from "@telegram-apps/telegram-ui";
import { initData, type User, useSignal } from "@telegram-apps/sdk-react";

import { Link } from "@/components/Link/Link";
import { DisplayData } from "@/components/DisplayData/DisplayData";
import { Page } from "@/components/Page";
import { QuizOption } from "@/components/Quiz/QuizOption/QuizOption";
import tonSvg from '../../../app/_assets/spacecoin.svg' //"../../../_assets/spacecoin.svg";
import { questions } from "@/lib/data/questions";
import { useQuizStore } from "@/lib/store/quiz-store";

export function EasyQuiz() {
  const { currentQuestionIndex, answers, selectAnswer, nextQuestion } =
    useQuizStore();
  const currentQuestion = questions[currentQuestionIndex];
  const hasAnswered = answers.length > currentQuestionIndex;

  const handleOptionClick = (optionIndex: number) => {
    if (hasAnswered) return;
    selectAnswer(optionIndex);
    // Automatically move to next question after a brief delay to show the correct/incorrect state
    setTimeout(() => {
      nextQuestion();
    }, 500);
  };

  const progress = Math.round(
    ((currentQuestionIndex + 1) / questions.length) * 100,
  );

  return (
    <Page back={false}>
      <List>
        <Section
          header={
            <Section.Header>
              Quiz Easy {currentQuestionIndex + 1} of {questions.length}
            </Section.Header>
          }
          footer={
            <Section.Footer centered>
              Your current progress
              <Progress value={progress} />
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
              <div>Question {currentQuestionIndex + 1}</div>
              <b>{currentQuestion.question}</b>
            </Section.Header>
          }
          footer={
            <Section.Footer>
              <Link href="https://spacecoin.xyz">
                Looking for the blue paper?
              </Link>
            </Section.Footer>
          }
        >
          {currentQuestion.options.map((cellText, index) => (
            <QuizOption
              key={index}
              value={index}
              description="Description"
              text={cellText}
              onChange={() => handleOptionClick(index)}
            />
          ))}
        </Section>
      </List>
    </Page>
  );
}
