/**
 * Test Data Generators
 * Export all data generators for testing and development
 */

export * from './GameGenerator';
export * from './ProviderGenerator';
export * from './TagGenerator';

// Re-export commonly used generators
export { 
  generateGame,
  generateGames,
  generateGamesByType,
  generateFeaturedGames,
  generateNewGames,
  generateGameLibrary,
  getSampleGame
} from './GameGenerator';

export {
  generateProvider,
  generateProviders,
  generateFeaturedProviders,
  generateProvidersWithGames,
  getSampleProvider
} from './ProviderGenerator';