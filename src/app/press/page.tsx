/**
 * Press Page
 * Press & Media - Coming Soon
 */

import { ComingSoon } from '@/components/features/ComingSoon';
import { ROUTES, getComingSoonConfig } from '@/lib/core/config/constants/routes.constants';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';

// Export metadata for the press page
export const metadata: Metadata = pageMetadata[ROUTES.PRESS];

export default function PressPage() {
  const config = getComingSoonConfig(ROUTES.PRESS);

  if (!config) {
    throw new Error('Press page configuration not found');
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