export async function withRetry(fn, retries = 2) {
  let lastError;

  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      console.warn(`Retry ${i + 1} failed`);
    }
  }

  throw lastError;
}
