/**
 * @fileoverview Storybook stories for GameGrid component
 * @module components/features/GameGrid/stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { GameGrid } from './GameGrid';
import type { Game } from '@/lib/types';

/**
 * Generate mock games for testing
 */
const generateMockGames = (count: number): Game[] => {
  const types: Game['type'][] = ['slots', 'table', 'live', 'instant'];
  const providers = [
    { id: 'pragmatic', name: 'Pragmatic Play', logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=pragmatic' },
    { id: 'evolution', name: 'Evolution Gaming', logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=evolution' },
    { id: 'netent', name: 'NetEnt', logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=netent' },
    { id: 'playngo', name: "Play'n GO", logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=playngo' }
  ];

  return Array.from({ length: count }).map((_, i) => ({
    id: `game-${i + 1}`,
    title: `Game Title ${i + 1}`,
    slug: `game-title-${i + 1}`,
    thumbnail: `https://picsum.photos/seed/game-${i + 1}/400/300`,
    provider: providers[i % providers.length],
    type: types[i % types.length],
    isNew: i < 3,
    isFavorite: i % 5 === 0,
    tags: ['tag1', 'tag2', 'tag3'].slice(0, (i % 3) + 1),
    playCount: Math.floor(Math.random() * 100000),
    releaseDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    rtp: 94 + Math.random() * 4
  }));
};

const meta: Meta<typeof GameGrid> = {
  title: 'Features/GameGrid',
  component: GameGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
GameGrid is a responsive container component for displaying game cards in an optimized grid layout.

## Features
- 📱 Fully responsive with customizable breakpoints
- 🎮 Multiple layout variants
- ⚡ Performance optimized with React.memo
- 🔄 Loading skeletons
- 📭 Empty state handling
- ♿ Semantic grid structure for accessibility
- 🎯 Customizable column configuration

## Design Decisions
- **Responsive First**: Mobile-first approach with progressive enhancement
- **Performance**: Prepared for virtual scrolling with large datasets
- **Flexibility**: Customizable columns per breakpoint
- **Accessibility**: Proper ARIA roles and semantic HTML
        `
      }
    }
  },
  argTypes: {
    games: {
      description: 'Array of games to display',
      control: { type: 'object' }
    },
    isLoading: {
      description: 'Show loading skeletons',
      control: { type: 'boolean' }
    },
    skeletonCount: {
      description: 'Number of skeletons to show when loading',
      control: { type: 'number', min: 1, max: 20 }
    },
    layout: {
      description: 'Layout mode',
      control: { type: 'select' },
      options: ['grid', 'flex', 'carousel']
    },
    variant: {
      description: 'Grid layout variant',
      control: { type: 'select' },
      options: ['default', 'compact', 'featured']
    },
    onGameClick: {
      description: 'Callback when game is clicked',
      action: 'game-clicked'
    },
    onFavoriteToggle: {
      description: 'Callback when favorite is toggled',
      action: 'favorite-toggled'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default grid with standard layout
 */
export const Default: Story = {
  args: {
    games: generateMockGames(12),
    layout: 'grid',
    variant: 'default'
  }
};

/**
 * Flex layout with wrapping
 */
export const FlexLayout: Story = {
  args: {
    games: generateMockGames(12),
    layout: 'flex',
    variant: 'default'
  }
};

/**
 * Carousel layout for horizontal scrolling
 */
export const CarouselLayout: Story = {
  args: {
    games: generateMockGames(20),
    layout: 'carousel',
    variant: 'default'
  }
};

/**
 * Compact grid for more density
 */
export const Compact: Story = {
  args: {
    games: generateMockGames(20),
    layout: 'grid',
    variant: 'compact'
  }
};

/**
 * Featured grid with larger cards
 */
export const Featured: Story = {
  args: {
    games: generateMockGames(6),
    variant: 'featured'
  }
};

/**
 * Loading state with skeletons
 */
export const Loading: Story = {
  args: {
    games: [],
    isLoading: true,
    skeletonCount: 12
  }
};

/**
 * Empty state when no games
 */
export const Empty: Story = {
  args: {
    games: [],
    isLoading: false
  }
};

/**
 * Small dataset (3 games)
 */
export const FewGames: Story = {
  args: {
    games: generateMockGames(3)
  }
};

/**
 * Large dataset (50 games)
 */
export const ManyGames: Story = {
  args: {
    games: generateMockGames(50)
  }
};

/**
 * Custom column configuration
 */
export const CustomColumns: Story = {
  args: {
    games: generateMockGames(12),
    columns: {
      mobile: 1,
      tablet: 3,
      desktop: 4,
      wide: 6
    }
  }
};

/**
 * Mobile viewport
 */
export const Mobile: Story = {
  args: {
    games: generateMockGames(6),
    variant: 'default'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

/**
 * Tablet viewport
 */
export const Tablet: Story = {
  args: {
    games: generateMockGames(9),
    variant: 'default'
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  }
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  args: {
    games: generateMockGames(12)
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" className="p-4 bg-background min-h-screen">
        <Story />
      </div>
    )
  ]
};

/**
 * Light mode
 */
export const LightMode: Story = {
  args: {
    games: generateMockGames(12)
  },
  parameters: {
    backgrounds: { default: 'light' }
  },
  decorators: [
    (Story) => (
      <div data-theme="light" className="p-4 bg-background min-h-screen">
        <Story />
      </div>
    )
  ]
};

/**
 * With interactions (click and favorite)
 */
export const Interactive: Story = {
  args: {
    games: generateMockGames(8),
    onGameClick: (game) => console.log('Clicked game:', game),
    onFavoriteToggle: (id, isFavorite) => console.log(`Game ${id} favorite: ${isFavorite}`)
  }
};

/**
 * Mixed game types
 */
export const MixedTypes: Story = {
  args: {
    games: generateMockGames(16)
  }
};

/**
 * Responsive showcase
 */
export const ResponsiveShowcase: Story = {
  render: () => {
    const games = generateMockGames(12);
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Default Variant</h3>
          <GameGrid games={games} variant="default" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Compact Variant</h3>
          <GameGrid games={games} variant="compact" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Featured Variant</h3>
          <GameGrid games={games.slice(0, 6)} variant="featured" />
        </div>
      </div>
    );
  }
};