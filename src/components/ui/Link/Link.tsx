/**
 * @fileoverview Link component with Next.js integration and multiple variants
 * @module components/ui/Link
 */

'use client';

import React, { forwardRef } from 'react';
import NextLink from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';
import { Loader2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/styles/components/base/link.css';

/**
 * Link variants
 */
export type LinkVariant = 
  | 'default'
  | 'primary' 
  | 'secondary' 
  | 'accent'
  | 'success'
  | 'error'
  | 'warning'
  | 'ghost'
  | 'outline'
  | 'underline';

/**
 * Link sizes
 */
export type LinkSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Padding sizes
 */
export type LinkPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Gap sizes
 */
export type LinkGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Props for the Link component
 * @interface LinkProps
 */
export interface LinkProps extends Omit<NextLinkProps, 'className'>, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps | 'className'> {
  /** Link variant */
  variant?: LinkVariant;
  /** Link size */
  size?: LinkSize;
  /** Padding size */
  padding?: LinkPadding;
  /** Gap between icon and text */
  gap?: LinkGap;
  /** Outline color for outline variant */
  outlineColor?: 'purple' | 'blue' | 'green' | 'red' | 'orange' | 'cyan' | 'pink' | 'gray';
  /** Whether link is loading */
  loading?: boolean;
  /** Whether link is disabled */
  disabled?: boolean;
  /** Icon to show before text */
  leftIcon?: React.ReactNode;
  /** Icon to show after text */
  rightIcon?: React.ReactNode;
  /** Whether link takes full width */
  fullWidth?: boolean;
  /** Whether link is icon-only */
  iconOnly?: boolean;
  /** Whether to show external link indicator */
  external?: boolean;
  /** Custom className */
  className?: string;
  /** Children elements */
  children?: React.ReactNode;
  /** Test ID for testing */
  testId?: string;
  /** Target for the link */
  target?: string;
  /** Rel attribute for the link */
  rel?: string;
  /** Whether to use Next.js Link or native anchor */
  useNextLink?: boolean;
}

/**
 * Get variant-specific classes
 */
const getVariantClasses = (variant: LinkVariant, outlineColor?: string): string => {
  // Handle custom outline color
  if (variant === 'outline' && outlineColor) {
    return `link-outline link-outline-${outlineColor}`;
  }

  const variantMap = {
    default: 'link-default',
    primary: 'link-primary',
    secondary: 'link-secondary',
    accent: 'link-accent',
    success: 'link-success',
    error: 'link-error',
    warning: 'link-warning',
    ghost: 'link-ghost',
    outline: 'link-outline link-outline-purple',
    underline: 'link-underline'
  };
  return variantMap[variant] || variantMap.default;
};

/**
 * Get size-specific classes
 */
const getSizeClasses = (size: LinkSize): string => {
  const sizeMap = {
    xs: 'link-size-xs',
    sm: 'link-size-sm',
    md: 'link-size-md',
    lg: 'link-size-lg',
    xl: 'link-size-xl'
  };
  return sizeMap[size] || sizeMap.md;
};

/**
 * Get padding-specific classes
 */
const getPaddingClasses = (padding: LinkPadding): string => {
  const paddingMap = {
    none: 'p-0',
    xs: 'px-1 py-0-5',
    sm: 'px-2 py-1',
    md: 'px-3 py-1-5',
    lg: 'px-4 py-2',
    xl: 'px-5 py-2-5'
  };
  return paddingMap[padding] || '';
};

/**
 * Get gap-specific classes
 */
const getGapClasses = (gap: LinkGap): string => {
  const gapMap = {
    none: 'link-gap-none',
    xs: 'link-gap-xs',
    sm: 'link-gap-sm',
    md: 'link-gap-md',
    lg: 'link-gap-lg',
    xl: 'link-gap-xl'
  };
  return gapMap[gap] || '';
};

/**
 * Link Component
 * 
 * @description A flexible link component with Next.js integration and multiple variants.
 * Supports both internal navigation (Next.js Link) and external links.
 * 
 * @example
 * ```tsx
 * // Internal link
 * <Link href="/about" variant="primary">
 *   About Us
 * </Link>
 * 
 * // External link
 * <Link 
 *   href="https://example.com" 
 *   external
 *   target="_blank"
 *   rel="noopener noreferrer"
 * >
 *   Visit Example
 * </Link>
 * 
 * // With icons
 * <Link 
 *   href="/dashboard"
 *   leftIcon={<Home />}
 *   variant="ghost"
 * >
 *   Dashboard
 * </Link>
 * ```
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({
  href,
  variant = 'default',
  size = 'md',
  padding,
  gap,
  outlineColor,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  iconOnly = false,
  external = false,
  className = '',
  children,
  testId,
  target,
  rel,
  useNextLink = true,
  ...nextLinkProps
}, ref) => {
  // Determine if we should use Next.js Link
  const isExternal = external || href?.toString().startsWith('http') || href?.toString().startsWith('//');
  const shouldUseNextLink = useNextLink && !isExternal && !disabled;

  // Build class names
  const linkClasses = cn(
    'link',
    getVariantClasses(variant, outlineColor),
    getSizeClasses(size),
    padding !== undefined && getPaddingClasses(padding),
    gap !== undefined && getGapClasses(gap),
    fullWidth && 'link-full-width',
    iconOnly && 'link-icon-only',
    disabled && 'link-disabled',
    loading && 'link-loading',
    className
  );

  // Content rendering
  const linkContent = (
    <>
      {loading && (
        <Loader2 
          className={cn(
            'link-spinner',
            iconOnly ? 'w-4 h-4' : 'w-3-5 h-3-5'
          )} 
        />
      )}
      {!loading && leftIcon && (
        <span className="link-icon link-icon-left">
          {leftIcon}
        </span>
      )}
      {!iconOnly && (loading ? <span className="link-text">{children}</span> : children)}
      {iconOnly && !loading && children}
      {!loading && rightIcon && (
        <span className="link-icon link-icon-right">
          {rightIcon}
        </span>
      )}
      {external && !loading && !rightIcon && (
        <ExternalLink className="link-external-icon" size={12} />
      )}
    </>
  );

  // Handle disabled state - render as span
  if (disabled) {
    return (
      <span
        className={linkClasses}
        data-testid={testId}
        aria-disabled="true"
      >
        {linkContent}
      </span>
    );
  }

  // Use Next.js Link for internal navigation
  if (shouldUseNextLink) {
    return (
      <NextLink
        ref={ref}
        href={href}
        className={linkClasses}
        data-testid={testId}
        {...nextLinkProps}
      >
        {linkContent}
      </NextLink>
    );
  }

  // Use native anchor for external links or when Next.js Link is not needed
  return (
    <a
      ref={ref}
      href={href?.toString()}
      className={linkClasses}
      target={target || (external ? '_blank' : undefined)}
      rel={rel || (external ? 'noopener noreferrer' : undefined)}
      data-testid={testId}
    >
      {linkContent}
    </a>
  );
});

Link.displayName = 'Link';

export default Link;