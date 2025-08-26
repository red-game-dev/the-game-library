/**
 * Toast Store
 * Manages toast notifications state using Zustand
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { StatusVariant } from '@/lib/core/shared/types';

interface Toast {
  id: string;
  message: string;
  variant: StatusVariant;
  title?: string;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  
  // Actions
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
  clearToasts: () => void;
  
  // Convenience methods
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

export const useToastStore = create<ToastState>()(
  devtools(
    (set, get) => ({
      toasts: [],
      
      showToast: (toast) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        const newToast: Toast = {
          ...toast,
          id,
          duration: toast.duration ?? 4000,
        };
        
        set(state => ({
          toasts: [...state.toasts, newToast]
        }), false, 'showToast');
        
        // Auto-dismiss after duration
        if (newToast.duration && newToast.duration > 0) {
          setTimeout(() => {
            get().hideToast(id);
          }, newToast.duration);
        }
      },
      
      hideToast: (id) => {
        set(state => ({
          toasts: state.toasts.filter(t => t.id !== id)
        }), false, 'hideToast');
      },
      
      clearToasts: () => {
        set({ toasts: [] }, false, 'clearToasts');
      },
      
      // Convenience methods
      success: (message, title) => {
        get().showToast({ message, title, variant: 'success' });
      },
      
      error: (message, title) => {
        get().showToast({ message, title, variant: 'error' });
      },
      
      warning: (message, title) => {
        get().showToast({ message, title, variant: 'warning' });
      },
      
      info: (message, title) => {
        get().showToast({ message, title, variant: 'info' });
      },
    }),
    {
      name: 'ToastStore',
    }
  )
);

// Convenience hook exports
export const useToasts = () => useToastStore(state => state.toasts);
export const useToastActions = () => useToastStore(state => ({
  showToast: state.showToast,
  hideToast: state.hideToast,
  clearToasts: state.clearToasts,
  success: state.success,
  error: state.error,
  warning: state.warning,
  info: state.info,
}));