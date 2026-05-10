import { HistoryItem } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HistoryState {
  items: HistoryItem[];
}

const initialState: HistoryState = {
  items: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<HistoryItem>) => {
      state.items.unshift(action.payload); // Add to beginning (newest first)
    },
    removeFromHistory: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.isFavorite = !item.isFavorite;
      }
    },
    setHistory: (state, action: PayloadAction<HistoryItem[]>) => {
      state.items = action.payload;
    },
    clearHistory: (state) => {
      state.items = [];
    },
    resetHistory: () => initialState,
  },
});

export const {
  addToHistory,
  removeFromHistory,
  toggleFavorite,
  setHistory,
  clearHistory,
  resetHistory,
} = historySlice.actions;

export default historySlice.reducer;
