/**
 * @fileoverview Base Card component for consistent card layouts
 * @module components/ui/Card
 */

'use client';

import React, { forwardRef } from 'react';
import Image from 'next/image';

/**
 * Card size variants
 */
export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Card color variants
 */
export type CardVariant = 
  | 'default'
  | 'primary' 
  | 'secondary'
  | 'accent'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

/**
 * Props for the Card component
 * @interface CardProps
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size variant of the card */
  size?: CardSize;
  /** Color variant of the card */
  variant?: CardVariant;
  /** Whether the card is interactive (hoverable/clickable) */
  interactive?: boolean;
  /** Whether to show a border */
  bordered?: boolean;
  /** Whether to add shadow */
  shadow?: boolean;
  /** Whether to use glass morphism effect */
  glass?: boolean;
  /** Padding variant */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Custom className */
  className?: string;
  /** Children elements */
  children?: React.ReactNode;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Get size-specific classes
 */
const getSizeClasses = (size: CardSize): string => {
  const sizeMap = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    xxl: 'max-w-2xl'
  };
  return sizeMap[size] || '';
};

/**
 * Get padding classes using card-* modifiers for responsive padding
 */
const getPaddingClasses = (padding: CardProps['padding']): string => {
  const paddingMap = {
    none: '',
    sm: 'card-sm',
    md: 'card-md',
    lg: 'card-lg'
  };
  return paddingMap[padding || 'md'] || 'card-md';
};

/**
 * Base Card Component
 * 
 * @description A flexible card component that serves as a container for content.
 * Can be extended for specific use cases like GameCard, ProfileCard, etc.
 * 
 * @example
 * ```tsx
 * <Card size="md" interactive bordered>
 *   <CardHeader>
 *     <h3>Title</h3>
 *   </CardHeader>
 *   <CardBody>
 *     Content goes here
 *   </CardBody>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(({
  size = 'md',
  variant = 'default',
  interactive = false,
  bordered = true,
  shadow = false,
  glass = false,
  padding = 'md',
  className = '',
  children,
  testId = 'card',
  ...props
}, ref) => {
  const baseClasses = [
    'card',
    'relative'
  ];

  const conditionalClasses = [
    getSizeClasses(size),
    getPaddingClasses(padding),
    variant !== 'default' ? `variant-${variant}` : '',
    bordered ? 'bordered' : '',
    shadow ? 'shadow' : '',
    glass ? 'glass' : (!variant || variant === 'default') ? 'bg-surface' : '',
    interactive ? 'interactive' : ''
  ];

  const classes = [...baseClasses, ...conditionalClasses, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      data-testid={testId}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

/**
 * Card Header Component
 */
export interface CardHeaderProps {
  /** Main title */
  title?: React.ReactNode;
  /** Subtitle */
  subtitle?: React.ReactNode;
  /** Actions (buttons, icons) */
  actions?: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Custom className for title */
  titleClassName?: string;
  /** Custom className for subtitle */
  subtitleClassName?: string;
  /** Children for custom content */
  children?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  title,
  subtitle,
  actions,
  className = '', 
  children 
}) => {
  if (children) {
    return (
      <div className={`card-header ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`card-header flex justify-between items-start gap-4 ${className}`}>
      <div className="flex-1">
        {title && (
          <h3 className="text-lg font-semibold text-text line-clamp" style={{ '--line-clamp': 1 } as React.CSSProperties}>
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-sm text-secondary mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
};

CardHeader.displayName = 'CardHeader';

/**
 * Card Body Component with description support
 */
export interface CardBodyProps {
  /** Description text */
  description?: string;
  /** Maximum characters before "See more" */
  maxLength?: number;
  /** Whether to show "See more" functionality */
  expandable?: boolean;
  /** Custom className */
  className?: string;
  /** Children for custom content */
  children?: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ 
  description,
  maxLength = 100,
  expandable = true,
  className = '', 
  children 
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (children) {
    return (
      <div className={`card-body ${className}`}>
        {children}
      </div>
    );
  }

  if (!description) return null;

  const shouldTruncate = expandable && description.length > maxLength && !isExpanded;
  const displayText = shouldTruncate 
    ? `${description.slice(0, maxLength)}...` 
    : description;

  return (
    <div className="card-body">
      <p className={`text-sm text-secondary ${className}`}>
        {displayText}
        {expandable && description.length > maxLength && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="ml-1 text-accent font-medium see-more-link"
          >
            {isExpanded ? 'See less' : 'See more'}
          </button>
        )}
      </p>
    </div>
  );
};

CardBody.displayName = 'CardBody';

/**
 * Card Footer Component
 */
export const CardFooter: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className = '', children }) => (
  <div className={`card-footer ${className}`}>
    {children}
  </div>
);

CardFooter.displayName = 'CardFooter';

/**
 * Card Image Component with built-in loading states
 */
export interface CardImageProps {
  /** Image source */
  src?: string;
  /** Alt text for accessibility */
  alt: string;
  /** Aspect ratio of the image */
  aspectRatio?: 'square' | 'video' | 'wide' | 'portrait' | '4-3' | '3-2' | '16-9' | '1-1';
  /** Whether to show loading skeleton */
  loading?: boolean;
  /** Custom overlay content */
  overlay?: React.ReactNode;
  /** Position of overlay */
  overlayPosition?: 'top' | 'bottom' | 'center' | 'full';
  /** Whether image should have rounded corners */
  rounded?: boolean;
  /** Custom className */
  className?: string;
  /** Fallback content if no image */
  fallback?: React.ReactNode;
  /** Use Next.js Image component */
  useNextImage?: boolean;
}

export const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  aspectRatio = '4-3',
  loading = false,
  overlay,
  overlayPosition = 'bottom',
  rounded = true,
  className = '',
  fallback,
  useNextImage = true
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const aspectClasses = {
    'square': 'aspect-square',
    'video': 'aspect-video',
    'wide': 'aspect-wide',
    'portrait': 'aspect-portrait',
    '4-3': 'aspect-4-3',
    '3-2': 'aspect-3-2',
    '16-9': 'aspect-16-9',
    '1-1': 'aspect-1-1'
  };

  const overlayPositionClasses = {
    'top': 'top-0 left-0 right-0',
    'bottom': 'bottom-0 left-0 right-0',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'full': 'inset-0'
  };

  if (loading) {
    return (
      <div className={`
        relative ${aspectClasses[aspectRatio]} 
        bg-surface-elevated animate-pulse
        ${rounded ? 'rounded-lg' : ''}
        ${className}
      `} />
    );
  }

  if (!src || imageError) {
    return fallback ? (
      <div className={`
        relative ${aspectClasses[aspectRatio]}
        bg-surface-elevated
        ${rounded ? 'rounded-lg' : ''}
        ${className}
      `}>
        {fallback}
      </div>
    ) : null;
  }

  return (
    <div className={`
      relative overflow-hidden
      ${aspectClasses[aspectRatio]}
      ${rounded ? 'rounded-lg' : ''}
      ${className}
    `}>
      {/* Loading shimmer */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-surface-elevated animate-pulse" />
      )}

      {/* Image */}
      {useNextImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={`
            object-cover transition-opacity duration-300
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className={`
            w-full h-full object-cover transition-opacity duration-300
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}

      {/* Overlay */}
      {overlay && (
        <div className={`absolute ${overlayPositionClasses[overlayPosition]} p-2`}>
          {overlay}
        </div>
      )}
    </div>
  );
};

CardImage.displayName = 'CardImage';

/**
 * Card Media Component for custom media content
 */
export interface CardMediaProps {
  /** Aspect ratio of the media */
  aspectRatio?: 'square' | 'video' | 'wide' | 'portrait' | '4-3' | '3-2';
  /** Custom className */
  className?: string;
  /** Children (usually an image or video) */
  children?: React.ReactNode;
}

export const CardMedia: React.FC<CardMediaProps> = ({
  aspectRatio = '4-3',
  className = '',
  children
}) => {
  const aspectClasses = {
    'square': 'aspect-square',
    'video': 'aspect-video',
    'wide': 'aspect-wide',
    'portrait': 'aspect-portrait',
    '4-3': 'aspect-4-3',
    '3-2': 'aspect-3-2'
  };

  return (
    <div className={`relative ${aspectClasses[aspectRatio]} ${className}`}>
      {children}
    </div>
  );
};

CardMedia.displayName = 'CardMedia';

export default Card;