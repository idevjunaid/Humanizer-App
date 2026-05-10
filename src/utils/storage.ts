import { HistoryItem, UIState, User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  USER: "humanizer_user",
  HISTORY: "humanizer_history",
  UI_STATE: "humanizer_ui_state",
};

// User Settings
export const saveUserSettings = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save user settings:", error);
  }
};

export const getUserSettings = async (): Promise<User | null> => {
  try {
    const data = await AsyncStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to load user settings:", error);
    return null;
  }
};

// History
export const saveHistory = async (items: HistoryItem[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.HISTORY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save history:", error);
  }
};

export const getHistory = async (): Promise<HistoryItem[]> => {
  try {
    const data = await AsyncStorage.getItem(KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load history:", error);
    return [];
  }
};

export const clearHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(KEYS.HISTORY);
  } catch (error) {
    console.error("Failed to clear history:", error);
  }
};

// UI State
export const saveUIState = async (state: UIState): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.UI_STATE, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save UI state:", error);
  }
};

export const getUIState = async (): Promise<UIState | null> => {
  try {
    const data = await AsyncStorage.getItem(KEYS.UI_STATE);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to load UI state:", error);
    return null;
  }
};

// Bulk clear all app data
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([KEYS.USER, KEYS.HISTORY, KEYS.UI_STATE]);
  } catch (error) {
    console.error("Failed to clear all data:", error);
  }
};
