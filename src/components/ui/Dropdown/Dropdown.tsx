/**
 * Dropdown Component
 * A customizable dropdown/select component with support for various styles and sizes
 */

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import '@/styles/components/base/dropdown.css';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  /** Options to display in the dropdown */
  options: DropdownOption[];
  /** Currently selected value */
  value?: string;
  /** Default value when uncontrolled */
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'subtle' | 'ghost';
  /** Disabled state */
  disabled?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Show icons in options */
  showIcons?: boolean;
  /** Show check mark for selected option */
  showCheck?: boolean;
  /** Position of the dropdown menu */
  position?: 'bottom' | 'top' | 'auto';
  /** Custom className */
  className?: string;
  /** Custom trigger render */
  renderTrigger?: (option: DropdownOption | undefined, isOpen: boolean) => React.ReactNode;
  /** Custom option render */
  renderOption?: (option: DropdownOption, isSelected: boolean) => React.ReactNode;
  /** Test ID */
  testId?: string;
  /** Compact mode (no padding) */
  compact?: boolean;
  /** Allow clearing selection */
  clearable?: boolean;
  /** Search/filter options */
  searchable?: boolean;
  /** Multiple selection */
  multiple?: boolean;
  /** Max height of dropdown menu */
  maxHeight?: number | string;
}

/**
 * Dropdown Component
 */
export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Select...',
  size = 'md',
  variant = 'default',
  disabled = false,
  fullWidth = false,
  showIcons = true,
  showCheck = true,
  position = 'auto',
  className = '',
  renderTrigger,
  renderOption,
  testId = 'dropdown',
  compact = false,
  clearable = false,
  searchable = false,
  multiple = false,
  maxHeight = 300,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Determine the actual value (controlled or uncontrolled)
  const actualValue = controlledValue !== undefined ? controlledValue : internalValue;
  const selectedOption = options.find(opt => opt.value === actualValue);
  
  // Filter options based on search query
  const filteredOptions = searchable && searchQuery
    ? options.filter(opt => 
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;
  
  /**
   * Handle option selection
   */
  const handleSelect = useCallback((optionValue: string) => {
    if (multiple) {
      // Multiple selection logic (future enhancement)
      console.warn('Multiple selection not yet implemented');
    } else {
      if (controlledValue === undefined) {
        setInternalValue(optionValue);
      }
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchQuery('');
    }
  }, [controlledValue, onChange, multiple]);
  
  /**
   * Handle clear selection
   */
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (controlledValue === undefined) {
      setInternalValue('');
    }
    onChange?.('');
  }, [controlledValue, onChange]);
  
  /**
   * Calculate dropdown position
   */
  const calculatePosition = useCallback(() => {
    if (position !== 'auto' || !triggerRef.current) {
      setDropdownPosition(position === 'top' ? 'top' : 'bottom');
      return;
    }
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const dropdownHeight = typeof maxHeight === 'number' ? maxHeight : 300;
    
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      setDropdownPosition('top');
    } else {
      setDropdownPosition('bottom');
    }
  }, [position, maxHeight]);
  
  /**
   * Handle click outside
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      calculatePosition();
      
      // Focus search input if searchable
      if (searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, searchable, calculatePosition]);
  
  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        if (!isOpen) {
          e.preventDefault();
          setIsOpen(true);
        }
        break;
      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
          setSearchQuery('');
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        // TODO: Navigate to next option
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        // TODO: Navigate to previous option
        break;
    }
  }, [disabled, isOpen]);
  
  return (
    <div
      ref={dropdownRef}
      className={`
        dropdown
        dropdown-${size}
        dropdown-${variant}
        ${fullWidth ? 'dropdown-full' : ''}
        ${compact ? 'dropdown-compact' : ''}
        ${disabled ? 'dropdown-disabled' : ''}
        ${isOpen ? 'dropdown-open' : ''}
        ${className}
      `}
      data-testid={testId}
    >
      {/* Trigger */}
      {renderTrigger ? (
        <div onClick={() => !disabled && setIsOpen(!isOpen)}>
          {renderTrigger(selectedOption, isOpen)}
        </div>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          className="dropdown-trigger"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={selectedOption?.label || placeholder}
        >
          <span className="dropdown-trigger-content">
            {showIcons && selectedOption?.icon && (
              <span className="dropdown-trigger-icon">
                {selectedOption.icon}
              </span>
            )}
            <span className="dropdown-trigger-label">
              {selectedOption?.label || placeholder}
            </span>
          </span>
          
          <span className="dropdown-trigger-actions">
            {clearable && actualValue && !disabled && (
              <button
                type="button"
                className="dropdown-clear"
                onClick={handleClear}
                aria-label="Clear selection"
              >
                ×
              </button>
            )}
            <ChevronDown className={`dropdown-chevron ${isOpen ? 'dropdown-chevron-open' : ''}`} />
          </span>
        </button>
      )}
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`dropdown-menu dropdown-menu-${dropdownPosition} will-animate`}
          style={{ maxHeight }}
          role="listbox"
          aria-label="Options"
        >
          {/* Search Input */}
          {searchable && (
            <div className="dropdown-search">
              <input
                ref={searchInputRef}
                type="text"
                className="dropdown-search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          {/* Options */}
          <div className="dropdown-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = option.value === actualValue;
                
                if (renderOption) {
                  return (
                    <div
                      key={option.value}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                    >
                      {renderOption(option, isSelected)}
                    </div>
                  );
                }
                
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`
                      dropdown-option
                      ${isSelected ? 'dropdown-option-selected' : ''}
                      ${option.disabled ? 'dropdown-option-disabled' : ''}
                    `}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    disabled={option.disabled}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {showIcons && option.icon && (
                      <span className="dropdown-option-icon">
                        {option.icon}
                      </span>
                    )}
                    <span className="dropdown-option-label">
                      {option.label}
                    </span>
                    {showCheck && isSelected && (
                      <Check className="dropdown-option-check" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="dropdown-empty">
                {searchQuery ? 'No results found' : 'No options available'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;