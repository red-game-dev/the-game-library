/**
 * @fileoverview GameCard component for displaying individual game information
 * @module components/features/GameCard
 */

'use client';

import React, { memo, useState, useCallback } from 'react';
import { formatPercentage, formatLargeNumber } from '@/lib/utils';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  CardImage,
  type CardSize 
} from '@/components/ui/Card';
import { Badge, BadgeGroup, type BadgeSize } from '@/components/ui/Badge';
import { Button, type ButtonSize } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { Heart, Play, Info, TrendingUp, Users } from 'lucide-react';
import type { Game } from '@/lib/types';
import { UI_DELAYS } from '@/lib/core/config/constants/app.constants';
import '@/styles/components/features/game-card.css';

/**
 * GameCard size variants that extend Card sizes
 */
export type GameCardSize = CardSize | 'grid-xs' | 'grid-sm' | 'grid-md' | 'grid-lg';

/**
 * Props for the GameCard component
 * @interface GameCardProps
 */
export interface GameCardProps {
  /** Game data to display */
  game: Game;
  /** Size variant of the card */
  size?: GameCardSize;
  /** Card color variant */
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info';
  /** Callback when favorite button is clicked */
  onFavoriteToggle?: (gameId: string, isFavorite: boolean) => void;
  /** Callback when play button is clicked */
  onPlay?: (game: Game) => void;
  /** Callback when info button is clicked */
  onInfo?: (game: Game) => void;
  /** Callback when the card is clicked */
  onClick?: (game: Game) => void;
  /** Whether the card is in loading state */
  isLoading?: boolean;
  /** Custom actions to display */
  actions?: React.ReactNode;
  /** Whether to show detailed info */
  showDetails?: boolean;
  /** Whether to show play on hover */
  showPlayOnHover?: boolean;
  /** Custom className for additional styling */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Get game type badge variant
 */
const getGameTypeBadgeVariant = (type: Game['type']) => {
  const typeMap = {
    slots: 'solid-warning',
    table: 'solid-success',
    live: 'solid-error',
    instant: 'solid-info',
    jackpot: 'solid-primary'
  } as const;
  return typeMap[type] || 'solid-default';
};

/**
 * Map GameCard sizes to Card sizes and configurations
 */
const getSizeConfig = (size: GameCardSize) => {
  switch (size) {
    case 'grid-xs':
      return { cardSize: 'xs' as CardSize, badgeSize: 'sm' as BadgeSize, buttonSize: 'sm' as ButtonSize, showDetails: false };
    case 'grid-sm':
      return { cardSize: 'sm' as CardSize, badgeSize: 'sm' as BadgeSize, buttonSize: 'sm' as ButtonSize, showDetails: false };
    case 'grid-md':
      return { cardSize: 'md' as CardSize, badgeSize: 'md' as BadgeSize, buttonSize: 'md' as ButtonSize, showDetails: true };
    case 'grid-lg':
      return { cardSize: 'lg' as CardSize, badgeSize: 'md' as BadgeSize, buttonSize: 'md' as ButtonSize, showDetails: true };
    case 'xs':
    case 'sm':
      return { cardSize: size, badgeSize: 'sm' as BadgeSize, buttonSize: 'sm' as ButtonSize, showDetails: false };
    case 'md':
    case 'lg':
      return { cardSize: size, badgeSize: 'md' as BadgeSize, buttonSize: 'md' as ButtonSize, showDetails: true };
    case 'xl':
    case 'xxl':
      return { cardSize: size, badgeSize: 'lg' as BadgeSize, buttonSize: 'lg' as ButtonSize, showDetails: true };
    default:
      return { cardSize: 'md' as CardSize, badgeSize: 'md' as BadgeSize, buttonSize: 'md' as ButtonSize, showDetails: true };
  }
};

/**
 * GameCard Component
 * 
 * @description Displays a game card with thumbnail, title, provider, and interactive elements.
 * Extends the base Card component with game-specific features.
 * 
 * @example
 * ```tsx
 * <GameCard 
 *   game={gameData}
 *   size="grid-md"
 *   onFavoriteToggle={handleFavorite}
 *   onPlay={handlePlay}
 * />
 * ```
 */
export const GameCard = memo<GameCardProps>(({
  game,
  size = 'grid-md',
  variant = 'default',
  onFavoriteToggle,
  onPlay,
  onInfo,
  onClick,
  isLoading = false,
  actions,
  showDetails = true,
  showPlayOnHover = true,
  className = '',
  testId = 'game-card'
}) => {
  const [isFavoriteAnimating, setIsFavoriteAnimating] = useState(false);
  const config = getSizeConfig(size);

  /**
   * Handle favorite button click
   */
  const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (onFavoriteToggle) {
      setIsFavoriteAnimating(true);
      onFavoriteToggle(game.id, !game.isFavorite);
      setTimeout(() => setIsFavoriteAnimating(false), UI_DELAYS.ANIMATION_MEDIUM);
    }
  }, [game.id, game.isFavorite, onFavoriteToggle]);

  /**
   * Handle play button click
   */
  const handlePlayClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPlay) {
      onPlay(game);
    }
  }, [game, onPlay]);

  /**
   * Handle info button click
   */
  const handleInfoClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onInfo) {
      onInfo(game);
    }
  }, [game, onInfo]);

  /**
   * Handle card click
   */
  const handleCardClick = useCallback(() => {
    if (onClick) {
      onClick(game);
    }
  }, [game, onClick]);

  if (isLoading) {
    return <GameCardSkeleton size={config.cardSize} className={className} testId={`${testId}-skeleton`} />;
  }

  // Build overlay content for the image
  const imageOverlay = (
    <div className="flex gap-1">
      {game.isComingSoon && (
        <Badge variant="info" size={config.badgeSize} className="badge-flashy" gap="sm">
          🚀 SOON
        </Badge>
      )}
      {game.isNew && !game.isComingSoon && (
        <Badge variant="new" size={config.badgeSize} pulse gap="sm">
          NEW
        </Badge>
      )}
      {game.isHot && (
        <Badge variant="hot" size={config.badgeSize} gap="sm">
          HOT
        </Badge>
      )}
      {game.isOnSale && (
        <Badge variant="sale" size={config.badgeSize} gap="sm">
          SALE
        </Badge>
      )}
    </div>
  );

  // Build card actions
  const cardActions = actions || (
    <div className="flex items-center gap-1">
      <Tooltip content={game.isFavorite ? "Remove from favorites" : "Add to favorites"} delay={UI_DELAYS.TOOLTIP_DELAY_LONG}>
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          onClick={handleFavoriteClick}
          className={isFavoriteAnimating ? 'animate-bounce' : ''}
          aria-label={game.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart 
            className={`w-4 h-4 ${game.isFavorite ? 'fill-red-500 text-red-500' : ''}`}
          />
        </Button>
      </Tooltip>
      
      {onInfo && (
        <Tooltip content="Game details" delay={UI_DELAYS.TOOLTIP_DELAY_LONG}>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onClick={handleInfoClick}
            aria-label="View game details"
          >
            <Info className="w-4 h-4" />
          </Button>
        </Tooltip>
      )}
    </div>
  );

  return (
    <Card
      size={config.cardSize}
      variant={variant}
      interactive
      bordered
      padding="none"
      className={`${className} will-animate`}
      onClick={handleCardClick}
      data-testid={testId}
    >
      {/* Game Image with Badges */}
      <div className="relative">
        <CardImage
          src={game.thumbnail}
          alt={`${game.title} thumbnail`}
          aspectRatio="4-3"
          overlay={imageOverlay}
          overlayPosition="top"
          rounded={false}
          className="will-animate"
        />
        
        {/* Game Type Badge at bottom */}
        <div className="absolute bottom-2 left-2">
          <Badge 
            variant={getGameTypeBadgeVariant(game.type)}
            size={config.badgeSize}
            gap="sm"
          >
            {game.type.toUpperCase()}
          </Badge>
        </div>

        {/* Play on Hover Overlay */}
        {showPlayOnHover && onPlay && (
          <div className="game-card-play-overlay">
            <Button
              variant="primary"
              size={config.buttonSize}
              onClick={handlePlayClick}
              leftIcon={<Play className="w-4 h-4" />}
            >
              PLAY NOW
            </Button>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="game-card-content p-2">
        {/* Header Section */}
        <div className="game-card-header">
          <CardHeader
            title={game.title}
            subtitle={game.provider.name}
            actions={cardActions}
            titleClassName="game-card-title"
            subtitleClassName="game-card-subtitle"
          />
        </div>

        {/* Middle Section - Description (grows to fill space) */}
        <div className="game-card-middle">
          {game.description && config.showDetails ? (
            <CardBody
              description={game.description}
              maxLength={80}
              expandable
              className="game-card-description"
            />
          ) : (
            <div className="game-card-description-placeholder" />
          )}
        </div>

        {/* Footer Section - Stats and Tags (always at bottom) */}
        {config.showDetails && showDetails && (
          <div className="game-card-footer">
            {/* Stats Row */}
            <div className="flex items-center gap-3 text-xs text-secondary mb-2">
              {game.rtp && (
                <Tooltip content="Return to Player" delay={UI_DELAYS.TOOLTIP_DELAY_LONG}>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>RTP: {formatPercentage(game.rtp)}</span>
                  </div>
                </Tooltip>
              )}
              {game.playCount && (
                <Tooltip content="Total plays" delay={UI_DELAYS.TOOLTIP_DELAY_LONG}>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{formatLargeNumber(game.playCount, true)}</span>
                  </div>
                </Tooltip>
              )}
            </div>

            {/* Tags */}
            {game.tags && game.tags.length > 0 && (
              <BadgeGroup gap="sm">
                {game.tags.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline-default"
                    size="sm"
                    rounded="md"
                  >
                    {tag}
                  </Badge>
                ))}
                {game.tags.length > 3 && (
                  <Badge variant="outline-default" size="sm" rounded="md">
                    +{game.tags.length - 3}
                  </Badge>
                )}
              </BadgeGroup>
            )}
          </div>
        )}

        {/* Play Button for non-hover mode */}
        {!showPlayOnHover && onPlay && (
          <CardFooter className="mt-6">
            <Button
              variant="primary"
              size={config.buttonSize}
              onClick={handlePlayClick}
              leftIcon={<Play className="w-4 h-4" />}
              className="w-full"
            >
              PLAY NOW
            </Button>
          </CardFooter>
        )}
      </div>
    </Card>
  );
});

GameCard.displayName = 'GameCard';

/**
 * Skeleton loader for GameCard
 */
export const GameCardSkeleton: React.FC<{ 
  size?: CardSize;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info';
  className?: string; 
  testId?: string;
}> = ({ size = 'md', variant = 'default', className = '', testId = 'game-card-skeleton' }) => {
  return (
    <Card
      size={size}
      variant={variant}
      bordered
      padding="none"
      className={`animate-pulse ${className}`}
      data-testid={testId}
    >
      {/* Image Skeleton */}
      <div className="aspect-4-3 bg-skeleton" />
      
      {/* Content Skeleton */}
      <div className="game-card-content p-2 space-y-3">
        <div className="space-y-2">
          <div className="h-5 bg-skeleton rounded w-3/4" />
          <div className="h-4 bg-skeleton rounded w-1/2" />
        </div>
        
        <div className="space-y-2">
          <div className="h-3 bg-skeleton rounded w-full" />
          <div className="h-3 bg-skeleton rounded w-4/5" />
        </div>
        
        <div className="flex gap-1">
          <div className="h-5 bg-skeleton rounded-full w-12" />
          <div className="h-5 bg-skeleton rounded-full w-12" />
          <div className="h-5 bg-skeleton rounded-full w-12" />
        </div>
      </div>
    </Card>
  );
};

export default GameCard;