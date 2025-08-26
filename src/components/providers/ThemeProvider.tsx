/**
 * Theme Provider
 * Manages theme state and applies theme to document
 */

'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/lib/core/frontend/stores/theme/useThemeStore';

/**
 * Theme Provider component
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, systemTheme, setSystemTheme, resolvedTheme } = useThemeStore();

  useEffect(() => {
    // Apply initial theme
    const resolved = resolvedTheme();
    document.documentElement.setAttribute('data-theme', resolved);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    
    // Set initial system theme
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [setSystemTheme, resolvedTheme]);

  useEffect(() => {
    // Update theme attribute when theme changes
    const resolved = resolvedTheme();
    document.documentElement.setAttribute('data-theme', resolved);
  }, [theme, systemTheme, resolvedTheme]);

  return <>{children}</>;
}