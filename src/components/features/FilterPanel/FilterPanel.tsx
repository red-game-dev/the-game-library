/**
 * @fileoverview FilterPanel component for game filtering
 * @module components/features/FilterPanel
 */

'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { ChevronDown, ChevronUp, Filter, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import '@/styles/components/features/filter-panel.css';

/**
 * Game type options
 */
export type GameType = 'slots' | 'table' | 'live' | 'instant' | 'jackpot';

/**
 * Provider information
 */
export interface Provider {
  id: string;
  name: string;
  logo?: string;
  gameCount?: number;
}

/**
 * Filter state
 */
export interface FilterState {
  providers: string[];
  types: GameType[];
  tags: string[];
  favorites: boolean;
  new: boolean;
  hot: boolean;
}

/**
 * Props for the FilterPanel component
 */
export interface FilterPanelProps {
  /** Available providers */
  providers?: Provider[];
  /** Available tags */
  tags?: string[];
  /** Current filter state */
  filters?: FilterState;
  /** Callback when filters change */
  onFilterChange?: (filters: FilterState) => void;
  /** Whether panel is collapsible */
  collapsible?: boolean;
  /** Default collapsed state */
  defaultCollapsed?: boolean;
  /** Show filter count badge */
  showCount?: boolean;
  /** Mobile responsive mode */
  mobileMode?: 'drawer' | 'dropdown' | 'inline';
  /** Custom className */
  className?: string;
  /** Test ID */
  testId?: string;
}

/**
 * Game type options with labels
 */
const gameTypes: { value: GameType; label: string; icon?: string }[] = [
  { value: 'slots', label: 'Slots', icon: '🎰' },
  { value: 'table', label: 'Table Games', icon: '🃏' },
  { value: 'live', label: 'Live Casino', icon: '🎥' },
  { value: 'instant', label: 'Instant Win', icon: '⚡' },
  { value: 'jackpot', label: 'Jackpots', icon: '💰' }
];

/**
 * FilterPanel Component
 * 
 * @description A comprehensive filtering panel for game selection with providers, types, and tags.
 * 
 * @example
 * ```tsx
 * <FilterPanel
 *   providers={providers}
 *   tags={['Popular', 'New', 'Bonus']}
 *   onFilterChange={handleFilterChange}
 *   collapsible
 * />
 * ```
 */
export const FilterPanel: React.FC<FilterPanelProps> = ({
  providers = [],
  tags = [],
  filters = {
    providers: [],
    types: [],
    tags: [],
    favorites: false,
    new: false,
    hot: false
  },
  onFilterChange,
  collapsible = true,
  defaultCollapsed = false,
  showCount = true,
  mobileMode = 'drawer',
  className = '',
  testId = 'filter-panel'
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [expandedSections, setExpandedSections] = useState({
    providers: true,
    types: true,
    tags: false,
    special: true
  });

  /**
   * Toggle section expansion
   */
  const toggleSection = useCallback((section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  /**
   * Toggle provider filter
   */
  const toggleProvider = useCallback((providerId: string) => {
    const newProviders = filters.providers.includes(providerId)
      ? filters.providers.filter(id => id !== providerId)
      : [...filters.providers, providerId];
    
    onFilterChange?.({
      ...filters,
      providers: newProviders
    });
  }, [filters, onFilterChange]);

  /**
   * Toggle game type filter
   */
  const toggleType = useCallback((type: GameType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    
    onFilterChange?.({
      ...filters,
      types: newTypes
    });
  }, [filters, onFilterChange]);

  /**
   * Toggle tag filter
   */
  const toggleTag = useCallback((tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    onFilterChange?.({
      ...filters,
      tags: newTags
    });
  }, [filters, onFilterChange]);

  /**
   * Toggle special filters
   */
  const toggleSpecial = useCallback((key: 'favorites' | 'new' | 'hot') => {
    onFilterChange?.({
      ...filters,
      [key]: !filters[key]
    });
  }, [filters, onFilterChange]);

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    onFilterChange?.({
      providers: [],
      types: [],
      tags: [],
      favorites: false,
      new: false,
      hot: false
    });
  }, [onFilterChange]);

  /**
   * Calculate active filter count
   */
  const activeFilterCount = useMemo(() => {
    return filters.providers.length + 
           filters.types.length + 
           filters.tags.length +
           (filters.favorites ? 1 : 0) +
           (filters.new ? 1 : 0) +
           (filters.hot ? 1 : 0);
  }, [filters]);

  /**
   * Render filter section
   */
  const renderSection = (
    title: string,
    sectionKey: keyof typeof expandedSections,
    content: React.ReactNode
  ) => (
    <div className="filter-section">
      <button
        className="filter-section-header"
        onClick={() => toggleSection(sectionKey)}
        aria-expanded={expandedSections[sectionKey]}
      >
        <h3 className="filter-section-title">{title}</h3>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="filter-section-icon" />
        ) : (
          <ChevronDown className="filter-section-icon" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className="filter-section-content">
          {content}
        </div>
      )}
    </div>
  );

  /**
   * Main filter content
   */
  const filterContent = (
    <>
      {/* Header */}
      <div className="filter-panel-header">
        <div className="filter-panel-title-group">
          <Filter className="filter-panel-icon" />
          <h2 className="filter-panel-title">Filters</h2>
          {showCount && activeFilterCount > 0 && (
            <Badge variant="primary" size="sm">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="filter-clear-btn"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="filter-sections">
        {/* Special Filters */}
        {renderSection('Quick Filters', 'special', (
          <div className="filter-special-grid">
            <button
              className={`filter-special-item ${filters.favorites ? 'filter-special-active' : ''}`}
              onClick={() => toggleSpecial('favorites')}
            >
              <span className="filter-special-icon">❤️</span>
              <span>Favorites</span>
              {filters.favorites && <Check className="filter-special-check" />}
            </button>
            <button
              className={`filter-special-item ${filters.new ? 'filter-special-active' : ''}`}
              onClick={() => toggleSpecial('new')}
            >
              <span className="filter-special-icon">✨</span>
              <span>New</span>
              {filters.new && <Check className="filter-special-check" />}
            </button>
            <button
              className={`filter-special-item ${filters.hot ? 'filter-special-active' : ''}`}
              onClick={() => toggleSpecial('hot')}
            >
              <span className="filter-special-icon">🔥</span>
              <span>Hot</span>
              {filters.hot && <Check className="filter-special-check" />}
            </button>
          </div>
        ))}

        {/* Game Types */}
        {renderSection('Game Types', 'types', (
          <div className="filter-types-grid">
            {gameTypes.map(type => (
              <button
                key={type.value}
                className={`filter-type-item ${filters.types.includes(type.value) ? 'filter-type-active' : ''}`}
                onClick={() => toggleType(type.value)}
              >
                <span className="filter-type-icon">{type.icon}</span>
                <span className="filter-type-label">{type.label}</span>
                {filters.types.includes(type.value) && (
                  <Check className="filter-type-check" />
                )}
              </button>
            ))}
          </div>
        ))}

        {/* Providers */}
        {providers.length > 0 && renderSection('Providers', 'providers', (
          <div className="filter-providers-list">
            {providers.map(provider => (
              <label
                key={provider.id}
                className={`filter-provider-item ${filters.providers.includes(provider.id) ? 'filter-provider-active' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={filters.providers.includes(provider.id)}
                  onChange={() => toggleProvider(provider.id)}
                  className="filter-provider-checkbox"
                />
                <span className="filter-provider-name">{provider.name}</span>
                {provider.gameCount && (
                  <span className="filter-provider-count">({provider.gameCount})</span>
                )}
              </label>
            ))}
          </div>
        ))}

        {/* Tags */}
        {tags.length > 0 && renderSection('Tags', 'tags', (
          <div className="filter-tags-grid">
            {tags.map(tag => (
              <button
                key={tag}
                className={`filter-tag-item ${filters.tags.includes(tag) ? 'filter-tag-active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );

  /**
   * Render based on mode
   */
  if (collapsible && isCollapsed) {
    return (
      <div className={`filter-panel filter-panel-collapsed ${className}`} data-testid={testId}>
        <Button
          variant="secondary"
          onClick={() => setIsCollapsed(false)}
          className="filter-panel-toggle"
        >
          <Filter className="filter-toggle-icon" />
          <span>Show Filters</span>
          {activeFilterCount > 0 && (
            <Badge variant="primary" size="sm">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  return (
    <Card className={`filter-panel ${className}`} data-testid={testId}>
      {collapsible && (
        <button
          className="filter-panel-collapse"
          onClick={() => setIsCollapsed(true)}
          aria-label="Collapse filters"
        >
          <X className="filter-collapse-icon" />
        </button>
      )}
      {filterContent}
    </Card>
  );
};

FilterPanel.displayName = 'FilterPanel';

export default FilterPanel;