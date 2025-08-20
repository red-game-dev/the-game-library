/**
 * Generate mock games data
 */

import type { Game, GameType } from '../types';
import providers from './providers.json';

const gameNames = {
  slots: [
    'Sweet Bonanza', 'Gates of Olympus', 'Sugar Rush', 'Big Bass Bonanza',
    'Book of Dead', 'Starburst', 'Gonzo\'s Quest', 'Dead or Alive 2',
    'Jammin\' Jars', 'Reactoonz', 'Fire Joker', 'Moon Princess',
    'Wolf Gold', 'The Dog House', 'John Hunter', 'Aztec Gems',
    'Great Rhino', 'Buffalo King', 'Hot Fiesta', 'Chilli Heat',
    'Madame Destiny', 'Wild West Gold', 'Power of Thor', 'Rise of Giza',
    'Crystal Caverns', 'Mystic Chief', 'Dragon Kingdom', 'Phoenix Reborn',
    'Lucky Fortune Cat', 'Golden Beauty', 'Treasure Horse', 'Leprechaun Song'
  ],
  table: [
    'European Roulette', 'American Roulette', 'French Roulette', 'Speed Roulette',
    'Blackjack Classic', 'Blackjack Pro', 'Blackjack VIP', 'Single Deck Blackjack',
    'Baccarat', 'Baccarat Squeeze', 'Speed Baccarat', 'Dragon Tiger',
    'Casino Hold\'em', 'Texas Hold\'em', 'Three Card Poker', 'Caribbean Stud',
    'Craps', 'Sic Bo', 'Pai Gow Poker', 'Red Dog'
  ],
  live: [
    'Live Roulette', 'Live Blackjack', 'Live Baccarat', 'Live Poker',
    'Crazy Time', 'Monopoly Live', 'Dream Catcher', 'Lightning Roulette',
    'Immersive Roulette', 'Speed Roulette Live', 'Blackjack Party', 'Infinite Blackjack',
    'Power Blackjack', 'Free Bet Blackjack', 'Speed Baccarat', 'Baccarat Control Squeeze',
    'Dragon Tiger Live', 'Football Studio', 'Side Bet City', 'Super Sic Bo'
  ],
  instant: [
    'Aviator', 'Spaceman', 'Plinko', 'Mines',
    'Dice', 'Crash', 'Keno', 'Scratch Cards',
    'Lucky Wheel', 'Heads or Tails', 'Rock Paper Scissors', 'Hi-Lo',
    'Goal', 'Penalty Shootout', 'Virtual Sports', 'Horse Racing'
  ]
};

const tags = [
  'bonus buy', 'megaways', 'high volatility', 'jackpot', 
  'free spins', 'multiplier', 'cascading', 'cluster pays',
  'hold and win', 'respins', 'wilds', 'scatters',
  'bonus game', 'gamble feature', 'progressive', 'classic'
];

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function getRandomElements<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateGame(
  id: string,
  title: string,
  type: GameType,
  provider: typeof providers[0],
  index: number
): Game {
  const isNew = Math.random() > 0.8; // 20% chance of being new
  const isFavorite = Math.random() > 0.9; // 10% chance of being favorite
  const playCount = Math.floor(Math.random() * 100000);
  const rtp = 94 + Math.random() * 4; // RTP between 94% and 98%
  
  // Newer games have recent dates
  const daysAgo = isNew 
    ? Math.floor(Math.random() * 30) 
    : Math.floor(Math.random() * 365);
  const releaseDate = new Date();
  releaseDate.setDate(releaseDate.getDate() - daysAgo);

  return {
    id,
    title,
    slug: generateSlug(title),
    thumbnail: `https://picsum.photos/seed/${id}/400/300`,
    provider: {
      id: provider.id,
      name: provider.name,
      logo: provider.logo
    },
    type,
    isNew,
    isFavorite,
    tags: getRandomElements(tags, Math.floor(Math.random() * 4) + 1),
    playCount,
    releaseDate: releaseDate.toISOString(),
    rtp
  };
}

export function generateGames(): Game[] {
  const games: Game[] = [];
  let gameId = 1;

  // Generate games for each provider and type
  providers.forEach(provider => {
    // Each provider has different game types
    const gameTypes: GameType[] = 
      provider.name === 'Evolution Gaming' 
        ? ['live', 'table'] 
        : ['slots', 'instant', 'table'];

    gameTypes.forEach(type => {
      const gameList = gameNames[type];
      const numGames = Math.min(
        Math.floor(Math.random() * 15) + 5, // 5-20 games per type
        gameList.length
      );
      
      const selectedGames = getRandomElements(gameList, numGames);
      
      selectedGames.forEach((gameName, index) => {
        // Add provider prefix to some games for uniqueness
        const title = Math.random() > 0.7 
          ? `${provider.name} ${gameName}`
          : gameName;
        
        games.push(
          generateGame(
            `game-${gameId++}`,
            title,
            type,
            provider,
            index
          )
        );
      });
    });
  });

  // Shuffle the final array
  return games.sort(() => 0.5 - Math.random());
}

// Generate and export the games
const allGames = generateGames();
export default allGames;