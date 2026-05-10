import { createInterFont } from "@tamagui/font-inter";
import { shorthands } from "@tamagui/shorthands";
import { createTamagui, createTokens } from "tamagui";

const inter = createInterFont();

const tokens = createTokens({
  size: {
    0: 0,
    1: 5,
    2: 10,
    3: 15,
    4: 20,
    5: 25,
    6: 30,
    7: 40,
    8: 50,
    9: 60,
    10: 70,
    true: 20,
    xs: 15,
    sm: 20,
    md: 30,
    lg: 40,
    xl: 50,
    xxl: 60,
  },
  space: {
    0: 0,
    1: 5,
    2: 10,
    3: 15,
    4: 20,
    5: 25,
    6: 30,
    7: 40,
    8: 50,
    9: 60,
    10: 70,
    true: 20,
    xs: 15,
    sm: 20,
    md: 30,
    lg: 40,
    xl: 50,
    xxl: 60,
  },
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 1000,
  },
  radius: {
    0: 0,
    1: 6,
    2: 10,
    3: 14,
    4: 16,
    5: 20,
    6: 28,
    true: 12,
    xs: 6,
    sm: 10,
    md: 16,
    lg: 16,
    xl: 20,
    xxl: 28,
    round: 10000,
  },
  shadow: {
    none: "0px 0px 0px rgba(0,0,0,0)",
    sm: "0px 1px 3px rgba(0,0,0,0.08)",
    md: "0px 4px 12px rgba(0,0,0,0.12)",
    lg: "0px 8px 24px rgba(0,0,0,0.16)",
  },
  colors: {
    // Light mode
    white: "#ffffff",
    black: "#000000",
    primary: "#007AFF",
    secondary: "#5856D6",
    success: "#34C759",
    danger: "#FF3B30",
    warning: "#FF9500",
    info: "#00C7FF",

    // Light grays
    gray50: "#F9F9F9",
    gray100: "#F2F2F7",
    gray200: "#E5E5EA",
    gray300: "#D1D1D6",
    gray400: "#C7C7CC",
    gray500: "#8E8E93",
    gray600: "#666666",
    gray700: "#333333",

    // Dark mode (will be overridden in dark mode)
    darkBg: "#000000",
    darkSurface: "#1C1C1E",
    darkText: "#FFFFFF",
  },
});

const config = createTamagui({
  tokens,
  themes: {
    light: {
      bg: "#FFFFFF",
      bgSecondary: "#F2F2F7",
      color: "#000000",
      colorSecondary: "#666666",
      colorTertiary: "#999999",
      colorQuaternary: "#CCCCCC",
      borderColor: "#E0E0E0",
      primary: "#007AFF",
      secondary: "#5856D6",
      success: "#34C759",
      danger: "#FF3B30",
      warning: "#FF9500",
      info: "#00C7FF",
      placeholderColor: "#999999",
      shadowColor: "#00000010",
    },
    dark: {
      bg: "#000000",
      bgSecondary: "#1C1C1E",
      color: "#FFFFFF",
      colorSecondary: "#A0A0A0",
      colorTertiary: "#808080",
      colorQuaternary: "#333333",
      borderColor: "#424245",
      primary: "#0A84FF",
      secondary: "#5E5CE6",
      success: "#30B0C0",
      danger: "#FF453A",
      warning: "#FF9500",
      info: "#32ADE6",
      placeholderColor: "#666666",
      shadowColor: "#FFFFFF10",
    },
  },
  shorthands,
  fonts: {
    body: inter,
    heading: inter,
  },
});

export type AppConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
