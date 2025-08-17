import { clsx, type ClassValue } from 'clsx';

/**
 * Utility for combining class names
 * Now simplified without tailwind-merge since we're not using Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}