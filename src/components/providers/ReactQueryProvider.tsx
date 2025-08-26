/**
 * React Query Provider
 * Sets up React Query for the application
 */

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// TODO: Install devtools when needed: npm install @tanstack/react-query-devtools
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { API_DELAYS } from '@/lib/core/config/constants/app.constants';

/**
 * React Query Provider component
 */
export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  // Create a new QueryClient instance for each request to avoid sharing data between users
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 5 minutes
            staleTime: API_DELAYS.STALE_TIME,
            
            // Data is kept in cache for 10 minutes
            gcTime: API_DELAYS.CACHE_TIME,
            
            // Retry failed requests once
            retry: 1,
            
            // Don't refetch on window focus by default
            refetchOnWindowFocus: false,
            
            // Refetch on reconnect
            refetchOnReconnect: 'always',
            
            // Network mode
            networkMode: 'online',
          },
          mutations: {
            // Retry failed mutations once
            retry: 1,
            
            // Network mode
            networkMode: 'online',
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Uncomment when devtools are installed:
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false} 
          position="bottom-right"
          buttonPosition="bottom-right"
        />
      )}
      */}
    </QueryClientProvider>
  );
}