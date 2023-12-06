"use client";

import { ConnectKitProvider } from "connectkit";
import * as React from "react";
import { WagmiConfig, mainnet } from "wagmi";

import { getDefaultConfig } from "connectkit";
import { createConfig } from "wagmi";

const walletConnectProjectId = "06d413030dcf1182d8210eb2ce2f5ab8";

const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: "Lynx Staking App",
    walletConnectProjectId,
    chains: [mainnet],
  })
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  );
}
export { ConnectKitButton } from "connectkit";
