import { ToolGenerateResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { hfInference } from "../huggingfaceClient";

/**
 * Mock summarizer API response generator
 * In production, replace this with real API call
 */
const mockSummarizeText = (text: string): string => {
  // Simple mock: take first 100 characters and add ellipsis
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  if (sentences.length === 0) {
    return text.substring(0, 100) + "...";
  }

  // Take first 1-2 sentences or first 150 characters, whichever is shorter
  let summary = sentences[0].trim();
  if (sentences.length > 1 && summary.length < 80) {
    summary += ". " + sentences[1].trim();
  }

  if (summary.length > 150) {
    summary = summary.substring(0, 150) + "...";
  } else {
    summary += ".";
  }

  return summary;
};

/**
 * Hook to summarize text
 */
export const useSummarizeQuery = (text: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ["summarize", text],
    queryFn: async (): Promise<ToolGenerateResponse> => {
      try {
        const output = await hfInference("facebook/bart-large-cnn", text, {
          max_length: 200,
        });
        return { output: String(output), processingTime: 1200 };
      } catch (e) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        return { output: mockSummarizeText(text), processingTime: 1200 };
      }
    },
    enabled,
    retry: 1,
  });
};

/**
 * Mock summarizer mutation (alternative to query)
 */
export const useSummarizeMutation = () => {
  return useMutation({
    mutationFn: async (text: string): Promise<ToolGenerateResponse> => {
      try {
        const output = await hfInference("facebook/bart-large-cnn", text, {
          max_length: 200,
        });
        return { output: String(output), processingTime: 1200 };
      } catch (e) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        return { output: mockSummarizeText(text), processingTime: 1200 };
      }
    },
  });
};
