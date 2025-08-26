/**
 * Error Page
 * Displayed for runtime errors in the app directory
 */

'use client';

import { useEffect } from 'react';
import { ErrorPage } from '@/components/features/ErrorPage';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <ErrorPage 
      errorType="500"
      onRetry={reset}
      description={
        process.env.NODE_ENV === 'development' 
          ? error.message 
          : "Something went wrong. We're working on fixing this issue."
      }
    />
  );
}