import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { allowedChains } from '../conf/config';

interface AppState {
  currentNetworkChainId: number;
  showTransactions: boolean;
  transactionProcessing: boolean;
}

const initialState: AppState = {
  currentNetworkChainId: allowedChains[0],
  showTransactions: false,
  transactionProcessing: false,
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
  },
  extraReducers: () => {
    //
  },
});

export const { setCurrentNetworkChainId, setShowTransactions, setTransactionProcessing } =
  appSlice.actions;

export default appSlice.reducer;
