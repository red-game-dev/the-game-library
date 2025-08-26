/**
 * @fileoverview FormFieldInput component - Text input field with FormField wrapper
 * @module components/ui/FormField
 */

'use client';

import React from 'react';
import { FormField } from './FormField';
import { Input } from '@/components/ui/Input';
import type { InputProps } from '@/components/ui/Input';

/**
 * Props for FormFieldInput component
 */
export interface FormFieldInputProps extends Omit<InputProps, 'label' | 'error' | 'helperText'> {
  /** Field label */
  label: string;
  /** Required field */
  required?: boolean;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Success message */
  success?: string;
  /** Warning message */
  warning?: string;
  /** Tooltip text */
  tooltip?: string;
  /** Show character count */
  showCount?: boolean;
  /** Max character length */
  maxLength?: number;
  /** Container className */
  containerClassName?: string;
  /** Test ID */
  testId?: string;
}

/**
 * FormFieldInput Component - Text input with FormField wrapper
 */
export const FormFieldInput: React.FC<FormFieldInputProps> = ({
  label,
  required = false,
  helperText,
  error,
  success,
  warning,
  tooltip,
  showCount = false,
  maxLength,
  containerClassName = '',
  testId,
  ...inputProps
}) => {
  return (
    <FormField
      label={label}
      required={required}
      helperText={helperText}
      error={error}
      success={success}
      warning={warning}
      tooltip={tooltip}
      showCount={showCount}
      maxLength={maxLength}
      className={containerClassName}
      testId={testId}
    >
      <Input
        {...inputProps}
        state={error ? 'error' : success ? 'success' : warning ? 'warning' : 'default'}
        maxLength={maxLength}
      />
    </FormField>
  );
};

FormFieldInput.displayName = 'FormFieldInput';

export default FormFieldInput;