/**
 * @fileoverview FormFieldTextarea component - Textarea field with FormField wrapper
 * @module components/ui/FormField
 */

'use client';

import React from 'react';
import { FormField } from './FormField';
import { TextArea } from '@/components/ui/Input';
import type { TextAreaProps } from '@/components/ui/Input';

/**
 * Props for FormFieldTextarea component
 */
export interface FormFieldTextareaProps extends Omit<TextAreaProps, 'label' | 'error' | 'helperText'> {
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
 * FormFieldTextarea Component - Textarea with FormField wrapper
 */
export const FormFieldTextarea: React.FC<FormFieldTextareaProps> = ({
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
  ...textareaProps
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
      <TextArea
        {...textareaProps}
        state={error ? 'error' : success ? 'success' : warning ? 'warning' : 'default'}
        maxLength={maxLength}
      />
    </FormField>
  );
};

FormFieldTextarea.displayName = 'FormFieldTextarea';

export default FormFieldTextarea;