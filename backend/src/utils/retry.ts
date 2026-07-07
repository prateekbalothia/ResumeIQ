interface RetryOptions {
  retries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  factor?: number;
}

/**
 * Retries an async function with exponential backoff and jitter.
 * It retries on transient errors such as 429, 5xx status codes, network issues, or messages indicating temporary unavailability.
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    retries = 4,
    initialDelayMs = 1000,
    maxDelayMs = 15000,
    factor = 2,
  } = options;

  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      const error = err as any;
      
      if (attempt > retries) {
        throw error;
      }

      // Identify transient/retryable errors:
      // 1. HTTP Status Code (429 rate limit, 5xx server errors)
      const status = error?.status;
      
      // 2. Node.js system/network error codes
      const code = error?.code;
      
      // 3. Error messages (e.g. indicating high demand / temporary service issue)
      const message = error?.message || "";

      const isRetryableStatus = typeof status === "number" && (status === 429 || status >= 500);
      const isNetworkError = typeof code === "string" && [
        "ETIMEDOUT",
        "ECONNRESET",
        "ECONNREFUSED",
        "EAI_AGAIN",
        "ENOTFOUND",
      ].includes(code);
      
      const isHighDemandMessage = 
        message.includes("experiencing high demand") || 
        message.includes("UNAVAILABLE") ||
        message.includes("Spikes in demand are usually temporary");

      const shouldRetry = isRetryableStatus || isNetworkError || isHighDemandMessage;

      if (!shouldRetry) {
        // Not a transient error, propagate it immediately
        throw error;
      }

      // Calculate exponential backoff with a bit of random jitter (up to 200ms)
      const delay = Math.min(
        initialDelayMs * Math.pow(factor, attempt - 1) + Math.random() * 200,
        maxDelayMs
      );

      console.warn(
        `[Gemini Service] Attempt ${attempt}/${retries} failed: ${message || error}. Retrying in ${Math.round(delay)}ms...`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
