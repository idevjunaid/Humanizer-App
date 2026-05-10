import { Language, User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  isPremium: false,
  language: "en",
  notificationsEnabled: true,
  appVersion: "1.0.0",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      Object.assign(state, action.payload);
    },
    setPremium: (state, action: PayloadAction<boolean>) => {
      state.isPremium = action.payload;
      if (action.payload) {
        state.planUpgradedAt = Date.now();
      }
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    setNotifications: (state, action: PayloadAction<boolean>) => {
      state.notificationsEnabled = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const { setUser, setPremium, setLanguage, setNotifications, resetUser } =
  userSlice.actions;

export default userSlice.reducer;
