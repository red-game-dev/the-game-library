/**
 * VIP Page
 * Coming soon page for VIP program
 */

import { ComingSoon } from '@/components/features/ComingSoon';
import { ROUTES, getComingSoonConfig } from '@/lib/core/config/constants/routes.constants';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';

// Export metadata for the vip page
export const metadata: Metadata = pageMetadata[ROUTES.VIP];

export default function VIPPage() {
  const config = getComingSoonConfig(ROUTES.VIP);

    if (!config) {
    throw new Error('VIP page configuration not found');
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