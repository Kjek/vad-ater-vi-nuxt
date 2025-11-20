export async function withRetry<T>(fn: () => Promise<T>, retries = 2) {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) throw err;
    return withRetry(fn, retries - 1);
  }
}
