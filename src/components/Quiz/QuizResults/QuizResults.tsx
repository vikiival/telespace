"use client"

import {
  Button,
  Cell,
  List,
  Section
} from "@telegram-apps/telegram-ui"

import { DisplayData } from "@/components/DisplayData/DisplayData"
import { Page } from "@/components/Page"
import { WalletConnection } from "@/components/Wallet/WalletConnection"
import { useAuth } from "@/context/AuthContext"
import { questions } from "@/lib/data/questions"
import { useQuizStore } from "@/lib/store/quiz-store"
import { AMOUNT_PER_EASY_QUIZ, TOKEN_SYMBOL } from "@/constants"
import { initData, useSignal } from "@telegram-apps/sdk-react"
import { useMemo, useState } from "react"
import { Link } from "@/components/Link/Link"

export function QuizResults() {
  const initDataState = useSignal(initData.state)
  const { score, resetQuiz, answers, claimReward, hasClaimed } = useQuizStore()
  const { connected, logIn, walletAddress, sign, chainId } = useAuth()

  const userId = useMemo<number | undefined>(() => {
    return initDataState && initDataState.user
      ? initDataState.user.id
      : undefined
  }, [initDataState])

  // const [signed, setSigned] = useState<string| any>('');
  const [loading, setLoading] = useState<boolean>(false)

  const handleClaim = async () => {
    try {
      setLoading(true)
      const payload = {
        address: walletAddress,
        amount: Number((score * AMOUNT_PER_EASY_QUIZ).toFixed(2)),
        answers: answers,
        score,
        task: 'easy-quiz',
        userId,
      }
      const signature = await sign(JSON.stringify(payload))

      const result = await fetch("/api/cointracker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          chainId,
          signature,
        }),
      })

      if (result.ok) {
        const json = await result.json()
        console.log(json.claim)
        claimReward(json.claim)
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const rows = questions.map((question, index) => {
    const isCorrect = answers[index] === question.correctAnswer
    return {
      title: question.question,
      value: (
        <>
          <div>
            Answer: {question.options[question.correctAnswer]}
          </div>
          <div
            className={ isCorrect ? "text-green-500" : "text-red-500"}
          >
            You answered: {question.options[answers[index]]}
          </div>
        </>
      ),
    }
  })

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
              {hasClaimed ? <span className="text-green-500">You have already claimed</span>: 'Your amazing result will give you'}
              <div className="text-2xl">{(score * AMOUNT_PER_EASY_QUIZ).toFixed(2)} {TOKEN_SYMBOL}</div>
              <div className="mt-3">
                {!hasClaimed ? <Button
                  loading={loading}
                  onClick={connected ? () => handleClaim() : logIn}
                  mode="bezeled"
                  stretched
                >
                  {connected
                    ? "Claim tokens now"
                    : "Connect OKX Wallet to claim"}
                </Button> : <Link href="/">
                  <Button stretched>
                    Explore other quests
                  </Button>
                </Link>}
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
  )
}
