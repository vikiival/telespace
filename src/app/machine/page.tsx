'use client';

import { Link } from "@/components/Link/Link"
import { Page } from '@/components/Page'
import SlotMachine from '@/components/SlotMachine/SlotMachine'
import {
  Cell,
  Image,
  List,
  Section,
  Title
} from "@telegram-apps/telegram-ui"
import { useState } from 'react'
import tonSvg from "../_assets/spacecoin.svg"

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
              <Title>{score} SPC</Title>
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
             Play
            </Section.Header>
          }
        >
          <SlotMachine />
        </Section>
      </List>
    </Page>
  );
};
