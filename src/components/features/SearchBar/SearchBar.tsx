/**
 * @fileoverview SearchBar component for game search functionality
 * @module components/features/SearchBar
 */

'use client';

import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { Search, X, Loader2, Gamepad2, Building2, Tag, Layers } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Dropdown, type DropdownOption } from '@/components/ui/Dropdown';
import { useDebounce } from '@/lib/core/frontend';
import { UI_DELAYS } from '@/lib/core/config/constants/app.constants';
import type { SearchType } from '@/lib/core/domain/models';
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
  onSearch?: (query: string, searchType?: SearchType) => void;
  /** Callback for immediate value changes (not debounced) */
  onChange?: (value: string, searchType?: SearchType) => void;
  /** Callback when search type changes */
  onSearchTypeChange?: (searchType: SearchType) => void;
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
  /** Enable search type dropdown */
  enableTypeDropdown?: boolean;
  /** Default search type */
  defaultSearchType?: SearchType;
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
 *   debounceDelay={UI_DELAYS.SEARCH_DEBOUNCE}
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
  onSearchTypeChange,
  debounceDelay = UI_DELAYS.SEARCH_DEBOUNCE,
  isLoading = false,
  showClear = true,
  autoFocus = false,
  disabled = false,
  size = 'md',
  enableTypeDropdown = false,
  defaultSearchType = 'all',
  className = '',
  testId = 'search-bar'
}) => {
  const [value, setValue] = useState(initialValue);
  const [searchType, setSearchType] = useState<SearchType>(defaultSearchType);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedValue = useDebounce(value, debounceDelay);

  /**
   * Handle search value changes after debouncing
   */
  useEffect(() => {
    if (onSearch && debouncedValue !== initialValue) {
      onSearch(debouncedValue, searchType);
    }
  }, [debouncedValue, searchType, onSearch, initialValue]);

  /**
   * Handle input value change
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // Call immediate onChange if provided
    if (onChange) {
      onChange(newValue, searchType);
    }
  }, [onChange, searchType]);

  /**
   * Handle search type change
   */
  const handleSearchTypeChange = useCallback((newType: SearchType) => {
    setSearchType(newType);
    
    if (onSearchTypeChange) {
      onSearchTypeChange(newType);
    }
    
    // Re-trigger search with new type if value exists
    if (value && onSearch) {
      onSearch(value, newType);
    }
  }, [value, onSearch, onSearchTypeChange]);

  /**
   * Handle clear button click
   */
  const handleClear = useCallback(() => {
    setValue('');
    inputRef.current?.focus();
    
    if (onChange) {
      onChange('', searchType);
    }
    
    if (onSearch) {
      onSearch('', searchType);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        onSearch(value, searchType);
      }
    }
  }, [value, searchType, handleClear, onSearch]);

  /**
   * Search type dropdown options
   */
  const searchTypeOptions: DropdownOption[] = [
    {
      value: 'all',
      label: 'All',
      icon: <Layers className="w-3 h-3" />
    },
    {
      value: 'games',
      label: 'Games',
      icon: <Gamepad2 className="w-3 h-3" />
    },
    {
      value: 'providers',
      label: 'Providers',
      icon: <Building2 className="w-3 h-3" />
    },
    {
      value: 'tags',
      label: 'Tags',
      icon: <Tag className="w-3 h-3" />
    }
  ];

  /**
   * Get placeholder based on search type
   */
  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    
    switch (searchType) {
      case 'games':
        return 'Search games...';
      case 'providers':
        return 'Search providers...';
      case 'tags':
        return 'Search tags...';
      default:
        return 'Search all...';
    }
  };

  const shouldShowClear = showClear && value && !disabled && !isLoading;
  // Right icon should be clickable if there's a clear button OR dropdown
  const isRightIconClickable = !!shouldShowClear || enableTypeDropdown;

  // Build right element for input
  const rightElement = (
    <div className="search-bar-right-elements">
      {/* Type dropdown (inside input on the right) */}
      {enableTypeDropdown && (
        <Dropdown
          options={searchTypeOptions}
          value={searchType}
          onChange={(value) => handleSearchTypeChange(value as SearchType)}
          size={size}
          variant="ghost"
          compact
          disabled={disabled}
          className="search-bar-type-dropdown"
          testId={`${testId}-type-dropdown`}
        />
      )}
      
      {/* Loading or Clear button */}
      {isLoading ? (
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
      ) : null}
    </div>
  );

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
        placeholder={getPlaceholder()}
        disabled={disabled}
        autoFocus={autoFocus}
        size={size}
        leftIcon={<Search className="search-bar-search-icon" />}
        rightIcon={rightElement}
        rightIconClickable={isRightIconClickable}
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