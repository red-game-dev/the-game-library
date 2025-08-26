/**
 * Global Error Page
 * Displayed for errors in the root layout
 */

'use client';

import { ErrorPage } from '@/components/features/ErrorPage';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <ErrorPage 
          errorType="500"
          onRetry={reset}
          title="Critical Error"
          description="A critical error occurred. Please refresh the page or try again later."
        />
      </body>
    </html>
  );
}