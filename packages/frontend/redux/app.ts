import CeramicClient from '@ceramicnetwork/http-client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { allowedChains } from '../conf/config';

interface AppState {
  currentNetworkChainId: number;
  showTransactions: boolean;
  transactionProcessing: boolean;
  ceramic: CeramicClient | null;
  metadataRegistry: Record<number, string>;
}

const initialState: AppState = {
  currentNetworkChainId: allowedChains[0],
  showTransactions: false,
  transactionProcessing: false,
  ceramic: null,
  metadataRegistry: {},
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentNetworkChainId: (state, action: PayloadAction<number>) => {
      state.currentNetworkChainId = action.payload;
    },
    setShowTransactions: (state, action: PayloadAction<boolean>) => {
      state.showTransactions = action.payload;
    },
    setTransactionProcessing: (state, action: PayloadAction<boolean>) => {
      state.transactionProcessing = action.payload;
    },
    setCeramic: (state, action: PayloadAction<CeramicClient>) => {
      state.ceramic = action.payload;
    },
    setRegistry: (state, action: PayloadAction<Record<number, string>>) => {
      state.metadataRegistry = action.payload;
    },
  },
  extraReducers: () => {
    //
  },
});

export const {
  setCurrentNetworkChainId,
  setShowTransactions,
  setTransactionProcessing,
  setCeramic,
  setRegistry,
} = appSlice.actions;

export default appSlice.reducer;
