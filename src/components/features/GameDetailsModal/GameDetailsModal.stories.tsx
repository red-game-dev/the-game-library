/**
 * GameDetailsModal Stories
 * Storybook stories for the GameDetailsModal component
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { GameDetailsModal } from './GameDetailsModal';
import type { Game } from '@/lib/core/domain/entities';

const meta = {
  title: 'Features/GameDetailsModal',
  component: GameDetailsModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal component for displaying detailed game information including stats, description, and actions.'
      }
    }
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls modal visibility'
    },
    onClose: {
      action: 'closed',
      description: 'Callback when modal is closed'
    },
    onPlay: {
      action: 'play',
      description: 'Callback when play button is clicked'
    },
    onFavorite: {
      action: 'favorite',
      description: 'Callback when favorite button is clicked'
    },
    onShare: {
      action: 'share',
      description: 'Callback when share button is clicked'
    }
  }
} satisfies Meta<typeof GameDetailsModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample game data
const sampleGame: Game = {
  id: 'game-1',
  title: 'Mega Fortune Dreams',
  slug: 'mega-fortune-dreams',
  thumbnail: 'https://picsum.photos/seed/mega-fortune/400/300',
  description: 'Experience the luxury lifestyle with Mega Fortune Dreams! This exciting slot game features progressive jackpots, free spins with multipliers, and a thrilling bonus wheel that can lead to massive wins.',
  provider: {
    id: 'netent',
    name: 'NetEnt',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=netent'
  },
  type: 'slots',
  tags: ['Progressive', 'Jackpot', 'Free Spins', 'Bonus Wheel', 'Luxury Theme'],
  isNew: true,
  isHot: true,
  isFavorite: false,
  playCount: 1250000,
  releaseDate: '2024-01-15',
  rtp: 96.4
};

const minimalGame: Game = {
  id: 'game-2',
  title: 'Classic Blackjack',
  slug: 'classic-blackjack',
  thumbnail: 'https://picsum.photos/seed/blackjack/400/300',
  provider: {
    id: 'evolution',
    name: 'Evolution Gaming'
  },
  type: 'table'
};

const upcomingGame: Game = {
  id: 'game-3',
  title: 'Dragon\'s Treasure',
  slug: 'dragons-treasure',
  thumbnail: 'https://picsum.photos/seed/dragon/400/300',
  description: 'Coming soon! An epic adventure awaits in this upcoming slot game.',
  provider: {
    id: 'pragmatic',
    name: 'Pragmatic Play',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=pragmatic'
  },
  type: 'slots',
  tags: ['Coming Soon', 'Adventure', 'Dragons'],
  isNew: true,
  releaseDate: '2024-12-01'
};

/**
 * Default modal state with full game details
 */
export const Default: Story = {
  args: {
    game: sampleGame,
    isOpen: true,
    onClose: () => console.log('Modal closed')
  }
};

/**
 * Modal with minimal game data
 */
export const MinimalData: Story = {
  args: {
    game: minimalGame,
    isOpen: true,
    onClose: () => console.log('Modal closed')
  }
};

/**
 * Modal showing a favorited game
 */
export const FavoritedGame: Story = {
  args: {
    game: { ...sampleGame, isFavorite: true },
    isOpen: true,
    onClose: () => console.log('Modal closed')
  }
};

/**
 * Modal for an upcoming/unreleased game
 */
export const UpcomingGame: Story = {
  args: {
    game: upcomingGame,
    isOpen: true,
    onClose: () => console.log('Modal closed')
  }
};

/**
 * Modal with no tags
 */
export const NoTags: Story = {
  args: {
    game: { ...sampleGame, tags: undefined },
    isOpen: true,
    onClose: () => console.log('Modal closed')
  }
};

/**
 * Modal with broken image
 */
export const BrokenImage: Story = {
  args: {
    game: { ...sampleGame, thumbnail: '/broken-image.jpg' },
    isOpen: true,
    onClose: () => console.log('Modal closed')
  }
};

/**
 * Live casino game modal
 */
export const LiveGame: Story = {
  args: {
    game: {
      ...sampleGame,
      title: 'Live Roulette',
      slug: 'live-roulette',
      type: 'live',
      provider: {
        id: 'evolution',
        name: 'Evolution Gaming',
        logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=evolution'
      },
      tags: ['Live Dealer', 'HD Streaming', 'Multiple Cameras'],
      description: 'Join our professional dealers for an authentic casino experience with Live Roulette.',
      rtp: 97.3
    },
    isOpen: true,
    onClose: () => console.log('Modal closed')
  }
};

/**
 * Jackpot game modal
 */
export const JackpotGame: Story = {
  args: {
    game: {
      ...sampleGame,
      title: 'Mega Millions Jackpot',
      slug: 'mega-millions-jackpot',
      type: 'jackpot',
      tags: ['Progressive Jackpot', '$5M Prize Pool', 'Daily Drops'],
      description: 'The biggest progressive jackpot slot with a current prize pool exceeding $5 million!',
      isHot: true,
      playCount: 5000000
    },
    isOpen: true,
    onClose: () => console.log('Modal closed')
  }
};

/**
 * Modal in closed state
 */
export const Closed: Story = {
  args: {
    game: sampleGame,
    isOpen: false,
    onClose: () => console.log('Modal closed')
  }
};

/**
 * Interactive story with state management
 */
export const Interactive: Story = {
  args: {
    game: sampleGame,
    isOpen: true,
    onClose: () => console.log('Modal closed')
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isFavorite, setIsFavorite] = useState(args.game?.isFavorite || false);
    
    return (
      <>
        <button 
          onClick={() => setIsOpen(true)}
          style={{ 
            padding: '10px 20px', 
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Open Game Details
        </button>
        
        <GameDetailsModal
          {...args}
          game={args.game ? { ...args.game, isFavorite } : null}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onFavorite={() => {
            setIsFavorite(!isFavorite);
            console.log('Favorite toggled:', !isFavorite);
          }}
          onPlay={(game) => console.log('Play clicked:', game.title)}
          onShare={(game) => console.log('Share clicked:', game.title)}
        />
      </>
    );
  }
};

// Import useState for Interactive story
import { useState } from 'react';

/**
 * Neon theme - Cyberpunk modal
 */
export const NeonTheme: Story = {
  args: {
    game: {
      ...sampleGame,
      title: 'Cyber Strike 2077',
      description: 'Jack into the matrix with this cyberpunk-themed slot! Features neural network bonuses, holographic wilds, and quantum jackpots.',
      tags: ['Cyberpunk', 'Neural Bonus', 'Quantum Jackpot', 'Holographic Wilds']
    },
    isOpen: true,
    onClose: () => console.log('Modal closed')
  },
  decorators: [
    (Story) => (
      <div data-theme="neon">
        <Story />
      </div>
    )
  ]
};

/**
 * Gold theme - Premium modal
 */
export const GoldTheme: Story = {
  args: {
    game: {
      ...sampleGame,
      title: 'Royal Fortune VIP',
      description: 'Experience luxury gaming at its finest! This exclusive VIP slot features diamond wilds, golden multipliers, and platinum jackpots.',
      tags: ['VIP Exclusive', 'Diamond Wilds', 'Platinum Jackpot', 'Golden Multipliers']
    },
    isOpen: true,
    onClose: () => console.log('Modal closed')
  },
  decorators: [
    (Story) => (
      <div data-theme="gold">
        <Story />
      </div>
    )
  ]
};

/**
 * All themes comparison
 */
export const AllThemes: Story = {
  args: {
    game: null,
    isOpen: false,
    onClose: () => console.log('Modal closed')
  },
  render: () => {
    const [lightOpen, setLightOpen] = useState(false);
    const [darkOpen, setDarkOpen] = useState(false);
    const [neonOpen, setNeonOpen] = useState(false);
    const [goldOpen, setGoldOpen] = useState(false);
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setLightOpen(true)}
            className="p-4 bg-white rounded-lg text-gray-900 hover:bg-gray-100"
          >
            Open Light Theme Modal
          </button>
          <button 
            onClick={() => setDarkOpen(true)}
            className="p-4 bg-gray-900 rounded-lg text-white hover:bg-gray-800"
          >
            Open Dark Theme Modal
          </button>
          <button 
            onClick={() => setNeonOpen(true)}
            className="p-4 rounded-lg text-purple-400 hover:bg-purple-900"
            style={{ background: 'rgb(3, 7, 18)' }}
          >
            Open Neon Theme Modal
          </button>
          <button 
            onClick={() => setGoldOpen(true)}
            className="p-4 rounded-lg text-yellow-400 hover:bg-yellow-900"
            style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}
          >
            Open Gold Theme Modal
          </button>
        </div>
        
        <div data-theme="light">
          <GameDetailsModal
            game={sampleGame}
            isOpen={lightOpen}
            onClose={() => setLightOpen(false)}
          />
        </div>
        
        <div data-theme="dark">
          <GameDetailsModal
            game={sampleGame}
            isOpen={darkOpen}
            onClose={() => setDarkOpen(false)}
          />
        </div>
        
        <div data-theme="neon">
          <GameDetailsModal
            game={{
              ...sampleGame,
              title: 'Cyber Strike 2077',
              tags: ['Cyberpunk', 'Neural Bonus', 'Quantum Jackpot']
            }}
            isOpen={neonOpen}
            onClose={() => setNeonOpen(false)}
          />
        </div>
        
        <div data-theme="gold">
          <GameDetailsModal
            game={{
              ...sampleGame,
              title: 'Royal Fortune VIP',
              tags: ['VIP Exclusive', 'Diamond Wilds', 'Platinum Jackpot']
            }}
            isOpen={goldOpen}
            onClose={() => setGoldOpen(false)}
          />
        </div>
      </div>
    );
  }
};