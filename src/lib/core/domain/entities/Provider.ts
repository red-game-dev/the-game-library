/**
 * Provider Entity
 * Core domain model representing a game provider
 */

/**
 * Provider entity representing a game provider/publisher
 */
export interface Provider {
  // Core identification
  readonly id: string;
  name: string;
  slug?: string;
  
  // Visual assets
  logo?: string;
  
  // Metadata
  gameCount?: number;
  description?: string;
  website?: string;
  
  // Status
  isActive?: boolean;
  isFeatured?: boolean;
  
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Factory function to create a Provider entity
 */
export function createProvider(params: Omit<Provider, 'createdAt' | 'updatedAt'>): Provider {
  return {
    ...params,
    isActive: params.isActive ?? true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

/**
 * Type guard to check if an object is a Provider
 */
export function isProvider(obj: unknown): obj is Provider {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    typeof (obj as Provider).id === 'string' &&
    typeof (obj as Provider).name === 'string'
  );
}

/**
 * Check if provider is available (business rule)
 */
export function isProviderAvailable(provider: Provider): boolean {
  return provider.isActive === true;
}

/**
 * Get provider display name with game count
 */
export function getProviderDisplayName(provider: Provider): string {
  if (provider.gameCount && provider.gameCount > 0) {
    return `${provider.name} (${provider.gameCount})`;
  }
  return provider.name;
}