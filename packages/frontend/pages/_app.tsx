import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import { DAppProvider } from '@usedapp/core';
import { ModelTypes } from '@datamodels/identity-profile-basic';
import { Provider as SelfIDProvider } from '@self.id/framework';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import type { AppProps } from 'next/app';
import { useTypedSelector, store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { getResolver } from 'key-did-resolver';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { fromString } from 'uint8arrays';
import { getDappConfig } from '../conf/config';
import { ModelTypesToAliases } from '@glazed/types';
import models from '../ceramic/models.json';
import { useCallback, useEffect } from 'react';
import { setCeramic } from '../redux/app';

const CERAMIC_URL = process.env.CERAMIC_URL || 'https://ceramic-clay.3boxlabs.com';
const SEED = process.env.NEXT_PUBLIC_SEED;

const ConnectedDappProvider: React.FC = ({ children }) => {
  const d = useDispatch();
  const { currentNetworkChainId } = useTypedSelector((state) => state.app);

  const loadCeramicClient = useCallback(async () => {
    if (!SEED) return;
    // The seed must be provided as an environment variable
    const seed = fromString(SEED, 'base16');
    // Create and authenticate the DID
    const did = new DID({
      provider: new Ed25519Provider(seed),
      resolver: getResolver(),
    });
    await did.authenticate();

    // Connect to the Ceramic node
    const ceramic = new CeramicClient(CERAMIC_URL);
    ceramic.did = did;
    d(setCeramic(ceramic));
  }, [d]);

  useEffect(() => {
    loadCeramicClient();
  }, [loadCeramicClient]);

  return <DAppProvider config={getDappConfig(currentNetworkChainId)}>{children}</DAppProvider>;
};

export const CERAMIC_NETWORK = 'testnet-clay';

const model: ModelTypesToAliases<ModelTypes> = models;

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SelfIDProvider
      client={{
        connectNetwork: 'testnet-clay',
        ceramic: CERAMIC_NETWORK,
        model,
      }}
    >
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedDappProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ConnectedDappProvider>
        </PersistGate>
      </ReduxProvider>
    </SelfIDProvider>
  );
}

export default MyApp;
