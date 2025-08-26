/**
 * Root Store
 * Combines all feature stores for centralized access when needed
 * Note: Prefer using individual stores directly for better performance
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useGamesStore } from './games/useGamesStore';
import { useThemeStore } from './theme/useThemeStore';
import { usePreferencesStore } from './preferences/usePreferencesStore';
import { useNavigationStore } from './navigation/useNavigationStore';

interface RootState {
  // Store references
  games: ReturnType<typeof useGamesStore.getState>;
  theme: ReturnType<typeof useThemeStore.getState>;
  preferences: ReturnType<typeof usePreferencesStore.getState>;
  navigation: ReturnType<typeof useNavigationStore.getState>;
  
  // Global actions that affect multiple stores
  resetAll: () => void;
  closeAllPanels: () => void;
  setGlobalLoading: (loading: boolean) => void;
  
  // Global state
  isGlobalLoading: boolean;
  globalError: Error | null;
  setGlobalError: (error: Error | null) => void;
}

/**
 * Root store for cases where you need access to multiple stores
 * IMPORTANT: Prefer using individual stores directly for better performance
 */
export const useRootStore = create<RootState>()(
  devtools(
    (set) => ({
      // Store references (read-only, use individual stores for updates)
      games: useGamesStore.getState(),
      theme: useThemeStore.getState(),
      preferences: usePreferencesStore.getState(),
      navigation: useNavigationStore.getState(),
      
      // Global state
      isGlobalLoading: false,
      globalError: null,
      
      // Global actions
      resetAll: () => {
        // Reset all individual stores
        useGamesStore.getState().resetFilters();
        useGamesStore.getState().resetPagination();
        usePreferencesStore.getState().resetPreferences();
        useNavigationStore.getState().closeAllModals();
        
        set({ globalError: null, isGlobalLoading: false }, false, 'resetAll');
      },
      
      closeAllPanels: () => {
        useGamesStore.getState().setFilterPanelOpen(false);
        useNavigationStore.getState().closeAllModals();
        useNavigationStore.getState().setMobileMenuOpen(false);
      },
      
      setGlobalLoading: (loading) => {
        set({ isGlobalLoading: loading }, false, 'setGlobalLoading');
      },
      
      setGlobalError: (error) => {
        set({ globalError: error }, false, 'setGlobalError');
      },
    }),
    {
      name: 'RootStore',
    }
  )
);

/**
 * Hook to sync store references
 * Call this in your app's root component
 */
export function useSyncStores() {
  // Subscribe to store changes and update root store references
  useGamesStore.subscribe((state) => {
    useRootStore.setState({ games: state });
  });
  
  useThemeStore.subscribe((state) => {
    useRootStore.setState({ theme: state });
  });
  
  usePreferencesStore.subscribe((state) => {
    useRootStore.setState({ preferences: state });
  });
  
  useNavigationStore.subscribe((state) => {
    useRootStore.setState({ navigation: state });
  });
}

/**
 * Utility hooks for common cross-store operations
 */
export const useIsAnyModalOpen = () => {
  const searchModal = useNavigationStore(state => state.isSearchModalOpen);
  const settingsModal = useNavigationStore(state => state.isSettingsModalOpen);
  const helpModal = useNavigationStore(state => state.isHelpModalOpen);
  const gameModal = useGamesStore(state => state.isGameModalOpen);
  
  return searchModal || settingsModal || helpModal || gameModal;
};

export const useCloseAllModals = () => {
  const closeNavModals = useNavigationStore(state => state.closeAllModals);
  const closeGameModal = useGamesStore(state => state.closeGameModal);
  
  return () => {
    closeNavModals();
    closeGameModal();
  };
};