"use client";

import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { Button, Cell, Image, List, Section, Title } from "@telegram-apps/telegram-ui";
import tonSvg from "../_assets/darkspace.svg";
import { OKXUniversalConnectUI, THEME } from "@okxconnect/ui";

import "./styles.css";
const universalUi = OKXUniversalConnectUI.init({
  dappMetaData: {
    icon: "https://avatars.githubusercontent.com/u/172411359?s=200&v=4",
    name: "SpaceCoin"
  },
  actionsConfiguration: {
    returnStrategy:'tg://resolve',
    modals:'all',
    tmaReturnUrl:'back'
  },
  language: "en_US",
  // uiPreferences: {
  //   theme: THEME.DARK
  // },
}).then(v => v, (err) => {
  console.log(err)
  return null
});

export default function WalletPage() {
  const handleClick = async () => {
    const ui = await universalUi

    if (ui) {
      const session = await ui.openModal({
        namespaces: {
          eip155: {
                  // Please pass in as many chain ids as you need.
                  chains: ["eip155:8453"],
                  defaultChain: "8453"
              }
        },
        optionalNamespaces: {
          eip155: {
            chains: ["eip155:43114"]
          }
        }
      })
    }

  }
  
  return (
    <>
    <Button onClick={handleClick}>Login</Button>
    {/* <DynamicContextProvider
      settings={{
        environmentId: "edfd08d8-37c2-4f0e-a2a6-aae884df27aa",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <DynamicWidget
        buttonClassName="kokot-button"
        // buttonClassName="wallet-connect-page__button"
        buttonContainerClassName="pica-container"
        innerButtonComponent={
          <div className="flex justify-center flex-row">
            <Image
              src={tonSvg.src}
            />
            <div>Connect</div>
          </div>
        }
      />
    </DynamicContextProvider> */}
    </>);
}
