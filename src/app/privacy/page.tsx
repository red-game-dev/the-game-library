/**
 * Privacy Page
 * Privacy Policy - Coming Soon
 */

import { ComingSoon } from '@/components/features/ComingSoon';
import { ROUTES, getComingSoonConfig } from '@/lib/core/config/constants/routes.constants';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';

// Export metadata for the privacy page
export const metadata: Metadata = pageMetadata[ROUTES.PRIVACY];

export default function PrivacyPage() {
  const config = getComingSoonConfig(ROUTES.PRIVACY);

  if (!config) {
    throw new Error('Privacy page configuration not found');
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