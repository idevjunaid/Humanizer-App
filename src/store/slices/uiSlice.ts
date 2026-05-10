import { ToolType, UIState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UIState = {
  splashShown: false,
  adShown: false,
  upgradeModalOpen: false,
  currentTool: undefined,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSplashShown: (state, action: PayloadAction<boolean>) => {
      state.splashShown = action.payload;
    },
    setAdShown: (state, action: PayloadAction<boolean>) => {
      state.adShown = action.payload;
    },
    setUpgradeModalOpen: (state, action: PayloadAction<boolean>) => {
      state.upgradeModalOpen = action.payload;
    },
    setCurrentTool: (state, action: PayloadAction<ToolType | undefined>) => {
      state.currentTool = action.payload;
    },
    resetUI: () => initialState,
  },
});

export const {
  setSplashShown,
  setAdShown,
  setUpgradeModalOpen,
  setCurrentTool,
  resetUI,
} = uiSlice.actions;

export default uiSlice.reducer;
