/**
 * Promotions Page
 * Coming soon page for promotions
 */

import { ComingSoon } from '@/components/features/ComingSoon';
import { ROUTES, getComingSoonConfig } from '@/lib/core/config/constants/routes.constants';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';

// Export metadata for the promotions page
export const metadata: Metadata = pageMetadata[ROUTES.PROMOTIONS];

export default function PromotionsPage() {
  const config = getComingSoonConfig(ROUTES.PROMOTIONS);
  
  if (!config) {
    throw new Error('Promotions page configuration not found');
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