"use client";

import { AuthContextProvider, useAuth } from "@/context/AuthContext";
import { Cell, Image, List, Section, Title } from "@telegram-apps/telegram-ui";
import spacecoin from "../../app/_assets/spacecoin.svg";

export default function WalletConnection() {
  const { connected, walletAddress, chainId, logIn, logOut } = useAuth();

  if (connected) {
    return (
      <Cell
        before={
          <Image
            src={spacecoin.src}
            style={{ backgroundColor: "#007AFF" }}
          />
        }
        subtitle={walletAddress}
      >
        Connected on {chainId}
      </Cell>
    );
  }

  return (
    <Cell
      onClick={logIn}
      before={
        <Image
          src={spacecoin.src}
          style={{ backgroundColor: "#A9A9A9" }}
        />
      }
      subtitle="Connect your ETH wallet"
    >
      SPC Connect
    </Cell>
  );
}

export function WalletWithContext() {
  return (
    <AuthContextProvider>
      <WalletConnection />
    </AuthContextProvider>
  );
}
