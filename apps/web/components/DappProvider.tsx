import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { AppProvider } from "kit";
import { WagmiConfig } from "wagmi";
import { chains, wagmiConfig } from "wagmi-config";

type DappProviderProps = {
  children: React.ReactNode;
};

const DappProvider = ({ children }: DappProviderProps) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <AppProvider>{children}</AppProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default DappProvider;
