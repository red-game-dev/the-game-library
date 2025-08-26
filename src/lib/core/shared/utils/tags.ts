/**
 * Tag Utility Functions
 * Helper functions for working with tags
 */

import type { TagCategory } from '@/lib/core/shared/types/tags';

/**
 * Type guard to check if a value is a valid TagCategory
 */
export function isTagCategory(value: string): value is TagCategory {
  return ['feature', 'theme', 'mechanic', 'style'].includes(value);
}

/**
 * Check if a tag name matches a specific category pattern
 */
export function isFeatureTag(tagName: string): boolean {
  const featurePatterns = [
    'wild', 'spin', 'bonus', 'multiplier', 'scatter', 
    'expanding', 'sticky', 'progressive', 'jackpot', 'megaways',
    'cascading', 'respin', 'hold', 'win', 'buy', 'gamble'
  ];
  
  const normalizedTag = tagName.toLowerCase();
  return featurePatterns.some(pattern => normalizedTag.includes(pattern));
}

/**
 * Check if a tag name matches a theme pattern
 */
export function isThemeTag(tagName: string): boolean {
  const themePatterns = [
    'mythology', 'ancient', 'egyptian', 'greek', 'norse', 
    'adventure', 'fantasy', 'space', 'pirate', 'western',
    'asian', 'chinese', 'japanese', 'luxury', 'retro'
  ];
  
  const normalizedTag = tagName.toLowerCase();
  return themePatterns.some(pattern => normalizedTag.includes(pattern));
}

/**
 * Check if a tag name matches a mechanic pattern
 */
export function isMechanicTag(tagName: string): boolean {
  const mechanicPatterns = [
    'reel', 'payline', 'cluster', 'avalanche', 'way',
    'grid', 'drop', 'tumble', 'lock', 'collect'
  ];
  
  const normalizedTag = tagName.toLowerCase();
  return mechanicPatterns.some(pattern => normalizedTag.includes(pattern));
}

/**
 * Check if a tag name matches a style pattern
 */
export function isStyleTag(tagName: string): boolean {
  const stylePatterns = [
    'classic', 'modern', 'animated', 'realistic', 'cartoon',
    'minimalist', 'detailed', 'vibrant', 'dark', 'light'
  ];
  
  const normalizedTag = tagName.toLowerCase();
  return stylePatterns.some(pattern => normalizedTag.includes(pattern));
}

/**
 * Validate if a tag name is properly formatted
 */
export function isValidTagName(tagName: string): boolean {
  if (!tagName || typeof tagName !== 'string') return false;
  
  const trimmed = tagName.trim();
  
  // Check length constraints
  if (trimmed.length < 2 || trimmed.length > 50) return false;
  
  // Check for valid characters (letters, numbers, hyphens, spaces)
  const validPattern = /^[a-zA-Z0-9\s-]+$/;
  return validPattern.test(trimmed);
}

/**
 * Normalize a tag name for consistency
 */
export function normalizeTagName(tagName: string): string {
  return tagName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}