import { CACHE_TIMES, RETRY_CONFIG } from "@/utils/constants";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_TIMES.API_RESULTS,
      gcTime: CACHE_TIMES.API_RESULTS * 2, // cache time (renamed from cacheTime in v5)
      retry: RETRY_CONFIG.maxRetries,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: RETRY_CONFIG.maxRetries,
    },
  },
});
