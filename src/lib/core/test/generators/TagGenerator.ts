/**
 * Tag Data Generator
 * Generates mock tags for testing and development
 */

import { randomItems } from '@/lib/core/shared/utils';

// Comprehensive tag categories
const tagCategories = {
  gameplay: [
    'Popular',
    'New Release',
    'Trending',
    'Featured',
    'Hot',
    'Classic',
    'Exclusive',
    'Limited Time'
  ],
  features: [
    'Free Spins',
    'Bonus Buy',
    'Megaways',
    'Wild Features',
    'Scatter Symbols',
    'Multipliers',
    'Expanding Wilds',
    'Sticky Wilds',
    'Cascading Reels',
    'Hold & Win',
    'Re-spins',
    'Symbol Upgrade'
  ],
  volatility: [
    'High Volatility',
    'Medium Volatility',
    'Low Volatility',
    'Variable Volatility'
  ],
  rtp: [
    'High RTP',
    'Above Average RTP',
    'Standard RTP',
    '96%+ RTP',
    '97%+ RTP'
  ],
  jackpot: [
    'Jackpot',
    'Progressive Jackpot',
    'Daily Jackpot',
    'Must Drop Jackpot',
    'Mini Jackpot',
    'Major Jackpot',
    'Grand Jackpot'
  ],
  theme: [
    'Adventure',
    'Fantasy',
    'Egyptian',
    'Asian',
    'Irish Luck',
    'Mythology',
    'Space',
    'Pirates',
    'Wild West',
    'Underwater',
    'Jungle',
    'Medieval',
    'Cyberpunk',
    'Horror',
    'Romance',
    'Sports',
    'Music',
    'Movies',
    'TV Shows',
    'Retro'
  ],
  special: [
    'Mobile Optimized',
    'HD Graphics',
    '3D Graphics',
    'VR Compatible',
    'Quick Spin',
    'Autoplay',
    'Turbo Mode',
    'Demo Available'
  ]
};

/**
 * Get all available tags
 */
export function getAllTags(): string[] {
  return Object.values(tagCategories).flat();
}

/**
 * Generate a random set of tags
 */
export function generateMockTags(count: number = 8): string[] {
  const allTags = getAllTags();
  return randomItems(allTags, Math.min(count, allTags.length));
}

/**
 * Generate tags by category
 */
export function generateTagsByCategory(category: keyof typeof tagCategories, count?: number): string[] {
  const categoryTags = tagCategories[category];
  if (count === undefined) {
    return [...categoryTags];
  }
  return randomItems(categoryTags, Math.min(count, categoryTags.length));
}

/**
 * Generate popular filter tags (commonly used in filter panels)
 */
export function generateFilterTags(): string[] {
  return [
    ...generateTagsByCategory('gameplay', 3),
    ...generateTagsByCategory('features', 3),
    ...generateTagsByCategory('rtp', 1),
    ...generateTagsByCategory('jackpot', 1)
  ];
}

/**
 * Generate tags for a specific game type
 */
export function generateTagsForGameType(gameType: 'slots' | 'table' | 'live' | 'instant' | 'jackpot'): string[] {
  switch (gameType) {
    case 'slots':
      return randomItems([
        ...tagCategories.features,
        ...tagCategories.volatility,
        ...tagCategories.rtp
      ], 3);
    
    case 'table':
      return randomItems([
        'Classic',
        'European',
        'American',
        'French',
        'VIP',
        'Low Stakes',
        'High Stakes',
        'Side Bets'
      ], 2);
    
    case 'live':
      return randomItems([
        'Live Dealer',
        'HD Stream',
        'Multiple Cameras',
        'Chat Feature',
        'VIP Tables',
        'Native Speaking',
        'Fast Dealing',
        'Side Bets'
      ], 3);
    
    case 'instant':
      return randomItems([
        'Quick Play',
        'Instant Win',
        'Scratch Cards',
        'Arcade Style',
        'Fast Paced',
        'Simple Rules'
      ], 2);
    
    case 'jackpot':
      return randomItems([
        ...tagCategories.jackpot,
        'High Stakes',
        'Life Changing',
        'Network Jackpot'
      ], 3);
    
    default:
      return generateMockTags(3);
  }
}

/**
 * Generate weighted tags (some tags appear more frequently)
 */
export function generateWeightedTags(count: number = 8): string[] {
  const weights = {
    'Popular': 5,
    'New Release': 4,
    'Free Spins': 4,
    'Bonus Buy': 3,
    'High RTP': 3,
    'Megaways': 2,
    'Jackpot': 2,
    'High Volatility': 2
  };
  
  const weightedTags: string[] = [];
  Object.entries(weights).forEach(([tag, weight]) => {
    for (let i = 0; i < weight; i++) {
      weightedTags.push(tag);
    }
  });
  
  // Add some random tags
  const remainingTags = getAllTags().filter(tag => !Object.keys(weights).includes(tag));
  weightedTags.push(...randomItems(remainingTags, 20));
  
  return randomItems(weightedTags, count);
}

/**
 * Get sample tags for testing
 */
export function getSampleTags(): string[] {
  return [
    'Popular',
    'New Release',
    'High RTP',
    'Bonus Buy',
    'Megaways',
    'Jackpot',
    'Free Spins',
    'Wild Features'
  ];
}