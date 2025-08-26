/**
 * Provider API Types
 * Types for provider API requests and responses
 */

/**
 * API Provider Response format
 * What the backend API returns
 */
export interface ApiProviderResponse {
  id: string;
  name: string;
  slug?: string;
  logo?: string;
  website?: string;
  description?: string;
  gameCount?: number;
  featured?: boolean;
  popular?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * API Provider Request format
 * What we send to the backend API
 */
export interface ApiProviderRequest {
  name?: string;
  logo?: string;
  website?: string;
  description?: string;
  featured?: boolean;
}

/**
 * Providers list API response
 */
export interface ApiProvidersResponse {
  data: ApiProviderResponse[];
  meta?: {
    totalCount?: number;
  };
}