/**
 * Provider Data Generator
 * Generates mock provider data for testing and development
 */

import type { Provider } from '@/lib/core/domain/entities';
import { randomBetween } from '@/lib/core/shared/utils/number';
import { randomItem } from '@/lib/core/shared/utils';

// Provider templates
const providerTemplates = [
  { name: 'NetEnt', description: 'Leading provider of premium gaming solutions' },
  { name: 'Microgaming', description: 'Pioneer in online casino software' },
  { name: 'Play\'n GO', description: 'Award-winning game developer' },
  { name: 'Pragmatic Play', description: 'Multi-product content provider' },
  { name: 'Evolution Gaming', description: 'World leader in live casino' },
  { name: 'Yggdrasil', description: 'Innovative iGaming solutions' },
  { name: 'Quickspin', description: 'Premium slot game developer' },
  { name: 'Red Tiger', description: 'Daily jackpots and innovative slots' },
  { name: 'Big Time Gaming', description: 'Creator of Megaways mechanics' },
  { name: 'NoLimit City', description: 'Provocative and innovative games' },
  { name: 'Push Gaming', description: 'Player-first game development' },
  { name: 'Relax Gaming', description: 'B2B supplier with diverse portfolio' },
  { name: 'Thunderkick', description: 'Quality over quantity approach' },
  { name: 'ELK Studios', description: 'Mobile-first game design' },
  { name: 'Hacksaw Gaming', description: 'Scratch cards and slots' },
  { name: 'Nolimit City', description: 'High volatility specialists' },
  { name: 'Blueprint Gaming', description: 'Part of Gauselmann Group' },
  { name: 'Playtech', description: 'Industry giant with vast portfolio' },
  { name: 'IGT', description: 'Land-based and online gaming leader' },
  { name: 'Aristocrat', description: 'Australian gaming powerhouse' }
];

/**
 * Generate a single provider
 */
function generateProvider(
  id: string = `provider-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  options: Partial<Provider> = {}
): Provider {
  const template = options.name 
    ? providerTemplates.find(p => p.name === options.name) || providerTemplates[0]
    : randomItem(providerTemplates) || providerTemplates[0];
  
  const gameCount = options.gameCount ?? randomBetween(10, 200);
  const isActive = options.isActive ?? true;
  const isFeatured = options.isFeatured ?? Math.random() > 0.7; // 30% chance
  
  return {
    id,
    name: options.name || template.name,
    logo: options.logo || `https://picsum.photos/seed/${id}/100/100`,
    gameCount,
    description: options.description || template.description,
    website: options.website || `https://www.${template.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
    isActive,
    isFeatured,
    createdAt: options.createdAt || new Date(Date.now() - randomBetween(0, 365) * 24 * 60 * 60 * 1000),
    updatedAt: options.updatedAt || new Date()
  };
}

/**
 * Generate multiple providers
 */
function generateProviders(count: number = 10): Provider[] {
  const providers: Provider[] = [];
  const usedNames = new Set<string>();
  const availableTemplates = [...providerTemplates];
  
  for (let i = 0; i < Math.min(count, availableTemplates.length); i++) {
    const template = availableTemplates[i];
    const provider = generateProvider(`provider-${i + 1}`, {
      name: template.name,
      description: template.description
    });
    providers.push(provider);
    usedNames.add(provider.name);
  }
  
  // If we need more providers than templates, generate variations
  if (count > availableTemplates.length) {
    for (let i = availableTemplates.length; i < count; i++) {
      const baseTemplate = randomItem(availableTemplates)!;
      const provider = generateProvider(`provider-${i + 1}`, {
        name: `${baseTemplate.name} ${i - availableTemplates.length + 2}`,
        description: baseTemplate.description
      });
      providers.push(provider);
    }
  }
  
  return providers;
}

/**
 * Generate featured providers
 */
function generateFeaturedProviders(count: number = 5): Provider[] {
  const allProviders = generateProviders(Math.max(count * 2, 10));
  return allProviders
    .map(p => ({ ...p, isFeatured: true }))
    .slice(0, count);
}

/**
 * Generate providers with game counts
 */
function generateProvidersWithGames(): Provider[] {
  return [
    generateProvider('netent', { name: 'NetEnt', gameCount: 150, isFeatured: true }),
    generateProvider('microgaming', { name: 'Microgaming', gameCount: 200, isFeatured: true }),
    generateProvider('playngo', { name: 'Play\'n GO', gameCount: 120 }),
    generateProvider('pragmatic', { name: 'Pragmatic Play', gameCount: 180, isFeatured: true }),
    generateProvider('evolution', { name: 'Evolution Gaming', gameCount: 80 }),
    generateProvider('yggdrasil', { name: 'Yggdrasil', gameCount: 60 }),
    generateProvider('quickspin', { name: 'Quickspin', gameCount: 40 }),
    generateProvider('redtiger', { name: 'Red Tiger', gameCount: 90 }),
    generateProvider('btg', { name: 'Big Time Gaming', gameCount: 30, isFeatured: true }),
    generateProvider('nolimit', { name: 'NoLimit City', gameCount: 35 })
  ];
}

/**
 * Get sample provider for testing
 */
export function getSampleProvider(): Provider {
  return {
    id: 'sample-provider-1',
    name: 'Stellar Games',
    logo: 'https://picsum.photos/seed/stellar-games/100/100',
    gameCount: 42,
    description: 'Innovative game studio creating immersive gaming experiences',
    website: 'https://www.stellargames.com',
    isActive: true,
    isFeatured: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date()
  };
}

/**
 * Get provider statistics
 */
function generateProviderStats(providers: Provider[]): {
  totalProviders: number;
  activeProviders: number;
  featuredProviders: number;
  totalGames: number;
  averageGamesPerProvider: number;
} {
  const stats = {
    totalProviders: providers.length,
    activeProviders: providers.filter(p => p.isActive).length,
    featuredProviders: providers.filter(p => p.isFeatured).length,
    totalGames: providers.reduce((sum, p) => sum + (p.gameCount || 0), 0),
    averageGamesPerProvider: 0
  };
  
  stats.averageGamesPerProvider = stats.totalProviders > 0 
    ? Math.round(stats.totalGames / stats.totalProviders)
    : 0;
  
  return stats;
}

/* ============================================
   EXPORTS WITH CONSISTENT NAMING
   ============================================ */

// Primary exports with new naming convention
export const generateMockProvider = generateProvider;
export const generateMockProviders = generateProviders;

// Legacy exports for backward compatibility
export {
  generateProvider,
  generateProviders,
  generateFeaturedProviders,
  generateProvidersWithGames,
  generateProviderStats
};