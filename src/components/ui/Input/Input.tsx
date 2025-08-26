/**
 * @fileoverview Base Input component for form inputs
 * @module components/ui/Input
 */

'use client';

import React, { forwardRef, useId } from 'react';
import { AlertCircle, Check, X } from 'lucide-react';
import '@/styles/components/base/input.css';

/**
 * Input sizes
 */
export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Input variants
 */
export type InputVariant = 'default' | 'filled' | 'ghost' | 'outline';

/**
 * Input states
 */
export type InputState = 'default' | 'success' | 'error' | 'warning';

/**
 * Range configuration for range inputs
 */
export interface RangeConfig {
  showValue?: boolean;
  showTicks?: boolean;
  showMinMax?: boolean;
  suffix?: string;
  prefix?: string;
  trackColor?: string;
  thumbColor?: string;
}

/**
 * Props for the Input component
 * @interface InputProps
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input size */
  size?: InputSize;
  /** Input variant */
  variant?: InputVariant;
  /** Input state for validation feedback */
  state?: InputState;
  /** Label for the input */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Icon to show on the left */
  leftIcon?: React.ReactNode;
  /** Icon to show on the right */
  rightIcon?: React.ReactNode;
  /** Whether right icon is clickable (e.g., password toggle) */
  rightIconClickable?: boolean;
  /** Whether input takes full width */
  fullWidth?: boolean;
  /** Range configuration for type="range" */
  rangeConfig?: RangeConfig;
  /** Custom className */
  className?: string;
  /** Container className */
  containerClassName?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Get size-specific classes
 */
const getSizeClasses = (size: InputSize): string => {
  const sizeMap = {
    xs: 'input-xs',
    sm: 'input-sm',
    md: 'input-md',
    lg: 'input-lg',
    xl: 'input-xl'
  };
  return sizeMap[size] || sizeMap.md;
};

/**
 * Get variant-specific classes
 */
const getVariantClasses = (variant: InputVariant): string => {
  const variantMap = {
    default: '',
    filled: 'bg-surface-elevated border-transparent',
    ghost: 'bg-transparent border-transparent',
    outline: 'bg-transparent border-2'
  };
  return variantMap[variant] || variantMap.default;
};

/**
 * Get state-specific classes
 */
const getStateClasses = (state: InputState): string => {
  const stateMap = {
    default: '',
    success: 'input-success',
    error: 'input-error',
    warning: 'input-warning'
  };
  return stateMap[state] || stateMap.default;
};

/**
 * Get state icon
 */
const getStateIcon = (state: InputState): React.ReactNode => {
  switch (state) {
    case 'success':
      return <Check className="w-4 h-4 text-green-500" />;
    case 'error':
      return <X className="w-4 h-4 text-red-500" />;
    case 'warning':
      return <AlertCircle className="w-4 h-4 text-orange-500" />;
    default:
      return null;
  }
};

/**
 * Input Component
 * 
 * @description A flexible input component with various sizes, variants, and states.
 * Can be used as a base for more specific input components like SearchBar.
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   state="error"
 *   error="Invalid email address"
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  size = 'md',
  variant = 'default',
  state = 'default',
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  rightIconClickable = false,
  fullWidth = false,
  rangeConfig,
  className = '',
  containerClassName = '',
  disabled,
  testId = 'input',
  id,
  type,
  min,
  max,
  value,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const actualState = error ? 'error' : state;
  const stateIcon = !rightIcon && actualState !== 'default' && type !== 'checkbox' ? getStateIcon(actualState) : null;
  const isRange = type === 'range';
  
  // Calculate percentage for range styling
  const percentage = isRange && min !== undefined && max !== undefined && value !== undefined
    ? ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100
    : 0;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-1-5 text-sm font-medium text-text"
        >
          {label}
        </label>
      )}
      
      {isRange ? (
        <div className="input-range-wrapper">
          <div className="input-range-container">
            <input
              ref={ref}
              id={inputId}
              type="range"
              className={`
                input-range
                ${getSizeClasses(size)}
                ${className}
              `}
              disabled={disabled}
              data-testid={testId}
              aria-invalid={actualState === 'error'}
              aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
              min={min}
              max={max}
              value={value}
              style={{
                '--range-progress': `${percentage}%`
              } as React.CSSProperties}
              {...props}
            />
            {rangeConfig?.showTicks && (
              <div className="input-range-ticks">
                {rangeConfig.showMinMax && (
                  <>
                    <span className="input-range-tick">{min}</span>
                    <span className="input-range-tick">{max}</span>
                  </>
                )}
              </div>
            )}
          </div>
          {rangeConfig?.showValue && (
            <div className="input-range-value">
              {rangeConfig.prefix}
              <span className="input-range-value-number">{value}</span>
              {rangeConfig.suffix}
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1-2 -translate-y-1-2 pointer-events-none text-secondary">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={`
              input
              ${getSizeClasses(size)}
              ${getVariantClasses(variant)}
              ${getStateClasses(actualState)}
              ${leftIcon ? 'input-with-icon-left' : ''}
              ${rightIcon || stateIcon ? 'input-with-icon-right' : ''}
              ${className}
            `}
            disabled={disabled}
            data-testid={testId}
            aria-invalid={actualState === 'error'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            min={min}
            max={max}
            value={value}
            {...props}
          />
          
          {(rightIcon || stateIcon) && (
            <div className={`absolute right-3 top-1-2 -translate-y-1-2 text-secondary ${rightIconClickable ? '' : 'pointer-events-none'}`}>
              {rightIcon || stateIcon}
            </div>
          )}
        </div>
      )}
      
      {error && (
        <p id={`${inputId}-error`} className="mt-1-5 text-sm text-error">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${inputId}-helper`} className={`mt-1-5 text-sm ${
          actualState === 'success' ? 'text-success' : 
          actualState === 'warning' ? 'text-warning' : 
          'text-secondary'
        }`}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

/**
 * Input Group for combining inputs with buttons or other elements
 */
export interface InputGroupProps {
  /** Children elements */
  children?: React.ReactNode;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Gap between items */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Custom className */
  className?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  children,
  direction = 'horizontal',
  gap = 'md',
  className = ''
}) => {
  // Map gap sizes to actual class names (not dynamic strings)
  const horizontalGapClasses = {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
    xl: 'gap-6'
  };

  const verticalGapClasses = {
    xs: 'space-y-1',
    sm: 'space-y-2',
    md: 'space-y-3',
    lg: 'space-y-4',
    xl: 'space-y-6'
  };

  const gapClass = direction === 'horizontal' 
    ? horizontalGapClasses[gap]
    : verticalGapClasses[gap];

  const baseClasses = direction === 'horizontal' 
    ? 'flex items-stretch' 
    : 'flex flex-col';

  return (
    <div className={`${baseClasses} ${gapClass} ${className}`}>
      {children}
    </div>
  );
};

InputGroup.displayName = 'InputGroup';

/**
 * Props for the TextArea component
 * @interface TextAreaProps
 */
export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** TextArea size */
  size?: InputSize;
  /** TextArea variant */
  variant?: InputVariant;
  /** TextArea state for validation feedback */
  state?: InputState;
  /** Label for the textarea */
  label?: string;
  /** Helper text below textarea */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Whether textarea takes full width */
  fullWidth?: boolean;
  /** Custom className */
  className?: string;
  /** Container className */
  containerClassName?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * TextArea Component
 * 
 * @description A textarea component that matches the Input component styling
 * 
 * @example
 * ```tsx
 * <TextArea
 *   label="Description"
 *   placeholder="Enter description..."
 *   rows={4}
 * />
 * ```
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  size = 'md',
  variant = 'default',
  state = 'default',
  label,
  helperText,
  error,
  fullWidth = false,
  className = '',
  containerClassName = '',
  disabled,
  testId = 'textarea',
  id,
  ...props
}, ref) => {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const actualState = error ? 'error' : state;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block mb-1-5 text-sm font-medium text-text"
        >
          {label}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={textareaId}
        className={`
          input
          ${getSizeClasses(size)}
          ${getVariantClasses(variant)}
          ${getStateClasses(actualState)}
          min-h-20 resize-y
          ${className}
        `}
        disabled={disabled}
        data-testid={testId}
        aria-invalid={actualState === 'error'}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
        {...props}
      />
      
      {error && (
        <p id={`${textareaId}-error`} className="mt-1-5 text-sm text-error">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${textareaId}-helper`} className={`mt-1-5 text-sm ${
          actualState === 'success' ? 'text-success' : 
          actualState === 'warning' ? 'text-warning' : 
          'text-secondary'
        }`}>
          {helperText}
        </p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default Input;