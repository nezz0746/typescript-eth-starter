import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import { DAppProvider } from '@usedapp/core';
import { Provider as ReduxProvider } from 'react-redux';
import type { AppProps } from 'next/app';
import { useTypedSelector, store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { getDappConfig } from '../conf/config';
import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/958/mynft-subgraph/0.0.2',
  cache: new InMemoryCache({}),
});

const ConnectedDappProvider: React.FC = ({ children }) => {
  const { currentNetworkChainId } = useTypedSelector((state) => state.app);

  return <DAppProvider config={getDappConfig(currentNetworkChainId)}>{children}</DAppProvider>;
};

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedDappProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ConnectedDappProvider>
        </PersistGate>
      </ApolloProvider>
    </ReduxProvider>
  );
}

export default MyApp;
