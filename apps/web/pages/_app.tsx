import type { AppProps } from "next/app";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";

const DappProvider = dynamic(() => import("../components/DappProvider"), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DappProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DappProvider>
  );
}

export default MyApp;
