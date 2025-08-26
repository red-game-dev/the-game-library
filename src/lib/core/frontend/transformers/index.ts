/**
 * Frontend Transformers
 * Export transformers for frontend state management
 */

export { gameStoreTransformers } from './gameStoreTransformers';
export { providerStoreTransformers } from './providerStoreTransformers';
export { tagStoreTransformers } from './tagStoreTransformers';
export { favoriteStoreTransformers } from './favoriteStoreTransformers';
export type { StoreFavorite } from './favoriteStoreTransformers';

// Legacy exports for backward compatibility (to be removed later)
export { gameStoreTransformers as gameTransformers } from './gameStoreTransformers';
export { providerStoreTransformers as providerTransformers } from './providerStoreTransformers';
export { tagStoreTransformers as tagTransformers } from './tagStoreTransformers';