/**
 * Color System for The Game Library
 * 
 * Design Decisions:
 * - Primary Purple: Represents Web3/crypto culture, innovation, and premium gaming
 * - Accent Lime: High-energy color for wins, success, and positive actions
 * - Dark-first: Gaming happens in low-light environments
 * - WCAG AAA: Ensuring 7:1 contrast ratios for accessibility
 */

// Raw color values - single source of truth
export const rawColors = {
  // Primary Purple Scale
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7', // Main
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },

  // Accent Lime Scale
  lime: {
    50: '#f7fee7',
    100: '#ecfccb',
    200: '#d9f99d',
    300: '#bef264',
    400: '#a3e635', // Main
    500: '#84cc16',
    600: '#65a30d',
    700: '#4d7c0f',
    800: '#3f6212',
    900: '#365314',
  },

  // Neutral Scale
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },

  // Semantic Colors
  red: '#ef4444',
  orange: '#f97316',
  amber: '#f59e0b',
  emerald: '#10b981',
  blue: '#3b82f6',
  violet: '#8b5cf6',
  cyan: '#06b6d4',
  
  // Base
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

// Semantic color mappings
export const semanticColors = {
  // Brand
  primary: rawColors.purple[500],
  primaryDark: rawColors.purple[600],
  primaryLight: rawColors.purple[400],
  
  accent: rawColors.lime[400],
  accentDark: rawColors.lime[500],
  accentLight: rawColors.lime[300],
  
  // Game Categories
  games: {
    slots: rawColors.orange,
    table: rawColors.emerald,
    live: rawColors.red,
    instant: rawColors.violet,
  },
  
  // Semantic
  success: rawColors.lime[400],
  error: rawColors.red,
  warning: rawColors.amber,
  info: rawColors.blue,
  
  // Backgrounds - Dark Theme
  dark: {
    bg: '#030712',
    bgSecondary: '#0f172a',
    bgTertiary: '#1e293b',
    bgElevated: '#334155',
  },
  
  // Backgrounds - Light Theme
  light: {
    bg: '#ffffff',
    bgSecondary: '#f8fafc',
    bgTertiary: '#f1f5f9',
    bgElevated: '#ffffff',
  },
} as const;

// Export all colors
export const colors = {
  raw: rawColors,
  semantic: semanticColors,
} as const;

export type Colors = typeof colors;
export default colors;