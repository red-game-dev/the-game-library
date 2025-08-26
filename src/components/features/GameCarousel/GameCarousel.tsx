/**
 * @fileoverview GameCarousel component - A specialized carousel for displaying game cards
 * @module components/features/GameCarousel
 */

'use client';

import React, { useMemo } from 'react';
import { Carousel } from '@/components/ui/Carousel';
import type { CarouselProps } from '@/components/ui/Carousel';
import { useResponsiveSlidesPerView, useResponsiveValue } from '@/lib/core/frontend/hooks/useResponsiveValue';
import '@/styles/components/features/game-carousel.css';

/**
 * Props for the GameCarousel component
 * @interface GameCarouselProps
 */
export interface GameCarouselProps extends Omit<CarouselProps, 'children' | 'slides'> {
  /** Game cards to display */
  children: React.ReactNode | React.ReactNode[];
  /** Visual variant of the carousel */
  variant?: 'default' | 'elevated' | 'glowing' | 'minimal' | 'bordered';
  /** Enable featured mode with enhanced styling */
  featured?: boolean;
}


/**
 * GameCarousel component
 * A specialized carousel for displaying game cards with gaming-specific styling
 * Theme colors are automatically applied via CSS variables, variant controls visual style
 */
export const GameCarousel: React.FC<GameCarouselProps> = React.memo(({
  children,
  variant = 'default',
  featured = false,
  className = '',
  arrowVariant = 'ghost',
  showDots: propShowDots,
  showArrows = true,
  slidesPerView,
  ...carouselProps
}) => {
  const responsiveSlidesPerView = useResponsiveSlidesPerView(slidesPerView);
  const responsiveShowDots = useResponsiveValue<boolean>({
    xs: false,
    sm: false,
    md: true,
    lg: true,
    xl: true,
    '2xl': true,
    '3xl': true
  });
  
  const finalShowDots = propShowDots === false ? false : responsiveShowDots;

  const classes = useMemo(() => [
    'game-carousel',
    variant && `game-carousel--${variant}`,
    featured && 'game-carousel--featured',
    className
  ].filter(Boolean).join(' '), [variant, featured, className]);

  return (
    <Carousel
      className={classes}
      showDots={finalShowDots}
      showArrows={showArrows}
      arrowVariant={arrowVariant}
      slidesPerView={responsiveSlidesPerView}
      {...carouselProps}
    >
      {children}
    </Carousel>
  );
});

GameCarousel.displayName = 'GameCarousel';

export default GameCarousel;