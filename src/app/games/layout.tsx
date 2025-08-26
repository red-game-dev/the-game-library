import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';
import { ROUTES } from '@/lib/core/config/constants/routes.constants';

export const metadata: Metadata = pageMetadata[ROUTES.GAMES];

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}