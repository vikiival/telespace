'use client';

import { Page } from '@/components/Page'
import SlotMachine from '@/components/SlotMachine/SlotMachine'
import { WalletConnection } from "@/components/Wallet/WalletConnection"
import { TOKEN_SYMBOL } from "@/constants"
import {
  List,
  Section
} from "@telegram-apps/telegram-ui"
import { useState } from 'react'

export default function SlotMachinePage() {
  const [score, setScore] = useState(0)

  const handleSuccess = () => {
    setScore(score + 5)
  }

  return (
    <Page back>
      <List>
        <Section
          header={
            <Section.Header>
              Entropy Slot Machine
            </Section.Header>
          }
          footer={
            <Section.Footer centered>
              You have spinned
              <div className="text-2xl">{score} {TOKEN_SYMBOL}</div>
            </Section.Footer>
          }
        >
          <WalletConnection />
        </Section>
        <Section
          header={
            <Section.Header large> 
             Play
            </Section.Header>
          }
        >
          <SlotMachine onSuccess={handleSuccess} />
        </Section>
      </List>
    </Page>
  );
};
