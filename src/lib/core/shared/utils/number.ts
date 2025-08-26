/**
 * Number Utility Functions
 * Common number formatting and manipulation utilities
 */

/**
 * Formats a number to a specified number of decimal places
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string or original value if not a number
 */
export function formatNumber(value: string | number | null | undefined, decimals: number = 2): string {
  if (typeof value === 'number') {
    return value.toFixed(decimals);
  }
  return String(value);
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
 * Clamp a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Round to nearest multiple
 */
export function roundToNearest(value: number, multiple: number): number {
  return Math.round(value / multiple) * multiple;
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Random number between min and max (inclusive)
 */
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Check if value is within range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}