/**
 * Cookies Page
 * Cookie Policy - Coming Soon
 */

import { ComingSoon } from '@/components/features/ComingSoon';
import { ROUTES, getComingSoonConfig } from '@/lib/core/config/constants/routes.constants';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';

// Export metadata for the cookies page
export const metadata: Metadata = pageMetadata[ROUTES.COOKIES];

export default function CookiesPage() {
  const config = getComingSoonConfig(ROUTES.COOKIES);

  if (!config) {
    throw new Error('Cookies page configuration not found');
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