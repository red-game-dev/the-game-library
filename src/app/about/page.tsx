/**
 * About Page
 * About Us - Coming Soon
 */

import { ComingSoon } from '@/components/features/ComingSoon';
import { ROUTES, getComingSoonConfig } from '@/lib/core/config/constants/routes.constants';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';

// Export metadata for the about page
export const metadata: Metadata = pageMetadata[ROUTES.ABOUT];

export default function AboutPage() {
  const config = getComingSoonConfig(ROUTES.ABOUT);

  if (!config) {
    throw new Error('About page configuration not found');
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