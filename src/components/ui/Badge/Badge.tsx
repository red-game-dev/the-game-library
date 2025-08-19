/**
 * @fileoverview Badge component for labels and status indicators
 * @module components/ui/Badge
 */

'use client';

import React from 'react';

/**
 * Badge variants for different purposes
 */
export type BadgeVariant = 
  | 'default' 
  | 'primary' 
  | 'secondary'
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'info'
  | 'new'
  | 'hot'
  | 'sale'
  | 'outline';

/**
 * Badge sizes
 */
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Badge rounded variants
 */
export type BadgeRounded = 'sm' | 'md' | 'lg' | 'full';

/**
 * Props for the Badge component
 * @interface BadgeProps
 */
export interface BadgeProps {
  /** Badge variant for styling */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Rounded corner style */
  rounded?: BadgeRounded;
  /** Whether the badge should pulse/animate */
  pulse?: boolean;
  /** Whether to show a dot indicator */
  dot?: boolean;
  /** Custom icon (from lucide-react) */
  icon?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Badge content */
  children?: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Get variant-specific classes with improved styling
 */
const getVariantClasses = (variant: BadgeVariant): string => {
  const variantMap = {
    default: 'badge-default',
    primary: 'badge-primary',
    secondary: 'badge-default',
    success: 'badge-success',
    error: 'badge-error',
    warning: 'badge-warning',
    info: 'badge-info',
    new: 'badge-new',
    hot: 'badge-hot',
    sale: 'badge-sale',
    outline: 'badge-default border-2'
  };
  return variantMap[variant] || variantMap.default;
};

/**
 * Get size-specific classes with proper padding for pleasant appearance
 * Each size is visually distinct and progressively larger
 */
const getSizeClasses = (size: BadgeSize): string => {
  const sizeMap = {
    xs: 'badge-xs',
    sm: 'badge-sm',
    md: 'badge-md',
    lg: 'badge-lg',
    xl: 'badge-xl'
  };
  return sizeMap[size] || sizeMap.md;
};

/**
 * Get rounded corner classes
 */
const getRoundedClasses = (rounded: BadgeRounded): string => {
  const roundedMap = {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };
  return roundedMap[rounded] || roundedMap.md;
};

/**
 * Badge Component
 * 
 * @description A versatile badge component for labels, status indicators, and tags.
 * Features improved styling with configurable rounded corners and better padding.
 * 
 * @example
 * ```tsx
 * <Badge variant="new" size="sm" rounded="lg" pulse>
 *   NEW
 * </Badge>
 * 
 * <Badge variant="hot" icon={<Flame className="w-3 h-3" />} rounded="full">
 *   HOT
 * </Badge>
 * 
 * // For tags
 * <Badge variant="outline" size="xs" rounded="md">
 *   JavaScript
 * </Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  rounded = 'md',
  pulse = false,
  dot = false,
  icon,
  onClick,
  children,
  className = '',
  testId = 'badge'
}) => {
  const shouldPulse = pulse && (variant === 'new' || variant === 'hot' || variant === 'sale');
  const isClickable = !!onClick;

  const Component = isClickable ? 'button' : 'span';

  return (
    <Component
      className={`
        badge
        ${getVariantClasses(variant)}
        ${getSizeClasses(size)}
        ${getRoundedClasses(rounded)}
        ${shouldPulse ? 'animate-pulse' : ''}
        ${isClickable ? 'badge-clickable' : ''}
        ${className}
      `}
      onClick={onClick}
      data-testid={testId}
    >
      {dot && (
        <span className="badge-dot" />
      )}
      {icon && <span className="badge-icon">{icon}</span>}
      {children && <span>{children}</span>}
    </Component>
  );
};

Badge.displayName = 'Badge';

/**
 * Badge Group for multiple badges
 */
export const BadgeGroup: React.FC<{
  /** Gap between badges */
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  /** Custom className */
  className?: string;
  /** Children badges */
  children?: React.ReactNode;
}> = ({ gap = 'sm', className = '', children }) => {
  const gapClasses = {
    xs: 'badge-group-xs',
    sm: 'badge-group-sm',
    md: 'badge-group-md',
    lg: 'badge-group-lg'
  };
  
  return (
    <div className={`badge-group ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

BadgeGroup.displayName = 'BadgeGroup';

export default Badge;