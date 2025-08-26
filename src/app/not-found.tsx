/**
 * 404 Not Found Page
 * Displayed when a page doesn't exist
 */

import { ErrorPage } from '@/components/features/ErrorPage';

export default function NotFound() {
  return <ErrorPage errorType="404" />;
}