/**
 * Careers Page
 * Join Our Team - Coming Soon
 */

import { ComingSoon } from '@/components/features/ComingSoon';
import { ROUTES, getComingSoonConfig } from '@/lib/core/config/constants/routes.constants';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';

// Export metadata for the careers page
export const metadata: Metadata = pageMetadata[ROUTES.CAREERS];

export default function CareersPage() {
  const config = getComingSoonConfig(ROUTES.CAREERS);

  if (!config) {
    throw new Error('Careers page configuration not found');
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