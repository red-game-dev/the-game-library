/**
 * @fileoverview Storybook stories for GameCard component
 * @module components/features/GameCard/stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { GameCard, GameCardSkeleton } from './GameCard';
import { GameGrid } from '../GameGrid';
import type { Game } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Star, Gamepad2 } from 'lucide-react';

/**
 * Mock game data for stories
 */
const mockGame: Game = {
  id: 'game-1',
  title: 'Sweet Bonanza',
  slug: 'sweet-bonanza',
  thumbnail: 'https://picsum.photos/seed/sweet-bonanza/400/300',
  description: 'Experience the sweetest wins in this candy-filled adventure with tumbling reels and multipliers up to 100x!',
  provider: {
    id: 'pragmatic',
    name: 'Pragmatic Play',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=pragmatic'
  },
  type: 'slots',
  isNew: true,
  isHot: false,
  isOnSale: false,
  isFavorite: false,
  tags: ['bonus buy', 'high volatility', 'free spins'],
  playCount: 125000,
  releaseDate: new Date().toISOString(),
  rtp: 96.5
};

const meta: Meta<typeof GameCard> = {
  title: 'Features/GameCard',
  component: GameCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
GameCard is a feature-rich component that extends the base Card component for displaying game information.

## Features
- 🎮 Multiple size variants (xs, sm, md, lg, xl, xxl, grid-xs, grid-sm, grid-md, grid-lg)
- ❤️ Favorite toggle with animation
- 🏷️ Multiple badge types (NEW, HOT, SALE)
- ✨ Hover play button overlay
- 📱 Fully responsive design
- ♿ WCAG AAA compliant
- ⚡ Performance optimized with React.memo
- 🖼️ Lazy image loading with Next.js Image

## Architecture
GameCard is built using composition with base UI components:
- Card (container)
- Badge (status indicators)
- Button (actions)
- Tooltip (info overlays)
- CardImage (optimized image loading)
        `
      }
    }
  },
  argTypes: {
    game: {
      description: 'Game data object',
      control: { type: 'object' }
    },
    size: {
      description: 'Size variant of the card',
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'grid-xs', 'grid-sm', 'grid-md', 'grid-lg']
    },
    onFavoriteToggle: {
      description: 'Callback when favorite is toggled',
      action: 'favorite-toggled'
    },
    onPlay: {
      description: 'Callback when play button is clicked',
      action: 'play-clicked'
    },
    onInfo: {
      description: 'Callback when info button is clicked',
      action: 'info-clicked'
    },
    showDetails: {
      description: 'Show detailed information',
      control: { type: 'boolean' }
    },
    showPlayOnHover: {
      description: 'Show play button on hover',
      control: { type: 'boolean' }
    },
    isLoading: {
      description: 'Show loading skeleton',
      control: { type: 'boolean' }
    },
    className: {
      description: 'Additional CSS classes',
      control: { type: 'text' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default game card with standard size
 */
export const Default: Story = {
  args: {
    game: mockGame,
  },
};

/**
 * All color variants
 */
export const Variants: Story = {
  render: () => {
    const games = (['default', 'primary', 'secondary', 'accent', 'success', 'warning', 'info', 'error'] as const).map(variant => ({
      ...mockGame,
      id: `game-${variant}`,
      title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Game`,
    }));
    
    return (
      <GameGrid 
        games={games}
        variant="compact"
      />
    );
  },
};

/**
 * Extra small grid size for compact layouts
 */
export const GridXS: Story = {
  args: {
    game: mockGame,
    size: 'grid-xs',
  },
};

/**
 * Small grid size
 */
export const GridSM: Story = {
  args: {
    game: mockGame,
    size: 'grid-sm',
  },
};

/**
 * Medium grid size (default)
 */
export const GridMD: Story = {
  args: {
    game: mockGame,
    size: 'grid-md',
  },
};

/**
 * Large grid size with full details
 */
export const GridLG: Story = {
  args: {
    game: {
      ...mockGame,
      description: 'Experience the thrill of ancient Egypt in this exciting slot game with expanding wilds, free spins, and massive win potential. Join the adventure and discover hidden treasures!',
    },
    size: 'grid-lg',
  },
};

/**
 * Extra large size
 */
export const SizeXL: Story = {
  args: {
    game: {
      ...mockGame,
      description: 'Experience the thrill of ancient Egypt in this exciting slot game with expanding wilds, free spins, and massive win potential.',
    },
    size: 'xl',
  },
};

/**
 * XXL size with all features
 */
export const SizeXXL: Story = {
  args: {
    game: {
      ...mockGame,
      description: 'Experience the thrill of ancient Egypt in this exciting slot game with expanding wilds, free spins, and massive win potential.',
    },
    size: 'xxl',
    showPlayOnHover: false,
  },
};

/**
 * Loading skeleton state
 */
export const Loading: Story = {
  args: {
    game: mockGame,
    isLoading: true,
  },
};

/**
 * Game with all badges
 */
export const WithAllBadges: Story = {
  args: {
    game: {
      ...mockGame,
      isNew: true,
      isHot: true,
      isOnSale: true,
    },
    size: 'lg',
  },
};

/**
 * Favorited game
 */
export const WithFavorite: Story = {
  args: {
    game: {
      ...mockGame,
      isFavorite: true,
    },
  },
};

/**
 * Without hover play button
 */
export const NoHoverPlay: Story = {
  args: {
    game: mockGame,
    showPlayOnHover: false,
  },
};

/**
 * With many tags
 */
export const WithTags: Story = {
  args: {
    game: {
      ...mockGame,
      tags: ['Bonus Buy', 'Free Spins', 'Megaways', 'High Volatility', 'Jackpot', 'Multipliers'],
    },
  },
};

/**
 * Live casino game
 */
export const LiveGame: Story = {
  args: {
    game: {
      ...mockGame,
      type: 'live',
      title: 'Lightning Roulette',
      provider: {
        id: 'evolution',
        name: 'Evolution Gaming',
      },
      isHot: true,
    },
  },
};

/**
 * Table game
 */
export const TableGame: Story = {
  args: {
    game: {
      ...mockGame,
      type: 'table',
      title: 'European Blackjack',
      rtp: 99.5,
    },
  },
};

/**
 * Instant game
 */
export const InstantGame: Story = {
  args: {
    game: {
      ...mockGame,
      type: 'instant',
      title: 'Aviator',
      isHot: true,
      playCount: 500000,
    },
  },
};

/**
 * Custom actions example
 */
export const CustomActions: Story = {
  args: {
    game: mockGame,
    actions: (
      <div className="flex gap-1">
        <Button 
          variant="ghost" 
          size="sm" 
          iconOnly
          className="text-yellow-500"
          aria-label="Add to favorites"
        >
          <Star className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          iconOnly
          className="text-blue-500"
          aria-label="Play game"
        >
          <Gamepad2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
};

/**
 * Size comparison grid
 */
export const SizeComparison: Story = {
  render: () => {
    const gridSizeGames = ['grid-xs', 'grid-sm', 'grid-md', 'grid-lg'].map(size => ({
      ...mockGame,
      id: `game-${size}`,
      title: size.toUpperCase().replace('-', ' '),
    }));
    
    const standardSizeGames = ['xs', 'sm', 'md'].map(size => ({
      ...mockGame,
      id: `game-std-${size}`,
      title: size.toUpperCase(),
    }));
    
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text">Grid Sizes</h3>
          <GameGrid 
            games={gridSizeGames}
            variant="compact"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-text">Standard Sizes</h3>
          <GameGrid 
            games={standardSizeGames}
            layout="flex"
          />
        </div>
      </div>
    );
  },
};

/**
 * Game types showcase
 */
export const GameTypes: Story = {
  render: () => {
    const games: Game[] = [
      { ...mockGame, id: 'game-slots', type: 'slots', title: 'Slot Game' },
      { ...mockGame, id: 'game-table', type: 'table', title: 'Blackjack', isNew: false },
      { ...mockGame, id: 'game-live', type: 'live', title: 'Live Roulette', isNew: false, isHot: true },
      { ...mockGame, id: 'game-instant', type: 'instant', title: 'Aviator', isNew: false },
    ];
    
    return (
      <GameGrid 
        games={games}
        variant="default"
      />
    );
  },
};

/**
 * Glass game cards
 */
export const GlassCards: Story = {
  render: () => {
    const games: Game[] = [
      mockGame,
      { ...mockGame, id: 'game-cosmic', title: 'Cosmic Quest', isHot: true },
      { ...mockGame, id: 'game-dragon', title: 'Dragon Fortune', isNew: false },
    ];
    
    return (
      <div className="flex gap-3">
        <GameGrid 
          games={games}
          variant="compact"
          className="glass"
        />
      </div>
    );
  },
};

/**
 * Loading skeleton grid
 */
export const LoadingGrid: Story = {
  render: () => (
    <GameGrid 
      games={[]}
      isLoading={true}
      skeletonCount={8}
      variant="default"
    />
  ),
};

/**
 * Responsive grid showcase
 */
export const ResponsiveGrid: Story = {
  render: () => {
    const games = Array.from({ length: 10 }).map((_, i) => ({
      ...mockGame,
      id: `game-${i}`,
      title: `Game ${i + 1}`,
      thumbnail: `https://picsum.photos/seed/game-${i}/400/300`,
      isNew: i < 2,
      isHot: i === 3,
      isOnSale: i === 5,
      isFavorite: i % 3 === 0,
    }));
    
    return (
      <GameGrid 
        games={games}
        variant="default"
      />
    );
  },
};

/**
 * Dark mode showcase
 */
export const DarkMode: Story = {
  args: {
    game: mockGame,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" className="p-4 bg-background">
        <Story />
      </div>
    ),
  ],
};

/**
 * Interactive playground
 */
export const Playground: Story = {
  args: {
    game: mockGame,
    size: 'grid-md',
    showDetails: true,
    showPlayOnHover: true,
    isLoading: false,
  },
};

/**
 * Mobile viewport - optimized for small screens
 */
export const Mobile: Story = {
  render: () => {
    const mobileGames = [
      { ...mockGame, id: '1', title: 'Mobile Game 1', isNew: true },
      { ...mockGame, id: '2', title: 'Mobile Game 2', isHot: true },
      { ...mockGame, id: '3', title: 'Mobile Game 3', isOnSale: true },
      { ...mockGame, id: '4', title: 'Mobile Game 4', isFavorite: true },
    ];
    
    return (
      <div className="space-y-4 p-3">
        {/* Single card optimized for mobile */}
        <GameCard
          game={mobileGames[0]}
          size="grid-sm"
          showDetails={false}
          className="card-md"
        />
        
        {/* Grid of cards for mobile - 1 column */}
        <div className="grid grid-cols-1 gap-3">
          {mobileGames.slice(1).map((game) => (
            <GameCard
              key={game.id}
              game={game}
              size="grid-sm"
              showDetails={false}
              className="card-sm"
            />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Tablet viewport - medium screen optimization
 */
export const Tablet: Story = {
  render: () => {
    const tabletGames = Array.from({ length: 6 }).map((_, i) => ({
      ...mockGame,
      id: `tablet-${i}`,
      title: `Tablet Game ${i + 1}`,
      thumbnail: `https://picsum.photos/seed/tablet-${i}/400/300`,
      isNew: i === 0,
      isHot: i === 1,
      isOnSale: i === 2,
      isFavorite: i % 2 === 0,
    }));
    
    return (
      <div className="grid grid-cols-1 gap-4 p-4">
        {tabletGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            size="grid-md"
            showDetails={true}
            className="card-md"
          />
        ))}
      </div>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

/**
 * Responsive showcase - shows cards at different breakpoints
 */
export const ResponsiveShowcase: Story = {
  render: () => {
    const games = [
      { ...mockGame, id: 'resp-1', title: 'Responsive Game 1', isNew: true },
      { ...mockGame, id: 'resp-2', title: 'Responsive Game 2', isHot: true },
      { ...mockGame, id: 'resp-3', title: 'Responsive Game 3', isOnSale: true },
      { ...mockGame, id: 'resp-4', title: 'Responsive Game 4' },
    ];
    
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">GameCard Size Modifiers</h2>
          <p className="text-secondary mb-4">
            Use Storybook&apos;s viewport selector to see how these cards adapt to mobile (320px), tablet (768px), and desktop (1024px+) sizes.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                size="grid-md"
                className="card-lg"
              />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">Compact Mobile Layout</h2>
          <p className="text-secondary mb-4">
            GameCards with reduced padding and optimized text sizes for mobile devices.
          </p>
          <div className="max-w-sm">
            <GameCard
              game={mockGame}
              size="grid-sm"
              showDetails={false}
              showPlayOnHover={false}
              className="card-sm"
            />
          </div>
        </div>
      </div>
    );
  },
};