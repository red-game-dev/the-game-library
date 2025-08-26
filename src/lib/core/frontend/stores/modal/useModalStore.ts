/**
 * Modal Store
 * Manages modal state using Zustand
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ReactNode } from 'react';

interface Modal {
  id: string;
  content: ReactNode;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  dismissible?: boolean;
  onClose?: () => void;
}

interface ModalState {
  modals: Modal[];
  
  // Actions
  openModal: (modal: Omit<Modal, 'id'>) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  closeTopModal: () => void;
  
  // Utilities
  isModalOpen: (id: string) => boolean;
  getTopModal: () => Modal | undefined;
}

export const useModalStore = create<ModalState>()(
  devtools(
    (set, get) => ({
      modals: [],
      
      openModal: (modal) => {
        const id = modal.title ? 
          `modal-${modal.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}` : 
          `modal-${Date.now()}-${Math.random()}`;
          
        const newModal: Modal = {
          ...modal,
          id,
          dismissible: modal.dismissible ?? true,
        };
        
        set(state => ({
          modals: [...state.modals, newModal]
        }), false, 'openModal');
        
        return id;
      },
      
      closeModal: (id) => {
        const modal = get().modals.find(m => m.id === id);
        modal?.onClose?.();
        
        set(state => ({
          modals: state.modals.filter(m => m.id !== id)
        }), false, 'closeModal');
      },
      
      closeAllModals: () => {
        const modals = get().modals;
        modals.forEach(modal => modal.onClose?.());
        
        set({ modals: [] }, false, 'closeAllModals');
      },
      
      closeTopModal: () => {
        const modals = get().modals;
        if (modals.length > 0) {
          const topModal = modals[modals.length - 1];
          get().closeModal(topModal.id);
        }
      },
      
      isModalOpen: (id) => {
        return get().modals.some(m => m.id === id);
      },
      
      getTopModal: () => {
        const modals = get().modals;
        return modals.length > 0 ? modals[modals.length - 1] : undefined;
      },
    }),
    {
      name: 'ModalStore',
    }
  )
);

// Convenience hook exports
export const useModals = () => useModalStore(state => state.modals);
export const useModalActions = () => useModalStore(state => ({
  openModal: state.openModal,
  closeModal: state.closeModal,
  closeAllModals: state.closeAllModals,
  closeTopModal: state.closeTopModal,
}));
export const useIsAnyModalOpen = () => useModalStore(state => state.modals.length > 0);