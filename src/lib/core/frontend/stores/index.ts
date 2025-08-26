/**
 * Frontend Stores
 * Central export for all Zustand stores
 */

// Feature stores
export * from './games/useGamesStore';
export * from './theme/useThemeStore';
export * from './preferences/usePreferencesStore';
export * from './navigation/useNavigationStore';
export * from './toast/useToastStore';
export * from './modal/useModalStore';

// Root store (use sparingly)
export * from './useRootStore';

// Re-export commonly used selectors
export {
  // Games
  useGamesViewMode,
  useGamesFilters,
  useGamesPagination,
  useGamesUIState,
} from './games/useGamesStore';

// Utility exports
export {
  useIsAnyModalOpen,
  useCloseAllModals,
  useSyncStores,
} from './useRootStore';