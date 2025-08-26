/**
 * Provider Utility Functions
 * Helper functions for working with providers
 */

/**
 * Validate if a provider name is properly formatted
 */
export function isValidProviderName(name: string): boolean {
  if (!name || typeof name !== 'string') return false;
  
  const trimmed = name.trim();
  
  // Check length constraints
  if (trimmed.length < 2 || trimmed.length > 50) return false;
  
  // Check for at least one alphanumeric character
  const hasAlphanumeric = /[a-zA-Z0-9]/.test(trimmed);
  
  return hasAlphanumeric;
}

/**
 * Check if a provider is featured based on game count
 */
export function isFeaturedProvider(gameCount?: number): boolean {
  return (gameCount || 0) >= 20;
}

/**
 * Check if a provider is popular based on game count
 */
export function isPopularProvider(gameCount?: number): boolean {
  return (gameCount || 0) >= 10;
}

/**
 * Check if a provider is new (has few games)
 */
export function isNewProvider(gameCount?: number): boolean {
  return (gameCount || 0) < 5;
}

/**
 * Validate if a URL is a valid provider website
 */
export function isValidProviderWebsite(url: string): boolean {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Format provider game count for display
 */
export function formatProviderGameCount(count?: number): string {
  if (count === undefined || count === null) return '0 games';
  if (count === 1) return '1 game';
  return `${count} games`;
}

/**
 * Get provider status badge
 */
export function getProviderStatus(gameCount?: number): {
  label: string;
  color: string;
} {
  const count = gameCount || 0;
  
  if (count >= 20) {
    return { label: 'Featured', color: 'gold' };
  }
  if (count >= 10) {
    return { label: 'Popular', color: 'purple' };
  }
  if (count >= 5) {
    return { label: 'Active', color: 'green' };
  }
  return { label: 'New', color: 'blue' };
}

/**
 * Sort providers by priority (featured > popular > others)
 */
export function sortProvidersByPriority<T extends { gameCount?: number }>(
  providers: T[]
): T[] {
  return [...providers].sort((a, b) => {
    const aCount = a.gameCount || 0;
    const bCount = b.gameCount || 0;
    
    // Featured providers first
    const aFeatured = isFeaturedProvider(aCount);
    const bFeatured = isFeaturedProvider(bCount);
    if (aFeatured !== bFeatured) return aFeatured ? -1 : 1;
    
    // Then popular providers
    const aPopular = isPopularProvider(aCount);
    const bPopular = isPopularProvider(bCount);
    if (aPopular !== bPopular) return aPopular ? -1 : 1;
    
    // Finally by game count
    return bCount - aCount;
  });
}