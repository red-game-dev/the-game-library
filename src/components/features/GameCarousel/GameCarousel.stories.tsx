/**
 * GameCarousel Stories
 * Specialized carousel for game cards with visual variants
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import { GameCarousel } from './GameCarousel';
import { GameCard } from '@/components/features/GameCard';
import type { Game } from '@/lib/types';
import { generateMockGames } from '@/lib/core/test';

const mockGames: Game[] = generateMockGames(8);

const meta: Meta<typeof GameCarousel> = {
  title: 'Features/GameCarousel',
  component: GameCarousel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
GameCarousel is a specialized carousel component designed specifically for displaying game cards.
It extends the base Carousel component with gaming-specific themes and styling.

## Features
- Multiple visual variants (default, elevated, glowing, minimal, bordered)
- Featured mode for highlighting special games
- Automatic theme adaptation via CSS variables
- Optimized for game card layouts
- Responsive design for mobile and desktop
- Touch and swipe support
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'glowing', 'minimal', 'bordered'],
      description: 'Visual variant of the carousel'
    },
    featured: {
      control: 'boolean',
      description: 'Enable featured mode with enhanced styling'
    },
    itemsPerView: {
      control: { type: 'number', min: 1, max: 5, step: 1 },
      description: 'Number of game cards visible at once'
    },
    autoScroll: {
      control: 'boolean',
      description: 'Enable automatic scrolling'
    },
    arrowVariant: {
      control: 'select',
      options: ['ghost', 'primary', 'secondary', 'accent'],
      description: 'Arrow button style variant'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Game Carousel
 * Standard carousel showing multiple game cards
 */
export const Default: Story = {
  render: () => {
    const gameCards = mockGames.map((game) => (
      <GameCard 
        key={game.id}
        game={game}
        size="sm"
        variant="default"
        onPlay={(g) => console.log('Play:', g.title)}
        onFavoriteToggle={(id, isFav) => console.log('Favorite:', id, isFav)}
      />
    ));

    return (
      <GameCarousel
        itemsPerView={4}
        slideSpacing={1}
        showArrows={true}
        showDots={true}
      >
        {gameCards}
      </GameCarousel>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic game carousel with default theme. Shows 4 games at once with navigation controls.'
      }
    }
  }
};

/**
 * Featured Games
 * Highlighted carousel for special or new games
 */
export const FeaturedGames: Story = {
  render: () => {
    const featuredGames = mockGames.filter(g => g.isNew).map((game) => (
      <GameCard 
        key={game.id}
        game={game}
        size="lg"
        variant="primary"
        onPlay={(g) => console.log('Play:', g.title)}
        onFavoriteToggle={(id, isFav) => console.log('Favorite:', id, isFav)}
      />
    ));

    return (
      <GameCarousel
        featured={true}
        itemsPerView={2}
        slideSpacing={2}
        autoScroll={true}
        autoScrollInterval={5000}
        arrowVariant="primary"
      >
        {featuredGames}
      </GameCarousel>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Featured games carousel with enhanced styling. Auto-scrolls through new releases.'
      }
    }
  }
};

/**
 * Elevated Variant
 * Game carousel with elevated styling and shadows
 */
export const ElevatedVariant: Story = {
  render: () => {
    const gameCards = mockGames.slice(0, 6).map((game) => (
      <GameCard 
        key={game.id}
        game={game}
        size="md"
        variant="default"
        onPlay={(g) => console.log('Play:', g.title)}
      />
    ));

    return (
      <GameCarousel
        variant="elevated"
        itemsPerView={3}
        slideSpacing={1.5}
        arrowVariant="primary"
        showArrows={true}
        showDots={true}
      >
        {gameCards}
      </GameCarousel>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Elevated variant with raised surface styling and enhanced shadows.'
      }
    }
  }
};

/**
 * Glowing Variant
 * Game carousel with glowing effects and enhanced visuals
 */
export const GlowingVariant: Story = {
  render: () => {
    const gameCards = mockGames.slice(0, 6).map((game) => (
      <GameCard 
        key={game.id}
        game={game}
        size="md"
        variant="accent"
        onPlay={(g) => console.log('Play:', g.title)}
      />
    ));

    return (
      <GameCarousel
        variant="glowing"
        itemsPerView={3}
        slideSpacing={2}
        infinite={true}
        arrowVariant="accent"
      >
        {gameCards}
      </GameCarousel>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Glowing variant with special effects that enhance based on the current theme.'
      }
    }
  }
};

/**
 * Minimal Variant
 * Clean and simple carousel with minimal styling
 */
export const MinimalVariant: Story = {
  render: () => {
    const gameCards = mockGames.slice(0, 6).map((game) => (
      <GameCard 
        key={game.id}
        game={game}
        size="md"
        variant="default"
        onPlay={(g) => console.log('Play:', g.title)}
      />
    ));

    return (
      <GameCarousel
        variant="minimal"
        itemsPerView={3}
        slideSpacing={2}
        infinite={true}
        arrowVariant="ghost"
      >
        {gameCards}
      </GameCarousel>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal variant with clean, simple styling and smaller pagination dots.'
      }
    }
  }
};

/**
 * Bordered Variant
 * Carousel with distinct border styling
 */
export const BorderedVariant: Story = {
  render: () => {
    const gameCards = mockGames.slice(0, 6).map((game) => (
      <GameCard 
        key={game.id}
        game={game}
        size="md"
        variant="primary"
        onPlay={(g) => console.log('Play:', g.title)}
      />
    ));

    return (
      <GameCarousel
        variant="bordered"
        itemsPerView={3}
        slideSpacing={1.5}
        arrowVariant="primary"
      >
        {gameCards}
      </GameCarousel>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Bordered variant with visible border and padding for defined structure.'
      }
    }
  }
};

/**
 * All Themes Comparison  
 * Shows carousel in all available themes - demonstrates automatic color adaptation
 */
export const AllThemes: Story = {
  render: () => {
    const games = mockGames.slice(0, 3);
    
    return (
      <div className="space-y-6">
        <div data-theme="light" className="p-6 bg-white rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Light Theme</h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-3">Default Variant</p>
              <GameCarousel variant="default" itemsPerView={3} slideSpacing={1}>
                {games.map((game) => (
                  <GameCard key={`light-default-${game.id}`} game={game} size="sm" variant="default" />
                ))}
              </GameCarousel>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">Elevated Variant</p>
              <GameCarousel variant="elevated" itemsPerView={3} slideSpacing={1}>
                {games.map((game) => (
                  <GameCard key={`light-elevated-${game.id}`} game={game} size="sm" variant="default" />
                ))}
              </GameCarousel>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">Bordered & Minimal Variants</p>
              <div className="space-y-3">
                <GameCarousel variant="bordered" itemsPerView={3} slideSpacing={1}>
                  {games.map((game) => (
                    <GameCard key={`light-bordered-${game.id}`} game={game} size="sm" variant="default" />
                  ))}
                </GameCarousel>
                <GameCarousel variant="minimal" itemsPerView={3} slideSpacing={1}>
                  {games.map((game) => (
                    <GameCard key={`light-minimal-${game.id}`} game={game} size="sm" variant="default" />
                  ))}
                </GameCarousel>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">Glowing Variant</p>
              <GameCarousel variant="glowing" itemsPerView={3} slideSpacing={1}>
                {games.map((game) => (
                  <GameCard key={`light-glowing-${game.id}`} game={game} size="sm" variant="default" />
                ))}
              </GameCarousel>
            </div>
          </div>
        </div>
        
        <div data-theme="dark" className="p-6 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Dark Theme</h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-3">Default Variant</p>
              <GameCarousel variant="default" itemsPerView={3} slideSpacing={1}>
                {games.map((game) => (
                  <GameCard key={`dark-default-${game.id}`} game={game} size="sm" variant="default" />
                ))}
              </GameCarousel>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300 mb-3">Elevated Variant</p>
              <GameCarousel variant="elevated" itemsPerView={3} slideSpacing={1}>
                {games.map((game) => (
                  <GameCard key={`dark-elevated-${game.id}`} game={game} size="sm" variant="default" />
                ))}
              </GameCarousel>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300 mb-3">Bordered & Minimal Variants</p>
              <div className="space-y-3">
                <GameCarousel variant="bordered" itemsPerView={3} slideSpacing={1}>
                  {games.map((game) => (
                    <GameCard key={`dark-bordered-${game.id}`} game={game} size="sm" variant="default" />
                  ))}
                </GameCarousel>
                <GameCarousel variant="minimal" itemsPerView={3} slideSpacing={1}>
                  {games.map((game) => (
                    <GameCard key={`dark-minimal-${game.id}`} game={game} size="sm" variant="default" />
                  ))}
                </GameCarousel>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300 mb-3">Glowing Variant</p>
              <GameCarousel variant="glowing" itemsPerView={3} slideSpacing={1}>
                {games.map((game) => (
                  <GameCard key={`dark-glowing-${game.id}`} game={game} size="sm" variant="default" />
                ))}
              </GameCarousel>
            </div>
          </div>
        </div>
        
        <div data-theme="neon" className="p-6 rounded-lg" style={{ background: 'rgb(3, 7, 18)' }}>
          <h3 className="text-lg font-semibold text-purple-400 mb-4">Neon Theme</h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-cyan-400 mb-3">Default Variant</p>
              <GameCarousel variant="default" itemsPerView={3} slideSpacing={1}>
                {games.map((game) => (
                  <GameCard key={`neon-default-${game.id}`} game={{ ...game, title: `Cyber ${game.title}` }} size="sm" variant="accent" />
                ))}
              </GameCarousel>
            </div>
            <div>
              <p className="text-sm font-medium text-cyan-400 mb-3">Elevated Variant</p>
              <GameCarousel variant="elevated" itemsPerView={3} slideSpacing={1}>
                {games.map((game) => (
                  <GameCard key={`neon-elevated-${game.id}`} game={{ ...game, title: `Cyber ${game.title}` }} size="sm" variant="accent" />
                ))}
              </GameCarousel>
            </div>
            <div>
              <p className="text-sm font-medium text-cyan-400 mb-3">Bordered & Minimal Variants</p>
              <div className="space-y-3">
                <GameCarousel variant="bordered" itemsPerView={3} slideSpacing={1}>
                  {games.map((game) => (
                    <GameCard key={`neon-bordered-${game.id}`} game={{ ...game, title: `Cyber ${game.title}` }} size="sm" variant="accent" />
                  ))}
                </GameCarousel>
                <GameCarousel variant="minimal" itemsPerView={3} slideSpacing={1}>
                  {games.map((game) => (
                    <GameCard key={`neon-minimal-${game.id}`} game={{ ...game, title: `Cyber ${game.title}` }} size="sm" variant="accent" />
                  ))}
                </GameCarousel>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-cyan-400 mb-3">Glowing Variant</p>
              <GameCarousel variant="glowing" itemsPerView={3} slideSpacing={1}>
                {games.map((game) => (
                  <GameCard key={`neon-glowing-${game.id}`} game={{ ...game, title: `Cyber ${game.title}` }} size="sm" variant="accent" />
                ))}
              </GameCarousel>
            </div>
          </div>
        </div>
        
        <div data-theme="gold" className="p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">Gold Theme</h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-yellow-300 mb-3">Default Variant</p>
              <GameCarousel variant="default" itemsPerView={3} slideSpacing={1}>
                {games.map((game) => (
                  <GameCard key={`gold-default-${game.id}`} game={{ ...game, title: `VIP ${game.title}` }} size="sm" variant="primary" />
                ))}
              </GameCarousel>
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-300 mb-3">Elevated Variant</p>
              <GameCarousel variant="elevated" itemsPerView={3} slideSpacing={1}>
                {games.map((game) => (
                  <GameCard key={`gold-elevated-${game.id}`} game={{ ...game, title: `VIP ${game.title}` }} size="sm" variant="primary" />
                ))}
              </GameCarousel>
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-300 mb-3">Bordered & Minimal Variants</p>
              <div className="space-y-3">
                <GameCarousel variant="bordered" itemsPerView={3} slideSpacing={1}>
                  {games.map((game) => (
                    <GameCard key={`gold-bordered-${game.id}`} game={{ ...game, title: `VIP ${game.title}` }} size="sm" variant="primary" />
                  ))}
                </GameCarousel>
                <GameCarousel variant="minimal" itemsPerView={3} slideSpacing={1}>
                  {games.map((game) => (
                    <GameCard key={`gold-minimal-${game.id}`} game={{ ...game, title: `VIP ${game.title}` }} size="sm" variant="primary" />
                  ))}
                </GameCarousel>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-300 mb-3">Glowing Variant</p>
              <GameCarousel variant="glowing" itemsPerView={3} slideSpacing={1}>
                {games.map((game) => (
                  <GameCard key={`gold-glowing-${game.id}`} game={{ ...game, title: `VIP ${game.title}` }} size="sm" variant="primary" />
                ))}
              </GameCarousel>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

/**
 * Mobile Single View
 * Optimized for mobile devices with one game at a time
 */
export const MobileSingleView: Story = {
  render: () => {
    const gameCards = mockGames.slice(0, 5).map((game) => (
      <GameCard 
        key={game.id}
        game={game}
        size="lg"
        variant="default"
        onPlay={(g) => console.log('Play:', g.title)}
        onFavoriteToggle={(id, isFav) => console.log('Favorite:', id, isFav)}
      />
    ));

    return (
      <GameCarousel
        itemsPerView={1}
        slideSpacing={0.5}
        snap={true}
        showArrows={false}
        showDots={true}
        enableSwipe={true}
      >
        {gameCards}
      </GameCarousel>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Mobile-optimized carousel showing one game at a time. Swipe gestures enabled, arrows hidden for cleaner mobile UX.'
      }
    },
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

/**
 * Auto-Scrolling Gallery
 * Continuous scrolling gallery for lobby displays
 */
export const AutoScrollingGallery: Story = {
  render: () => {
    const gameCards = [...mockGames, ...mockGames].map((game, idx) => (
      <GameCard 
        key={`${game.id}-${idx}`}
        game={game}
        size="xs"
        variant="default"
        onPlay={(g) => console.log('Play:', g.title)}
      />
    ));

    return (
      <GameCarousel
        itemsPerView={5}
        slideSpacing={0.5}
        autoScroll={true}
        autoScrollInterval={2000}
        infinite={true}
        showArrows={false}
        showDots={false}
        enableSwipe={false}
      >
        {gameCards}
      </GameCarousel>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Continuous auto-scrolling gallery ideal for lobby displays or promotional areas. No user controls for distraction-free viewing.'
      }
    }
  }
};

/**
 * Popular Games Carousel
 * Showcases top-rated and most-played games
 */
export const PopularGames: Story = {
  render: () => {
    const popularGames = mockGames
      .sort((a, b) => (b.playCount || 0) - (a.playCount || 0))
      .slice(0, 6)
      .map((game) => (
        <GameCard 
          key={game.id}
          game={game}
          size="md"
          variant="primary"
          onPlay={(g) => console.log('Play:', g.title)}
          onFavoriteToggle={(id, isFav) => console.log('Favorite:', id, isFav)}
        />
      ));

    return (
      <GameCarousel
        featured={true}
        itemsPerView={3}
        slideSpacing={1.5}
        arrowVariant="primary"
        arrowSize="md"
      >
        {popularGames}
      </GameCarousel>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel showcasing popular games sorted by play count. Shows statistics to highlight popularity.'
      }
    }
  }
};

/**
 * Responsive Layout
 * Demonstrates responsive behavior across screen sizes
 */
export const ResponsiveLayout: Story = {
  render: () => {
    const gameCards = mockGames.map((game) => (
      <GameCard 
        key={game.id}
        game={game}
        size="md"
        variant="default"
        onPlay={(g) => console.log('Play:', g.title)}
        onFavoriteToggle={(id, isFav) => console.log('Favorite:', id, isFav)}
      />
    ));

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Desktop (4 cards)</h3>
          <GameCarousel
            itemsPerView={4}
            slideSpacing={1.5}
          >
            {gameCards}
          </GameCarousel>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Tablet (2 cards)</h3>
          <GameCarousel
            itemsPerView={2}
            slideSpacing={1}
          >
            {gameCards}
          </GameCarousel>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Mobile (1 card)</h3>
          <GameCarousel
            itemsPerView={1}
            slideSpacing={0.5}
            showArrows={false}
          >
            {gameCards}
          </GameCarousel>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how the carousel adapts to different screen sizes with appropriate cards per view.'
      }
    }
  }
};

/**
 * Interactive Playground
 * Full control over all GameCarousel props
 */
export const Playground: Story = {
  args: {
    variant: 'default',
    featured: false,
    itemsPerView: 3,
    slideSpacing: 1,
    showArrows: true,
    showDots: true,
    arrowVariant: 'ghost',
    arrowSize: 'sm',
    autoScroll: false,
    autoScrollInterval: 5000,
    infinite: false,
    snap: true,
    enableSwipe: true
  },
  render: (args) => {
    const gameCards = mockGames.map((game) => (
      <GameCard 
        key={game.id}
        game={game}
        size="md"
        variant="default"
        onPlay={(g) => console.log('Play:', g.title)}
        onFavoriteToggle={(id, isFav) => console.log('Favorite:', id, isFav)}
      />
    ));

    return (
      <GameCarousel {...args}>
        {gameCards}
      </GameCarousel>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to experiment with all GameCarousel props and configurations.'
      }
    }
  }
};

/**
 * Optimized Pagination - Twenty Items
 * 20 items with 5 visible - only 4 pagination dots
 */
export const OptimizedPaginationLarge: Story = {
  render: () => {
    const games = generateMockGames(20);
    const gameCards = games.map((game) => (
      <GameCard 
        key={game.id}
        game={game}
        size="sm"
        variant="default"
        onPlay={(g) => console.log('Play:', g.title)}
        onFavoriteToggle={(id, isFav) => console.log('Favorite:', id, isFav)}
      />
    ));

    return (
      <GameCarousel
        variant="elevated"
        featured={true}
        slidesPerView={5}
        slideSpacing={1.5}
        showArrows={true}
        showDots={true}
        infinite={true}
        autoScroll={true}
        autoScrollInterval={5000}
      >
        {gameCards}
      </GameCarousel>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with 20 items showing 5 at a time. Pagination dots are reduced to 4 (20÷5) by scrolling in groups instead of individual items.'
      }
    }
  }
};

/**
 * Grouped Pagination Examples
 * Shows different configurations and their resulting dot counts
 */
export const GroupedPaginationExamples: Story = {
  render: () => {
    const games15 = generateMockGames(15);
    const games20 = generateMockGames(20);
    
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">15 items, 3 per view = 5 dots</h3>
          <p className="text-sm text-gray-600 mb-4">Scrolls 3 items at a time</p>
          <GameCarousel
            slidesPerView={3}
            slideSpacing={1}
            showDots={true}
            showArrows={true}
          >
            {games15.map((game) => (
              <GameCard 
                key={game.id}
                game={game}
                size="sm"
                variant="default"
                onPlay={(g) => console.log('Play:', g.title)}
              />
            ))}
          </GameCarousel>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">20 items, 4 per view = 5 dots</h3>
          <p className="text-sm text-gray-600 mb-4">Scrolls 4 items at a time</p>
          <GameCarousel
            slidesPerView={4}
            slideSpacing={1}
            showDots={true}
            showArrows={true}
          >
            {games20.map((game) => (
              <GameCard 
                key={game.id}
                game={game}
                size="sm"
                variant="default"
                onPlay={(g) => console.log('Play:', g.title)}
              />
            ))}
          </GameCarousel>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">20 items, 5 per view = 4 dots</h3>
          <p className="text-sm text-gray-600 mb-4">Scrolls 5 items at a time</p>
          <GameCarousel
            slidesPerView={5}
            slideSpacing={1}
            showDots={true}
            showArrows={true}
          >
            {games20.map((game) => (
              <GameCard 
                key={game.id}
                game={game}
                size="sm"
                variant="default"
                onPlay={(g) => console.log('Play:', g.title)}
              />
            ))}
          </GameCarousel>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how grouped pagination reduces the number of dots. Each carousel scrolls by the number of visible slides, creating logical page groups.'
      }
    }
  }
};

/**
 * Themed Section with Background
 * Shows carousel with themed background styling
 */
export const ThemedSectionPurple: Story = {
  render: () => {
    // Generate all 20 games first
    const allGames = generateMockGames(20);
    
    const gameCards = allGames.map((game) => (
      <GameCard 
        key={game.id}
        game={game}
        size="md"
        variant="primary"
        onPlay={(g) => console.log('Play:', g.title)}
        onFavoriteToggle={(id, isFav) => console.log('Favorite:', id, isFav)}
      />
    ));

    return (
      <div className="bg-gradient-to-br from-purple-900 to-purple-700 p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <span>🎮</span> Featured Section
        </h2>
        <GameCarousel
          variant="glowing"
          featured={true}
          slidesPerView={5}
          slideSpacing={1.5}
          showArrows={true}
          showDots={true}
          arrowVariant="accent"
          infinite={true}
        >
          {gameCards}
        </GameCarousel>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with purple gradient background theme. Shows 5 items at once with only 4 pagination dots for 20 items.'
      }
    }
  }
};

/**
 * Limited Collection Display
 * Shows carousel with a limited number of items
 */
export const LimitedCollection: Story = {
  render: () => {
    // Generate exactly 15 games
    const games = generateMockGames(15);
    
    const gameCards = games.map((game) => (
      <GameCard 
        key={game.id}
        game={game}
        size="md"
        variant="accent"
        onPlay={(g) => console.log('Play:', g.title)}
      />
    ));

    return (
      <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <span>⭐</span> Premium Collection
        </h2>
        <GameCarousel
          variant="bordered"
          featured={true}
          slidesPerView={3}
          slideSpacing={2}
          showArrows={true}
          showDots={true}
          arrowVariant="primary"
        >
          {gameCards}
        </GameCarousel>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Limited collection of 15 items. With 3 items visible at once, results in 5 pagination dots (15÷3).'
      }
    }
  }
};