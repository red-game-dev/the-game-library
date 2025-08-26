/**
 * Navigation Store
 * Manages navigation UI state (sidebar, menus, etc.)
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface NavigationState {
  // Sidebar state
  isSidebarOpen: boolean;
  isSidebarCollapsed: boolean;
  isMobileMenuOpen: boolean;
  
  // Active navigation
  activeRoute: string;
  previousRoute: string | null;
  breadcrumbs: Array<{ label: string; path: string }>;
  
  // Modals and overlays
  isSearchModalOpen: boolean;
  isSettingsModalOpen: boolean;
  isHelpModalOpen: boolean;
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapse: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  
  // Navigation actions
  setActiveRoute: (route: string) => void;
  navigateTo: (route: string, label?: string) => void;
  goBack: () => void;
  setBreadcrumbs: (breadcrumbs: Array<{ label: string; path: string }>) => void;
  addBreadcrumb: (label: string, path: string) => void;
  
  // Modal actions
  openSearchModal: () => void;
  closeSearchModal: () => void;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;
  openHelpModal: () => void;
  closeHelpModal: () => void;
  closeAllModals: () => void;
}

export const useNavigationStore = create<NavigationState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        isSidebarOpen: true,
        isSidebarCollapsed: false,
        isMobileMenuOpen: false,
        activeRoute: '/',
        previousRoute: null,
        breadcrumbs: [],
        isSearchModalOpen: false,
        isSettingsModalOpen: false,
        isHelpModalOpen: false,
        
        // Sidebar actions
        toggleSidebar: () => {
          set(state => ({ isSidebarOpen: !state.isSidebarOpen }), false, 'toggleSidebar');
        },
        
        setSidebarOpen: (open) => {
          set({ isSidebarOpen: open }, false, 'setSidebarOpen');
        },
        
        toggleSidebarCollapse: () => {
          set(state => ({ isSidebarCollapsed: !state.isSidebarCollapsed }), false, 'toggleSidebarCollapse');
        },
        
        setSidebarCollapsed: (collapsed) => {
          set({ isSidebarCollapsed: collapsed }, false, 'setSidebarCollapsed');
        },
        
        toggleMobileMenu: () => {
          set(state => ({ isMobileMenuOpen: !state.isMobileMenuOpen }), false, 'toggleMobileMenu');
        },
        
        setMobileMenuOpen: (open) => {
          set({ isMobileMenuOpen: open }, false, 'setMobileMenuOpen');
        },
        
        // Navigation actions
        setActiveRoute: (route) => {
          set(state => ({
            activeRoute: route,
            previousRoute: state.activeRoute,
          }), false, 'setActiveRoute');
        },
        
        navigateTo: (route, label) => {
          set(state => {
            const newState: Partial<NavigationState> = {
              activeRoute: route,
              previousRoute: state.activeRoute,
            };
            
            if (label) {
              newState.breadcrumbs = [...state.breadcrumbs, { label, path: route }];
            }
            
            return newState;
          }, false, 'navigateTo');
        },
        
        goBack: () => {
          const state = get();
          if (state.previousRoute) {
            set({
              activeRoute: state.previousRoute,
              previousRoute: null,
            }, false, 'goBack');
          }
        },
        
        setBreadcrumbs: (breadcrumbs) => {
          set({ breadcrumbs }, false, 'setBreadcrumbs');
        },
        
        addBreadcrumb: (label, path) => {
          set(state => ({
            breadcrumbs: [...state.breadcrumbs, { label, path }],
          }), false, 'addBreadcrumb');
        },
        
        // Modal actions
        openSearchModal: () => {
          set({ isSearchModalOpen: true }, false, 'openSearchModal');
        },
        
        closeSearchModal: () => {
          set({ isSearchModalOpen: false }, false, 'closeSearchModal');
        },
        
        openSettingsModal: () => {
          set({ isSettingsModalOpen: true }, false, 'openSettingsModal');
        },
        
        closeSettingsModal: () => {
          set({ isSettingsModalOpen: false }, false, 'closeSettingsModal');
        },
        
        openHelpModal: () => {
          set({ isHelpModalOpen: true }, false, 'openHelpModal');
        },
        
        closeHelpModal: () => {
          set({ isHelpModalOpen: false }, false, 'closeHelpModal');
        },
        
        closeAllModals: () => {
          set({
            isSearchModalOpen: false,
            isSettingsModalOpen: false,
            isHelpModalOpen: false,
            isMobileMenuOpen: false,
          }, false, 'closeAllModals');
        },
      }),
      {
        name: 'navigation-store',
        partialize: (state) => ({
          // Only persist sidebar preferences
          isSidebarCollapsed: state.isSidebarCollapsed,
        }),
      }
    ),
    {
      name: 'NavigationStore',
    }
  )
);