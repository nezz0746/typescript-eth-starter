import React, { createContext, useContext } from "react";
import { useNetwork } from "wagmi";
import { supportedChains } from "../connectors/conf";
import { NetworkProperties, networkProperties } from "../theme";

export type ThemeState = {
  style: Record<string, string>;
  networkProps: Record<number, NetworkProperties>;
};

const themeContext = createContext<ThemeState>({
  style: {},
  networkProps: networkProperties,
});

export const useTheme = () => useContext(themeContext);

const useProviderTheme = (): ThemeState => {
  const [{ data: networkData }] = useNetwork();

  return {
    style: (() => {
      if (
        networkData.chain?.id &&
        supportedChains
          .map((c) => c.chain)
          .map((c) => c.id)
          .includes(networkData.chain?.id)
      ) {
        return networkProperties[networkData.chain?.id].style;
      } else {
        return networkProperties[1].style;
      }
    })(),
    networkProps: networkProperties,
  };
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useProviderTheme();
  return (
    <themeContext.Provider value={theme}>{children}</themeContext.Provider>
  );
};
