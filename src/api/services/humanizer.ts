import { ToolGenerateResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { hfInference } from "../huggingfaceClient";

/**
 * Mock humanizer API response generator
 * In production, replace this with real API call
 */
const mockHumanizeText = (text: string): string => {
  // Simple mock: capitalize first letter of each sentence and add more punctuation
  return text
    .replace(/([.!?])\s*/g, "$1 ")
    .split(". ")
    .map((sentence) => {
      if (sentence.length === 0) return sentence;
      return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    })
    .join(". ")
    .replace(/([^.!?])\s*$/, "$1.");
};

/**
 * Hook to humanize text
 */
export const useHumanizeQuery = (text: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ["humanize", text],
    queryFn: async (): Promise<ToolGenerateResponse> => {
      // If HF key is present, call HF summarization/paraphrase model
      try {
        const output = await hfInference("Vamsi/T5_Paraphrase_Paws", text, {
          max_length: 256,
        });

        return { output: String(output), processingTime: 1000 };
      } catch (e) {
        // fallback to mock
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { output: mockHumanizeText(text), processingTime: 1000 };
      }
    },
    enabled,
    retry: 1,
  });
};

/**
 * Mock humanizer mutation (alternative to query)
 */
export const useHumanizeMutation = () => {
  return useMutation({
    mutationFn: async (text: string): Promise<ToolGenerateResponse> => {
      try {
        const output = await hfInference("Vamsi/T5_Paraphrase_Paws", text, {
          max_length: 256,
        });
        return { output: String(output), processingTime: 1000 };
      } catch (e) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { output: mockHumanizeText(text), processingTime: 1000 };
      }
    },
  });
};
