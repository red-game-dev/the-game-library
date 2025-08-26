/**
 * Main Providers Component
 * Wraps the application with all necessary providers
 */

'use client';

import { ReactNode } from 'react';
import { ReactQueryProvider } from './ReactQueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { StoreProvider } from './StoreProvider';
import { ToastProvider } from './ToastProvider';
import { ModalProvider } from './ModalProvider';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Main providers wrapper
 * Order matters: outer providers are available to inner providers
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ReactQueryProvider>
      <StoreProvider>
        <ThemeProvider>
          {children}
          <ToastProvider />
          <ModalProvider />
        </ThemeProvider>
      </StoreProvider>
    </ReactQueryProvider>
  );
}