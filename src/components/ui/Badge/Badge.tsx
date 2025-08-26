/**
 * @fileoverview Badge component for labels and status indicators
 * @module components/ui/Badge
 */

'use client';

import React from 'react';
import '@/styles/components/base/badge.css';

/**
 * Badge variants for different purposes
 */
export type BadgeVariant = 
  | 'default' 
  | 'primary' 
  | 'secondary'
  | 'accent'
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'info'
  | 'new'
  | 'hot'
  | 'sale'
  | 'pro'
  | 'beta'
  | 'outline'
  | 'outline-default'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-accent'
  | 'outline-success'
  | 'outline-error'
  | 'outline-warning'
  | 'outline-info'
  | 'solid-default'
  | 'solid-primary'
  | 'solid-secondary'
  | 'solid-accent'
  | 'solid-success'
  | 'solid-error'
  | 'solid-warning'
  | 'solid-info';

/**
 * Badge sizes
 */
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Badge rounded variants
 */
export type BadgeRounded = 'sm' | 'md' | 'lg' | 'full';

/**
 * Badge gap sizes for spacing between icon and text
 */
export type BadgeGap = 'none' | 'xs' | 'sm' | 'md' | 'lg';

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
  /** Gap between icon and text */
  gap?: BadgeGap;
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
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    success: 'badge-success',
    error: 'badge-error',
    warning: 'badge-warning',
    info: 'badge-info',
    new: 'badge-new',
    hot: 'badge-hot',
    sale: 'badge-sale',
    pro: 'badge-pro',
    beta: 'badge-beta',
    outline: 'badge-outline',
    'outline-default': 'badge-outline-default',
    'outline-primary': 'badge-outline-primary',
    'outline-secondary': 'badge-outline-secondary',
    'outline-accent': 'badge-outline-accent',
    'outline-success': 'badge-outline-success',
    'outline-error': 'badge-outline-error',
    'outline-warning': 'badge-outline-warning',
    'outline-info': 'badge-outline-info',
    'solid-default': 'badge-solid-default',
    'solid-primary': 'badge-solid-primary',
    'solid-secondary': 'badge-solid-secondary',
    'solid-accent': 'badge-solid-accent',
    'solid-success': 'badge-solid-success',
    'solid-error': 'badge-solid-error',
    'solid-warning': 'badge-solid-warning',
    'solid-info': 'badge-solid-info'
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
 * Get gap classes for icon spacing
 */
const getGapClasses = (gap: BadgeGap): string => {
  const gapMap = {
    none: 'badge-gap-none',
    xs: 'badge-gap-xs',
    sm: 'badge-gap-sm',
    md: 'badge-gap-md',
    lg: 'badge-gap-lg'
  };
  return gapMap[gap] || gapMap.sm;
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
  gap = 'sm',
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
  const hasIcon = !!icon;

  const Component = isClickable ? 'button' : 'span';

  return (
    <Component
      className={`
        badge
        ${getVariantClasses(variant)}
        ${getSizeClasses(size)}
        ${getRoundedClasses(rounded)}
        ${hasIcon && children ? getGapClasses(gap) : ''}
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
      {children && <span className="badge-text">{children}</span>}
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