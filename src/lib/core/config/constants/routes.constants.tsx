/**
 * Centralized route constants for the application
 * All navigation items and routes should be defined here
 */

import React from 'react';
import { 
  Home, 
  Gamepad2, 
  Trophy, 
  Tag, 
  Sparkles, 
  Users, 
  HelpCircle,
  Mail,
  TrendingUp,
  Handshake,
  Newspaper,
  Briefcase,
  Info,
  Shield,
  ScrollText,
  Cookie,
  Heart,
  LogIn,
  UserPlus,
  MessageCircle
} from 'lucide-react';
import type { ReactNode } from 'react';

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  isExternal?: boolean;
  requiresAuth?: boolean;
  badge?: string;
  badgeIcon?: ReactNode;
  badgeVariant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export interface RouteConfig {
  path: string;
  label: string;
  icon?: ReactNode;
  description?: string;
  comingSoon?: boolean;
  requiresAuth?: boolean;
  comingSoonConfig?: {
    title: string;
    description: string;
    icon?: ReactNode;
    gradientFrom?: string;
    gradientTo?: string;
  };
}

/**
 * Application routes configuration
 */
export const ROUTES = {
  HOME: '/',
  GAMES: '/games',
  VIP: '/vip',
  TOURNAMENTS: '/tournaments',
  PROMOTIONS: '/promotions',
  TRENDING: '/trending',
  COMMUNITY: '/community',
  HELP: '/help',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  LOGIN: '/login',
  REGISTER: '/register',
  FAVORITES: '/favorites',
  // Footer links
  ABOUT: '/about',
  CAREERS: '/careers',
  PRESS: '/press',
  PARTNERS: '/partners',
  AFFILIATES: '/affiliates',
  CONTACT: '/contact',
  FAQ: '/faq',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  COOKIES: '/cookies',
  RESPONSIBLE_GAMING: '/responsible-gaming',
} as const;

// Union types for type safety
export type RouteKey = keyof typeof ROUTES;
export type RouteValue = (typeof ROUTES)[RouteKey];

/**
 * Route variations with query parameters
 * These are not actual routes but common variations
 */
export const ROUTE_VARIANTS = {
  GAMES_WITH_FAVORITES: `${ROUTES.GAMES}?favorites=true`,
  GAMES_NEW: `${ROUTES.GAMES}?new=true`,
  GAMES_HOT: `${ROUTES.GAMES}?hot=true`,
  GAMES_SLOTS: `${ROUTES.GAMES}?types=slots`,
  GAMES_LIVE: `${ROUTES.GAMES}?types=live`,
  GAMES_TABLE: `${ROUTES.GAMES}?types=table`,
} as const;

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/thegamelibrary',
  FACEBOOK: 'https://facebook.com/thegamelibrary',
  INSTAGRAM: 'https://instagram.com/thegamelibrary',
  YOUTUBE: 'https://youtube.com/thegamelibrary',
  GITHUB: 'https://github.com/thegamelibrary',
} as const;

/**
 * Route configurations for navigation and coming soon pages
 * TypeScript enforces that ALL routes from ROUTES constant are included here
 */
export const ROUTE_CONFIGS: Record<RouteValue, RouteConfig> = {
  [ROUTES.HOME]: {
    path: ROUTES.HOME,
    label: 'Home',
    icon: <Home className="w-4 h-4" />,
    description: 'Welcome to The Game Library',
  },
  [ROUTES.GAMES]: {
    path: ROUTES.GAMES,
    label: 'Games',
    icon: <Gamepad2 className="w-4 h-4" />,
    description: 'Browse our game collection',
  },
  [ROUTES.VIP]: {
    path: ROUTES.VIP,
    label: 'VIP',
    icon: <Sparkles className="w-4 h-4" />,
    description: 'Exclusive VIP benefits',
    comingSoon: true,
    requiresAuth: true,
    comingSoonConfig: {
      title: 'VIP Program',
      description: 'Exclusive rewards and benefits are being prepared for our most valued players.',
      icon: <Sparkles className="w-16 h-16" />,
      gradientFrom: '#FFD700',
      gradientTo: '#FFA500'
    },
  },
  [ROUTES.TOURNAMENTS]: {
    path: ROUTES.TOURNAMENTS,
    label: 'Tournaments',
    icon: <Trophy className="w-4 h-4" />,
    description: 'Compete in tournaments',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Tournaments',
      description: 'Epic gaming tournaments with amazing prizes are coming soon.',
      icon: <Trophy className="w-16 h-16" />,
      gradientFrom: '#667eea',
      gradientTo: '#764ba2'
    },
  },
  [ROUTES.PROMOTIONS]: {
    path: ROUTES.PROMOTIONS,
    label: 'Promotions',
    icon: <Tag className="w-4 h-4" />,
    description: 'Latest promotions and offers',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Promotions',
      description: 'Amazing bonuses and special offers are on the way.',
      icon: <Tag className="w-16 h-16" />,
      gradientFrom: '#fa709a',
      gradientTo: '#fee140'
    },
  },
  [ROUTES.COMMUNITY]: {
    path: ROUTES.COMMUNITY,
    label: 'Community',
    icon: <Users className="w-4 h-4" />,
    description: 'Connect with other players',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Community Hub',
      description: 'Connect with fellow gamers. Our community features are in development.',
      icon: <Users className="w-16 h-16" />,
      gradientFrom: '#4facfe',
      gradientTo: '#00f2fe'
    },
  },
  [ROUTES.HELP]: {
    path: ROUTES.HELP,
    label: 'Help',
    icon: <HelpCircle className="w-4 h-4" />,
    description: 'Get help and support',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Help Center',
      description: 'Comprehensive support and guides are being prepared.',
      icon: <HelpCircle className="w-16 h-16" />,
      gradientFrom: '#43e97b',
      gradientTo: '#38f9d7'
    },
  },
  [ROUTES.TRENDING]: {
    path: ROUTES.TRENDING,
    label: 'Trending',
    icon: <Trophy className="w-4 h-4" />,
    description: 'See what\'s trending',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Trending Games',
      description: 'Discover what everyone is playing. This feature is being crafted.',
      icon: <Trophy className="w-16 h-16" />,
      gradientFrom: '#f093fb',
      gradientTo: '#f5576c'
    },
  },
  [ROUTES.CONTACT]: {
    path: ROUTES.CONTACT,
    label: 'Contact',
    icon: <Mail className="w-4 h-4" />,
    description: 'Get in touch with us',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Contact Us',
      description: 'We\'re setting up multiple ways for you to reach us. Support channels coming soon.',
      icon: <Mail className="w-16 h-16" />,
      gradientFrom: '#4facfe',
      gradientTo: '#00f2fe'
    },
  },
  [ROUTES.AFFILIATES]: {
    path: ROUTES.AFFILIATES,
    label: 'Affiliates',
    icon: <TrendingUp className="w-4 h-4" />,
    description: 'Join our affiliate program',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Affiliate Program',
      description: 'Join our lucrative affiliate program. Earn commissions by promoting The Game Library.',
      icon: <TrendingUp className="w-16 h-16" />,
      gradientFrom: '#fa709a',
      gradientTo: '#fee140'
    },
  },
  [ROUTES.PARTNERS]: {
    path: ROUTES.PARTNERS,
    label: 'Partners',
    icon: <Handshake className="w-4 h-4" />,
    description: 'Strategic partnerships',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Strategic Partners',
      description: 'Connect with our network of industry-leading partners and explore collaboration opportunities.',
      icon: <Handshake className="w-16 h-16" />,
      gradientFrom: '#f093fb',
      gradientTo: '#f5576c'
    },
  },
  [ROUTES.PRESS]: {
    path: ROUTES.PRESS,
    label: 'Press',
    icon: <Newspaper className="w-4 h-4" />,
    description: 'Press and media resources',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Press & Media',
      description: 'Media kit, press releases, and news coverage. Everything journalists need in one place.',
      icon: <Newspaper className="w-16 h-16" />,
      gradientFrom: '#a8edea',
      gradientTo: '#fed6e3'
    },
  },
  [ROUTES.CAREERS]: {
    path: ROUTES.CAREERS,
    label: 'Careers',
    icon: <Briefcase className="w-4 h-4" />,
    description: 'Join our team',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Careers',
      description: 'Join our passionate team building the future of gaming entertainment. Exciting opportunities await.',
      icon: <Briefcase className="w-16 h-16" />,
      gradientFrom: '#667eea',
      gradientTo: '#764ba2'
    },
  },
  [ROUTES.ABOUT]: {
    path: ROUTES.ABOUT,
    label: 'About Us',
    icon: <Info className="w-4 h-4" />,
    description: 'Learn about The Game Library',
    comingSoon: true,
    comingSoonConfig: {
      title: 'About Us',
      description: 'Learn about our mission, values, and the team behind The Game Library.',
      icon: <Info className="w-16 h-16" />,
      gradientFrom: '#84fab0',
      gradientTo: '#8fd3f4'
    },
  },
  [ROUTES.PRIVACY]: {
    path: ROUTES.PRIVACY,
    label: 'Privacy Policy',
    icon: <Shield className="w-4 h-4" />,
    description: 'Our privacy policy',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Privacy Policy',
      description: 'Your privacy matters. Learn how we protect and handle your personal information.',
      icon: <Shield className="w-16 h-16" />,
      gradientFrom: '#6a11cb',
      gradientTo: '#2575fc'
    },
  },
  [ROUTES.TERMS]: {
    path: ROUTES.TERMS,
    label: 'Terms of Service',
    icon: <ScrollText className="w-4 h-4" />,
    description: 'Terms and conditions',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Terms of Service',
      description: 'Read our terms and conditions for using The Game Library platform.',
      icon: <ScrollText className="w-16 h-16" />,
      gradientFrom: '#ff6e7f',
      gradientTo: '#bfe9ff'
    },
  },
  [ROUTES.COOKIES]: {
    path: ROUTES.COOKIES,
    label: 'Cookie Policy',
    icon: <Cookie className="w-4 h-4" />,
    description: 'How we use cookies',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Cookie Policy',
      description: 'Learn how we use cookies to enhance your gaming experience.',
      icon: <Cookie className="w-16 h-16" />,
      gradientFrom: '#fccb90',
      gradientTo: '#d57eeb'
    },
  },
  [ROUTES.RESPONSIBLE_GAMING]: {
    path: ROUTES.RESPONSIBLE_GAMING,
    label: 'Play Safe',
    icon: <Heart className="w-4 h-4" />,
    description: 'Play responsibly',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Play Safe',
      description: 'Gaming should be fun. Learn about our tools and resources for responsible play.',
      icon: <Heart className="w-16 h-16" />,
      gradientFrom: '#f77062',
      gradientTo: '#fe5196'
    },
  },
  [ROUTES.LOGIN]: {
    path: ROUTES.LOGIN,
    label: 'Sign In',
    icon: <LogIn className="w-4 h-4" />,
    description: 'Sign in to your account',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Sign In',
      description: 'Login to access your account, track progress, and unlock exclusive features.',
      icon: <LogIn className="w-16 h-16" />,
      gradientFrom: '#667eea',
      gradientTo: '#764ba2'
    },
  },
  [ROUTES.REGISTER]: {
    path: ROUTES.REGISTER,
    label: 'Create Account',
    icon: <UserPlus className="w-4 h-4" />,
    description: 'Create a new account',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Create Account',
      description: 'Join The Game Library and start your gaming adventure with exclusive welcome bonuses.',
      icon: <UserPlus className="w-16 h-16" />,
      gradientFrom: '#a1c4fd',
      gradientTo: '#c2e9fb'
    },
  },
  [ROUTES.FAQ]: {
    path: ROUTES.FAQ,
    label: 'FAQs',
    icon: <MessageCircle className="w-4 h-4" />,
    description: 'Frequently asked questions',
    comingSoon: true,
    comingSoonConfig: {
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions about The Game Library.',
      icon: <MessageCircle className="w-16 h-16" />,
      gradientFrom: '#fbc2eb',
      gradientTo: '#a6c1ee'
    },
  },
  [ROUTES.PROFILE]: {
    path: ROUTES.PROFILE,
    label: 'Profile',
    icon: <Home className="w-4 h-4" />,
    description: 'Your account profile',
    requiresAuth: true,
  },
  [ROUTES.SETTINGS]: {
    path: ROUTES.SETTINGS,
    label: 'Settings',
    icon: <Home className="w-4 h-4" />,
    description: 'Account settings',
    requiresAuth: true,
  },
  [ROUTES.FAVORITES]: {
    path: ROUTES.FAVORITES,
    label: 'Favorites',
    icon: <Heart className="w-4 h-4" />,
    description: 'Your favorite games',
    requiresAuth: true,
  },
};

/**
 * Main navigation items for header/drawer
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'home',
    label: ROUTE_CONFIGS[ROUTES.HOME].label,
    href: ROUTES.HOME,
    icon: ROUTE_CONFIGS[ROUTES.HOME].icon,
  },
  {
    id: 'games',
    label: ROUTE_CONFIGS[ROUTES.GAMES].label,
    href: ROUTES.GAMES,
    icon: ROUTE_CONFIGS[ROUTES.GAMES].icon,
  },
  {
    id: 'vip',
    label: ROUTE_CONFIGS[ROUTES.VIP].label,
    href: ROUTES.VIP,
    icon: ROUTE_CONFIGS[ROUTES.VIP].icon,
    badge: 'Soon',
    badgeIcon: <Sparkles className="w-3 h-3" />,
    badgeVariant: 'primary',
  },
  {
    id: 'tournaments',
    label: ROUTE_CONFIGS[ROUTES.TOURNAMENTS].label,
    href: ROUTES.TOURNAMENTS,
    icon: ROUTE_CONFIGS[ROUTES.TOURNAMENTS].icon,
    badge: 'Soon',
    badgeIcon: <Sparkles className="w-3 h-3" />,
    badgeVariant: 'primary',
  },
  {
    id: 'community',
    label: ROUTE_CONFIGS[ROUTES.COMMUNITY].label,
    href: ROUTES.COMMUNITY,
    icon: ROUTE_CONFIGS[ROUTES.COMMUNITY].icon,
    badge: 'Soon',
    badgeIcon: <Sparkles className="w-3 h-3" />,
    badgeVariant: 'primary',
  },
];

/**
 * Footer navigation items
 */
export const FOOTER_NAVIGATION = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Partners', href: '/partners' },
  ],
  support: [
    { label: 'Help Center', href: ROUTES.HELP },
    { label: 'Safety', href: '/safety' },
    { label: 'Terms', href: '/terms' },
    { label: 'Privacy', href: '/privacy' },
  ],
  social: [
    { label: 'Twitter', href: 'https://twitter.com', isExternal: true },
    { label: 'Discord', href: 'https://discord.com', isExternal: true },
    { label: 'YouTube', href: 'https://youtube.com', isExternal: true },
    { label: 'Twitch', href: 'https://twitch.tv', isExternal: true },
  ],
};

/**
 * Get route configuration by path
 */
export function getRouteConfig(path: string): RouteConfig | undefined {
  return ROUTE_CONFIGS[path as RouteValue];
}

/**
 * Get navigation item by ID
 */
export function getNavigationItem(id: string): NavigationItem | undefined {
  return NAVIGATION_ITEMS.find(item => item.id === id);
}

/**
 * Get route meta config - returns the full RouteConfig for any route
 * Can be used to get metadata, comingSoonConfig, or any other route configuration
 */
export function getRouteMetaConfig(path: string): RouteConfig | undefined {
  return getRouteConfig(path);
}

/**
 * Get Coming Soon config specifically
 */
export function getComingSoonConfig(path: string): RouteConfig['comingSoonConfig'] | undefined {
  const config = getRouteConfig(path);
  return config?.comingSoonConfig;
}