/**
 * Tag Constants
 * Centralized tag categories and definitions used across the application
 */

import { TagCategory } from "@/lib/core/shared/types";

/**
 * Tag category constants
 */
export const TAG_CATEGORIES = {
  FEATURE: 'feature' as TagCategory,
  THEME: 'theme' as TagCategory,
  MECHANIC: 'mechanic' as TagCategory,
  STYLE: 'style' as TagCategory,
} as const;

/**
 * Feature tags - Game features and special mechanics
 */
export const FEATURE_TAGS = [
  'wilds',
  'free-spins',
  'bonus',
  'multiplier',
  'scatter',
  'expanding',
  'expanding-wilds',
  'sticky',
  'sticky-wilds',
  'progressive',
  'jackpot',
  'megaways',
  'cascading',
  'respins',
  'hold-and-win',
  'buy-feature',
  'gamble',
  'colossal-symbols',
  'walking-wilds',
  'random-wilds',
  'stacked-symbols',
] as const;

/**
 * Theme tags - Visual and story themes
 */
export const THEME_TAGS = [
  'mythology',
  'ancient',
  'egyptian',
  'greek',
  'norse',
  'asian',
  'chinese',
  'japanese',
  'fantasy',
  'adventure',
  'space',
  'sci-fi',
  'movie',
  'tv-show',
  'music',
  'rock',
  'luxury',
  'money',
  'gold',
  'gems',
  'nature',
  'animals',
  'wildlife',
  'underwater',
  'ocean',
  'jungle',
  'safari',
  'fruit',
  'classic',
  'retro',
  'vintage',
  'sports',
  'football',
  'racing',
  'western',
  'pirates',
  'vikings',
  'medieval',
  'magic',
  'horror',
  'halloween',
  'christmas',
  'seasonal',
  'food',
  'candy',
  'irish',
  'lucky',
] as const;

/**
 * Mechanic tags - Game types and mechanics
 */
export const MECHANIC_TAGS = [
  'instant',
  'instant-win',
  'mines',
  'crash',
  'plinko',
  'dice',
  'wheel',
  'cards',
  'table',
  'live',
  'blackjack',
  'roulette',
  'baccarat',
  'poker',
  'video-poker',
  'sic-bo',
  'craps',
  'keno',
  'bingo',
  'scratch',
  'lottery',
  'virtual-sports',
] as const;

/**
 * Style tags - Visual style and gameplay feel
 */
export const STYLE_TAGS = [
  '3d',
  '2d',
  'cartoon',
  'realistic',
  'minimalist',
  'neon',
  'dark',
  'colorful',
  'cute',
  'serious',
  'fun',
  'relaxing',
  'intense',
  'high-volatility',
  'low-volatility',
  'medium-volatility',
  'mobile-optimized',
  'hd-graphics',
  'retro-style',
  'modern',
] as const;

/**
 * All tags combined
 */
export const ALL_TAGS = [
  ...FEATURE_TAGS,
  ...THEME_TAGS,
  ...MECHANIC_TAGS,
  ...STYLE_TAGS,
] as const;

export type FeatureTag = typeof FEATURE_TAGS[number];
export type ThemeTag = typeof THEME_TAGS[number];
export type MechanicTag = typeof MECHANIC_TAGS[number];
export type StyleTag = typeof STYLE_TAGS[number];
export type GameTag = typeof ALL_TAGS[number];

/**
 * Tag metadata for display and organization
 */
export const TAG_METADATA: Record<TagCategory, {
  label: string;
  description: string;
  icon?: string;
  color?: string;
}> = {
  feature: {
    label: 'Features',
    description: 'Special game features and bonuses',
    color: 'purple',
  },
  theme: {
    label: 'Themes',
    description: 'Visual and story themes',
    color: 'blue',
  },
  mechanic: {
    label: 'Game Type',
    description: 'Game mechanics and types',
    color: 'green',
  },
  style: {
    label: 'Style',
    description: 'Visual style and gameplay feel',
    color: 'orange',
  },
};

/**
 * Helper function to categorize a tag
 */
export function categorizeTag(tag: string): TagCategory {
  const normalizedTag = tag.toLowerCase().trim();
  
  if (FEATURE_TAGS.includes(normalizedTag as FeatureTag)) {
    return TAG_CATEGORIES.FEATURE;
  }
  
  if (THEME_TAGS.includes(normalizedTag as ThemeTag)) {
    return TAG_CATEGORIES.THEME;
  }
  
  if (MECHANIC_TAGS.includes(normalizedTag as MechanicTag)) {
    return TAG_CATEGORIES.MECHANIC;
  }
  
  if (STYLE_TAGS.includes(normalizedTag as StyleTag)) {
    return TAG_CATEGORIES.STYLE;
  }
  
  // Default to style for unknown tags
  return TAG_CATEGORIES.STYLE;
}

/**
 * Get tags by category
 */
export function getTagsByCategory(category: TagCategory): readonly string[] {
  switch (category) {
    case TAG_CATEGORIES.FEATURE:
      return FEATURE_TAGS;
    case TAG_CATEGORIES.THEME:
      return THEME_TAGS;
    case TAG_CATEGORIES.MECHANIC:
      return MECHANIC_TAGS;
    case TAG_CATEGORIES.STYLE:
      return STYLE_TAGS;
    default:
      return [];
  }
}

/**
 * Check if a tag exists in our defined tags
 */
export function isValidTag(tag: string): boolean {
  const normalizedTag = tag.toLowerCase().trim();
  return ALL_TAGS.includes(normalizedTag as GameTag);
}

/**
 * Format tag for display (converts kebab-case to Title Case)
 */
export function formatTagDisplay(tag: string): string {
  return tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Popular tags for quick filters
 */
export const POPULAR_TAGS = [
  'free-spins',
  'bonus',
  'megaways',
  'jackpot',
  'live',
  'instant',
  'egyptian',
  'adventure',
  'classic',
] as const;

/**
 * Tag combinations that often appear together
 */
export const TAG_COMBINATIONS = {
  'egyptian-adventure': ['egyptian', 'ancient', 'adventure', 'mystery'],
  'classic-fruit': ['classic', 'fruit', 'retro', '3-reels'],
  'asian-fortune': ['asian', 'chinese', 'lucky', 'gold'],
  'norse-mythology': ['norse', 'vikings', 'mythology', 'adventure'],
  'live-casino': ['live', 'table', 'cards', 'real-dealer'],
  'instant-games': ['instant', 'instant-win', 'scratch', 'quick'],
} as const;