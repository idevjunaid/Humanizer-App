import { ToolsState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ToolsState = {
  currentInput: "",
  currentOutput: "",
  isLoading: false,
  error: undefined,
  lastProcessedTool: undefined,
};

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setCurrentInput: (state, action: PayloadAction<string>) => {
      state.currentInput = action.payload;
    },
    setCurrentOutput: (state, action: PayloadAction<string>) => {
      state.currentOutput = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
    setLastProcessedTool: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.lastProcessedTool = action.payload as any;
    },
    clearToolState: (state) => {
      state.currentInput = "";
      state.currentOutput = "";
      state.error = undefined;
      state.isLoading = false;
    },
    resetTools: () => initialState,
  },
});

export const {
  setCurrentInput,
  setCurrentOutput,
  setIsLoading,
  setError,
  setLastProcessedTool,
  clearToolState,
  resetTools,
} = toolsSlice.actions;

export default toolsSlice.reducer;
