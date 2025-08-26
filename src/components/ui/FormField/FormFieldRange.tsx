/**
 * @fileoverview FormFieldRange component - Range slider input with suggestions
 * @module components/ui/FormField
 */

'use client';

import React, { useState } from 'react';
import { FormField, type SuggestionPreset } from './FormField';
import { Input } from '@/components/ui/Input';
import '@/styles/components/base/form-field-range.css';

/**
 * Range configuration
 */
export interface RangeConfig {
  min: number;
  max: number;
  step?: number;
  showValue?: boolean;
  showTicks?: boolean;
  suffix?: string;
  prefix?: string;
}

/**
 * Props for FormFieldRange component
 */
export interface FormFieldRangeProps {
  /** Field label */
  label?: string;
  /** Range configuration */
  config: RangeConfig;
  /** Current value */
  value?: number;
  /** Change handler */
  onChange?: (value: number) => void;
  /** Suggestion presets */
  suggestions?: SuggestionPreset[];
  /** Show suggestions */
  showSuggestions?: boolean;
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
  /** Disabled state */
  disabled?: boolean;
  /** Custom className */
  className?: string;
  /** Test ID */
  testId?: string;
}

/**
 * FormFieldRange Component - Range slider input with optional suggestions
 */
export const FormFieldRange: React.FC<FormFieldRangeProps> = ({
  label,
  config,
  value = config.min,
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
  testId
}) => {
  const [localValue, setLocalValue] = useState(value);
  const currentValue = value ?? localValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const handleSuggestionSelect = (selected: (string | number | boolean | number[] | string[])[]) => {
    if (selected.length > 0 && typeof selected[0] === 'number') {
      const newValue = selected[0];
      setLocalValue(newValue);
      onChange?.(newValue);
    }
  };

  const content = (
      <Input
        type="range"
        min={config.min}
        max={config.max}
        step={config.step || 1}
        value={currentValue}
        onChange={handleChange}
        disabled={disabled}
        className={className}
        rangeConfig={{
          showValue: config.showValue,
          showTicks: config.showTicks,
          showMinMax: config.showTicks,
          prefix: config.prefix,
          suffix: config.suffix
        }}
      />
  );

  // If label is provided, wrap in FormField
  if (label) {
    return (
      <FormField
        label={label}
        required={required}
        helperText={helperText || (config.showValue ? `Current value: ${config.prefix || ''}${currentValue}${config.suffix || ''}` : undefined)}
        error={error}
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

  // Otherwise return just the range input
  return content;
};

FormFieldRange.displayName = 'FormFieldRange';

export default FormFieldRange;