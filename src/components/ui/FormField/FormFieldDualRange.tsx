/**
 * @fileoverview FormFieldDualRange component - Dual range inputs for min/max values
 * @module components/ui/FormField
 */

'use client';

import React, { useState } from 'react';
import { FormField } from './FormField';
import { Input } from '@/components/ui/Input';
import type { RangeConfig } from './FormFieldRange';
import type { BaseFormFieldProps } from './types';
import '@/styles/components/base/form-field-dual-range.css';

/**
 * Dual range configuration
 */
export interface DualRangeConfig {
  min: number;
  max: number;
  step?: number;
  showValues?: boolean;
  showTicks?: boolean;
  suffix?: string;
  prefix?: string;
}

/**
 * Props for FormFieldDualRange component
 */
export interface FormFieldDualRangeProps extends BaseFormFieldProps {
  /** Range configuration (used for both min and max) */
  config?: DualRangeConfig;
  /** Min range configuration (overrides config) */
  minConfig?: RangeConfig;
  /** Max range configuration (overrides config) */
  maxConfig?: RangeConfig;
  /** Current min value */
  minValue?: number;
  /** Current max value */
  maxValue?: number;
  /** Min value change handler */
  onMinChange?: (value: number) => void;
  /** Max value change handler */
  onMaxChange?: (value: number) => void;
  /** Current values [min, max] - alternative API */
  value?: [number, number];
  /** Change handler - alternative API */
  onChange?: (value: [number, number]) => void;
  /** Labels for inputs */
  minLabel?: string;
  maxLabel?: string;
  /** Separator between inputs (can be string or React element) */
  separator?: React.ReactNode;
}

/**
 * FormFieldDualRange Component - Dual range inputs for min/max values with suggestions
 */
export const FormFieldDualRange: React.FC<FormFieldDualRangeProps> = ({
  label,
  config,
  minConfig,
  maxConfig,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  value,
  onChange,
  suggestions,
  showSuggestions = false,
  required = false,
  helperText,
  error,
  success,
  warning,
  tooltip,
  disabled = false,
  className = '',
  testId,
  minLabel = 'Min',
  maxLabel = 'Max',
  separator = '-',
  validate,
  onBlur,
  onFocus
}) => {
  // Determine configuration - use specific configs or fallback to shared config
  const finalMinConfig = minConfig || config || { min: 0, max: 100, step: 1 };
  const finalMaxConfig = maxConfig || config || { min: 0, max: 100, step: 1 };
  
  // Determine initial values - support both APIs
  const initialValue: [number, number] = value || [
    minValue ?? finalMinConfig.min,
    maxValue ?? finalMaxConfig.max
  ];
  
  const [localValue, setLocalValue] = useState(initialValue);
  const [localError, setLocalError] = useState<string | undefined>();
  
  // Use provided values or local state
  const currentValue: [number, number] = value ? value : [
    minValue ?? localValue[0],
    maxValue ?? localValue[1]
  ];
  
  const displayError = error || localError;

  const handleChange = (index: 0 | 1, newValue: number) => {
    const newDualValue: [number, number] = [...currentValue];
    newDualValue[index] = newValue;
    
    // Ensure min doesn't exceed max
    if (index === 0 && newValue > newDualValue[1]) {
      newDualValue[1] = newValue;
    } else if (index === 1 && newValue < newDualValue[0]) {
      newDualValue[0] = newValue;
    }
    
    // Only update local state if not controlled
    if (!value) {
      setLocalValue(newDualValue);
    }
    
    // Support both APIs
    if (onChange) {
      onChange(newDualValue);
    }
    if (index === 0 && onMinChange) {
      onMinChange(newDualValue[0]);
    }
    if (index === 1 && onMaxChange) {
      onMaxChange(newDualValue[1]);
    }
    
    // Clear error on change
    setLocalError(undefined);
  };

  const handleSuggestionSelect = (selected: (string | number | boolean | number[] | string[])[]) => {
    if (selected.length > 0 && Array.isArray(selected[0])) {
      const newValue = selected[0] as [number, number];
      
      // Only update local state if not controlled
      if (!value) {
        setLocalValue(newValue);
      }
      
      onChange?.(newValue);
      setLocalError(undefined);
    }
  };

  const handleBlur = () => {
    if (validate) {
      const error = validate(currentValue);
      setLocalError(error);
    }
    onBlur?.();
  };

  const content = (
    <>
      <div className="form-field-dual-range-inputs">
        <Input
          type="number"
          min={finalMinConfig.min}
          max={finalMinConfig.max}
          step={finalMinConfig.step}
          value={currentValue[0]}
          onChange={(e) => {
            const val = e.target.value === '' ? finalMinConfig.min : Number(e.target.value);
            handleChange(0, val);
          }}
          onBlur={handleBlur}
          onFocus={onFocus}
          label={minLabel}
          size="sm"
          rightIcon={finalMinConfig.suffix}
          disabled={disabled}
          state={displayError ? 'error' : success ? 'success' : warning ? 'warning' : 'default'}
          containerClassName="form-field-dual-range-input"
        />
        <div className="form-field-dual-range-separator-container">
          <span className="form-field-dual-range-separator-label">&nbsp;</span>
          <span className="form-field-dual-range-separator">{separator}</span>
        </div>
        <Input
          type="number"
          min={finalMaxConfig.min}
          max={finalMaxConfig.max}
          step={finalMaxConfig.step}
          value={currentValue[1]}
          onChange={(e) => {
            const val = e.target.value === '' ? finalMaxConfig.max : Number(e.target.value);
            handleChange(1, val);
          }}
          onBlur={handleBlur}
          onFocus={onFocus}
          label={maxLabel}
          size="sm"
          rightIcon={finalMaxConfig.suffix}
          disabled={disabled}
          state={displayError ? 'error' : success ? 'success' : warning ? 'warning' : 'default'}
          containerClassName="form-field-dual-range-input"
        />
      </div>
    </>
  );

  // If label is provided, wrap in FormField
  if (label) {
    return (
      <FormField
        label={label}
        required={required}
        helperText={helperText || `Selected range: ${finalMinConfig.prefix || ''}${currentValue[0]}${finalMinConfig.suffix || ''} - ${finalMaxConfig.prefix || ''}${currentValue[1]}${finalMaxConfig.suffix || ''}`}
        error={displayError}
        success={success}
        warning={warning}
        tooltip={tooltip}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        onSuggestionSelect={(value) => handleSuggestionSelect([value])}
        className={className}
        testId={testId}
      >
        {content}
      </FormField>
    );
  }

  // Otherwise return just the inputs
  return <div className={`form-field-dual-range ${className}`}>{content}</div>;
};

FormFieldDualRange.displayName = 'FormFieldDualRange';

export default FormFieldDualRange;