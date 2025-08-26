/**
 * @fileoverview FormFieldCheckbox component - Checkbox field with FormField wrapper
 * @module components/ui/FormField
 */

'use client';

import React, { useRef, useEffect } from 'react';
import { FormField } from './FormField';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Check, Minus } from 'lucide-react';
import '@/styles/components/base/form-field-checkbox.css';

/**
 * Props for FormFieldCheckbox component
 */
export interface FormFieldCheckboxProps {
  /** Field label (main label for the field) */
  label?: string;
  /** Checkbox label (label next to checkbox) */
  checkboxLabel: string;
  /** Content to display on the right side (e.g., count, badge, icon) */
  rightContent?: React.ReactNode;
  /** Checked state */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Gap size between checkbox and label */
  gap?: 'sm' | 'md' | 'lg';
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
  /** Disabled state */
  disabled?: boolean;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Custom className */
  className?: string;
  /** Test ID */
  testId?: string;
}

/**
 * FormFieldCheckbox Component - Checkbox with FormField wrapper
 */
export const FormFieldCheckbox: React.FC<FormFieldCheckboxProps> = ({
  label,
  checkboxLabel,
  rightContent,
  checked = false,
  onChange,
  gap = 'md',
  helperText,
  error,
  success,
  warning,
  tooltip,
  disabled = false,
  indeterminate = false,
  className = '',
  testId
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle indeterminate state
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <FormField
      label={label}
      helperText={helperText}
      error={error}
      success={success}
      warning={warning}
      tooltip={tooltip}
      className={`form-field-checkbox ${className || ''}`}
      testId={testId}
    >
      <div className={`form-field-checkbox-wrapper ${disabled ? 'form-field-checkbox-disabled' : ''}`}>
        <Label className={`form-field-checkbox-container form-field-checkbox-gap-${gap}`}>
          <Input
            ref={inputRef}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="form-field-checkbox-input sr-only"
            aria-label={checkboxLabel}
            state={error ? 'error' : success ? 'success' : warning ? 'warning' : undefined}
          />
          <div className={`form-field-checkbox-custom ${checked ? 'form-field-checkbox-checked' : ''} ${indeterminate ? 'form-field-checkbox-indeterminate' : ''} ${error ? 'form-field-checkbox-error' : ''}`}>
            {checked && !indeterminate && (
              <Check className="form-field-checkbox-icon" />
            )}
            {indeterminate && (
              <Minus className="form-field-checkbox-icon" />
            )}
          </div>
          <span className="form-field-checkbox-text">{checkboxLabel}</span>
        </Label>
        {rightContent && (
          <div className="form-field-checkbox-right-content">{rightContent}</div>
        )}
      </div>
    </FormField>
  );
};

FormFieldCheckbox.displayName = 'FormFieldCheckbox';

export default FormFieldCheckbox;