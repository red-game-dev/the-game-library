/**
 * @fileoverview PromotionBanner component for displaying promotional content
 * @module components/features/PromotionBanner
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Sparkles } from 'lucide-react';
import '@/styles/components/features/promotion-banner.css';

/**
 * Promotion type
 */
export interface Promotion {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  badge?: {
    text: string;
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    icon?: React.ReactNode;
  };
  highlight?: string;
  validUntil?: Date;
}

/**
 * Props for the PromotionBanner component
 */
export interface PromotionBannerProps {
  /** Promotion data to display */
  promotion: Promotion;
  /** Banner size variant */
  variant?: 'hero' | 'compact' | 'featured';
  /** Visual style variant */
  visualVariant?: 'default' | 'elevated' | 'glowing' | 'premium';
  /** Show countdown timer if validUntil is set */
  showCountdown?: boolean;
  /** Enable overlay for better text visibility */
  enableOverlay?: boolean;
  /** Overlay opacity (0-1, default 0.7) */
  overlayOpacity?: number;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testId?: string;
}

/**
 * PromotionBanner Component
 * Displays promotional content with call-to-action
 */
export const PromotionBanner: React.FC<PromotionBannerProps> = ({
  promotion,
  variant = 'hero',
  visualVariant = 'default',
  showCountdown = false,
  enableOverlay = true,
  overlayOpacity = 0.7,
  className = '',
  testId = 'promotion-banner'
}) => {
  const [timeLeft, setTimeLeft] = React.useState<string>('');

  React.useEffect(() => {
    if (!showCountdown || !promotion.validUntil) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(promotion.validUntil!).getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft('Expired');
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [showCountdown, promotion.validUntil]);

  return (
    <div 
      className={`promotion-banner promotion-banner--${variant} ${visualVariant !== 'default' ? `promotion-banner--${visualVariant}` : ''} ${className}`}
      data-testid={testId}
    >
      <div className="promotion-banner__background">
        <Image
          src={promotion.imageUrl}
          alt={promotion.title}
          fill
          className="promotion-banner__image"
          priority={variant === 'hero'}
          quality={90}
        />
        {enableOverlay && (
          <div 
            className="promotion-banner__overlay" 
            style={{ 
              background: `linear-gradient(
                135deg,
                rgba(0, 0, 0, ${overlayOpacity}) 0%,
                rgba(0, 0, 0, ${overlayOpacity * 0.75}) 50%,
                rgba(0, 0, 0, ${overlayOpacity * 0.9}) 100%
              )`
            }}
          />
        )}
      </div>

      <div className="promotion-banner__content">
        {promotion.badge && (
          <Badge 
            variant={promotion.badge.variant || 'primary'} 
            size="lg"
            className="promotion-banner__badge"
            icon={promotion.badge.icon || <Sparkles className="w-4 h-4" />}
            gap="sm"
          >
            {promotion.badge.text}
          </Badge>
        )}

        <h2 className="promotion-banner__title">
          {promotion.highlight && (
            <span className="promotion-banner__highlight">{promotion.highlight}</span>
          )}
          {promotion.title}
        </h2>

        {promotion.subtitle && (
          <h3 className="promotion-banner__subtitle">{promotion.subtitle}</h3>
        )}

        <p className="promotion-banner__description">{promotion.description}</p>

        {showCountdown && promotion.validUntil && timeLeft && (
          <div className="promotion-banner__countdown">
            <span className="promotion-banner__countdown-label">Ends in:</span>
            <span className="promotion-banner__countdown-time">{timeLeft}</span>
          </div>
        )}

        <div className="promotion-banner__actions">
          <Link href={promotion.ctaLink}>
            <Button 
              size={variant === 'hero' ? 'xl' : 'lg'} 
              variant="primary"
              className="promotion-banner__cta"
            >
              {promotion.ctaText}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {variant === 'hero' && (
        <div className="promotion-banner__decorations">
          <div className="promotion-banner__glow promotion-banner__glow--1" />
          <div className="promotion-banner__glow promotion-banner__glow--2" />
          <div className="promotion-banner__glow promotion-banner__glow--3" />
        </div>
      )}
    </div>
  );
};

export default PromotionBanner;