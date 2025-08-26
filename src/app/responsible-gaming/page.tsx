/**
 * Play Safe Page
 * Play Responsibly - Coming Soon
 */

import { ComingSoon } from '@/components/features/ComingSoon';
import { ROUTES, getComingSoonConfig } from '@/lib/core/config/constants/routes.constants';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';

// Export metadata for the responsible gaming page
export const metadata: Metadata = pageMetadata[ROUTES.RESPONSIBLE_GAMING];

export default function ResponsibleGamingPage() {
  const config = getComingSoonConfig(ROUTES.RESPONSIBLE_GAMING);

  if (!config) {
    throw new Error('Play Safe page configuration not found');
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