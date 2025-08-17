/**
 * Visual Effects System
 * 
 * Design Decisions:
 * - Subtle shadows for depth without heaviness
 * - Gaming-specific glows for excitement
 * - Smooth transitions for premium feel
 * - Performance-optimized animations
 */


// Border Radius
export const borderRadius = {
  none: '0px',
  sm: '0.125rem', // 2px - Subtle rounding
  DEFAULT: '0.25rem', // 4px - Default for inputs
  md: '0.375rem', // 6px - Cards inner elements
  lg: '0.5rem', // 8px - Cards, containers
  xl: '0.75rem', // 12px - Modals
  '2xl': '1rem', // 16px - Large cards
  '3xl': '1.5rem', // 24px - Hero sections
  full: '9999px', // Pills, avatars
} as const;

// Shadows
export const shadows = {
  // Standard elevation shadows
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',

  // Glass effect shadow
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
} as const;

// Transitions
export const transitions = {
  // Durations
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },

  // Timing Functions
  timing: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// Blur values
export const blur = {
  none: '0',
  sm: '4px',
  DEFAULT: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
  '3xl': '64px',
} as const;

// Export all effects
export const effects = {
  borderRadius,
  shadows,
  transitions,
  blur,
} as const;

export type Effects = typeof effects;
export default effects;