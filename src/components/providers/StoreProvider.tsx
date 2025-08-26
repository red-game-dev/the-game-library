/**
 * Store Provider
 * Initializes and syncs Zustand stores
 */

'use client';

import { useEffect } from 'react';
import { useSyncStores } from '@/lib/core/frontend/stores/useRootStore';
import { usePreferencesStore } from '@/lib/core/frontend/stores/preferences/usePreferencesStore';

/**
 * Store Provider component
 * Handles store initialization and syncing
 */
export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Sync all stores with root store
  useSyncStores();
  
  const preferences = usePreferencesStore();

  useEffect(() => {
    // Apply accessibility preferences
    if (preferences.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    }
    if (preferences.highContrast) {
      document.documentElement.classList.add('high-contrast');
    }
    if (preferences.largeText) {
      document.documentElement.classList.add('large-text');
    }

    // Check system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches && !preferences.reducedMotion) {
      preferences.setPreference('reducedMotion', true);
    }

    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
    if (prefersHighContrast.matches && !preferences.highContrast) {
      preferences.setPreference('highContrast', true);
    }
  }, [preferences]);

  return <>{children}</>;
}