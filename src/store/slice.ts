import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Asset {
  id: string;
  name: string;
  quantity: number;
  price: number;
  change24h: number; // Изменение за 24 часа в процентах
}

interface PortfolioState {
  assets: Asset[];
}

const loadState = (): PortfolioState => {
  const savedState = localStorage.getItem('portfolio');
  return savedState ? JSON.parse(savedState) : { assets: [] };
};

const initialState: PortfolioState = loadState();

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<Asset>) => {
      state.assets.push(action.payload);
      localStorage.setItem('portfolio', JSON.stringify(state));
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter((asset) => asset.id !== action.payload);
      localStorage.setItem('portfolio', JSON.stringify(state));
    },
    updateAssetPrice: (state, action: PayloadAction<{ id: string; price: number; change24h: number }>) => {
      const asset = state.assets.find((asset) => asset.id === action.payload.id);
      if (asset) {
        asset.price = action.payload.price;
        asset.change24h = action.payload.change24h;
      }
      localStorage.setItem('portfolio', JSON.stringify(state));
    },
  },
});

export const { addAsset, removeAsset, updateAssetPrice } = portfolioSlice.actions;

export default portfolioSlice.reducer;