/**
 * Game Data Generator
 * Generates mock game data for testing and development
 */

import type { Game, GameType } from '@/lib/core/domain/entities';
import { slugify, randomItem, randomItems } from '@/lib/core/shared/utils';
import { randomBetween } from '@/lib/core/shared/utils/number';
import { GAME_TYPES } from '@/lib/core/config/constants/app.constants';

// Game name templates by type
const gameTemplates = {
  slots: [
    'Sweet Bonanza', 'Gates of Olympus', 'Sugar Rush', 'Big Bass Bonanza',
    'Book of Dead', 'Starburst', 'Gonzo\'s Quest', 'Dead or Alive 2',
    'Jammin\' Jars', 'Reactoonz', 'Fire Joker', 'Moon Princess',
    'Wolf Gold', 'The Dog House', 'John Hunter', 'Aztec Gems',
    'Great Rhino', 'Buffalo King', 'Hot Fiesta', 'Chilli Heat',
    'Madame Destiny', 'Wild West Gold', 'Power of Thor', 'Rise of Giza',
    'Crystal Caverns', 'Mystic Chief', 'Dragon Kingdom', 'Phoenix Reborn',
    'Lucky Fortune Cat', 'Golden Beauty', 'Treasure Horse', 'Leprechaun Song',
    'Cosmic Quest', 'Star Clusters', 'Mega Moolah', 'Divine Fortune',
    'Hall of Gods', 'Arabian Nights', 'Mega Fortune', 'Major Millions'
  ],
  table: [
    'European Roulette', 'American Roulette', 'French Roulette', 'Speed Roulette',
    'Blackjack Classic', 'Blackjack Pro', 'Blackjack VIP', 'Single Deck Blackjack',
    'Baccarat', 'Baccarat Squeeze', 'Speed Baccarat', 'Dragon Tiger',
    'Casino Hold\'em', 'Texas Hold\'em', 'Three Card Poker', 'Caribbean Stud',
    'Craps', 'Sic Bo', 'Pai Gow Poker', 'Red Dog',
    'Ultimate Texas Hold\'em', 'Let It Ride', 'Mississippi Stud', 'Casino War'
  ],
  live: [
    'Live Roulette', 'Live Blackjack', 'Live Baccarat', 'Live Poker',
    'Crazy Time', 'Monopoly Live', 'Dream Catcher', 'Lightning Roulette',
    'Immersive Roulette', 'Speed Roulette Live', 'Blackjack Party', 'Infinite Blackjack',
    'Power Blackjack', 'Free Bet Blackjack', 'Speed Baccarat', 'Baccarat Control Squeeze',
    'Dragon Tiger Live', 'Football Studio', 'Side Bet City', 'Super Sic Bo',
    'Mega Ball', 'Cash or Crash', 'Gonzo\'s Treasure Hunt', 'Deal or No Deal Live'
  ],
  instant: [
    'Aviator', 'Spaceman', 'Plinko', 'Mines',
    'Dice', 'Crash', 'Keno', 'Scratch Cards',
    'Lucky Wheel', 'Heads or Tails', 'Rock Paper Scissors', 'Hi-Lo',
    'Goal', 'Penalty Shootout', 'Virtual Sports', 'Horse Racing',
    'Turbo Games', 'Fast Keno', 'Instant Roulette', 'Quick Draw'
  ],
  jackpot: [
    'Mega Moolah', 'Divine Fortune', 'Mega Fortune', 'Hall of Gods',
    'Arabian Nights', 'Major Millions', 'Treasure Nile', 'King Cashalot',
    'Cash Splash', 'Fruit Fiesta', 'Lotsaloot', 'Tunzamunni',
    'WowPot', 'Age of the Gods', 'Gladiator Jackpot', 'Beach Life',
    'Gold Rally', 'Frankie Dettori\'s Magic Seven', 'X-Men', 'Fantastic Four',
    'Iron Man', 'The Incredible Hulk', 'Blade', 'Daredevil'
  ]
};

// Game tags
const gameTags = [
  'bonus buy', 'megaways', 'high volatility', 'jackpot', 
  'free spins', 'multiplier', 'cascading', 'cluster pays',
  'hold and win', 'respins', 'wilds', 'scatters',
  'bonus game', 'gamble feature', 'progressive', 'classic',
  'branded', '3D graphics', 'mobile optimized', 'turbo mode',
  'multi-line', 'ways to win', 'expanding symbols', 'sticky wilds'
];

/**
 * Generate a single game
 */
function generateGame(
  id: string = `game-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  options: Partial<Game> = {}
): Game {
  const type = options.type || randomItem([...GAME_TYPES] as GameType[]) || 'slots';
  const title = options.title || randomItem(gameTemplates[type]) || 'Unknown Game';
  const isNew = options.isNew ?? Math.random() > 0.8; // 20% chance
  const isHot = options.isHot ?? Math.random() > 0.85; // 15% chance
  const isOnSale = options.isOnSale ?? Math.random() > 0.9; // 10% chance
  const isFavorite = options.isFavorite ?? Math.random() > 0.9; // 10% chance
  
  // Generate release date
  const daysAgo = isNew ? randomBetween(0, 30) : randomBetween(0, 365);
  const releaseDate = new Date();
  releaseDate.setDate(releaseDate.getDate() - daysAgo);

  return {
    id,
    title,
    slug: options.slug || slugify(title),
    thumbnail: options.thumbnail || `https://picsum.photos/seed/${id}/400/300`,
    description: options.description || `Experience the thrill of ${title} - an exciting ${type} game with amazing features and big win potential!`,
    provider: options.provider || {
      id: `provider-${randomBetween(1, 10)}`,
      name: randomItem(['NetEnt', 'Microgaming', 'Play\'n GO', 'Pragmatic Play', 'Evolution Gaming', 'Yggdrasil', 'Quickspin', 'Red Tiger', 'Big Time Gaming', 'NoLimit City']) || 'Unknown Provider'
    },
    type,
    isNew,
    isHot,
    isOnSale,
    isFavorite,
    tags: options.tags || randomItems(gameTags, randomBetween(1, 4)),
    playCount: options.playCount ?? randomBetween(1000, 500000),
    releaseDate: options.releaseDate || releaseDate.toISOString(),
    rtp: options.rtp ?? (94 + Math.random() * 4) // RTP between 94% and 98%
  };
}

/**
 * Generate multiple games
 */
function generateGames(count: number = 10, options: Partial<Game> = {}): Game[] {
  const games: Game[] = [];
  const usedTitles = new Set<string>();
  
  for (let i = 0; i < count; i++) {
    let game: Game;
    let attempts = 0;
    
    // Ensure unique titles
    do {
      game = generateGame(`game-${i + 1}`, options);
      attempts++;
    } while (usedTitles.has(game.title) && attempts < 100);
    
    usedTitles.add(game.title);
    games.push(game);
  }
  
  return games;
}

/**
 * Generate games by type - accepts either a distribution object or a single type with count
 */
function generateGamesByType(
  typeOrDistribution: GameType | { slots?: number; table?: number; live?: number; instant?: number; jackpot?: number },
  count?: number
): Game[] {
  // If it's a single type with count
  if (typeof typeOrDistribution === 'string') {
    const gameCount = count || 5;
    return generateGames(gameCount, { type: typeOrDistribution });
  }
  
  // If it's a distribution object
  const distribution = typeOrDistribution || {
    slots: 5,
    table: 3,
    live: 2,
    instant: 2
  };
  
  const games: Game[] = [];
  
  for (const [type, gameCount] of Object.entries(distribution)) {
    if (gameCount && gameCount > 0) {
      games.push(...generateGames(gameCount, { type: type as GameType }));
    }
  }
  
  return games;
}

/**
 * Generate featured games
 */
function generateFeaturedGames(count: number = 5): Game[] {
  return generateGames(count, { isHot: true });
}

/**
 * Generate new games
 */
function generateNewGames(count: number = 5): Game[] {
  return generateGames(count, { isNew: true });
}

/**
 * Generate games for a specific provider
 */
function generateProviderGames(
  providerName: string,
  providerId: string,
  count: number = 10
): Game[] {
  return generateGames(count, {
    provider: { id: providerId, name: providerName }
  });
}

/**
 * Generate a complete game library
 */
function generateGameLibrary(totalGames: number = 100): Game[] {
  const games: Game[] = [];
  const providers = [
    { id: 'netent', name: 'NetEnt' },
    { id: 'microgaming', name: 'Microgaming' },
    { id: 'playngo', name: 'Play\'n GO' },
    { id: 'pragmatic', name: 'Pragmatic Play' },
    { id: 'evolution', name: 'Evolution Gaming' },
    { id: 'yggdrasil', name: 'Yggdrasil' },
    { id: 'quickspin', name: 'Quickspin' },
    { id: 'redtiger', name: 'Red Tiger' },
    { id: 'btg', name: 'Big Time Gaming' },
    { id: 'nolimit', name: 'NoLimit City' }
  ];
  
  const gamesPerProvider = Math.floor(totalGames / providers.length);
  const remainder = totalGames % providers.length;
  
  providers.forEach((provider, index) => {
    const count = gamesPerProvider + (index < remainder ? 1 : 0);
    games.push(...generateProviderGames(provider.name, provider.id, count));
  });
  
  // Shuffle the games
  return games.sort(() => Math.random() - 0.5);
}

/**
 * Get sample game for testing
 */
export function getSampleGame(): Game {
  return {
    id: 'sample-game-1',
    title: 'Cosmic Quest',
    slug: 'cosmic-quest',
    thumbnail: 'https://picsum.photos/seed/cosmic-quest/400/300',
    description: 'Embark on an interstellar adventure with Cosmic Quest! Features expanding wilds, free spins, and a progressive jackpot.',
    provider: {
      id: 'stellar-games',
      name: 'Stellar Games',
      logo: 'https://picsum.photos/seed/stellar-games/50/50'
    },
    type: 'slots',
    isNew: true,
    isHot: true,
    isOnSale: false,
    isFavorite: false,
    tags: ['space', 'adventure', 'jackpot', 'free spins'],
    playCount: 125000,
    releaseDate: new Date().toISOString(),
    rtp: 96.5
  };
}

/* ============================================
   EXPORTS WITH CONSISTENT NAMING
   ============================================ */

// Primary exports with new naming convention
export const generateMockGame = generateGame;
export const generateMockGames = generateGames;
export { generateGamesByType };
export const generateGamesByProvider = generateProviderGames;

// Legacy exports for backward compatibility
export { 
  generateGame,
  generateGames,
  generateFeaturedGames,
  generateNewGames,
  generateProviderGames,
  generateGameLibrary
};