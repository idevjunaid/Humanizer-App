import { API_TIMEOUT, RETRY_CONFIG } from "./constants";

export interface ApiErrorResponse {
  message: string;
  status?: number;
  code?: string;
}

export class ApiError extends Error {
  status: number;
  code: string;

  constructor(
    message: string,
    status: number = 500,
    code: string = "UNKNOWN_ERROR",
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = "ApiError";
  }
}

/**
 * Generic fetch wrapper with error handling and retry logic
 */
async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  retries: number = RETRY_CONFIG.maxRetries,
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP ${response.status}`,
        response.status,
        errorData.code,
      );
    }

    return response.json() as Promise<T>;
  } catch (error) {
    clearTimeout(timeoutId);

    // Retry logic
    if (retries > 0 && error instanceof Error && error.name !== "AbortError") {
      const delay =
        RETRY_CONFIG.retryDelay *
        Math.pow(RETRY_CONFIG.backoffFactor, RETRY_CONFIG.maxRetries - retries);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry<T>(url, options, retries - 1);
    }

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError("Request timeout", 408, "TIMEOUT");
    }

    throw new ApiError(
      error instanceof Error ? error.message : "Unknown error",
      500,
    );
  }
}

/**
 * POST request helper
 */
export const apiPost = async <T>(
  url: string,
  data: any,
  options?: RequestInit,
): Promise<T> => {
  return fetchWithRetry<T>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * GET request helper
 */
export const apiGet = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  return fetchWithRetry<T>(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });
};

/**
 * PUT request helper
 */
export const apiPut = async <T>(
  url: string,
  data: any,
  options?: RequestInit,
): Promise<T> => {
  return fetchWithRetry<T>(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: JSON.stringify(data),
    ...options,
  });
};

/**
 * DELETE request helper
 */
export const apiDelete = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  return fetchWithRetry<T>(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });
};
