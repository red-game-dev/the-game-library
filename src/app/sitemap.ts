import type { MetadataRoute } from 'next';
import { ROUTES, ROUTE_CONFIGS, type RouteValue } from '@/lib/core/config/constants/routes.constants';
import { fetchGames } from '@/lib/core/frontend/api/games/fetchers/GET';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://redgame.dev';

/**
 * Union types are imported from routes.constants for type safety
 * This ensures TypeScript will error if we forget to add SEO config for any route
 * 
 * When you add a new route to ROUTES in routes.constants.tsx:
 * 1. TypeScript will immediately show an error here
 * 2. You MUST add the new route to routePriorities object below
 * 3. This prevents forgetting SEO configuration for new routes
 */

/**
 * SEO Configuration for Routes
 * Interface to ensure all route priorities are properly typed
 */
interface RouteSEOConfig {
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastModified: Date;
}

/**
 * Helper function to create SEO config with default values
 * Makes it easier to add new routes with consistent settings
 */
const createSEOConfig = (
  priority: number, 
  changeFreq: RouteSEOConfig['changeFrequency'], 
  daysAgo: number = 30
): RouteSEOConfig => ({
  priority,
  changeFrequency: changeFreq,
  lastModified: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
});

/**
 * Route Priorities Configuration
 * TypeScript will enforce that ALL routes from ROUTES constant are included here
 * When adding new routes, add them here with appropriate SEO settings
 * 
 * Dynamic pages implemented:
 * - Individual game pages: /games/[slug] (priority: 0.6, weekly updates)
 * 
 * Future dynamic pages (when implemented):
 * - Provider pages: /providers/[slug] (priority: 0.5, monthly updates)
 * - Category pages: /games/category/[category] (priority: 0.7, weekly updates)
 * 
 * Priority Guidelines:
 * - 1.0: Homepage (most important)
 * - 0.8-0.9: Main feature pages (games, trending)
 * - 0.6-0.7: Secondary features (VIP, tournaments)
 * - 0.4-0.5: Company/info pages
 * - 0.2-0.3: Legal pages
 * 
 * Change Frequency Guidelines:
 * - daily: Content changes frequently (homepage, games)
 * - weekly: Regular updates (features, promotions)
 * - monthly: Occasional updates (help, company info)
 * - yearly: Rarely changes (legal, terms)
 */
const routePriorities: Record<RouteValue, RouteSEOConfig> = {
  // High priority pages - updated frequently
  [ROUTES.HOME]: createSEOConfig(1.0, 'daily', 0),
  [ROUTES.GAMES]: createSEOConfig(0.9, 'daily', 0),
  [ROUTES.TRENDING]: createSEOConfig(0.8, 'daily', 0),
  
  // Feature pages - updated weekly
  [ROUTES.VIP]: createSEOConfig(0.7, 'weekly', 7),
  [ROUTES.TOURNAMENTS]: createSEOConfig(0.7, 'weekly', 7),
  [ROUTES.PROMOTIONS]: createSEOConfig(0.8, 'weekly', 7),
  [ROUTES.COMMUNITY]: createSEOConfig(0.6, 'weekly', 7),
  
  // Support pages - updated monthly
  [ROUTES.HELP]: createSEOConfig(0.6, 'monthly', 30),
  [ROUTES.FAQ]: createSEOConfig(0.6, 'monthly', 30),
  
  // Company pages - updated monthly
  [ROUTES.ABOUT]: createSEOConfig(0.5, 'monthly', 30),
  [ROUTES.CONTACT]: createSEOConfig(0.5, 'monthly', 30),
  [ROUTES.CAREERS]: createSEOConfig(0.5, 'monthly', 30),
  [ROUTES.PRESS]: createSEOConfig(0.5, 'monthly', 30),
  
  // Business pages - updated monthly
  [ROUTES.AFFILIATES]: createSEOConfig(0.6, 'monthly', 30),
  [ROUTES.PARTNERS]: createSEOConfig(0.5, 'monthly', 30),
  
  // Legal pages - updated yearly
  [ROUTES.TERMS]: createSEOConfig(0.3, 'yearly', 365),
  [ROUTES.PRIVACY]: createSEOConfig(0.3, 'yearly', 365),
  [ROUTES.COOKIES]: createSEOConfig(0.3, 'yearly', 365),
  [ROUTES.RESPONSIBLE_GAMING]: createSEOConfig(0.4, 'yearly', 365),
  
  // Auth & Profile pages - excluded from sitemap but required by type system
  [ROUTES.LOGIN]: createSEOConfig(0.1, 'yearly', 365),      // Won't appear in sitemap due to exclusion filter
  [ROUTES.REGISTER]: createSEOConfig(0.1, 'yearly', 365),   // Won't appear in sitemap due to exclusion filter
  [ROUTES.PROFILE]: createSEOConfig(0.1, 'yearly', 365),    // Won't appear in sitemap due to exclusion filter
  [ROUTES.SETTINGS]: createSEOConfig(0.1, 'yearly', 365),   // Won't appear in sitemap due to exclusion filter
  [ROUTES.FAVORITES]: createSEOConfig(0.1, 'yearly', 365),  // Won't appear in sitemap due to exclusion filter
};

/**
 * Default SEO config for routes not explicitly defined
 */
const DEFAULT_SEO_CONFIG: RouteSEOConfig = createSEOConfig(0.5, 'monthly', 30);

/**
 * Routes to exclude from sitemap
 * Add route patterns here that should not appear in search engines
 */
const EXCLUDED_ROUTE_PATTERNS = [
  'login',
  'register', 
  'profile',
  'settings',
  'favorites'
];

/**
 * Fetch all games from API for sitemap generation using existing fetcher
 */
async function fetchAllGames() {
  try {
    const response = await fetchGames({
      page: 1,
      pageSize: 1000, // Get all games for sitemap
    });
    return response.games;
  } catch (error) {
    console.warn('Failed to fetch games for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Generate sitemap entries automatically from ROUTE_CONFIGS
  const staticPages: MetadataRoute.Sitemap = Object.entries(ROUTE_CONFIGS)
    .filter(([path]) => {
      // Exclude auth pages and private pages from sitemap
      return !EXCLUDED_ROUTE_PATTERNS.some(pattern => path.includes(pattern));
    })
    .map(([path]) => {
      // Get SEO configuration for this route, or use defaults
      // Cast path to RouteValue since we know it comes from ROUTE_CONFIGS
      const seoConfig = routePriorities[path as RouteValue] || DEFAULT_SEO_CONFIG;

      return {
        url: `${BASE_URL}${path}`,
        lastModified: seoConfig.lastModified,
        changeFrequency: seoConfig.changeFrequency,
        priority: seoConfig.priority,
      };
    });

  // TODO: Add dynamic pages when implementing game slug routes
  // We already have APIs for games - implementing dynamic game pages
  try {
    const games = await fetchAllGames();
    const dynamicPages = games
      .filter(game => game.slug) // Only include games with slugs
      .map(game => ({
        url: `${BASE_URL}/games/${game.slug}`,
        lastModified: new Date(game.updatedAt || game.createdAt || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));

    return [...staticPages, ...dynamicPages];
  } catch (error) {
    console.warn('Failed to generate dynamic sitemap pages:', error);
    // Return only static pages if dynamic generation fails
    return staticPages;
  }
}