"use client";

import { initData, useSignal } from "@telegram-apps/sdk-react";
import { Cell, Image, List, Section, Title } from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { Link } from "@/components/Link/Link";
import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import { Page } from "@/components/Page";

import { useMemo } from "react";
import tonSvg from "./_assets/spacecoin.svg";
import { WalletConnection } from "@/components/Wallet/WalletConnection"
import { TOKEN_SYMBOL } from "@/constants"
import BluePaperLink from "@/components/common/BluePaperLink"

export default function Home() {
  const t = useTranslations("i18n");
  const initDataState = useSignal(initData.state);

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
              Your current balance
              <div className="text-2xl">0 {TOKEN_SYMBOL}</div>
            </Section.Footer>
          }
        >
          {/* <Link href="/wallet">
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
          </Link> */}
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
          <Link href="/quiz-easy">
            <Cell after="50 SPCQ" subtitle="Learn them more about SpaceCoin.xyz">
              QUIZ (Easy)
            </Cell>
          </Link>
          <Link href="/launch-params">
            <Cell disabled after="50 SPCQ" subtitle="Do you know more than founder?">
              QUIZ (Difficult)
            </Cell>
          </Link>
          <Link href="/theme-params">
            <Cell after="5 SPCQ" subtitle="Have you heard about entropy?">
              Theme
            </Cell>
          </Link>
          <Link href="/machine">
            <Cell after="5 SPCQ" subtitle="Have you heard about entropy?">
              Slot Machine
            </Cell>
          </Link>
          <Link href="/congrats">
            <Cell after="5 SPCQ" subtitle="Remove before prod">
              Congrats
            </Cell>
          </Link>
        </Section>
        <Section header={t("header")} footer={t("footer")}>
          <LocaleSwitcher />
        </Section>
      </List>
    </Page>
  );
}
