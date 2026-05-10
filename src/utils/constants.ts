// API Configuration
export const API_BASE_URL = "https://api.example.com"; // Placeholder, will be replaced

export const API_ENDPOINTS = {
  humanizer: {
    generate: `${API_BASE_URL}/tools/humanizer/generate`,
  },
  summarizer: {
    generate: `${API_BASE_URL}/tools/summarizer/generate`,
  },
};

// App Constants
export const APP_VERSION = "1.0.0";
export const MAX_TEXT_LENGTH = 5000;
export const MIN_TEXT_LENGTH = 10;

// Timeouts (in ms)
export const API_TIMEOUT = 30000;
export const SPLASH_DURATION = 2500;
export const AD_AUTO_CLOSE_DURATION = 5000;

// Cache Configuration
export const CACHE_TIMES = {
  API_RESULTS: 5 * 60 * 1000, // 5 minutes
  HISTORY: 10 * 60 * 1000, // 10 minutes
};

// Retry Configuration
export const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // ms
  backoffFactor: 2,
};

// UI Constants
export const COLORS = {
  primary: "#007AFF",
  secondary: "#5856D6",
  success: "#34C759",
  danger: "#FF3B30",
  warning: "#FF9500",
  background: "#FFFFFF",
  surface: "#F2F2F7",
  text: "#000000",
  textSecondary: "#666666",
  border: "#E0E0E0",
};

export const DARK_COLORS = {
  primary: "#0A84FF",
  secondary: "#5E5CE6",
  success: "#30B0C0",
  danger: "#FF453A",
  warning: "#FF9500",
  background: "#000000",
  surface: "#1C1C1E",
  text: "#FFFFFF",
  textSecondary: "#A0A0A0",
  border: "#424245",
};

// Text Limits
export const TEXT_LIMITS = {
  maxInput: 5000,
  minInput: 10,
  maxOutput: 10000,
};
