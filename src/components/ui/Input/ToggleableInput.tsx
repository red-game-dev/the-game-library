/**
 * @fileoverview Toggleable Input component with visibility toggle functionality
 * @module components/ui/Input/ToggleableInput
 */

'use client';

import React, { useState, forwardRef } from 'react';
import { Input, type InputProps } from './Input';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Props for the ToggleableInput component
 * @interface ToggleableInputProps
 */
export interface ToggleableInputProps extends Omit<InputProps, 'rightIcon' | 'rightIconClickable'> {
  /** Icon to show when content is hidden */
  hiddenIcon?: React.ReactNode;
  /** Icon to show when content is visible */
  visibleIcon?: React.ReactNode;
  /** Whether to allow toggling visibility */
  allowToggle?: boolean;
  /** Default visibility state */
  defaultVisible?: boolean;
  /** Controlled visibility state */
  visible?: boolean;
  /** Callback when visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
  /** Text input type when visible */
  visibleType?: 'text' | 'email' | 'tel' | 'url';
  /** Text input type when hidden */
  hiddenType?: 'password' | 'text';
}

/**
 * ToggleableInput Component
 * 
 * @description An Input component with visibility toggle functionality.
 * Can be used for passwords, sensitive data, or any content that needs hiding/showing.
 * 
 * @example
 * ```tsx
 * // Password input
 * <ToggleableInput
 *   type="password"
 *   label="Password"
 *   placeholder="Enter your password"
 * />
 * 
 * // API Key input
 * <ToggleableInput
 *   type="text"
 *   hiddenType="password"
 *   label="API Key"
 *   placeholder="Enter API key"
 * />
 * 
 * // Credit card number with custom icons
 * <ToggleableInput
 *   hiddenIcon={<Shield />}
 *   visibleIcon={<ShieldOff />}
 *   label="Card Number"
 * />
 * ```
 */
export const ToggleableInput = forwardRef<HTMLInputElement, ToggleableInputProps>(({
  hiddenIcon = <Eye className="w-4 h-4" />,
  visibleIcon = <EyeOff className="w-4 h-4" />,
  allowToggle = true,
  defaultVisible = false,
  visible,
  onVisibilityChange,
  visibleType = 'text',
  hiddenType = 'password',
  type,
  ...props
}, ref) => {
  const [internalVisible, setInternalVisible] = useState(defaultVisible);
  
  // Use controlled state if provided, otherwise use internal state
  const isVisible = visible !== undefined ? visible : internalVisible;
  
  const handleToggle = () => {
    const newState = !isVisible;
    
    if (visible === undefined) {
      setInternalVisible(newState);
    }
    
    onVisibilityChange?.(newState);
  };

  // Determine input type based on visibility and props
  const getInputType = () => {
    if (type && type !== 'password') {
      return isVisible ? visibleType : hiddenType;
    }
    return isVisible ? visibleType : 'password';
  };

  return (
    <Input
      ref={ref}
      type={getInputType()}
      rightIconClickable={allowToggle}
      rightIcon={
        allowToggle ? (
          <button
            type="button"
            onClick={handleToggle}
            className="password-toggle-btn"
            aria-label={isVisible ? 'Hide content' : 'Show content'}
            tabIndex={-1} // Prevent tab focus, let user tab to next input instead
          >
            {isVisible ? visibleIcon : hiddenIcon}
          </button>
        ) : undefined
      }
      {...props}
    />
  );
});

ToggleableInput.displayName = 'ToggleableInput';

export default ToggleableInput;