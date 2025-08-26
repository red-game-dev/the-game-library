/**
 * Help Page
 * Coming soon page for help center
 */

import { ComingSoon } from '@/components/features/ComingSoon';
import { ROUTES, getComingSoonConfig } from '@/lib/core/config/constants/routes.constants';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';

// Export metadata for the help page
export const metadata: Metadata = pageMetadata[ROUTES.HELP];

export default function HelpPage() {
  const config = getComingSoonConfig(ROUTES.HELP);
  
  if (!config) {
    throw new Error('Help page configuration not found');
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