/**
 * Community Page
 * Coming soon page for community hub
 */

import { ComingSoon } from '@/components/features/ComingSoon';
import { ROUTES, getComingSoonConfig } from '@/lib/core/config/constants/routes.constants';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';

// Export metadata for the community page
export const metadata: Metadata = pageMetadata[ROUTES.COMMUNITY];

export default function CommunityPage() {
  const config = getComingSoonConfig(ROUTES.COMMUNITY);
  
  if (!config) {
    throw new Error('Community page configuration not found');
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