/**
 * @fileoverview Button component with multiple variants and sizes
 * @module components/ui/Button
 */

'use client';

import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Button variants
 */
export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'accent'
  | 'success'
  | 'error'
  | 'warning'
  | 'ghost'
  | 'outline'
  | 'link';

/**
 * Button sizes
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Props for the Button component
 * @interface ButtonProps
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Outline color for outline variant */
  outlineColor?: 'purple' | 'blue' | 'green' | 'red' | 'orange' | 'cyan' | 'pink' | 'gray';
  /** Whether button is loading */
  loading?: boolean;
  /** Icon to show before text */
  leftIcon?: React.ReactNode;
  /** Icon to show after text */
  rightIcon?: React.ReactNode;
  /** Whether button takes full width */
  fullWidth?: boolean;
  /** Whether button is icon-only */
  iconOnly?: boolean;
  /** Custom className */
  className?: string;
  /** Children elements */
  children?: React.ReactNode;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Get variant-specific classes
 */
const getVariantClasses = (variant: ButtonVariant, outlineColor?: string): string => {
  // Handle custom outline color
  if (variant === 'outline' && outlineColor) {
    return `btn-outline btn-outline-${outlineColor}`;
  }

  const variantMap = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    success: 'btn-success',
    error: 'btn-error',
    warning: 'btn-warning',
    ghost: 'btn-ghost',
    outline: 'btn-outline btn-outline-purple',
    link: 'btn-link'
  };
  return variantMap[variant] || variantMap.primary;
};

/**
 * Get size-specific classes
 */
const getSizeClasses = (size: ButtonSize): string => {
  const sizeMap = {
    xs: 'px-2-5 py-1 text-xs gap-1',
    sm: 'px-3 py-1-5 text-sm gap-1-5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-5 py-2-5 text-lg gap-2',
    xl: 'px-6 py-3 text-xl gap-3'
  };
  return sizeMap[size] || sizeMap.md;
};

/**
 * Button Component
 * 
 * @description A versatile button component with multiple variants and sizes.
 * Supports icons, loading states, and various styles.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" leftIcon={<PlayIcon />}>
 *   Play Now
 * </Button>
 * 
 * <Button variant="ghost" iconOnly>
 *   <HeartIcon />
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  outlineColor,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  iconOnly = false,
  className = '',
  children,
  disabled,
  testId = 'button',
  ...props
}, ref) => {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      className={`
        btn
        ${getVariantClasses(variant, outlineColor)}
        ${iconOnly ? `btn-icon btn-size-${size}` : getSizeClasses(size)}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={isDisabled}
      data-testid={testId}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin btn-spinner" size={16} />
          {!iconOnly && <span>Loading...</span>}
        </>
      ) : (
        <>
          {leftIcon && <span className="inline-flex">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex">{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

/**
 * Button Group for multiple buttons
 */
export interface ButtonGroupProps {
  /** Spacing between buttons */
  spacing?: 'xs' | 'sm' | 'md' | 'lg';
  /** Direction of buttons */
  direction?: 'horizontal' | 'vertical';
  /** Custom className */
  className?: string;
  /** Children buttons */
  children?: React.ReactNode;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  spacing = 'sm',
  direction = 'horizontal',
  className = '',
  children
}) => {
  const spacingMap = {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4'
  };

  return (
    <div className={`
      inline-flex 
      ${direction === 'vertical' ? 'flex-col' : 'flex-row'}
      ${spacingMap[spacing]}
      ${className}
    `}>
      {children}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

export default Button;