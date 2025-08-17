import type { Config } from 'tailwindcss';
import { 
  rawColors, 
  semanticColors, 
  typography, 
  spacing, 
  borderRadius, 
  shadows, 
  transitions,
  breakpoints,
  zIndex 
} from './src/lib/design-system';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary and accent scales
        primary: rawColors.purple,
        accent: rawColors.lime,
        neutral: rawColors.neutral,
        
        // Single semantic colors
        success: semanticColors.success,
        error: semanticColors.error,
        warning: semanticColors.warning,
        info: semanticColors.info,
        
        // Game category colors
        'game-slots': semanticColors.games.slots,
        'game-table': semanticColors.games.table,
        'game-live': semanticColors.games.live,
        'game-instant': semanticColors.games.instant,
        
        // CSS variable based colors for theming
        background: 'var(--background)',
        surface: 'var(--surface)',
        'surface-elevated': 'var(--surface-elevated)',
        border: 'var(--border)',
        'border-hover': 'var(--border-hover)',
        foreground: 'var(--foreground)',
        'foreground-secondary': 'var(--foreground-secondary)',
        'foreground-tertiary': 'var(--foreground-tertiary)',
      },
      
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      letterSpacing: typography.letterSpacing,
      spacing,
      borderRadius,
      
      boxShadow: shadows,
      
      transitionDuration: transitions.duration,
      transitionTimingFunction: transitions.timing,
      
      // Animations are defined as keyframes in globals.css
      // We just reference them here for Tailwind classes
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin': 'spin 1s linear infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bounce': 'bounce 1s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'win': 'win-celebration 0.5s ease',
        'live-pulse': 'live-pulse 2s ease-in-out infinite',
        'holographic': 'holographic-shift 4s ease infinite',
      },
      
      screens: breakpoints,
      zIndex,
      
      // Gradients are defined in CSS utilities
      // We could import from gradients object but keeping Tailwind config simple
      
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config;