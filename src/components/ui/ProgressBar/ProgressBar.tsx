/**
 * ProgressBar Component
 * A versatile progress indicator with multiple variants and animations
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import '@/styles/components/base/progress-bar.css';

export interface ProgressBarProps {
  /** Current progress value (0-100) */
  value?: number;
  /** Maximum value for the progress */
  max?: number;
  /** Visual variant of the progress bar */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gradient';
  /** Size of the progress bar */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to show percentage label */
  showLabel?: boolean;
  /** Custom label text (overrides percentage) */
  label?: string;
  /** Whether to show stripes */
  striped?: boolean;
  /** Whether stripes should be animated */
  animated?: boolean;
  /** Whether the progress is indeterminate (loading state) */
  indeterminate?: boolean;
  /** Border radius style */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  /** Additional CSS classes */
  className?: string;
  /** Progress bar track className */
  trackClassName?: string;
  /** Progress bar fill className */
  fillClassName?: string;
  /** Label className */
  labelClassName?: string;
  /** Whether to show a glow effect */
  glow?: boolean;
  /** Whether to show shine effect (like coming-soon) */
  shine?: boolean;
  /** Whether to pulse (like coming-soon) */
  pulse?: boolean;
  /** Whether to show loading/scanning animation (0-100% loop) */
  loading?: boolean;
  /** Label text size */
  labelSize?: 'xs' | 'sm' | 'md' | 'lg';
  /** Custom colors for gradient variant */
  gradientColors?: {
    from?: string;
    via?: string;
    to?: string;
  };
  /** Accessibility label */
  ariaLabel?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 0,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  striped = false,
  animated = false,
  indeterminate = false,
  rounded = 'full',
  className = '',
  trackClassName = '',
  fillClassName = '',
  labelClassName = '',
  glow = false,
  shine = false,
  pulse = false,
  loading = false,
  labelSize = 'sm',
  gradientColors,
  ariaLabel,
}) => {
  // Calculate percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  // Size classes
  const sizeClasses = {
    xs: 'progress-size-xs',
    sm: 'progress-size-sm',
    md: 'progress-size-md',
    lg: 'progress-size-lg',
    xl: 'progress-size-xl',
  };

  // Rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  // Dedicated variant classes for the fill
  const variantClasses = {
    default: 'progress-variant-default',
    primary: 'progress-variant-primary',
    secondary: 'progress-variant-secondary',
    success: 'progress-variant-success',
    warning: 'progress-variant-warning',
    error: 'progress-variant-error',
    gradient: 'progress-variant-gradient', // Custom gradient via inline styles
  };

  // Glow effect classes
  const glowClasses = {
    default: 'shadow-gray-500/50',
    primary: 'shadow-purple-500/50',
    secondary: 'shadow-pink-500/50',
    success: 'shadow-green-500/50',
    warning: 'shadow-yellow-500/50',
    error: 'shadow-red-500/50',
    gradient: 'shadow-purple-500/50',
  };

  // Build gradient style if needed
  const gradientStyle = variant === 'gradient' ? {
    background: `linear-gradient(90deg, 
      ${gradientColors?.from || 'var(--purple-500)'} 0%, 
      ${gradientColors?.via || 'var(--pink-500)'} 50%, 
      ${gradientColors?.to || 'var(--yellow-500)'} 100%)`,
  } : {};

  // Build fill width style
  const fillStyle = {
    width: loading ? '100%' : indeterminate ? '100%' : `${percentage}%`,
    ...gradientStyle,
  };

  // Determine if we need to show label
  const hasLabel = showLabel || !!label;
  
  // Build classes
  const trackClasses = cn(
    'progress-bar',
    'relative',
    'overflow-hidden',
    sizeClasses[size],
    hasLabel && 'progress-with-label', // Add class only when there's a label
    roundedClasses[rounded],
    className,
    trackClassName
  );

  const fillClasses = cn(
    'progress-bar-fill',
    'h-full',
    'transition-all duration-300 ease-out',
    variantClasses[variant], // Always use variant class
    rounded !== 'none' && roundedClasses[rounded],
    striped && 'progress-striped',
    animated && striped && 'progress-animated',
    indeterminate && 'progress-indeterminate',
    loading && 'progress-loading',
    shine && 'progress-shine',
    pulse && 'progress-pulse',
    glow && `shadow-lg ${glowClasses[variant]}`,
    fillClassName
  );

  // Label size classes with proper font sizes
  const labelSizeClasses = {
    xs: 'progress-label-xs',
    sm: 'progress-label-sm',
    md: 'progress-label-md',
    lg: 'progress-label-lg',
  };

  const labelClasses = cn(
    'progress-label',
    'absolute',
    'inset-0',
    'flex',
    'items-center',
    'justify-center',
    'font-medium',
    labelSizeClasses[labelSize],
    labelClassName
  );

  // Determine label text
  const labelText = label || (showLabel && !indeterminate ? `${Math.round(percentage)}%` : '');

  return (
    <div 
      className={trackClasses}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel || `Progress: ${percentage}%`}
    >
      <div 
        className={fillClasses}
        style={fillStyle}
      />
      {labelText && (
        <span className={labelClasses}>
          {labelText}
        </span>
      )}
    </div>
  );
};

// Default export
export default ProgressBar;