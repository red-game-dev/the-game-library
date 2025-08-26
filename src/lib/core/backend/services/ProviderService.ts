/**
 * Provider Service
 * Business logic for provider operations with caching and optimized lookups
 */

import type { Provider } from '@/lib/core/domain/entities';
import { GameService } from './GameService';
import { cacheService } from '@/lib/core/backend/services/CacheService';
import { PaginationService, type PaginatedResponse } from '@/lib/core/backend/services/PaginationService';
import { CACHE_TTL, DEFAULT_PAGE_SIZE } from '@/lib/core/config/constants/app.constants';
import { ProviderNotFoundError } from '@/lib/core/shared/errors/AppError';
import providersData from '@/lib/core/backend/data/providers.json';

export interface ProviderStats {
  totalProviders: number;
  totalGames: number;
  averageGamesPerProvider: number;
  topProviders: Array<{
    provider: Provider;
    gameCount: number;
    percentage: number;
  }>;
}

export class ProviderService {
  // Optimized data structures for O(1) lookups
  private static providersMap: Map<string, Provider> = new Map();
  private static providersArray: Provider[] = [];
  private static initialized = false;
  
  /**
   * Initialize the service with providers data
   */
  private static initialize() {
    if (this.initialized) return;
    
    this.clear();
    const providers = providersData as Provider[];
    providers.forEach(provider => this.addProvider(provider));
    this.initialized = true;
  }
  
  /**
   * Clear all data
   */
  private static clear() {
    this.providersMap.clear();
    this.providersArray = [];
  }
  
  /**
   * Add a provider to internal data structures
   */
  private static addProvider(provider: Provider) {
    this.providersMap.set(provider.id, provider);
    this.providersArray.push(provider);
  }
  
  /**
   * Get all providers (with caching)
   * Always returns providers with actual game count from GameService
   */
  static getAllProviders(): Provider[] {
    this.initialize();
    
    const cacheKey = 'providers:all:with-actual-count';
    const cached = cacheService.get<Provider[]>(cacheKey);
    
    if (cached) return cached;
    
    // Get providers and update with actual game count
    const providers = Array.from(this.providersMap.values()).map(provider => ({
      ...provider,
      gameCount: GameService.getGamesByProvider(provider.id).length
    }));
    
    cacheService.set(cacheKey, providers, CACHE_TTL.LONG);
    
    return providers;
  }

  /**
   * Sort providers
   */
  static sortProviders(
    providers: Provider[], 
    sortBy: 'name' | 'az' | 'za' = 'name'
  ): Provider[] {
    const sorted = [...providers];
    
    switch (sortBy) {
      case 'az':
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'za':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }

  /**
   * Get paginated providers
   */
  static getPaginatedProviders(
    page: number = 1, 
    pageSize: number = DEFAULT_PAGE_SIZE,
    sortBy?: 'name' | 'az' | 'za'
  ): PaginatedResponse<Provider> {
    this.initialize();
    
    const cacheKey = `providers:paginated:${page}:${pageSize}:${sortBy}`;
    const cached = cacheService.get<PaginatedResponse<Provider>>(cacheKey);
    
    if (cached) return cached;
    
    const allProviders = this.getAllProviders();
    
    // Apply sorting if specified
    const sortedProviders = sortBy 
      ? this.sortProviders(allProviders, sortBy)
      : allProviders;
    
    // Apply pagination
    const result = PaginationService.paginate(sortedProviders, { page, pageSize });
    
    cacheService.set(cacheKey, result, CACHE_TTL.MEDIUM);
    return result;
  }
  
  /**
   * Get provider by ID (O(1) lookup with caching)
   * Always returns provider with actual game count from GameService
   */
  static getProviderById(providerId: string): Provider {
    this.initialize();
    
    const cacheKey = `providers:${providerId}:with-actual-count`;
    const cached = cacheService.get<Provider>(cacheKey);
    
    if (cached) return cached;
    
    const provider = this.providersMap.get(providerId);
    if (!provider) {
      throw new ProviderNotFoundError(providerId);
    }
    
    // Update with actual game count
    const providerWithActualCount = {
      ...provider,
      gameCount: GameService.getGamesByProvider(provider.id).length
    };
    
    cacheService.set(cacheKey, providerWithActualCount, CACHE_TTL.LONG);
    return providerWithActualCount;
  }
  
  /**
   * Get providers with game count (with caching)
   */
  static getProvidersWithGames(): Array<Provider & { gameCount: number }> {
    this.initialize();
    
    const cacheKey = 'providers:with-games';
    const cached = cacheService.get<Array<Provider & { gameCount: number }>>(cacheKey);
    
    if (cached) return cached;
    
    const providers = this.getAllProviders();
    const result = providers.map(provider => ({
      ...provider,
      gameCount: GameService.getGamesByProvider(provider.id).length
    }));
    
    cacheService.set(cacheKey, result, CACHE_TTL.MEDIUM);
    return result;
  }

  /**
   * Sort providers with game count
   */
  static sortProvidersWithGames(
    providers: Array<Provider & { gameCount: number }>,
    sortBy: 'gameCount' | 'name' | 'az' | 'za' = 'gameCount'
  ): Array<Provider & { gameCount: number }> {
    const sorted = [...providers];
    
    switch (sortBy) {
      case 'gameCount':
        return sorted.sort((a, b) => b.gameCount - a.gameCount);
      case 'name':
      case 'az':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'za':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }

  /**
   * Get paginated providers with game count
   */
  static getPaginatedProvidersWithGames(
    page: number = 1, 
    pageSize: number = DEFAULT_PAGE_SIZE,
    sortBy: 'gameCount' | 'name' | 'az' | 'za' = 'gameCount'
  ): PaginatedResponse<Provider & { gameCount: number }> {
    this.initialize();
    
    const cacheKey = `providers:with-games:paginated:${page}:${pageSize}:${sortBy}`;
    const cached = cacheService.get<PaginatedResponse<Provider & { gameCount: number }>>(cacheKey);
    
    if (cached) return cached;
    
    const providersWithGames = this.getProvidersWithGames();
    
    // Apply sorting
    const sortedProviders = this.sortProvidersWithGames(providersWithGames, sortBy);
    
    // Apply pagination
    const result = PaginationService.paginate(sortedProviders, { page, pageSize });
    
    cacheService.set(cacheKey, result, CACHE_TTL.MEDIUM);
    return result;
  }
  
  /**
   * Get top providers by game count (with caching)
   */
  static getTopProviders(limit: number = 5): Array<{
    provider: Provider;
    gameCount: number;
  }> {
    const cacheKey = `providers:top:${limit}`;
    const cached = cacheService.get<Array<{ provider: Provider; gameCount: number }>>(cacheKey);
    
    if (cached) return cached;
    
    const providersWithGames = this.getProvidersWithGames();
    const result = providersWithGames
      .sort((a, b) => b.gameCount - a.gameCount)
      .slice(0, limit)
      .map(({ gameCount, ...provider }) => ({
        provider,
        gameCount
      }));
    
    cacheService.set(cacheKey, result, CACHE_TTL.MEDIUM);
    return result;
  }
  
  /**
   * Search providers by name
   */
  static searchProviders(query: string): Provider[] {
    this.initialize();
    
    const cacheKey = `providers:search:${query}`;
    const cached = cacheService.get<Provider[]>(cacheKey);
    
    if (cached) return cached;
    
    const searchTerm = query.toLowerCase().trim();
    const results = Array.from(this.providersMap.values()).filter(provider =>
      provider.name.toLowerCase().includes(searchTerm)
    );
    
    cacheService.set(cacheKey, results, CACHE_TTL.SHORT);
    return results;
  }
  
  /**
   * Get provider statistics (with caching)
   */
  static getProviderStats(): ProviderStats {
    const cacheKey = 'providers:stats';
    const cached = cacheService.get<ProviderStats>(cacheKey);
    
    if (cached) return cached;
    
    const providers = this.getAllProviders();
    const totalGames = GameService.getAllGames().length;
    
    const providersWithGames = providers.map(provider => {
      const gameCount = GameService.getGamesByProvider(provider.id).length;
      return {
        provider,
        gameCount,
        percentage: totalGames > 0 ? (gameCount / totalGames) * 100 : 0
      };
    });
    
    const topProviders = providersWithGames
      .sort((a, b) => b.gameCount - a.gameCount)
      .slice(0, 10);
    
    const stats: ProviderStats = {
      totalProviders: providers.length,
      totalGames,
      averageGamesPerProvider: totalGames / providers.length,
      topProviders
    };
    
    cacheService.set(cacheKey, stats, CACHE_TTL.LONG);
    return stats;
  }
  
  /**
   * Check if provider exists
   */
  static providerExists(providerId: string): boolean {
    this.initialize();
    return this.providersMap.has(providerId);
  }
  
  /**
   * Get provider with games (with caching)
   */
  static getProviderWithGames(providerId: string) {
    const cacheKey = `providers:${providerId}:with-games`;
    const cached = cacheService.get<Provider & { games: ReturnType<typeof GameService.getGamesByProvider> }>(cacheKey);
    
    if (cached) return cached;
    
    const provider = this.getProviderById(providerId);
    const games = GameService.getGamesByProvider(providerId);
    
    const result = {
      ...provider,
      games,
      gameCount: games.length
    };
    
    cacheService.set(cacheKey, result, CACHE_TTL.MEDIUM);
    return result;
  }
  
  /**
   * Get featured providers (with caching)
   */
  static getFeaturedProviders(limit: number = 4): Provider[] {
    const cacheKey = `providers:featured:${limit}`;
    const cached = cacheService.get<Provider[]>(cacheKey);
    
    if (cached) return cached;
    
    const providers = this.getAllProviders();
    const games = GameService.getAllGames();
    
    // Get providers with their total play count
    const providersWithPlayCount = providers.map(provider => {
      const providerGames = games.filter(g => g.provider.id === provider.id);
      const totalPlayCount = providerGames.reduce((sum, game) => sum + (game.playCount || 0), 0);
      
      return {
        provider,
        totalPlayCount
      };
    });
    
    // Sort by total play count and return top providers
    const result = providersWithPlayCount
      .sort((a, b) => b.totalPlayCount - a.totalPlayCount)
      .slice(0, limit)
      .map(item => item.provider);
    
    cacheService.set(cacheKey, result, CACHE_TTL.LONG);
    return result;
  }
  
  /**
   * Clear provider-related cache
   */
  static clearCache(): void {
    cacheService.invalidate('providers:');
  }
}

/**
 * Export singleton instance for convenience
 */
export const providerService = ProviderService;