/**
 * The Game Library Design System
 * 
 * Central export for all design tokens.
 * This is the single source of truth for the entire design system.
 */

// Core exports
import { colors } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";
import { effects } from "./effects";
export { colors, type Colors } from './colors';
export { typography, type Typography } from "./typography";
export { spacing, type Spacing } from "./spacing";
export { effects, type Effects } from "./effects";

// Re-export commonly used values for convenience
export { rawColors, semanticColors } from './colors';
export { borderRadius, shadows, transitions, blur } from './effects';

// Helper exports
export * from './types';

// Tailwind helpers
export { cn } from './tailwind-helpers';

// Breakpoints
export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Z-index scale
export const zIndex = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  dropdown: '1000',
  sticky: '1020',
  fixed: '1030',
  modalBackdrop: '1040',
  modal: '1050',
  popover: '1060',
  tooltip: '1070',
} as const;

// Combine all tokens
export const designSystem = {
  colors,
  typography,
  spacing,
  effects,
  breakpoints,
  zIndex,
} as const;

export type DesignSystem = typeof designSystem;
export default designSystem;