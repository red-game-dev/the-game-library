/**
 * Tournaments Page
 * Coming soon page for tournaments
 */

import { ComingSoon } from '@/components/features/ComingSoon';
import { ROUTES, getComingSoonConfig } from '@/lib/core/config/constants/routes.constants';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';

// Export metadata for the tournaments page
export const metadata: Metadata = pageMetadata[ROUTES.TOURNAMENTS];

export default function TournamentsPage() {
  const config = getComingSoonConfig(ROUTES.TOURNAMENTS);
  
  if (!config) {
    throw new Error('Tournament page configuration not found');
  }
  
  return (
    <ComingSoon
      title={config.title}
      description={config.description}
      icon={config.icon}
      gradientFrom={config.gradientFrom}
      gradientTo={config.gradientTo}
    />
  );
}