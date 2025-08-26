/**
 * Test Infrastructure
 * Central export for all test utilities, generators, and mocks
 */

/* ============================================
   DATA GENERATORS
   ============================================ */

// Export all generators
export * from './generators';

// Export mock collections
export * from './mocks';

/* ============================================
   CONVENIENCE EXPORTS
   ============================================ */

// Game generators
export { 
  generateGame as mockGame,
  generateGames as mockGames,
  getSampleGame as sampleGame,
  generateGameLibrary as mockGameLibrary,
  generateMockGame,
  generateMockGames,
  generateGamesByType,
  generateGamesByProvider
} from './generators/GameGenerator';

// Provider generators
export {
  generateProvider as mockProvider,
  generateProviders as mockProviders,
  getSampleProvider as sampleProvider,
  generateProvidersWithGames as mockProvidersWithGames,
  generateMockProvider,
  generateMockProviders
} from './generators/ProviderGenerator';

// Tag generators
export {
  getAllTags,
  generateMockTags,
  generateTagsByCategory,
  generateFilterTags,
  generateTagsForGameType,
  generateWeightedTags,
  getSampleTags
} from './generators/TagGenerator';

/* ============================================
   TEST UTILITIES
   ============================================ */

// Export test utilities from dedicated file
export {
  createMockSearchCriteria,
  createMockPaginationMeta,
  createMockApiResponse,
  createMockErrorResponse,
  testDelay,
  createMockFetchResponse
} from './utilities/test-helpers';

/* ============================================
   COLLECTION HELPERS
   ============================================ */

// Export collection helpers
export {
  generateGameCollections,
  generateProviderCollections,
  generateThemedGames,
  generateProviderGames,
  generateCompleteTestData
} from './helpers/collections';