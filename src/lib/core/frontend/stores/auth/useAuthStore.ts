/**
 * Auth Store
 * Manages authentication state and user information
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id?: string;
  name: string;
  email?: string;
  avatar?: string;
  balance: number;
  isGuest?: boolean;
}

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
  updateBalance: (balance: number) => void;
  addToBalance: (amount: number) => void;
  subtractFromBalance: (amount: number) => void;
  initializeGuestMode: () => void;
  refreshSession: () => void;
}

// Default guest user
const createGuestUser = (): User => ({
  name: 'Guest Player',
  balance: 1000.00,
  isGuest: true
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      // Set user
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user && !user.isGuest 
      }),
      
      // Login
      login: (user) => set({ 
        user, 
        isAuthenticated: true,
        isLoading: false 
      }),
      
      // Logout
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false 
      }),
      
      // Update balance
      updateBalance: (balance) => set((state) => ({
        user: state.user ? { ...state.user, balance } : null
      })),
      
      // Add to balance
      addToBalance: (amount) => set((state) => ({
        user: state.user 
          ? { ...state.user, balance: state.user.balance + amount }
          : null
      })),
      
      // Subtract from balance
      subtractFromBalance: (amount) => set((state) => ({
        user: state.user 
          ? { ...state.user, balance: Math.max(0, state.user.balance - amount) }
          : null
      })),
      
      // Initialize guest mode
      initializeGuestMode: () => set({
        user: createGuestUser(),
        isAuthenticated: false,
        isLoading: false
      }),
      
      // Refresh session
      refreshSession: () => {
        // TODO: this would call an API to refresh the session token
        console.log('Session refreshed at', new Date().toISOString());
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);