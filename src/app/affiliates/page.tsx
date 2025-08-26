/**
 * Affiliates Page
 * Affiliate Program - Coming Soon
 */

import { ComingSoon } from '@/components/features/ComingSoon';
import { ROUTES, getComingSoonConfig } from '@/lib/core/config/constants/routes.constants';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';

// Export metadata for the affiliates page
export const metadata: Metadata = pageMetadata[ROUTES.AFFILIATES];

export default function AffiliatesPage() {
  const config = getComingSoonConfig(ROUTES.AFFILIATES);

  if (!config) {
    throw new Error('Affiliates page configuration not found');
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