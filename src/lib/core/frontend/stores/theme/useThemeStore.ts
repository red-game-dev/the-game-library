/**
 * Theme Store
 * Manages application theme state
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { ThemeOption } from '@/lib/core/shared/types';

interface ThemeState {
  // Current theme
  theme: ThemeOption;
  systemTheme: 'dark' | 'light';
  
  // Computed
  resolvedTheme: () => 'dark' | 'light' | 'neon' | 'gold';
  
  // Actions
  setTheme: (theme: ThemeOption) => void;
  setSystemTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set, get) => ({
        theme: 'dark',
        systemTheme: 'dark',
        
        resolvedTheme: () => {
          const state = get();
          if (state.theme === 'system') {
            return state.systemTheme;
          }
          return state.theme as 'dark' | 'light' | 'neon' | 'gold';
        },
        
        setTheme: (theme) => {
          set({ theme }, false, 'setTheme');
          const resolved = theme === 'system' ? get().systemTheme : theme;
          document.documentElement.setAttribute('data-theme', resolved);
        },
        
        setSystemTheme: (systemTheme) => {
          set({ systemTheme }, false, 'setSystemTheme');
          if (get().theme === 'system') {
            document.documentElement.setAttribute('data-theme', systemTheme);
          }
        },
        
        toggleTheme: () => {
          const themes: ThemeOption[] = ['dark', 'light', 'neon', 'gold'];
          const currentResolved = get().resolvedTheme();
          const currentIndex = themes.indexOf(currentResolved);
          const nextIndex = (currentIndex + 1) % themes.length;
          const nextTheme = themes[nextIndex];
          get().setTheme(nextTheme);
        },
      }),
      {
        name: 'theme-store',
      }
    ),
    {
      name: 'ThemeStore',
    }
  )
);

// Initialize theme on mount
if (typeof window !== 'undefined') {
  const store = useThemeStore.getState();
  const resolved = store.resolvedTheme();
  document.documentElement.setAttribute('data-theme', resolved);
  
  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = (e: MediaQueryListEvent) => {
    store.setSystemTheme(e.matches ? 'dark' : 'light');
  };
  mediaQuery.addEventListener('change', handleChange);
  store.setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
}