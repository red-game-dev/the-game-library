/**
 * @fileoverview Storybook stories for FilterPanel component
 * @module components/features/FilterPanel/stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { FilterPanel } from './FilterPanel';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import type { FilterState, Provider } from './FilterPanel';

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

// Sample providers data
const sampleProviders: Provider[] = [
  { id: 'pragmatic', name: 'Pragmatic Play', gameCount: 245 },
  { id: 'evolution', name: 'Evolution Gaming', gameCount: 189 },
  { id: 'netent', name: 'NetEnt', gameCount: 156 },
  { id: 'microgaming', name: 'Microgaming', gameCount: 312 },
  { id: 'playtech', name: 'Playtech', gameCount: 278 },
  { id: 'betsoft', name: 'Betsoft', gameCount: 98 },
  { id: 'yggdrasil', name: 'Yggdrasil', gameCount: 87 },
  { id: 'quickspin', name: 'Quickspin', gameCount: 65 }
];

// Sample tags
const sampleTags = [
  'Popular',
  'New Release',
  'High RTP',
  'Bonus Buy',
  'Megaways',
  'Jackpot',
  'Free Spins',
  'Wild Features'
];

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
      new: false,
      hot: true
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
      new: false,
      hot: false
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
      if (newFilters.new) count -= 300;
      if (newFilters.hot) count -= 250;
      
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
 * Mobile viewport
 */
export const Mobile: Story = {
  args: {
    providers: sampleProviders.slice(0, 4),
    tags: sampleTags.slice(0, 4),
    mobileMode: 'inline'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

/**
 * Tablet viewport
 */
export const Tablet: Story = {
  args: {
    providers: sampleProviders.slice(0, 6),
    tags: sampleTags.slice(0, 6),
    mobileMode: 'dropdown'
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad'
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
      new: true,
      hot: false
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