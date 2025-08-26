/**
 * Register Page
 * Create Account - Coming Soon
 */

import { ComingSoon } from '@/components/features/ComingSoon';
import { ROUTES, getComingSoonConfig } from '@/lib/core/config/constants/routes.constants';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';

// Export metadata for the register page
export const metadata: Metadata = pageMetadata[ROUTES.REGISTER];

export default function RegisterPage() {
  const config = getComingSoonConfig(ROUTES.REGISTER);

  if (!config) {
    throw new Error('Register page configuration not found');
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