/**
 * @fileoverview GameGrid component for responsive game card layout with virtualization support
 * @module components/features/GameGrid
 */

'use client';

import React, { memo, useMemo, useCallback } from 'react';
import { GameCard, GameCardSkeleton } from '../GameCard';
import { Carousel } from '@/components/ui/Carousel';
import { VirtualGrid } from '@/components/ui/VirtualGrid';
import { Inbox } from 'lucide-react';
import type { Game } from '@/lib/types';
import '@/styles/components/features/game-grid.css';

/**
 * Props for the GameGrid component
 * @interface GameGridProps
 */
export interface GameGridProps {
  /** Array of games to display */
  games: Game[];
  /** Loading state */
  isLoading?: boolean;
  /** Number of skeleton cards to show when loading */
  skeletonCount?: number;
  /** Callback when a game card is clicked */
  onGameClick?: (game: Game) => void;
  /** Callback when favorite is toggled */
  onFavoriteToggle?: (gameId: string, isFavorite: boolean) => void;
  /** Layout mode - grid or flex */
  layout?: 'grid' | 'flex' | 'carousel';
  /** Grid variant for different layouts */
  variant?: 'default' | 'compact' | 'featured';
  /** Number of columns configuration (for grid layout) */
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    wide?: number;
  };
  /** Custom className for additional styling */
  className?: string;
  /** Enable virtualization for large lists */
  enableVirtualization?: boolean;
  /** Virtualization overscan amount */
  virtualOverscan?: number;
  /** Callback when scrolling reaches the end (for infinite scroll) */
  onEndReached?: () => void;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Default column configuration based on variant
 */
const defaultColumns = {
  default: { mobile: 1, tablet: 1, desktop: 3, wide: 4 },
  compact: { mobile: 1, tablet: 1, desktop: 4, wide: 5 },
  featured: { mobile: 1, tablet: 1, desktop: 2, wide: 3 }
};

/**
 * GameGrid Component
 * 
 * @description Responsive grid layout for displaying game cards.
 * Implements responsive design with customizable columns and performance optimizations.
 * 
 * @example
 * ```tsx
 * <GameGrid 
 *   games={games}
 *   onGameClick={handleGameClick}
 *   onFavoriteToggle={handleFavorite}
 *   variant="default"
 * />
 * ```
 * 
 * @param {GameGridProps} props - Component props
 * @returns {JSX.Element} Rendered game grid
 */
export const GameGrid = memo<GameGridProps>(({
  games,
  isLoading = false,
  skeletonCount = 12,
  onGameClick,
  onFavoriteToggle,
  layout = 'grid',
  variant = 'default',
  columns,
  className = '',
  enableVirtualization = false,
  virtualOverscan = 3,
  onEndReached,
  testId = 'game-grid'
}) => {
  /**
   * Get layout classes and styles based on layout mode
   */
  const { layoutClasses, layoutStyles } = useMemo(() => {
    // For flex layout
    if (layout === 'flex') {
      return { 
        layoutClasses: 'game-grid-flex gap-4',
        layoutStyles: {} 
      };
    }
    
    // For carousel layout (handled by Carousel component)
    if (layout === 'carousel') {
      return { 
        layoutClasses: '',
        layoutStyles: {} 
      };
    }
    
    // For grid layout
    const cols = columns || defaultColumns[variant];
    
    // Use CSS Grid with auto-fit for automatic responsive layout
    if (!cols) {
      return { 
        layoutClasses: 'game-grid-auto gap-4',
        layoutStyles: {} 
      };
    }
    
    // Use CSS Grid with dynamic columns via CSS custom properties
    const styles: React.CSSProperties = {
      '--grid-cols-mobile': cols.mobile || 1,
      '--grid-cols-tablet': cols.tablet || 2,
      '--grid-cols-desktop': cols.desktop || 3,
      '--grid-cols-wide': cols.wide || 4,
    } as React.CSSProperties;
    
    return {
      layoutClasses: 'game-grid-responsive gap-4',
      layoutStyles: styles
    };
  }, [columns, variant, layout]);

  /**
   * Get card size based on grid variant
   */
  const getCardVariant = useCallback(() => {
    switch (variant) {
      case 'compact':
        return 'grid-sm';
      case 'featured':
        return 'grid-lg';
      default:
        return 'grid-md';
    }
  }, [variant]);

  /**
   * Render a game card (used for both regular and virtual grids)
   */
  const renderGameCard = useCallback((game: Game) => (
    <GameCard
      key={game.id}
      game={game}
      onClick={onGameClick}
      onPlay={onGameClick}
      onFavoriteToggle={onFavoriteToggle}
      size={getCardVariant()}
      showPlayOnHover={true}
      testId={`${testId}-card-${game.id}`}
    />
  ), [onGameClick, onFavoriteToggle, getCardVariant, testId]);

  /**
   * Get grid columns based on variant
   */
  const getGridColumns = () => {
    const cols = columns || defaultColumns[variant];
    if (!cols) return 3; // Default fallback
    
    // Return desktop columns as the base (VirtualGrid handles responsive internally)
    return cols.desktop || 3;
  };

  // Show loading skeleton
  if (isLoading) {
    const skeletonLayout = layout === 'carousel' ? 'flex gap-4' : layoutClasses;
    return (
      <div
        className={`${skeletonLayout} ${className}`}
        style={layoutStyles}
        data-testid={`${testId}-loading`}
        role="status"
        aria-label="Loading games"
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <GameCardSkeleton 
            key={`skeleton-${index}`}
            testId={`${testId}-skeleton-${index}`}
          />
        ))}
      </div>
    );
  }

  // Empty state
  if (!games || games.length === 0) {
    return (
      <EmptyState
        testId={`${testId}-empty`}
        className={className}
      />
    );
  }

  // Render games as cards
  const gameCards = games.map((game) => (
    <GameCard
      key={game.id}
      game={game}
      onClick={onGameClick}
      onPlay={onGameClick}
      onFavoriteToggle={onFavoriteToggle}
      size={getCardVariant()}
      showPlayOnHover={true}
      testId={`${testId}-card-${game.id}`}
    />
  ));

  // Carousel layout
  if (layout === 'carousel') {
    return (
      <Carousel
        className={className}
        showArrows={true}
        showDots={false}
        slideSpacing={1}
        snap={true}
        options={{ align: 'start' }}
        testId={testId}
      >
        {gameCards}
      </Carousel>
    );
  }

  // Flex layout
  if (layout === 'flex') {
    return (
      <div
        className={`${layoutClasses} ${className}`}
        style={layoutStyles}
        data-testid={testId}
        role="list"
        aria-label="Games list"
      >
        {gameCards.map((card, index) => (
          <div
            key={`flex-item-${index}`}
            className="game-grid-item"
            role="listitem"
          >
            {card}
          </div>
        ))}
      </div>
    );
  }

  // Use VirtualGrid for large datasets when enabled
  if (enableVirtualization && games.length > 50) {
    return (
      <div className={`h-[calc(100vh-200px)] ${className}`}>
        <VirtualGrid
          items={games}
          columns={getGridColumns()}
          gap={16}
          estimateSize={variant === 'compact' ? 250 : variant === 'featured' ? 400 : 300}
          overscan={virtualOverscan}
          renderItem={renderGameCard}
          getItemKey={(game) => game.id}
          onEndReached={onEndReached}
          containerClassName="scrollbar-thin"
          emptyComponent={
            <EmptyState testId={`${testId}-empty`} />
          }
        />
      </div>
    );
  }

  // Default grid layout
  return (
    <div
      className={`${layoutClasses} ${className}`}
      style={layoutStyles}
      data-testid={testId}
      role="grid"
      aria-label="Games grid"
    >
      {gameCards.map((card, index) => (
        <div
          key={`grid-item-${index}`}
          role="gridcell"
        >
          {card}
        </div>
      ))}
    </div>
  );
});

GameGrid.displayName = 'GameGrid';

/**
 * Empty state component for when no games are available
 * @private
 */
const EmptyState: React.FC<{
  testId?: string;
  className?: string;
}> = ({ testId = 'empty-state', className = '' }) => {
  return (
    <div
      className={`
        w-full flex flex-col items-center justify-center 
        min-h-[400px] p-8 text-center
        ${className}
      `}
      data-testid={testId}
    >
      <div className="mb-4">
        <Inbox className="w-24 h-24 mx-auto text-secondary" strokeWidth={1} />
      </div>
      <h3 className="text-xl font-semibold text-text mb-2">
        No games found
      </h3>
      <p className="text-secondary max-w-md mx-auto">
        Try adjusting your filters or search terms to find what you&rsquo;re looking for.
      </p>
    </div>
  );
};

/**
 * Animated grid entry component for staggered animations
 * @private
 */
export const AnimatedGameGrid: React.FC<GameGridProps> = (props) => {
  const { games, ...restProps } = props;

  return (
    <GameGrid
      {...restProps}
      games={games}
      className={`${props.className} animate-stagger`}
    />
  );
};

export default GameGrid;