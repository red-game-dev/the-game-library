/**
 * @fileoverview Shared types for FormField components
 * @module components/ui/FormField
 */

import React from 'react';
import type { SuggestionPreset } from './FormField';

/**
 * Base props that all FormField components share
 */
export interface BaseFormFieldProps {
  /** Field label */
  label?: string;
  /** Required field indicator */
  required?: boolean;
  /** Helper text below the field */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Success message */
  success?: string;
  /** Warning message */
  warning?: string;
  /** Info tooltip content */
  tooltip?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Custom className */
  className?: string;
  /** Test ID */
  testId?: string;
  /** Suggestion presets */
  suggestions?: SuggestionPreset[];
  /** Show suggestions */
  showSuggestions?: boolean;
  /** Validation function */
  validate?: <T>(value: T) => string | undefined;
  /** On blur handler */
  onBlur?: () => void;
  /** On focus handler */
  onFocus?: () => void;
}

/**
 * Validation rule
 */
export interface ValidationRule {
  /** Rule name */
  name: string;
  /** Validation function */
  validate: (value: unknown) => boolean;
  /** Error message if validation fails */
  message: string;
}

/**
 * Common validation rules
 */
export const ValidationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    name: 'required',
    validate: (value: unknown) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'string') return value.trim().length > 0;
      return value !== null && value !== undefined;
    },
    message
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    name: 'minLength',
    validate: (value: unknown) => typeof value === 'string' && value.length >= min,
    message: message || `Must be at least ${min} characters`
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    name: 'maxLength',
    validate: (value: unknown) => typeof value === 'string' && value.length <= max,
    message: message || `Must be no more than ${max} characters`
  }),

  min: (min: number, message?: string): ValidationRule => ({
    name: 'min',
    validate: (value: unknown) => typeof value === 'number' && value >= min,
    message: message || `Must be at least ${min}`
  }),

  max: (max: number, message?: string): ValidationRule => ({
    name: 'max',
    validate: (value: unknown) => typeof value === 'number' && value <= max,
    message: message || `Must be no more than ${max}`
  }),

  email: (message = 'Must be a valid email address'): ValidationRule => ({
    name: 'email',
    validate: (value: unknown) => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message
  }),

  pattern: (pattern: RegExp, message = 'Invalid format'): ValidationRule => ({
    name: 'pattern',
    validate: (value: unknown) => typeof value === 'string' && pattern.test(value),
    message
  }),

  custom: (name: string, validate: (value: unknown) => boolean, message: string): ValidationRule => ({
    name,
    validate,
    message
  })
};

/**
 * Validate a value against multiple rules
 */
export function validateValue(value: unknown, rules: ValidationRule[]): string | undefined {
  for (const rule of rules) {
    if (!rule.validate(value)) {
      return rule.message;
    }
  }
  return undefined;
}

/**
 * Hook for form field validation
 */
export function useFormFieldValidation<T>(
  value: T,
  rules?: ValidationRule[],
  customValidate?: (value: T) => string | undefined
): {
  error?: string;
  validate: () => string | undefined;
  clearError: () => void;
} {
  const [error, setError] = React.useState<string | undefined>();

  const validate = React.useCallback(() => {
    // First check custom validation
    if (customValidate) {
      const customError = customValidate(value);
      if (customError) {
        setError(customError);
        return customError;
      }
    }

    // Then check rules
    if (rules) {
      const ruleError = validateValue(value, rules);
      if (ruleError) {
        setError(ruleError);
        return ruleError;
      }
    }

    setError(undefined);
    return undefined;
  }, [value, rules, customValidate]);

  const clearError = React.useCallback(() => {
    setError(undefined);
  }, []);

  return { error, validate, clearError };
}