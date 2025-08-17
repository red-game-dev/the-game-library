/**
 * Tailwind Helpers
 * Minimal utility for class composition
 */

/**
 * Combine class names with proper precedence
 * Simple alternative to clsx/cn without external dependencies
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};