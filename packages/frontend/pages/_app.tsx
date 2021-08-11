import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import { DAppProvider } from '@usedapp/core';
import { Provider as ReduxProvider } from 'react-redux';
import type { AppProps } from 'next/app';
import store, { useTypedSelector } from '../redux/store';
import { getDappConfig } from '../conf/config';

const ConnectedDappProvider: React.FC = ({ children }) => {
  const { currentNetworkChainId } = useTypedSelector((state) => state.app);

  return <DAppProvider config={getDappConfig(currentNetworkChainId)}>{children}</DAppProvider>;
};

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <ConnectedDappProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConnectedDappProvider>
    </ReduxProvider>
  );
}

export default MyApp;
