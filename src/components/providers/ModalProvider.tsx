/**
 * Modal Provider
 * Renders modals using the Modal component and Zustand store
 */

'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '@/components/ui/Modal';
import { useModalStore } from '@/lib/core/frontend/stores/modal/useModalStore';

/**
 * Modal Provider component
 * Renders modals from the Zustand store
 */
export function ModalProvider() {
  const [mounted, setMounted] = useState(false);
  const { modals, closeModal } = useModalStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key to close top modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modals.length > 0) {
        const topModal = modals[modals.length - 1];
        if (topModal.dismissible) {
          closeModal(topModal.id);
        }
      }
    };

    if (mounted) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [mounted, modals, closeModal]);

  if (!mounted) return null;

  return (
    <>
      {modals.map((modal, index) => 
        createPortal(
          <Modal
            key={modal.id}
            isOpen={true}
            onClose={() => closeModal(modal.id)}
            title={modal.title}
            size={modal.size}
            showCloseButton={modal.dismissible}
            zIndex={1000 + (index * 10)}
          >
            {modal.content}
          </Modal>,
          document.body
        )
      )}
    </>
  );
}