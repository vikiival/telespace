"use client";

import { useAuth } from '@/context/AuthContext'
import { OKXUniversalConnectUI } from "@okxconnect/ui"
import {
  Button,
  Title
} from "@telegram-apps/telegram-ui"

import "./styles.css"
const universalUi = OKXUniversalConnectUI.init({
  dappMetaData: {
    icon: "https://avatars.githubusercontent.com/u/172411359?s=200&v=4",
    name: "SpaceCoin",
  },
  actionsConfiguration: {
    returnStrategy: "tg://resolve",
    modals: "all",
    tmaReturnUrl: "back",
  },
  language: "en_US",
  // restoreConnection: true
});

export default function ConnectButton() {
  const { connected, walletAddress, chainId, logIn, logOut } = useAuth();

  if (connected) {
    return (
      <>
        <Title>{walletAddress}</Title>
        <div>{chainId}</div>
        <Button onClick={logOut}>BYEEEE</Button>
      </>
    )
  }

  return (
<Button onClick={logIn}>Login</Button>
  )
}

// export default function WalletPage() {
//   return (
//     <AuthContextProvider>
//       <ConnectButton />
//     </AuthContextProvider>

//   );
// }

      

  /* <DynamicContextProvider
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
</DynamicContextProvider> */

