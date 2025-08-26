/**
 * Terms Page
 * Terms of Service - Coming Soon
 */

import { ComingSoon } from '@/components/features/ComingSoon';
import { ROUTES, getComingSoonConfig } from '@/lib/core/config/constants/routes.constants';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';

// Export metadata for the terms page
export const metadata: Metadata = pageMetadata[ROUTES.TERMS];

export default function TermsPage() {
  const config = getComingSoonConfig(ROUTES.TERMS);

  if (!config) {
    throw new Error('Terms page configuration not found');
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