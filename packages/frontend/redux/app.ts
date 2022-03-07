import CeramicClient from '@ceramicnetwork/http-client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Feature, Point } from 'geojson';
import { allowedChains } from '../conf/config';

export type MapPointItemFeature = Feature<Point, { name: string; descritption: string }>;

export type Metadata = {
  name: string;
  description: string;
  image: string;
  geo_feature: MapPointItemFeature;
};

export type ERC721 = {
  tokenID: number;
  data: Metadata;
};

interface AppState {
  currentNetworkChainId: number;
  showTransactions: boolean;
  transactionProcessing: boolean;
  ceramic: CeramicClient | null;
  metadataRegistry: Record<number, string>;
  regions: Feature[];
  tokenBalance: ERC721[];
}

const initialState: AppState = {
  currentNetworkChainId: allowedChains[0],
  showTransactions: false,
  transactionProcessing: false,
  ceramic: null,
  metadataRegistry: {},
  regions: [],
  tokenBalance: [],
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
    setRegions: (state, action: PayloadAction<Feature[]>) => {
      state.regions = action.payload;
    },
    setTokenBalance: (state, action: PayloadAction<ERC721[]>) => {
      state.tokenBalance = action.payload;
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
  setRegions,
  setTokenBalance,
} = appSlice.actions;

export default appSlice.reducer;
