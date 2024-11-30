'use client';

import { useLaunchParams } from '@telegram-apps/sdk-react';
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
import tonSvg from "../_assets/spacecoin.svg";
import { DisplayData } from '@/components/DisplayData/DisplayData';
import { Page } from '@/components/Page';
import SlotMachine from '@/components/SlotMachine/SlotMachine'

export default function SlotMachinePage() {
  const lp = useLaunchParams();

  return (
    <Page>
      <List>
        <Section
          header={
            <Section.Header>
              Entropy Slot Machine
            </Section.Header>
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
