/**
 * Trending Page
 * Displays trending games - Coming Soon
 */

import { ComingSoon } from '@/components/features/ComingSoon';
import { getComingSoonConfig } from '@/lib/core/config/constants/routes.constants';
import { ROUTES } from '@/lib/core/config/constants/routes.constants';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/core/config/seo.config';

// Export metadata for the trending page
export const metadata: Metadata = pageMetadata[ROUTES.TRENDING];

export default function TrendingPage() {
  const config = getComingSoonConfig(ROUTES.TRENDING);
  
  if (!config) {
    // Fallback if config is not found
    return (
      <ComingSoon 
        title="Trending Games"
        description="Discover what everyone is playing. This feature is being crafted."
      />
    );
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