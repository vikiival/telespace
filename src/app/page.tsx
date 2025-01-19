"use client";

import { initData, useSignal } from "@telegram-apps/sdk-react";
import { Cell, Image, List, Section, Title } from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { Link } from "@/components/Link/Link";
import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import { Page } from "@/components/Page";

import { useEffect, useMemo } from "react";
import tonSvg from "./_assets/spacecoin.svg";
import { WalletConnection } from "@/components/Wallet/WalletConnection"
import { TOKEN_SYMBOL } from "@/constants"
import BluePaperLink from "@/components/common/BluePaperLink"
import { useQuizStore } from "@/lib/store/quiz-store"
import { useAuth } from "@/context/AuthContext"

export default function Home() {
  const t = useTranslations("i18n");
  const initDataState = useSignal(initData.state);
  const { isComplete: isEasyQuizDone } = useQuizStore();
  const { connected, balance, getBalance } = useAuth();
  

  const userName = useMemo<string | undefined>(() => {
    return initDataState && initDataState.user
      ? initDataState.user.username
      : undefined;
  }, [initDataState]);

  return (
    <Page back={false}>
      <List>
        <Section
          header={
            <Section.Header large>Welcome, voyager {userName}</Section.Header>
          }
          footer={
            <Section.Footer centered>
              {connected ? "Your poins" : "Connect your wallet to see your points"}
              <div className="text-2xl">{connected ? balance : '-'} {TOKEN_SYMBOL}</div>
            </Section.Footer>
          }
        >
          <WalletConnection />
        </Section>
        <Section
          header="Quests"
          footer={
            <Section.Footer>
              <BluePaperLink />
            </Section.Footer>
          }
        >
          <Link href={"/quiz-easy"}>
            <Cell disabled={isEasyQuizDone} className="m-4"
             after={isEasyQuizDone ? "COMPLETED" : "50 SPCQ"} subtitle="Learn them more about SpaceCoin.xyz">
             {isEasyQuizDone && "✅" } QUIZ (Easy) 
            </Cell>
          </Link>
          <Link href="/">
            <Cell className="m-4" disabled after="50 SPCQ" subtitle="Do you know more than founder?">
             [Coming soon] QUIZ (Difficult)
            </Cell>
          </Link>
          <Link href="/machine">
            <Cell className="m-4"  after="5 SPCQ" subtitle="Have you heard about entropy?">
              Slot Machine
            </Cell>
          </Link>
        </Section>
        <Section header={t("header")} footer={t("footer")}>
          <Link href="https://x.com/Spacecoin_xyz">
            <Cell
              before={
                <Image
                  src={tonSvg.src}
                  style={{ backgroundColor: "#000" }}
                />
              }
            >
              Follow us on X
            </Cell>
          </Link>
          {/* <LocaleSwitcher /> */}
        </Section>
      </List>
    </Page>
  );
}
