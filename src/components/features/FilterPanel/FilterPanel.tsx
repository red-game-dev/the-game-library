/**
 * @fileoverview FilterPanel component for game filtering
 * @module components/features/FilterPanel
 */

'use client';

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  X, 
  Check,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { FormFieldCheckbox } from '@/components/ui/FormField/FormFieldCheckbox';
import { FormFieldDualRange } from '@/components/ui/FormField/FormFieldDualRange';
import { GAME_TYPE_CONFIG, SORT_OPTIONS, VIEW_MODES, RTP_PRESETS } from '@/lib/core/config/constants/app.constants';
import type { GameType } from '@/lib/core/domain/entities/Game';
import type { Provider } from '@/lib/core/domain/entities/Provider';
import type { FilterState as SharedFilterState } from '@/lib/core/shared/types';
import type { SortOption } from '@/lib/core/domain/models';
import { useDebounce } from '@/lib/core/frontend/hooks/useDebounce';
import '@/styles/components/features/filter-panel.css';

/**
 * View mode type
 */
export type ViewMode = typeof VIEW_MODES[number];

/**
 * Filter state - extends shared FilterState with required fields
 * Uses the centralized FilterState type for consistency
 */
export interface FilterState extends Omit<SharedFilterState, 'providers' | 'types' | 'tags' | 'favorites' | 'isNew' | 'isHot' | 'isComingSoon' | 'sort' | 'viewMode' | 'minRtp' | 'maxRtp'> {
  providers: string[];       // Required in this component
  types: GameType[];         // Required in this component
  tags: string[];            // Required in this component
  favorites: boolean;        // Required in this component
  isNew: boolean;            // Required in this component
  isHot: boolean;            // Required in this component
  isComingSoon?: boolean;    // Optional in this component
  sort: SortOption;          // Required in this component
  viewMode: ViewMode;        // Required in this component
  minRtp?: number;           // Optional RTP filter
  maxRtp?: number;           // Optional RTP filter
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
  mobileMode?: 'drawer' | 'accordion' | 'inline';
  /** Control padding for drawer mode */
  drawerPadding?: 'none' | 'sm' | 'md' | 'lg';
  /** Disabled state - can be boolean or object for individual sections */
  disabled?: boolean | {
    providers?: boolean;
    types?: boolean;
    tags?: boolean;
    special?: boolean;
    sort?: boolean;
    viewMode?: boolean;
  };
  /** Custom className */
  className?: string;
  /** Test ID */
  testId?: string;
}

/**
 * Game type options from constants
 */
const gameTypes = GAME_TYPE_CONFIG;

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
    isNew: false,
    isHot: false,
    isComingSoon: false,
    sort: 'popular',
    viewMode: 'grid'
  },
  onFilterChange,
  collapsible = true,
  defaultCollapsed = false,
  showCount = true,
  mobileMode = 'accordion',
  drawerPadding = 'md',
  disabled = false,
  className = '',
  testId = 'filter-panel'
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [expandedSections, setExpandedSections] = useState({
    providers: true,
    types: true,
    tags: false,
    special: true,
    viewMode: true
  });

  // Local state for immediate RTP updates (before debouncing)
  const [localRtpRange, setLocalRtpRange] = useState<[number, number]>([
    filters.minRtp ?? 0, 
    filters.maxRtp ?? 100
  ]);

  // Track when local state was last updated by user vs external changes
  const lastUserUpdateRef = useRef<number>(0);
  const isExternalUpdateRef = useRef(false);

  // Debounce local RTP changes
  const debouncedRtpRange = useDebounce(localRtpRange, 500);

  // Update local state when filters change externally (URL, clear filters, etc.)
  useEffect(() => {
    if (!isExternalUpdateRef.current) {
      // This is likely an external change, update local state
      const newMin = filters.minRtp ?? 0;
      const newMax = filters.maxRtp ?? 100;
      setLocalRtpRange([newMin, newMax]);
    }
    isExternalUpdateRef.current = false;
  }, [filters.minRtp, filters.maxRtp]);

  // Trigger filter change when debounced RTP range changes from user input
  useEffect(() => {
    // Only trigger if this was from user input (not from external filter changes)
    if (Date.now() - lastUserUpdateRef.current < 1000) {
      const [min, max] = debouncedRtpRange;
      isExternalUpdateRef.current = true; // Mark as our own update
      
      onFilterChange?.({
        ...filters,
        // Only set to undefined if both are at default (0-100)
        minRtp: min === 0 && max === 100 ? undefined : min,
        maxRtp: min === 0 && max === 100 ? undefined : max
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedRtpRange]);

  /**
   * Helper to check if a section is disabled
   */
  const isSectionDisabled = useCallback((section: 'providers' | 'types' | 'tags' | 'special' | 'sort' | 'viewMode') => {
    if (typeof disabled === 'boolean') {
      return disabled;
    }
    return disabled?.[section] ?? false;
  }, [disabled]);

  /**
   * Check if entire panel is disabled
   */
  const isAllDisabled = typeof disabled === 'boolean' ? disabled : false;

  /**
   * Toggle section expansion
   */
  const toggleSection = useCallback((section: keyof typeof expandedSections) => {
    if (isAllDisabled) return;
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, [isAllDisabled]);

  /**
   * Toggle provider filter
   */
  const toggleProvider = useCallback((providerId: string) => {
    if (isSectionDisabled('providers')) return;
    
    const newProviders = filters.providers.includes(providerId)
      ? filters.providers.filter(id => id !== providerId)
      : [...filters.providers, providerId];
    
    onFilterChange?.({
      ...filters,
      providers: newProviders
    });
  }, [filters, onFilterChange, isSectionDisabled]);

  /**
   * Toggle game type filter
   */
  const toggleType = useCallback((type: GameType) => {
    if (isSectionDisabled('types')) return;
    
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    
    onFilterChange?.({
      ...filters,
      types: newTypes
    });
  }, [filters, onFilterChange, isSectionDisabled]);

  /**
   * Toggle tag filter
   */
  const toggleTag = useCallback((tag: string) => {
    if (isSectionDisabled('tags')) return;
    
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    onFilterChange?.({
      ...filters,
      tags: newTags
    });
  }, [filters, onFilterChange, isSectionDisabled]);

  /**
   * Toggle special filters
   */
  const toggleSpecial = useCallback((key: 'favorites' | 'isNew' | 'isHot' | 'isComingSoon') => {
    if (isSectionDisabled('special')) return;
    
    onFilterChange?.({
      ...filters,
      [key]: !filters[key]
    });
  }, [filters, onFilterChange, isSectionDisabled]);

  /**
   * Handle RTP range change (updates local state for immediate UI feedback)
   */
  const handleRtpChange = useCallback((value: [number, number]) => {
    if (isSectionDisabled('special')) return;
    
    // Track that this was a user update
    lastUserUpdateRef.current = Date.now();
    
    // Update local state immediately for responsive UI
    setLocalRtpRange(value);
  }, [isSectionDisabled]);


  /**
   * Toggle sort option
   */
  const handleSortChange = useCallback((sort: SortOption) => {
    if (isSectionDisabled('sort')) return;
    
    onFilterChange?.({
      ...filters,
      sort
    });
  }, [filters, onFilterChange, isSectionDisabled]);

  /**
   * Toggle view mode
   */
  const handleViewModeChange = useCallback((viewMode: ViewMode) => {
    if (isSectionDisabled('viewMode')) return;
    
    onFilterChange?.({
      ...filters,
      viewMode
    });
  }, [filters, onFilterChange, isSectionDisabled]);

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    if (isAllDisabled) return;
    
    onFilterChange?.({
      providers: [],
      types: [],
      tags: [],
      favorites: false,
      isNew: false,
      isHot: false,
      isComingSoon: false,
      sort: 'popular',
      viewMode: 'grid',
      minRtp: undefined,
      maxRtp: undefined
    });
  }, [onFilterChange, isAllDisabled]);

  /**
   * Calculate active filter count
   */
  const activeFilterCount = useMemo(() => {
    return filters.providers.length + 
           filters.types.length + 
           filters.tags.length +
           (filters.favorites ? 1 : 0) +
           (filters.isNew ? 1 : 0) +
           (filters.isHot ? 1 : 0) +
           (filters.isComingSoon ? 1 : 0) +
           (filters.minRtp !== undefined ? 1 : 0) +
           (filters.maxRtp !== undefined ? 1 : 0);
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
      <Button
        variant="ghost"
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
      </Button>
      {expandedSections[sectionKey] && (
        <div className="filter-section-content">
          {content}
        </div>
      )}
    </div>
  );

  /**
   * Check if mobile/tablet viewport
   * Using state to properly handle SSR and client-side rendering
   */
  const [viewportSize, setViewportSize] = React.useState({ width: 1024, height: 768 });
  
  React.useEffect(() => {
    const handleResize = () => {
      setViewportSize({ 
        width: window.innerWidth, 
        height: window.innerHeight 
      });
    };
    
    // Set initial size
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = viewportSize.width < 768;
  const isTablet = viewportSize.width >= 768 && viewportSize.width < 1024;
  const shouldUseMobileMode = isMobile || isTablet;

  /**
   * Reset expanded sections for mobile accordion mode
   * MUST be called before any conditional returns to follow React Hooks rules
   */
  React.useEffect(() => {
    if (shouldUseMobileMode && mobileMode === 'accordion') {
      setExpandedSections({
        providers: false,
        types: false,
        tags: false,
        special: false,
        viewMode: false
      });
    }
  }, [shouldUseMobileMode, mobileMode]);

  /**
   * Main filter content
   */
  const filterContent = (
    <>
      {/* Header */}
      <div className="filter-panel-header">
        <div className="filter-panel-title-group">
          {collapsible && shouldUseMobileMode && mobileMode === 'drawer' && (
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              onClick={() => setIsCollapsed(true)}
              className="filter-panel-close-btn"
              aria-label="Close filters"
              disabled={isAllDisabled}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          <Filter className="filter-panel-icon" />
          <h2 className="filter-panel-title">Filters</h2>
          {showCount && activeFilterCount > 0 && (
            <Badge variant="primary" size="sm" gap="sm">
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
            disabled={isAllDisabled}
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="filter-sections">
        {/* Quick Filters & Sort */}
        {renderSection('Quick Filters & Sort', 'special', (
          <div className="filter-special-section">
            <div className="filter-subsection">
              <h4 className="filter-subsection-title">Quick Filters</h4>
              <div className="filter-special-grid">
                <Button
                  variant="outline"
                  size="sm"
                  className={`filter-special-item ${filters.favorites ? 'filter-special-active' : ''} ${isSectionDisabled('special') ? 'filter-item-disabled' : ''}`}
                  onClick={() => toggleSpecial('favorites')}
                  disabled={isSectionDisabled('special')}
                >
                  <span className="filter-special-icon">❤️</span>
                  <span>Favorites</span>
                  {filters.favorites && <Check className="filter-special-check" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`filter-special-item ${filters.isNew ? 'filter-special-active' : ''} ${isSectionDisabled('special') ? 'filter-item-disabled' : ''}`}
                  onClick={() => toggleSpecial('isNew')}
                  disabled={isSectionDisabled('special')}
                >
                  <span className="filter-special-icon">✨</span>
                  <span>New</span>
                  {filters.isNew && <Check className="filter-special-check" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`filter-special-item ${filters.isHot ? 'filter-special-active' : ''} ${isSectionDisabled('special') ? 'filter-item-disabled' : ''}`}
                  onClick={() => toggleSpecial('isHot')}
                  disabled={isSectionDisabled('special')}
                >
                  <span className="filter-special-icon">🔥</span>
                  <span>Hot</span>
                  {filters.isHot && <Check className="filter-special-check" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`filter-special-item filter-special-flashy ${filters.isComingSoon ? 'filter-special-active' : ''} ${isSectionDisabled('special') ? 'filter-item-disabled' : ''}`}
                  onClick={() => toggleSpecial('isComingSoon')}
                  disabled={isSectionDisabled('special')}
                >
                  <span className="filter-special-icon">🚀</span>
                  <span>Coming Soon</span>
                  {filters.isComingSoon && <Check className="filter-special-check" />}
                </Button>
              </div>
            </div>
            
            <div className="filter-subsection">
              <div className="filter-rtp-section">
                <FormFieldDualRange
                  label="RTP Range (%)"
                  config={{
                    min: 0,
                    max: 100,
                    step: 0.1,
                    suffix: '%'
                  }}
                  value={localRtpRange}
                  onChange={handleRtpChange}
                  minLabel="Min"
                  maxLabel="Max"
                  separator={<ArrowRight className="w-4 h-4" />}
                  disabled={isSectionDisabled('special')}
                  suggestions={RTP_PRESETS.filter(preset => preset.min !== undefined && preset.max !== undefined).map(preset => ({
                    label: preset.label,
                    value: [preset.min!, preset.max!]
                  }))}
                  showSuggestions={true}
                  className="filter-rtp-inputs"
                />
              </div>
            </div>
            
            <div className="filter-subsection">
              <h4 className="filter-subsection-title">Sort By</h4>
              <div className="filter-sort-grid">
                {SORT_OPTIONS.filter(option => 
                  // Skip 'popular' and 'new' as they're covered by Quick Filters
                  option.value !== 'popular' && option.value !== 'new'
                ).map(option => {
                  const icons: Record<string, string> = {
                    'az': '⬆️',
                    'za': '⬇️',
                    'rating': '⭐'
                  };
                  
                  return (
                    <Button
                      key={option.value}
                      variant="outline"
                      size="sm"
                      className={`filter-sort-item ${filters.sort === option.value ? 'filter-sort-active' : ''} ${isSectionDisabled('sort') ? 'filter-item-disabled' : ''}`}
                      onClick={() => handleSortChange(option.value)}
                      disabled={isSectionDisabled('sort')}
                    >
                      <span className="filter-sort-icon">{icons[option.value]}</span>
                      <span className="filter-sort-label">{option.label}</span>
                      {filters.sort === option.value && (
                        <Check className="filter-sort-check" />
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Game Types */}
        {renderSection('Game Types', 'types', (
          <div className="filter-types-grid">
            {gameTypes.map(type => (
              <Button
                key={type.value}
                variant="outline"
                size="sm"
                className={`filter-type-item ${filters.types.includes(type.value) ? 'filter-type-active' : ''} ${isSectionDisabled('types') ? 'filter-item-disabled' : ''}`}
                onClick={() => toggleType(type.value)}
                disabled={isSectionDisabled('types')}
              >
                <span className="filter-type-icon">{type.icon}</span>
                <span className="filter-type-label">{type.label}</span>
                {filters.types.includes(type.value) && (
                  <Check className="filter-type-check" />
                )}
              </Button>
            ))}
          </div>
        ))}

        {/* View Mode */}
        {renderSection('View Mode', 'viewMode', (
          <div className="filter-view-grid">
            {VIEW_MODES.map(mode => {
              const icons: Record<string, string> = {
                'grid': '⚏',
                'list': '☰',
                'compact': '⚎'
              };
              
              return (
                <Button
                  key={mode}
                  variant="outline"
                  size="sm"
                  className={`filter-view-item ${filters.viewMode === mode ? 'filter-view-active' : ''} ${isSectionDisabled('viewMode') ? 'filter-item-disabled' : ''}`}
                  onClick={() => handleViewModeChange(mode)}
                  disabled={isSectionDisabled('viewMode')}
                >
                  <span className="filter-view-icon">{icons[mode]}</span>
                  <span className="filter-view-label">
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </span>
                  {filters.viewMode === mode && (
                    <Check className="filter-view-check" />
                  )}
                </Button>
              );
            })}
          </div>
        ))}

        {/* Providers */}
        {providers.length > 0 && renderSection('Providers', 'providers', (
          <div className="filter-providers-list">
            {providers.map(provider => (
              <FormFieldCheckbox
                key={provider.id}
                checkboxLabel={provider.name}
                checked={filters.providers.includes(provider.id)}
                onChange={() => toggleProvider(provider.id)}
                disabled={isSectionDisabled('providers')}
                rightContent={provider.gameCount ? (
                  <span className="filter-provider-count">({provider.gameCount})</span>
                ) : undefined}
                testId={`filter-provider-${provider.id}`}
              />
            ))}
          </div>
        ))}

        {/* Tags */}
        {tags.length > 0 && renderSection('Tags', 'tags', (
          <div className="filter-tags-grid">
            {tags.map(tag => (
              <Button
                key={tag}
                variant="outline"
                size="sm"
                className={`filter-tag-item ${filters.tags.includes(tag) ? 'filter-tag-active' : ''} ${isSectionDisabled('tags') ? 'filter-item-disabled' : ''}`}
                onClick={() => toggleTag(tag)}
                disabled={isSectionDisabled('tags')}
              >
                {tag}
              </Button>
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
            <Badge variant="primary" size="sm" gap="sm">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }

  // Mobile mode: drawer
  if (shouldUseMobileMode && mobileMode === 'drawer') {
    // Only show toggle button if collapsible is true
    if (collapsible) {
      return (
        <>
          <Button
            variant="secondary"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="filter-panel-mobile-toggle"
          >
            <Filter className="filter-toggle-icon" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <Badge variant="primary" size="sm" gap="sm">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
          {!isCollapsed && (
            <div className="filter-panel-drawer-overlay" onClick={() => setIsCollapsed(true)}>
              <Card 
                className={`filter-panel filter-panel-drawer filter-panel-drawer-padding-${drawerPadding} ${className}`} 
                data-testid={testId}
                onClick={(e) => e.stopPropagation()}
              >
                {filterContent}
              </Card>
            </div>
          )}
        </>
      );
    } else {
      // Always show drawer without toggle if not collapsible
      return (
        <div className="filter-panel-drawer-overlay filter-panel-drawer-always-open">
          <Card 
            className={`filter-panel filter-panel-drawer filter-panel-drawer-padding-${drawerPadding} ${className}`} 
            data-testid={testId}
          >
            {filterContent}
          </Card>
        </div>
      );
    }
  }

  return (
    <Card 
      className={`filter-panel ${shouldUseMobileMode ? `filter-panel-${mobileMode}` : ''} ${isAllDisabled ? 'filter-panel-disabled' : ''} ${className}`} 
      data-testid={testId}
    >
      {filterContent}
    </Card>
  );
};

FilterPanel.displayName = 'FilterPanel';

export default FilterPanel;