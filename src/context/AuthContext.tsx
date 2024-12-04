"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { OKXUniversalConnectUI, THEME } from "@okxconnect/ui";

interface AuthContextType {
	connected: boolean;
	walletAddress: string | null;
	chainId: string | null;
	logIn: () => Promise<void>;
	logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [client, setClient] = useState<OKXUniversalConnectUI | null>(null);
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [chainId, setChainId] = useState<string | null>(null);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		const initClient = async () => {
			try {
				const uiClient = await OKXUniversalConnectUI.init({
					dappMetaData: {
						icon: "https://avatars.githubusercontent.com/u/172411359?s=200&v=4",
						name: "SpaceCoin",
					},
					actionsConfiguration: {
						returnStrategy: "none", // Or 'tg://resolve'
						modals: "all",
						tmaReturnUrl: "back",
					},
					language: "en_US",
					// uiPreferences: {
					// 	theme: THEME.LIGHT,
					// },
				});
				setClient(uiClient);
			} catch (error) {
				console.error("Failed to initialize OKX UI:", error);
			}
		};
		initClient();
	}, []);

	// https://github.com/reown-com/blockchain-api/blob/master/SUPPORTED_CHAINS.md
	// eip155:84532 Base Sepolia
	const logIn = async () => {
		if (!client) return;
		try {
			const session = await client.openModal({
				namespaces: {
					eip155: {
						chains: ["eip155:8453"],
						defaultChain: "8453",
					},
				},
			});

			// Ensure session is defined
			if (!session || !session.namespaces.eip155) {
				console.error("Session is undefined or invalid");
				return;
			}

			const address = session.namespaces.eip155.accounts[0]?.split(":")[2];

			// Remove the "eip155:" prefix from the chainId
			const rawChainId = session.namespaces.eip155.chains[0];
			const chain = rawChainId?.split(":")[1] || null;

			setWalletAddress(address);
			setChainId(chain);
			setConnected(true);
		} catch (error) {
			console.error("Failed to connect wallet:", error);
		}
	};

	const logOut = async () => {
		if (!client) return;
		try {
			await client.disconnect();
			setWalletAddress(null);
			setChainId(null);
			setConnected(false);
		} catch (error) {
			console.error("Failed to disconnect wallet:", error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				connected,
				walletAddress,
				chainId,
				logIn,
				logOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
