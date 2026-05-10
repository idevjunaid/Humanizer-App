/**
 * Core type definitions for the app
 */

export type Language = "en" | "es" | "fr" | "de";
export type ToolType = "humanizer" | "summarizer";

export interface User {
  id?: string;
  isPremium: boolean;
  planUpgradedAt?: number;
  language: Language;
  notificationsEnabled: boolean;
  appVersion: string;
}

export interface ToolResult {
  id: string;
  type: ToolType;
  input: string;
  output: string;
  createdAt: number;
  isFavorite?: boolean;
}

export interface HistoryItem extends ToolResult {
  source?: "api" | "offline";
}

export interface ToolGenerateRequest {
  text: string;
}

export interface ToolGenerateResponse {
  output: string;
  processingTime?: number;
}

export interface UIState {
  splashShown: boolean;
  adShown: boolean;
  upgradeModalOpen: boolean;
  currentTool?: ToolType;
}

export interface ToolsState {
  currentInput: string;
  currentOutput: string;
  isLoading: boolean;
  error?: string;
  lastProcessedTool?: ToolType;
}
