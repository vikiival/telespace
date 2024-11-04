'use client';

import { useLaunchParams } from '@telegram-apps/sdk-react';
import { List, Section, Title } from '@telegram-apps/telegram-ui';

import { DisplayData } from '@/components/DisplayData/DisplayData';
import { Page } from '@/components/Page';

export default function LaunchParamsPage() {
  const lp = useLaunchParams();

  return (
    <Page>
      <List>
        <Section
          header={
            <Section.Header large><Title>Congrats</Title></Section.Header>
          }
          footer={
            <Section.Footer centered>
              Your current balance
              <Title>0 SPC</Title>
            </Section.Footer>
          }
        />
        {/* <DisplayData
          rows={[
            { title: 'tgWebAppPlatform', value: lp.platform },
            { title: 'tgWebAppShowSettings', value: lp.showSettings },
            { title: 'tgWebAppVersion', value: lp.version },
            { title: 'tgWebAppBotInline', value: lp.botInline },
            { title: 'tgWebAppStartParam', value: lp.startParam },
            { title: 'tgWebAppData', type: 'link', value: '/init-data' },
            {
              title: 'tgWebAppThemeParams',
              type: 'link',
              value: '/theme-params',
            },
          ]}
        /> */}
      </List>
    </Page>
  );
};
