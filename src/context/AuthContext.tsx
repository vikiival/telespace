"use client";

// Code was taken from, kudos for them
// https://github.com/onflow/Telegram-Integration-Quickstarts/tree/main/Course_3_Connect_OKX_Wallet_Flow_EVM
import React, { createContext, useContext, useEffect, useState } from "react";
import { OKXUniversalConnectUI, THEME } from "@okxconnect/ui";
import { Hex, fromString, toBigInt } from "ox/Hex";
import {
	toRpc,
	TransactionEnvelopeEip1559,
} from "ox/TransactionEnvelopeEip1559";
import { TOKEN_SYMBOL, TOKEN_ADDRESS } from "@/constants"


interface AuthContextType {
	connected: boolean;
	walletAddress: string | null;
	chainId: string | undefined;
	balance: BigInt;
	logIn: () => Promise<void>;
	logOut: () => Promise<void>;
	sign: (data: string) => Promise<string | undefined>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [client, setClient] = useState<OKXUniversalConnectUI | null>(null);
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [chainId, setChainId] = useState<string | undefined>(undefined);
	const [connected, setConnected] = useState(false);
	const [balance, setBalance] = useState(BigInt(0));

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
						chains: ["eip155:84532"],
						defaultChain: "84532",
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
			const chain = rawChainId?.split(":")[1] || undefined;

			setWalletAddress(address);
			setChainId(chain);
			setConnected(true);

			// await getBalance();
			getTokenBalance().then(console.log)
		} catch (error) {
			console.error("Failed to connect wallet:", error);
		}
	};

	const logOut = async () => {
		if (!client) return;
		try {
			await client.disconnect();
			setWalletAddress(null);
			setChainId(undefined);
			setConnected(false);
		} catch (error) {
			console.error("Failed to disconnect wallet:", error);
		}
	};

	const getTokenBalance = async () => {
		if (!client) return;
		const data = {
			"method": "eth_call",
			"params": [
				{
					"to": TOKEN_ADDRESS,
					"data": "0x70a08231" + walletAddress?.slice(2).padStart(64, "0"),
				},
				"latest",
			],
		};

		try {
			const balanceResult = await client.request<Hex>(data, chainId);
			const parsed = toBigInt(balanceResult);
			setBalance(parsed);
		} catch (error) {
			console.error("Failed to disconnect wallet:", error);
		}
	}

	const watchAsset = async () => {
		const data = {
			"method": "wallet_watchAsset",
			"params": [{
					"type": "ERC20",
					"options": {
							"address": TOKEN_ADDRESS,
							"symbol": TOKEN_SYMBOL,
							"image": "https://avatars.githubusercontent.com/u/172411359?s=200&v=4",
							"decimals": 18
					}
			}]
		}
	}

	// const getBalance = async () => {
	// 	if (!client) return;
	// 	const data = {
	// 		"method": "eth_getBalance",
	// 		"params": [walletAddress, "latest"],
	// 	};
	// 	try {
	// 		const getBalanceResult = await client.request<Hex>(data, chainId);
	// 		const parsed = toBigInt(getBalanceResult);
	// 		setBalance(parsed);
	// 	} catch (error) {
	// 		console.error("Failed to disconnect wallet:", error);
	// 	}
	// };

	// const sendTransaction = async (envelope: TransactionEnvelopeEip1559) => {
	// 	if (!client) return;
	// 	try {
	// 		const param = toRpc(envelope);
	// 		client.request({
	// 			method: "eth_sendTransaction",
	// 			params: [param],
	// 		});
	// 	} catch (error) {
	// 		console.error("Failed to sign with wallet:", error);
	// 	}
	// };

	const sign = async (data: string) => {
		if (!client) return undefined;
		try {
			const signature = await client.request<string>({
				method: "personal_sign",
				params: [fromString(data), walletAddress],
			}, `eip155:${chainId}`);
			return signature;
		} catch (error) {
			console.error("Failed to sign with wallet:", error);
			return '';
		}
	}

	return (
		<AuthContext.Provider
			value={{
				connected,
				walletAddress,
				chainId,
				balance,
				logIn,
				logOut,
				sign
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
