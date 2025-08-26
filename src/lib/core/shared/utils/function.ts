/**
 * Function Utility Functions
 * Common function manipulation utilities
 */

/**
 * Debounce function for non-React contexts
 * @deprecated For React components, use useDebounce hook from @/lib/core/frontend/hooks
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: never[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit execution frequency
 * @param func - Function to throttle
 * @param limit - Time limit between executions in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: never[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastResult: ReturnType<T> | undefined;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      lastResult = func(...args) as ReturnType<T>;
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
    return lastResult as ReturnType<T> | undefined;
  };
}

/**
 * Memoize function results
 * @param func - Function to memoize
 * @returns Memoized function
 */
export function memoize<T extends (...args: never[]) => unknown>(
  func: T
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = func(...args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Execute function once
 * @param func - Function to execute once
 * @returns Function that executes only once
 */
export function once<T extends (...args: never[]) => unknown>(
  func: T
): T {
  let executed = false;
  let result: ReturnType<T>;
  
  return ((...args: Parameters<T>) => {
    if (!executed) {
      result = func(...args) as ReturnType<T>;
      executed = true;
    }
    return result;
  }) as T;
}

/**
 * Delay execution
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry function with exponential backoff
 * @param func - Function to retry
 * @param maxAttempts - Maximum number of attempts
 * @param delayMs - Initial delay in milliseconds
 * @returns Result of successful execution
 */
export async function retry<T>(
  func: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await func();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts) {
        await delay(delayMs * Math.pow(2, attempt - 1)); // Exponential backoff
      }
    }
  }
  
  throw lastError!;
}

/**
 * Compose multiple functions
 * @param fns - Functions to compose
 * @returns Composed function
 */
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduceRight((acc, fn) => fn(acc), arg);
}

/**
 * Pipe multiple functions
 * @param fns - Functions to pipe
 * @returns Piped function
 */
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduce((acc, fn) => fn(acc), arg);
}