/**
 * @fileoverview SearchBar component for game search functionality
 * @module components/features/SearchBar
 */

'use client';

import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useDebounce } from '@/hooks/useDebounce';
import '@/styles/components/features/search-bar.css';

/**
 * Props for the SearchBar component
 * @interface SearchBarProps
 */
export interface SearchBarProps {
  /** Initial search value */
  initialValue?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Callback when search value changes (debounced) */
  onSearch?: (query: string) => void;
  /** Callback for immediate value changes (not debounced) */
  onChange?: (value: string) => void;
  /** Debounce delay in milliseconds */
  debounceDelay?: number;
  /** Show loading indicator */
  isLoading?: boolean;
  /** Show clear button */
  showClear?: boolean;
  /** Auto-focus on mount */
  autoFocus?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Search bar size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom className */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * SearchBar Component
 * 
 * @description A search input component with debouncing, loading states, and clear functionality.
 * Built on top of the Input base component for consistency.
 * 
 * @example
 * ```tsx
 * <SearchBar
 *   placeholder="Search games..."
 *   onSearch={handleSearch}
 *   debounceDelay={300}
 *   showClear={true}
 * />
 * ```
 * 
 * @param {SearchBarProps} props - Component props
 * @returns {JSX.Element} Rendered search bar
 */
export const SearchBar = memo<SearchBarProps>(({
  initialValue = '',
  placeholder = 'Search...',
  onSearch,
  onChange,
  debounceDelay = 300,
  isLoading = false,
  showClear = true,
  autoFocus = false,
  disabled = false,
  size = 'md',
  className = '',
  testId = 'search-bar'
}) => {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedValue = useDebounce(value, debounceDelay);

  /**
   * Handle search value changes after debouncing
   */
  useEffect(() => {
    if (onSearch && debouncedValue !== initialValue) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch, initialValue]);

  /**
   * Handle input value change
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // Call immediate onChange if provided
    if (onChange) {
      onChange(newValue);
    }
  }, [onChange]);

  /**
   * Handle clear button click
   */
  const handleClear = useCallback(() => {
    setValue('');
    inputRef.current?.focus();
    
    if (onChange) {
      onChange('');
    }
    
    if (onSearch) {
      onSearch('');
    }
  }, [onChange, onSearch]);

  /**
   * Handle keyboard shortcuts
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // Clear on Escape
    if (e.key === 'Escape' && value) {
      e.preventDefault();
      handleClear();
    }
    
    // Submit on Enter (optional - could trigger immediate search)
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onSearch) {
        onSearch(value);
      }
    }
  }, [value, handleClear, onSearch]);

  const shouldShowClear = showClear && value && !disabled && !isLoading;

  // Build right icon based on state
  const rightIcon = isLoading ? (
    <Loader2 className="search-bar-spinner" />
  ) : shouldShowClear ? (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClear}
      className="search-bar-clear-btn"
      aria-label="Clear search"
      data-testid={`${testId}-clear`}
      iconOnly
    >
      <X className="search-bar-clear-icon" />
    </Button>
  ) : null;

  return (
    <div
      className={`search-bar ${className}`}
      data-testid={testId}
    >
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        size={size}
        leftIcon={<Search className="search-bar-search-icon" />}
        rightIcon={rightIcon}
        rightIconClickable={!!shouldShowClear}
        fullWidth
        className={`search-bar-input ${isFocused ? 'search-bar-focused' : ''}`}
        containerClassName="search-bar-container"
        aria-label="Search"
        aria-describedby={isLoading ? `${testId}-loading` : undefined}
        data-testid={`${testId}-input`}
      />

      {/* Keyboard shortcut hint */}
      {isFocused && value && (
        <div className="search-bar-hint">
          Press <kbd className="search-bar-kbd">ESC</kbd> to clear
        </div>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;