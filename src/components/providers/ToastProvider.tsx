/**
 * Toast Provider
 * Renders toast notifications using the Alert component and Zustand store
 */

'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Alert } from '@/components/ui/Alert';
import { useToastStore } from '@/lib/core/frontend/stores/toast/useToastStore';
import '@/styles/components/features/toast-container.css';

/**
 * Toast Provider component
 * Renders toasts from the Zustand store
 */
export function ToastProvider() {
  const [mounted, setMounted] = useState(false);
  const { toasts, hideToast } = useToastStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className="toast-container__item">
          <Alert
            variant={toast.variant}
            type="toast"
            title={toast.title}
            dismissible
            onDismiss={() => hideToast(toast.id)}
            size="sm"
          >
            {toast.message}
          </Alert>
        </div>
      ))}
    </div>,
    document.body
  );
}