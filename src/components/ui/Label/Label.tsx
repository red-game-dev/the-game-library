/**
 * @fileoverview Label component - Accessible form label element
 * @module components/ui/Label
 */

'use client';

import React from 'react';
import '@/styles/components/base/label.css';

/**
 * Label sizes
 */
export type LabelSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Label variants
 */
export type LabelVariant = 'default' | 'primary' | 'secondary' | 'muted';

/**
 * Props for the Label component
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Label size */
  size?: LabelSize;
  /** Label variant */
  variant?: LabelVariant;
  /** Required field indicator */
  required?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Custom className */
  className?: string;
  /** Children content */
  children: React.ReactNode;
  /** Test ID */
  testId?: string;
}

/**
 * Get size-specific classes
 */
const getSizeClasses = (size: LabelSize): string => {
  const sizeMap = {
    xs: 'label-xs',
    sm: 'label-sm',
    md: 'label-md',
    lg: 'label-lg',
    xl: 'label-xl'
  };
  return sizeMap[size] || sizeMap.md;
};

/**
 * Get variant-specific classes
 */
const getVariantClasses = (variant: LabelVariant): string => {
  const variantMap = {
    default: 'label-default',
    primary: 'label-primary',
    secondary: 'label-secondary',
    muted: 'label-muted'
  };
  return variantMap[variant] || variantMap.default;
};

/**
 * Label Component
 * 
 * @description An accessible label component for form elements
 * 
 * @example
 * ```tsx
 * <Label htmlFor="email" required>
 *   Email Address
 * </Label>
 * ```
 */
export const Label: React.FC<LabelProps> = ({
  size = 'md',
  variant = 'default',
  required = false,
  disabled = false,
  error = false,
  className = '',
  children,
  testId = 'label',
  ...props
}) => {
  return (
    <label
      className={`
        label
        ${getSizeClasses(size)}
        ${getVariantClasses(variant)}
        ${disabled ? 'label-disabled' : ''}
        ${error ? 'label-error' : ''}
        ${className}
      `}
      data-testid={testId}
      {...props}
    >
      {children}
      {required && (
        <span className="label-required" aria-label="required">
          *
        </span>
      )}
    </label>
  );
};

Label.displayName = 'Label';

export default Label;