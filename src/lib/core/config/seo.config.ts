/**
 * SEO Configuration
 * Centralized metadata configuration for all pages
 */

import type { Metadata } from 'next';
import { ROUTES, ROUTE_CONFIGS, type RouteValue } from './constants/routes.constants';

// Base URL for the site
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://redgame.dev';

// Default metadata that applies to all pages
export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'The Game Library - Premium Crypto Gaming Platform',
    template: '%s | The Game Library'
  },
  description: 'Your ultimate crypto gaming destination. Play 1000+ casino games from top providers with instant crypto payments, live dealers, and exclusive bonuses.',
  keywords: ['crypto casino', 'online gaming', 'casino games', 'slots', 'live casino', 'bitcoin casino', 'ethereum gaming', 'crypto gambling', 'online slots', 'table games'],
  authors: [{ name: 'The Game Library Team' }],
  creator: 'The Game Library',
  publisher: 'The Game Library',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'The Game Library',
    title: 'The Game Library - Premium Crypto Gaming Platform',
    description: 'Play 1000+ casino games with instant crypto payments. Live dealers, exclusive bonuses, and provably fair gaming.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'The Game Library - Crypto Gaming Platform',
        type: 'image/svg+xml',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Game Library - Premium Crypto Gaming Platform',
    description: 'Play 1000+ casino games with instant crypto payments',
    site: '@thegamelibrary',
    creator: '@thegamelibrary',
    images: ['/twitter-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0e1a' }
  ],
};

/**
 * Generate base metadata for a specific page
 * Returns default metadata with path-specific URL
 */
export function generatePageMetadata(path: string): Metadata {
  return {
    ...defaultMetadata,
    openGraph: {
      ...defaultMetadata.openGraph,
      url: `${BASE_URL}${path}`,
    },
  };
}

/**
 * Page-specific metadata configurations
 * TypeScript enforces that ALL routes from ROUTES constant are included here
 * When adding new routes, add them here with appropriate SEO metadata
 */
export const pageMetadata: Record<RouteValue, Metadata> = {
  // Home page
  [ROUTES.HOME]: {
    ...generatePageMetadata(ROUTES.HOME),
    title: 'The Game Library - Premium Crypto Gaming Platform',
    description: 'Your ultimate crypto gaming destination. Play 1000+ casino games from top providers with instant crypto payments, live dealers, and exclusive bonuses.',
    keywords: ['crypto casino', 'online gaming', 'casino games', 'bitcoin gambling', 'ethereum casino', 'crypto slots'],
  },
  
  // Games page
  [ROUTES.GAMES]: {
    ...generatePageMetadata(ROUTES.GAMES),
    title: 'Play 1000+ Casino Games',
    description: 'Explore our massive collection of slots, table games, live casino, and instant win games from top providers. Instant crypto payments and provably fair gaming.',
    keywords: ['casino games', 'online slots', 'live dealer', 'table games', 'jackpot games', 'instant win', 'crypto casino', 'bitcoin slots', 'ethereum games'],
    openGraph: {
      ...generatePageMetadata(ROUTES.GAMES).openGraph,
      title: 'Play 1000+ Casino Games | The Game Library',
      description: 'Discover slots, table games, live casino and more. Instant crypto payments and exclusive bonuses.',
    },
  },
  
  // VIP page
  [ROUTES.VIP]: {
    ...generatePageMetadata(ROUTES.VIP),
    title: 'VIP Program - Exclusive Rewards & Benefits',
    description: 'Join our exclusive VIP program for premium benefits, personalized bonuses, dedicated account managers, and luxury rewards.',
    keywords: ['vip program', 'casino rewards', 'exclusive bonuses', 'premium benefits', 'loyalty program', 'high roller', 'vip casino'],
  },
  
  // Tournaments page
  [ROUTES.TOURNAMENTS]: {
    ...generatePageMetadata(ROUTES.TOURNAMENTS),
    title: 'Gaming Tournaments - Compete & Win Big',
    description: 'Compete in exciting tournaments with massive prize pools. Daily, weekly, and monthly competitions with leaderboards and exclusive rewards.',
    keywords: ['gaming tournaments', 'competitions', 'prize pools', 'leaderboards', 'casino tournaments', 'slot tournaments', 'competitive gaming'],
  },
  
  // Promotions page
  [ROUTES.PROMOTIONS]: {
    ...generatePageMetadata(ROUTES.PROMOTIONS),
    title: 'Promotions & Bonuses - Exclusive Offers',
    description: 'Discover amazing promotions, welcome bonuses up to 500%, reload offers, free spins, and exclusive crypto bonuses.',
    keywords: ['casino promotions', 'welcome bonus', 'reload bonus', 'free spins', 'cashback', 'crypto bonus', 'deposit bonus', 'no deposit bonus'],
  },
  
  // Community page
  [ROUTES.COMMUNITY]: {
    ...generatePageMetadata(ROUTES.COMMUNITY),
    title: 'Gaming Community Hub - Connect & Share',
    description: 'Connect with fellow gamers, share strategies, participate in community events, and join exclusive chat rooms.',
    keywords: ['gaming community', 'player forum', 'chat', 'social gaming', 'community events', 'player interaction', 'gaming social'],
  },
  
  // About page
  [ROUTES.ABOUT]: {
    ...generatePageMetadata(ROUTES.ABOUT),
    title: 'About Us - Our Story & Mission',
    description: 'Learn about The Game Library mission to revolutionize online gaming with blockchain technology, our team, and commitment to fair and responsible gaming.',
    keywords: ['about us', 'company', 'mission', 'team', 'provably fair', 'responsible gaming', 'blockchain gaming', 'crypto casino story'],
  },
  
  // Help page
  [ROUTES.HELP]: {
    ...generatePageMetadata(ROUTES.HELP),
    title: 'Help Center & 24/7 Support',
    description: 'Get help with account issues, game rules, payments, and more. 24/7 customer support via live chat, email, and comprehensive guides.',
    keywords: ['help center', 'support', 'customer service', 'FAQ', 'game guides', 'payment help', '24/7 support', 'live chat'],
  },
  
  // Trending page
  [ROUTES.TRENDING]: {
    ...generatePageMetadata(ROUTES.TRENDING),
    title: 'Trending Games - What\'s Hot Now',
    description: 'Discover what\'s hot right now. Play the most popular and trending casino games chosen by our community.',
    keywords: ['trending games', 'popular games', 'hot games', 'most played', 'trending slots', 'popular casino games', 'top games'],
  },
  
  // Login page
  [ROUTES.LOGIN]: {
    ...generatePageMetadata(ROUTES.LOGIN),
    title: 'Sign In - Access Your Account',
    description: 'Sign in to your Game Library account to play games, claim bonuses, track progress, and access exclusive features.',
    robots: {
      index: false,
      follow: false,
    },
  },
  
  // Register page
  [ROUTES.REGISTER]: {
    ...generatePageMetadata(ROUTES.REGISTER),
    title: 'Create Account - Join in Seconds',
    description: 'Join The Game Library in seconds. Get instant access to 1000+ games, exclusive welcome bonuses up to 500%, and start winning today.',
    robots: {
      index: false,
      follow: false,
    },
  },
  
  // Contact page
  [ROUTES.CONTACT]: {
    ...generatePageMetadata(ROUTES.CONTACT),
    title: 'Contact Us - Get in Touch',
    description: 'Get in touch with The Game Library team. Customer support, business inquiries, partnerships, and general questions. We\'re here to help 24/7.',
    keywords: ['contact', 'customer support', 'help', 'business inquiries', 'get in touch', 'support team', 'contact form'],
  },
  
  // Affiliates page
  [ROUTES.AFFILIATES]: {
    ...generatePageMetadata(ROUTES.AFFILIATES),
    title: 'Affiliate Program - Earn Up to 50% Revenue',
    description: 'Join our lucrative affiliate program and earn up to 50% revenue share. High conversion rates, real-time tracking, and dedicated support.',
    keywords: ['affiliate program', 'earn money', 'commissions', 'referrals', 'partnership', 'affiliate marketing', 'revenue share', 'crypto affiliates'],
  },
  
  // Partners page
  [ROUTES.PARTNERS]: {
    ...generatePageMetadata(ROUTES.PARTNERS),
    title: 'Strategic Partners - Collaborate with Us',
    description: 'Explore partnership opportunities with The Game Library. Game providers, payment processors, and technology partners welcome.',
    keywords: ['partners', 'collaborators', 'strategic partnerships', 'business partners', 'gaming partners', 'B2B', 'integration'],
  },
  
  // Press page
  [ROUTES.PRESS]: {
    ...generatePageMetadata(ROUTES.PRESS),
    title: 'Press & Media Center - Latest News',
    description: 'Latest news, press releases, media kit, and resources for journalists covering The Game Library and the crypto gaming industry.',
    keywords: ['press', 'media', 'news', 'press releases', 'media kit', 'journalists', 'press center', 'gaming news'],
  },
  
  // Careers page
  [ROUTES.CAREERS]: {
    ...generatePageMetadata(ROUTES.CAREERS),
    title: 'Careers - Join Our Growing Team',
    description: 'Join The Game Library team. Explore remote career opportunities in gaming, blockchain technology, customer experience, and more.',
    keywords: ['careers', 'jobs', 'hiring', 'employment', 'remote work', 'gaming careers', 'tech jobs', 'blockchain jobs'],
  },
  
  // Terms page
  [ROUTES.TERMS]: {
    ...generatePageMetadata(ROUTES.TERMS),
    title: 'Terms of Service - Legal Agreement',
    description: 'Read our comprehensive terms and conditions for using The Game Library platform. Player agreements, rules, and legal information.',
    keywords: ['terms of service', 'legal', 'agreement', 'terms and conditions', 'user agreement', 'platform rules'],
  },
  
  // Privacy page
  [ROUTES.PRIVACY]: {
    ...generatePageMetadata(ROUTES.PRIVACY),
    title: 'Privacy Policy - Data Protection',
    description: 'Learn how we protect your privacy and handle personal information. GDPR compliant, secure data handling, and transparent practices.',
    keywords: ['privacy policy', 'data protection', 'GDPR', 'personal information', 'data security', 'privacy rights'],
  },
  
  // Cookies page
  [ROUTES.COOKIES]: {
    ...generatePageMetadata(ROUTES.COOKIES),
    title: 'Cookie Policy - How We Use Cookies',
    description: 'Understand how we use cookies to enhance your gaming experience, remember preferences, and improve our platform.',
    keywords: ['cookie policy', 'cookies', 'tracking', 'preferences', 'data collection', 'cookie settings'],
  },
  
  // Responsible Gaming page
  [ROUTES.RESPONSIBLE_GAMING]: {
    ...generatePageMetadata(ROUTES.RESPONSIBLE_GAMING),
    title: 'Play Safe - Responsible Gaming Resources',
    description: 'Commitment to responsible gaming. Set deposit limits, self-exclude, reality checks, and access support resources for problem gambling.',
    keywords: ['responsible gaming', 'safe gambling', 'gaming limits', 'self exclusion', 'problem gambling help', 'play safe', 'gambling addiction'],
  },
  
  // FAQ page
  [ROUTES.FAQ]: {
    ...generatePageMetadata(ROUTES.FAQ),
    title: 'FAQs - Frequently Asked Questions',
    description: 'Find answers to common questions about accounts, games, payments, bonuses, security, and more. Comprehensive FAQ section.',
    keywords: ['FAQ', 'frequently asked questions', 'help', 'support', 'answers', 'common questions', 'how to', 'guides'],
  },

  // Profile page
  [ROUTES.PROFILE]: {
    ...generatePageMetadata(ROUTES.PROFILE),
    title: 'My Profile - Account Overview',
    description: 'Manage your account, view gaming stats, transaction history, and update preferences.',
    robots: {
      index: false,
      follow: false,
    },
  },

  // Settings page
  [ROUTES.SETTINGS]: {
    ...generatePageMetadata(ROUTES.SETTINGS),
    title: 'Account Settings - Preferences',
    description: 'Update account settings, gaming preferences, privacy controls, and security options.',
    robots: {
      index: false,
      follow: false,
    },
  },

  // Favorites page
  [ROUTES.FAVORITES]: {
    ...generatePageMetadata(ROUTES.FAVORITES),
    title: 'My Favorites - Saved Games',
    description: 'Access your favorite games and manage your saved game collection.',
    robots: {
      index: false,
      follow: false,
    },
  },
};

/**
 * Generate dynamic metadata for game pages
 */
export function generateGameMetadata(gameSlug: string, gameTitle: string, gameDescription?: string): Metadata {
  return {
    ...defaultMetadata,
    title: `${gameTitle} - Play Now`,
    description: gameDescription || `Play ${gameTitle} at The Game Library. Instant crypto payments, provably fair gaming, and exclusive bonuses.`,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: `${gameTitle} | The Game Library`,
      description: gameDescription || `Play ${gameTitle} with crypto. Join now for exclusive bonuses and instant payouts.`,
      url: `${BASE_URL}${ROUTES.GAMES}/${gameSlug}`,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: `${gameTitle} | The Game Library`,
      description: gameDescription || `Play ${gameTitle} with crypto at The Game Library.`,
    },
  };
}

/**
 * JSON-LD structured data for rich snippets and SEO
 */
export const jsonLdData = {
  // Organization schema
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Game Library',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    description: 'Premium crypto gaming platform offering 1000+ casino games with instant payments.',
    sameAs: [
      'https://twitter.com/thegamelibrary',
      'https://facebook.com/thegamelibrary',
      'https://instagram.com/thegamelibrary',
      'https://youtube.com/thegamelibrary',
      'https://discord.gg/thegamelibrary',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-GAME-LIB',
      contactType: 'customer service',
      availableLanguage: ['English'],
      areaServed: 'Worldwide',
    },
  },
  
  // Website schema with search action
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The Game Library',
    url: BASE_URL,
    description: 'Your ultimate crypto gaming destination',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}${ROUTES.GAMES}?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  
  // Gaming application schema
  gamingApplication: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'The Game Library',
    url: BASE_URL,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free to play with optional deposits',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '15234',
      bestRating: '5',
      worstRating: '1',
    },
  },
  
  // Breadcrumb schema (dynamic per page)
  generateBreadcrumb: (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
  
  // FAQ schema for FAQ page
  faqPage: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I start playing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply create an account, make a deposit using crypto, and choose from our 1000+ games to start playing instantly.',
        },
      },
      {
        '@type': 'Question',
        name: 'What cryptocurrencies do you accept?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We accept Bitcoin, Ethereum, USDT, USDC, and 20+ other major cryptocurrencies for instant deposits and withdrawals.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the games provably fair?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all our games use provably fair technology that allows you to verify the fairness of every game round.',
        },
      },
    ],
  },
};

/**
 * Generate JSON-LD script tag for structured data
 */
export function generateJsonLdScript(data: Record<string, unknown>): string {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

/**
 * Helper to get all structured data for a page
 */
export function getStructuredDataForPage(path: string): Record<string, unknown>[] {
  const data: Record<string, unknown>[] = [jsonLdData.organization, jsonLdData.website];
  
  if (path === ROUTES.FAQ) {
    data.push(jsonLdData.faqPage);
  }
  
  if (path === ROUTES.GAMES || path === ROUTES.HOME) {
    data.push(jsonLdData.gamingApplication);
  }
  
  // Add breadcrumbs for all pages except home
  if (path !== ROUTES.HOME) {
    const breadcrumbs = [
      { name: 'Home', url: BASE_URL },
      { name: ROUTE_CONFIGS[path as RouteValue]?.label || 'Page', url: `${BASE_URL}${path}` },
    ];
    data.push(jsonLdData.generateBreadcrumb(breadcrumbs));
  }
  
  return data;
}