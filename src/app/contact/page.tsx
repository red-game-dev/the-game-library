/**
 * Contact Page
 * Contact Us - Coming Soon
 */

import { ComingSoon } from '@/components/features/ComingSoon';
import { ROUTES, getComingSoonConfig } from '@/lib/core/config/constants/routes.constants';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';

// Export metadata for the contact page
export const metadata: Metadata = pageMetadata[ROUTES.CONTACT];

export default function ContactPage() {
  const config = getComingSoonConfig(ROUTES.CONTACT);

  if (!config) {
    throw new Error('Contact page configuration not found');
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