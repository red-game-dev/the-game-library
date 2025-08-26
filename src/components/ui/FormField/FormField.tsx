/**
 * @fileoverview FormField component - A comprehensive form field wrapper
 * @module components/ui/FormField
 */

'use client';

import React, { useId, useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Tooltip } from '@/components/ui/Tooltip';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { 
  Info, 
  AlertCircle, 
  Check,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import '@/styles/components/base/form-field-base.css';
/**
 * Suggestion preset item
 */
export interface SuggestionPreset<T = string | number | boolean | number[] | string[]> {
  label: string;
  value: T;
  icon?: React.ReactNode;
  disabled?: boolean;
}

/**
 * Props for the FormField component
 */
export interface FormFieldProps {
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
  /** Show character count for text inputs */
  showCount?: boolean;
  /** Max character length */
  maxLength?: number;
  /** Suggestion presets */
  suggestions?: SuggestionPreset[];
  /** Show suggestions */
  showSuggestions?: boolean;
  /** Suggestions selected handler */
  onSuggestionSelect?: (value: string | number | boolean | number[] | string[]) => void;
  /** Allow multiple suggestion selection */
  multipleSuggestions?: boolean;
  /** Show suggestions as carousel */
  suggestionsCarousel?: boolean;
  /** Items per page in carousel */
  suggestionsPerPage?: number;
  /** Enable tag input mode */
  enableTags?: boolean;
  /** Current tags (for tag mode) */
  tags?: string[];
  /** Tag change handler */
  onTagsChange?: (tags: string[]) => void;
  /** Max tags allowed */
  maxTags?: number;
  /** Tag placeholder */
  tagPlaceholder?: string;
  /** Custom className for the field wrapper */
  className?: string;
  /** Children components (Input, Dropdown, etc.) */
  children: React.ReactNode;
  /** Test ID */
  testId?: string;
}

/**
 * FormField Component - Wrapper for form fields with label, validation, and helpers
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  helperText,
  error,
  success,
  warning,
  tooltip,
  showCount = false,
  maxLength,
  suggestions,
  showSuggestions = false,
  onSuggestionSelect,
  multipleSuggestions = false,
  suggestionsCarousel = false,
  suggestionsPerPage = 4,
  enableTags = false,
  tags = [],
  onTagsChange,
  maxTags,
  tagPlaceholder = 'Add tag...',
  className = '',
  children,
  testId
}) => {
  const generatedId = useId();
  const [selectedSuggestions, setSelectedSuggestions] = useState<(string | number | boolean | number[] | string[])[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [tagInput, setTagInput] = useState('');
  const [currentLength, setCurrentLength] = useState(0);
  
  // Update character count if showCount is enabled
  useEffect(() => {
    if (showCount) {
      const inputChild = React.Children.toArray(children).find(
        child => React.isValidElement(child) && child.type === Input
      );
      if (inputChild && React.isValidElement(inputChild)) {
        const props = inputChild.props as React.ComponentProps<typeof Input>;
        const value = props.value || props.defaultValue || '';
        setCurrentLength(String(value).length);
      }
    }
  }, [children, showCount]);
  
  // Clone children to add id and track changes
  const childrenWithId = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      // Don't add props to Fragments
      if (child.type === React.Fragment) {
        return child;
      }
      
      const props: Record<string, unknown> = { id: generatedId };
      
      // Track character count for Input components
      if (child.type === Input && showCount) {
        const childProps = child.props as React.ComponentProps<typeof Input>;
        const originalOnChange = childProps.onChange;
        props.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setCurrentLength(e.target.value.length);
          originalOnChange?.(e);
        };
      }
      
      return React.cloneElement(child as React.ReactElement, props);
    }
    return child;
  });

  // Handle suggestion selection
  const handleSuggestionSelect = (value: string | number | boolean | number[] | string[]) => {
    if (multipleSuggestions) {
      const newSelection = selectedSuggestions.includes(value)
        ? selectedSuggestions.filter(v => v !== value)
        : [...selectedSuggestions, value];
      setSelectedSuggestions(newSelection);
      onSuggestionSelect?.(value);
    } else {
      setSelectedSuggestions([value]);
      onSuggestionSelect?.(value);
    }
  };

  // Navigate carousel
  const navigateCarousel = (direction: 'prev' | 'next') => {
    const maxIndex = Math.max(0, (suggestions?.length || 0) - suggestionsPerPage);
    if (direction === 'prev') {
      setCarouselIndex(Math.max(0, carouselIndex - 1));
    } else {
      setCarouselIndex(Math.min(maxIndex, carouselIndex + 1));
    }
  };

  // Handle tag input
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!maxTags || tags.length < maxTags) {
        onTagsChange?.([...tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    onTagsChange?.(tags.filter(tag => tag !== tagToRemove));
  };

  // Get visible suggestions for carousel
  const visibleSuggestions = suggestionsCarousel && suggestions
    ? suggestions.slice(carouselIndex, carouselIndex + suggestionsPerPage)
    : suggestions;

  // Get message state and content
  const getMessage = () => {
    if (error) return { type: 'error', text: error, icon: <AlertCircle /> };
    if (warning) return { type: 'warning', text: warning, icon: <AlertCircle /> };
    if (success) return { type: 'success', text: success, icon: <Check /> };
    if (helperText) return { type: 'helper', text: helperText, icon: null };
    return null;
  };

  const message = getMessage();

  return (
    <div className={`form-field ${className}`} data-testid={testId}>
      {/* Label and tooltip */}
      {label && (
        <div className="form-field-header">
          <Label
            htmlFor={generatedId}
            required={required}
            error={!!error}
            disabled={React.Children.toArray(children).some(
              child => {
                if (React.isValidElement(child)) {
                  const props = child.props as React.HTMLAttributes<HTMLElement> & { disabled?: boolean };
                  return props.disabled === true;
                }
                return false;
              }
            )}
          >
            {label}
          </Label>
          {tooltip && (
            <Tooltip content={tooltip}>
              <Info className="form-field-info" />
            </Tooltip>
          )}
        </div>
      )}

      {/* Suggestions */}
      {showSuggestions && suggestions && suggestions.length > 0 && (
        <div className="form-field-suggestions">
          {suggestionsCarousel && suggestions.length > suggestionsPerPage && (
            <Button
              variant="primary"
              size="sm"
              outlineColor="purple"
              onClick={() => navigateCarousel('prev')}
              disabled={carouselIndex === 0}
              className="form-field-carousel-prev"
            >
              <ChevronLeft />
            </Button>
          )}
          
          <div className="form-field-suggestions-list scrollbar-thin scrollbar-horizontal-thin">
            {visibleSuggestions?.map((suggestion) => (
              <Button
                key={String(suggestion.value)}
                variant={selectedSuggestions.includes(suggestion.value) ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => handleSuggestionSelect(suggestion.value)}
                disabled={suggestion.disabled}
                className="form-field-suggestion"
              >
                {suggestion.icon && (
                  <span className="form-field-suggestion-icon">{suggestion.icon}</span>
                )}
                <span className="form-field-suggestion-label">{suggestion.label}</span>
                {selectedSuggestions.includes(suggestion.value) && (
                  <Check className="form-field-suggestion-check" />
                )}
              </Button>
            ))}
          </div>
          
          {suggestionsCarousel && suggestions.length > suggestionsPerPage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateCarousel('next')}
              disabled={carouselIndex >= (suggestions.length - suggestionsPerPage)}
              className="form-field-carousel-next"
            >
              <ChevronRight />
            </Button>
          )}
        </div>
      )}

      {/* Field content */}
      <div className="form-field-content">
        {childrenWithId}
      </div>

      {/* Tags */}
      {enableTags && (
        <div className="form-field-tags">
          <div className="form-field-tags-container">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                size="sm"
                className="form-field-tag"
              >
                {tag}
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleTagRemove(tag)}
                  className="form-field-tag-remove"
                  aria-label={`Remove ${tag}`}
                >
                  <X />
                </Button>
              </Badge>
            ))}
            <Input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder={tagPlaceholder}
              disabled={maxTags ? tags.length >= maxTags : false}
              className="form-field-tag-input"
            />
          </div>
          {maxTags && (
            <div className="form-field-tags-count">
              {tags.length} / {maxTags}
            </div>
          )}
        </div>
      )}

      {/* Footer with messages and character count */}
      {(message || showCount) && (
        <div className="form-field-footer">
          {message && (
            <div className={`form-field-message form-field-message-${message.type}`}>
              {message.icon && (
                <span className="form-field-message-icon">{message.icon}</span>
              )}
              <span className="form-field-message-text">{message.text}</span>
            </div>
          )}
          {showCount && maxLength && (
            <div className="form-field-count">
              <span className="form-field-count-current">{currentLength}</span>
              <span className="form-field-count-separator">/</span>
              <span className="form-field-count-max">{maxLength}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

FormField.displayName = 'FormField';

export default FormField;