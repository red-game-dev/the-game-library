/**
 * @fileoverview Storybook stories for GameGrid component
 * @module components/features/GameGrid/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { GameGrid } from './GameGrid';
import { generateMockGames } from '@/lib/core/test';
import { useState } from 'react';


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
- 🚀 Virtualization support for large datasets
- 🔄 Loading skeletons
- 📭 Empty state handling
- ♿ Semantic grid structure for accessibility
- 🎯 Customizable column configuration
- ♾️ Infinite scroll support

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

/**
 * Neon theme - Cyberpunk game grid
 */
export const NeonTheme: Story = {
  render: () => {
    const neonGames = generateMockGames(8).map((game, index) => ({
      ...game,
      title: `Cyber ${game.title}`,
      isNew: index === 0,
      isHot: index === 1
    }));
    
    return (
      <div data-theme="neon" className="p-8" style={{ background: 'rgb(3, 7, 18)' }}>
        <h3 className="text-lg font-semibold text-purple-400 mb-6">Neon Theme Grid</h3>
        <GameGrid games={neonGames} variant="default" />
      </div>
    );
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

/**
 * Gold theme - Premium game grid
 */
export const GoldTheme: Story = {
  render: () => {
    const goldGames = generateMockGames(8).map((game, index) => ({
      ...game,
      title: `VIP ${game.title}`,
      isNew: index === 0,
      isHot: index === 1
    }));
    
    return (
      <div data-theme="gold" className="p-8" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <h3 className="text-lg font-semibold text-yellow-400 mb-6">Gold Theme Grid</h3>
        <GameGrid games={goldGames} variant="default" />
      </div>
    );
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

/**
 * All themes comparison
 */
export const AllThemes: Story = {
  render: () => {
    const games = generateMockGames(4);
    
    return (
      <div className="space-y-6">
        <div data-theme="light" className="p-6 bg-white rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Light Theme</h3>
          <GameGrid games={games} variant="compact" />
        </div>
        
        <div data-theme="dark" className="p-6 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">Dark Theme</h3>
          <GameGrid games={games} variant="compact" />
        </div>
        
        <div data-theme="neon" className="p-6 rounded-lg" style={{ background: 'rgb(3, 7, 18)' }}>
          <h3 className="text-lg font-semibold text-purple-400 mb-3">Neon Theme</h3>
          <GameGrid games={games} variant="compact" />
        </div>
        
        <div data-theme="gold" className="p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">Gold Theme</h3>
          <GameGrid games={games} variant="compact" />
        </div>
      </div>
    );
  }
};

/**
 * Virtualized grid with large dataset
 */
export const VirtualizedGrid: Story = {
  args: {
    games: generateMockGames(1000),
    enableVirtualization: true,
    variant: 'default'
  },
  render: (args) => (
    <div className="h-screen p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Virtualized Grid with 1,000 Games</h2>
        <p className="text-gray-600">Only visible items are rendered for optimal performance</p>
      </div>
      <GameGrid {...args} />
    </div>
  )
};

/**
 * Virtualized grid with infinite scroll
 */
export const VirtualizedInfiniteScroll: Story = {
  render: () => {
    const [games, setGames] = useState(generateMockGames(100));
    const [loading, setLoading] = useState(false);

    const handleEndReached = () => {
      if (loading) return;
      
      setLoading(true);
      setTimeout(() => {
        setGames(prev => [...prev, ...generateMockGames(50)]);
        setLoading(false);
      }, 1000);
    };

    return (
      <div className="h-screen p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Virtualized Infinite Scroll</h2>
          <p className="text-gray-600">Games loaded: {games.length}</p>
        </div>
        <GameGrid
          games={games}
          enableVirtualization={true}
          onEndReached={handleEndReached}
          variant="default"
        />
        {loading && (
          <div className="text-center py-4">
            <span className="text-gray-600">Loading more games...</span>
          </div>
        )}
      </div>
    );
  }
};

/**
 * Performance comparison
 */
export const PerformanceComparison: Story = {
  render: () => {
    const games = generateMockGames(500);
    
    return (
      <div className="space-y-8 p-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Performance Comparison</h2>
          <p className="text-gray-600 mb-6">Compare regular vs virtualized rendering with 500 games</p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Regular Grid (All 500 rendered)</h3>
            <div className="h-96 overflow-auto border rounded">
              <GameGrid 
                games={games} 
                enableVirtualization={false}
                variant="compact"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Virtualized Grid (Only visible rendered)</h3>
            <div className="h-96">
              <GameGrid 
                games={games} 
                enableVirtualization={true}
                variant="compact"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};