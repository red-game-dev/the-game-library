/**
 * @fileoverview Utility functions for the application
 * @module lib/utils
 */

/**
 * Formats a number to a specified number of decimal places
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string or original value if not a number
 */
export function formatNumber(value: any, decimals: number = 2): string {
  if (typeof value === 'number') {
    return value.toFixed(decimals);
  }
  return String(value);
}

/**
 * Formats a percentage value
 * @param value - The percentage value
 * @param decimals - Number of decimal places (default: 2)
 * @param includeSymbol - Whether to include % symbol (default: true)
 * @returns Formatted percentage string
 */
export function formatPercentage(value: any, decimals: number = 2, includeSymbol: boolean = true): string {
  const formatted = formatNumber(value, decimals);
  return includeSymbol ? `${formatted}%` : formatted;
}

/**
 * Formats a large number with commas and optional abbreviation
 * @param value - The number to format
 * @param abbreviate - Whether to abbreviate large numbers (e.g., 1.5K, 2.3M)
 * @returns Formatted string
 */
export function formatLargeNumber(value: number, abbreviate: boolean = false): string {
  if (!abbreviate) {
    return value.toLocaleString();
  }

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

/**
 * Formats currency values
 * @param value - The number to format
 * @param currency - Currency code (default: USD)
 * @param locale - Locale for formatting (default: en-US)
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, currency: string = 'USD', locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

/**
 * Truncates text to a specified length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Debounce function for search and other inputs
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
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
 * Generates a URL-friendly slug from text
 * @param text - Text to convert to slug
 * @returns URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Class names utility (similar to clsx)
 * @param classes - Class names to combine
 * @returns Combined class string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}