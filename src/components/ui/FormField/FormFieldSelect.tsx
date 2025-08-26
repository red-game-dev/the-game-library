/**
 * @fileoverview FormFieldSelect component - Select/Dropdown field with FormField wrapper
 * @module components/ui/FormField
 */

'use client';

import React from 'react';
import { FormField, type SuggestionPreset } from './FormField';
import { Dropdown } from '@/components/ui/Dropdown';
import type { DropdownProps } from '@/components/ui/Dropdown';

/**
 * Props for FormFieldSelect component
 */
export interface FormFieldSelectProps extends Omit<DropdownProps, 'variant'> {
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
  /** Suggestion presets */
  suggestions?: SuggestionPreset[];
  /** Show suggestions */
  showSuggestions?: boolean;
  /** Suggestions selected handler */
  onSuggestionSelect?: (value: string | number | boolean | number[] | string[]) => void;
  /** Container className */
  containerClassName?: string;
  /** Test ID */
  testId?: string;
}

/**
 * FormFieldSelect Component - Dropdown/Select field with FormField wrapper
 */
export const FormFieldSelect: React.FC<FormFieldSelectProps> = ({
  label,
  required = false,
  helperText,
  error,
  success,
  warning,
  tooltip,
  suggestions,
  showSuggestions = false,
  onSuggestionSelect,
  containerClassName = '',
  testId,
  ...dropdownProps
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
      suggestions={suggestions}
      showSuggestions={showSuggestions}
      onSuggestionSelect={onSuggestionSelect}
      className={containerClassName}
      testId={testId}
    >
      <Dropdown
        {...dropdownProps}
      />
    </FormField>
  );
};

FormFieldSelect.displayName = 'FormFieldSelect';

export default FormFieldSelect;