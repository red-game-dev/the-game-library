/**
 * @fileoverview Number and text formatting utilities
 * @module lib/core/shared/utils/format
 */

/**
 * Format a large number into a compact representation (K, M, B, T)
 * @param num - The number to format
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted string with suffix (e.g., "1.2K", "3.4M")
 * @example
 * formatCompactNumber(1234) // "1.2K"
 * formatCompactNumber(1234567) // "1.2M"
 * formatCompactNumber(1234567890) // "1.2B"
 */
export function formatCompactNumber(num: number, decimals: number = 1): string {
  if (num < 1000) {
    return num.toString();
  }

  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const magnitude = Math.floor(Math.log10(Math.abs(num)) / 3);
  const scaledNum = num / Math.pow(1000, magnitude);
  
  // For very large numbers, cap at T (trillions)
  const suffixIndex = Math.min(magnitude, suffixes.length - 1);
  
  // Format with specified decimals, but remove trailing zeros
  const formatted = scaledNum.toFixed(decimals);
  const trimmed = parseFloat(formatted).toString();
  
  return `${trimmed}${suffixes[suffixIndex]}`;
}

/**
 * Format a number with thousands separators
 * @param num - The number to format
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted string with separators (e.g., "1,234,567")
 */
export function formatWithSeparators(num: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Format a percentage value
 * @param value - The value to format (0-100 or 0-1 based on asDecimal)
 * @param decimals - Number of decimal places (default: 1)
 * @param asDecimal - Whether the input is a decimal (0-1) or percentage (0-100)
 * @returns Formatted percentage string (e.g., "85.5%")
 */
export function formatPercentage(value: number, decimals: number = 1, asDecimal: boolean = false): string {
  const percentage = asDecimal ? value * 100 : value;
  return `${percentage.toFixed(decimals)}%`;
}

/**
 * Format currency values
 * @param amount - The amount to format
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Format play count for display
 * @param count - The play count
 * @returns Formatted string (e.g., "1.2K plays", "3.4M plays")
 */
export function formatPlayCount(count: number): string {
  const formatted = formatCompactNumber(count);
  const plural = count === 1 ? 'play' : 'plays';
  return `${formatted} ${plural}`;
}

/**
 * Format date relative to now
 * @param date - The date to format
 * @returns Relative time string (e.g., "2 hours ago", "3 days ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diff = now - then;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  if (weeks < 4) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  if (months < 12) return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}

/**
 * Truncate text with ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
}