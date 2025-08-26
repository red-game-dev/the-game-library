/**
 * @fileoverview Storybook stories for FilterPanel component
 * @module components/features/FilterPanel/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { FilterPanel } from './FilterPanel';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import type { FilterState } from './FilterPanel';
import type { Provider } from '@/lib/core/domain/entities/Provider';
import { SORT_OPTIONS } from '@/lib/core/config/constants/app.constants';
import { generateMockProviders, getSampleTags } from '@/lib/core/test';

const meta: Meta<typeof FilterPanel> = {
  title: 'Features/FilterPanel',
  component: FilterPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
FilterPanel component for comprehensive game filtering.

## Features
- 🎮 Game type filtering
- 🏢 Provider filtering
- 🏷️ Tag filtering
- ⭐ Special filters (favorites, new, hot)
- 📱 Mobile responsive
- 🎨 Theme support
- 🔢 Active filter count
- ♿ Accessible
        `
      }
    }
  },
  argTypes: {
    collapsible: {
      control: 'boolean',
      description: 'Whether panel is collapsible'
    },
    defaultCollapsed: {
      control: 'boolean',
      description: 'Default collapsed state'
    },
    showCount: {
      control: 'boolean',
      description: 'Show filter count badge'
    },
    mobileMode: {
      control: 'select',
      options: ['drawer', 'dropdown', 'inline'],
      description: 'Mobile responsive mode'
    }
  }
} satisfies Meta<typeof FilterPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Generate sample data using test generators
const sampleProviders: Provider[] = generateMockProviders(8).map((provider) => ({
  ...provider,
  gameCount: Math.floor(Math.random() * 300) + 50
}));

const sampleTags = getSampleTags();

/**
 * Default filter panel
 */
export const Default: Story = {
  args: {
    providers: sampleProviders,
    tags: sampleTags,
    collapsible: true,
    showCount: true
  }
};

/**
 * With active filters
 */
export const WithActiveFilters: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterState>({
      providers: ['pragmatic', 'evolution'],
      types: ['slots', 'live'],
      tags: ['Popular', 'New Release'],
      favorites: true,
      isNew: false,
      isHot: true,
      isComingSoon: false,
      sort: 'new',
      viewMode: 'grid'
    });

    return (
      <div className="flex gap-4">
        <div className="w-80">
          <FilterPanel
            providers={sampleProviders}
            tags={sampleTags}
            filters={filters}
            onFilterChange={setFilters}
            showCount
          />
        </div>
        <div className="flex-1">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Active Filters:</h3>
            <pre className="text-sm text-secondary">
              {JSON.stringify(filters, null, 2)}
            </pre>
          </Card>
        </div>
      </div>
    );
  }
};

/**
 * Collapsed state
 */
export const Collapsed: Story = {
  args: {
    providers: sampleProviders,
    tags: sampleTags,
    collapsible: true,
    defaultCollapsed: true,
    showCount: true
  }
};

/**
 * Non-collapsible
 */
export const NonCollapsible: Story = {
  args: {
    providers: sampleProviders,
    tags: sampleTags,
    collapsible: false,
    showCount: true
  }
};

/**
 * Minimal (no providers/tags)
 */
export const Minimal: Story = {
  args: {
    providers: [],
    tags: [],
    collapsible: false
  }
};

/**
 * Many providers (scrollable)
 */
export const ManyProviders: Story = {
  args: {
    providers: [
      ...sampleProviders,
      { id: 'novomatic', name: 'Novomatic', gameCount: 234 },
      { id: 'igt', name: 'IGT', gameCount: 189 },
      { id: 'aristocrat', name: 'Aristocrat', gameCount: 167 },
      { id: 'bally', name: 'Bally', gameCount: 145 },
      { id: 'wms', name: 'WMS', gameCount: 123 },
      { id: 'konami', name: 'Konami', gameCount: 98 },
      { id: 'ainsworth', name: 'Ainsworth', gameCount: 76 },
      { id: 'merkur', name: 'Merkur Gaming', gameCount: 89 }
    ],
    tags: sampleTags
  }
};

/**
 * Interactive demo
 */
export const InteractiveDemo: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterState>({
      providers: [],
      types: [],
      tags: [],
      favorites: false,
      isNew: false,
      isHot: false,
      sort: 'popular',
      viewMode: 'grid'
    });

    const [results, setResults] = useState(1250);

    // Simulate filtering effect
    const handleFilterChange = (newFilters: FilterState) => {
      setFilters(newFilters);
      
      // Calculate mock results
      let count = 1250;
      count -= newFilters.providers.length * 150;
      count -= newFilters.types.length * 200;
      count -= newFilters.tags.length * 100;
      if (newFilters.favorites) count -= 400;
      if (newFilters.isNew) count -= 300;
      if (newFilters.isHot) count -= 250;
      if (newFilters.isComingSoon) count -= 150;
      
      setResults(Math.max(0, count));
    };

    return (
      <div className="flex gap-4">
        <div className="w-80">
          <FilterPanel
            providers={sampleProviders}
            tags={sampleTags}
            filters={filters}
            onFilterChange={handleFilterChange}
            showCount
          />
        </div>
        <div className="flex-1 space-y-4">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Results</h3>
              <span className="text-2xl font-bold text-primary">{results} games</span>
            </div>
            <div className="text-sm text-secondary">
              <p>Try selecting different filters to see the game count change.</p>
              <p className="mt-2">This is a mock simulation of filtering behavior.</p>
            </div>
          </Card>
          
          {filters.providers.length > 0 && (
            <Card className="p-3">
              <h4 className="font-medium mb-2">Selected Providers:</h4>
              <div className="flex flex-wrap gap-2">
                {filters.providers.map(id => {
                  const provider = sampleProviders.find(p => p.id === id);
                  return provider ? (
                    <span key={id} className="px-2 py-1 bg-primary bg-opacity-10 rounded text-sm">
                      {provider.name}
                    </span>
                  ) : null;
                })}
              </div>
            </Card>
          )}
          
          {filters.types.length > 0 && (
            <Card className="p-3">
              <h4 className="font-medium mb-2">Selected Types:</h4>
              <div className="flex flex-wrap gap-2">
                {filters.types.map(type => (
                  <span key={type} className="px-2 py-1 bg-primary bg-opacity-10 rounded text-sm">
                    {type}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }
};

/**
 * Disabled state - entire panel
 */
export const DisabledPanel: Story = {
  args: {
    providers: sampleProviders,
    tags: sampleTags,
    disabled: true,
    filters: {
      providers: ['pragmatic'],
      types: ['slots'],
      tags: ['Bonus'],
      favorites: true,
      isNew: false,
      isHot: false,
      sort: 'popular',
      viewMode: 'grid'
    }
  }
};

/**
 * Disabled state - individual sections
 */
export const DisabledSections: Story = {
  args: {
    providers: sampleProviders,
    tags: sampleTags,
    disabled: {
      providers: true,
      types: false,
      tags: true,
      special: false,
      sort: false,
      viewMode: true
    },
    filters: {
      providers: ['pragmatic'],
      types: [],
      tags: ['Popular'],
      favorites: false,
      isNew: false,
      isHot: false,
      sort: 'popular',
      viewMode: 'grid'
    }
  }
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  args: {
    providers: sampleProviders,
    tags: sampleTags,
    collapsible: true,
    showCount: true
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

/**
 * Light mode
 */
export const LightMode: Story = {
  args: {
    providers: sampleProviders,
    tags: sampleTags,
    collapsible: true,
    showCount: true
  },
  parameters: {
    backgrounds: { default: 'light' }
  }
};

/**
 * Mobile viewport - Drawer Mode
 */
export const MobileDrawer: Story = {
  args: {
    providers: sampleProviders.slice(0, 4),
    tags: sampleTags.slice(0, 4),
    mobileMode: 'drawer',
    collapsible: true,
    defaultCollapsed: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile drawer mode - slides in from the left with overlay'
      }
    }
  }
};

/**
 * Mobile viewport - Accordion Mode
 */
export const MobileAccordion: Story = {
  args: {
    providers: sampleProviders.slice(0, 4),
    tags: sampleTags.slice(0, 4),
    mobileMode: 'accordion'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile accordion mode - all sections collapsed by default'
      }
    }
  }
};

/**
 * Mobile viewport - Inline Mode
 */
export const MobileInline: Story = {
  args: {
    providers: sampleProviders.slice(0, 4),
    tags: sampleTags.slice(0, 4),
    mobileMode: 'inline'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile inline mode - normal layout optimized for mobile'
      }
    }
  }
};

/**
 * Tablet viewport - Drawer Mode
 */
export const TabletDrawer: Story = {
  args: {
    providers: sampleProviders.slice(0, 6),
    tags: sampleTags.slice(0, 6),
    mobileMode: 'drawer',
    collapsible: true,
    defaultCollapsed: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad'
    },
    docs: {
      description: {
        story: 'Tablet drawer mode - wider drawer for tablet screens'
      }
    }
  }
};

/**
 * Tablet viewport - Accordion Mode
 */
export const TabletAccordion: Story = {
  args: {
    providers: sampleProviders.slice(0, 6),
    tags: sampleTags.slice(0, 6),
    mobileMode: 'accordion'
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad'
    },
    docs: {
      description: {
        story: 'Tablet accordion mode - sections can be expanded/collapsed'
      }
    }
  }
};

/**
 * With custom filter state
 */
export const CustomFilterState: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterState>({
      providers: [],
      types: ['slots'],
      tags: [],
      favorites: false,
      isNew: true,
      isHot: false,
      sort: 'rating',
      viewMode: 'compact'
    });

    return (
      <FilterPanel
        providers={sampleProviders}
        tags={sampleTags}
        filters={filters}
        onFilterChange={setFilters}
        showCount
      />
    );
  }
};

/**
 * Playground
 */
export const Playground: Story = {
  args: {
    providers: sampleProviders,
    tags: sampleTags,
    collapsible: true,
    defaultCollapsed: false,
    showCount: true,
    mobileMode: 'inline'
  }
};

/**
 * Sort Options Demo
 */
export const SortOptionsDemo: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterState>({
      providers: [],
      types: [],
      tags: [],
      favorites: false,
      isNew: false,
      isHot: false,
      sort: 'popular',
      viewMode: 'grid'
    });

    return (
      <div className="space-y-4">
        <div className="text-sm text-secondary">
          <strong>Current Sort:</strong> {SORT_OPTIONS.find(opt => opt.value === filters.sort)?.label}
        </div>
        <FilterPanel
          providers={sampleProviders}
          tags={sampleTags}
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>
    );
  }
};

/**
 * View Mode Demo
 */
export const ViewModeDemo: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterState>({
      providers: [],
      types: [],
      tags: [],
      favorites: false,
      isNew: false,
      isHot: false,
      sort: 'popular',
      viewMode: 'grid'
    });

    return (
      <div className="space-y-4">
        <div className="text-sm text-secondary">
          <strong>Current View Mode:</strong> {filters.viewMode.charAt(0).toUpperCase() + filters.viewMode.slice(1)}
        </div>
        <FilterPanel
          providers={sampleProviders}
          tags={sampleTags}
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>
    );
  }
};

/**
 * Combined Sort and View Demo
 */
export const SortAndViewDemo: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterState>({
      providers: ['pragmatic'],
      types: ['slots'],
      tags: ['Popular'],
      favorites: false,
      isNew: false,
      isHot: true,
      isComingSoon: false,
      sort: 'new',
      viewMode: 'grid'
    });

    return (
      <div className="space-y-4">
        <div className="flex gap-4 text-sm text-secondary">
          <div>
            <strong>Sort:</strong> {SORT_OPTIONS.find(opt => opt.value === filters.sort)?.label}
          </div>
          <div>
            <strong>View:</strong> {filters.viewMode.charAt(0).toUpperCase() + filters.viewMode.slice(1)}
          </div>
        </div>
        <FilterPanel
          providers={sampleProviders}
          tags={sampleTags}
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>
    );
  }
};

/**
 * Neon theme - Cyberpunk filters
 */
export const NeonTheme: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterState>({
      providers: [],
      types: [],
      tags: [],
      favorites: false,
      isNew: false,
      isHot: false,
      sort: 'new',
      viewMode: 'grid'
    });

    return (
      <div data-theme="neon" className="p-8" style={{ background: 'rgb(3, 7, 18)' }}>
        <h3 className="text-lg font-semibold text-purple-400 mb-6">Neon Theme Filters</h3>
        <div className="w-80">
          <FilterPanel
            providers={sampleProviders}
            tags={sampleTags}
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

/**
 * Gold theme - Premium filters
 */
export const GoldTheme: Story = {
  render: () => {
    const [filters, setFilters] = useState<FilterState>({
      providers: [],
      types: [],
      tags: [],
      favorites: false,
      isNew: false,
      isHot: false,
      sort: 'popular',
      viewMode: 'grid'
    });

    return (
      <div data-theme="gold" className="p-8" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <h3 className="text-lg font-semibold text-yellow-400 mb-6">Gold Theme Filters</h3>
        <div className="w-80">
          <FilterPanel
            providers={sampleProviders}
            tags={sampleTags}
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

/**
 * All themes comparison
 */
export const AllThemes: Story = {
  render: () => {
    const [lightFilters, setLightFilters] = useState<FilterState>({
      providers: [], types: [], tags: [], favorites: false, isNew: false, isHot: false, isComingSoon: false, sort: 'new', viewMode: 'grid'
    });
    const [darkFilters, setDarkFilters] = useState<FilterState>({
      providers: [], types: [], tags: [], favorites: false, isNew: false, isHot: false, isComingSoon: false, sort: 'new', viewMode: 'grid'
    });
    const [neonFilters, setNeonFilters] = useState<FilterState>({
      providers: [], types: [], tags: [], favorites: false, isNew: false, isHot: false, isComingSoon: false, sort: 'new', viewMode: 'grid'
    });
    const [goldFilters, setGoldFilters] = useState<FilterState>({
      providers: [], types: [], tags: [], favorites: false, isNew: false, isHot: false, isComingSoon: false, sort: 'new', viewMode: 'grid'
    });

    return (
      <div className="grid grid-cols-2 gap-6">
        <div data-theme="light" className="p-6 bg-white rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Light Theme</h3>
          <FilterPanel
            providers={sampleProviders.slice(0, 4)}
            tags={sampleTags.slice(0, 5)}
            filters={lightFilters}
            onFilterChange={setLightFilters}
          />
        </div>
        
        <div data-theme="dark" className="p-6 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">Dark Theme</h3>
          <FilterPanel
            providers={sampleProviders.slice(0, 4)}
            tags={sampleTags.slice(0, 5)}
            filters={darkFilters}
            onFilterChange={setDarkFilters}
          />
        </div>
        
        <div data-theme="neon" className="p-6 rounded-lg" style={{ background: 'rgb(3, 7, 18)' }}>
          <h3 className="text-lg font-semibold text-purple-400 mb-3">Neon Theme</h3>
          <FilterPanel
            providers={sampleProviders.slice(0, 4)}
            tags={sampleTags.slice(0, 5)}
            filters={neonFilters}
            onFilterChange={setNeonFilters}
            className="border border-purple-500 border-opacity-20"
          />
        </div>
        
        <div data-theme="gold" className="p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">Gold Theme</h3>
          <FilterPanel
            providers={sampleProviders.slice(0, 4)}
            tags={sampleTags.slice(0, 5)}
            filters={goldFilters}
            onFilterChange={setGoldFilters}
            className="border border-yellow-500 border-opacity-20"
          />
        </div>
      </div>
    );
  }
};