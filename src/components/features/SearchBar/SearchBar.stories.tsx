/**
 * @fileoverview Storybook stories for SearchBar component
 * @module components/features/SearchBar/stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';

const meta: Meta<typeof SearchBar> = {
  title: 'Features/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
SearchBar component for game search functionality with debouncing and loading states.

## Features
- 🔍 Search with debouncing
- ⏱️ Configurable debounce delay
- 🔄 Loading state indicator
- ❌ Clear button
- 📱 Responsive design
- ♿ Keyboard accessible
- 🌙 Dark mode support
        `
      }
    }
  },
  argTypes: {
    initialValue: {
      control: 'text',
      description: 'Initial search value'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    debounceDelay: {
      control: 'number',
      description: 'Debounce delay in milliseconds'
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading indicator'
    },
    showClear: {
      control: 'boolean',
      description: 'Show clear button'
    },
    autoFocus: {
      control: 'boolean',
      description: 'Auto-focus on mount'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Search bar size'
    }
  }
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default search bar
 */
export const Default: Story = {
  args: {
    placeholder: 'Search games...',
    showClear: true,
    debounceDelay: 300
  }
};

/**
 * With search results demo
 */
export const WithSearchResults: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    
    const mockGames = [
      'Space Adventure',
      'Mystery Quest',
      'Racing Pro',
      'Puzzle Master',
      'Battle Arena',
      'Farm Life'
    ];
    
    const handleSearch = (query: string) => {
      setIsSearching(true);
      setSearchQuery(query);
      // Simulate API delay
      setTimeout(() => setIsSearching(false), 500);
    };
    
    const filteredGames = mockGames.filter(game => 
      game.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
      <div className="space-y-4">
        <SearchBar
          placeholder="Search games..."
          onSearch={handleSearch}
          isLoading={isSearching}
          showClear
        />
        
        {searchQuery && (
          <div className="space-y-2">
            <p className="text-sm text-secondary">
              {isSearching ? 'Searching...' : `Found ${filteredGames.length} results for "${searchQuery}"`}
            </p>
            
            {!isSearching && (
              <div className="grid gap-2">
                {filteredGames.map((game) => (
                  <Card key={game} className="p-3">
                    <h4 className="font-medium">{game}</h4>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Small</h3>
        <SearchBar size="sm" placeholder="Small search..." />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Medium (Default)</h3>
        <SearchBar size="md" placeholder="Medium search..." />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Large</h3>
        <SearchBar size="lg" placeholder="Large search..." />
      </div>
    </div>
  )
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    placeholder: 'Searching...',
    isLoading: true,
    initialValue: 'Space'
  }
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    placeholder: 'Search disabled',
    disabled: true
  }
};

/**
 * With initial value
 */
export const WithInitialValue: Story = {
  args: {
    initialValue: 'Racing',
    placeholder: 'Search games...',
    showClear: true
  }
};

/**
 * Different debounce delays
 */
export const DebounceDelays: Story = {
  render: () => {
    const [instant, setInstant] = useState('');
    const [fast, setFast] = useState('');
    const [normal, setNormal] = useState('');
    const [slow, setSlow] = useState('');
    
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold mb-2">No Debounce (0ms)</h3>
          <SearchBar
            placeholder="Type to see instant results..."
            debounceDelay={0}
            onSearch={setInstant}
          />
          <p className="text-sm text-secondary mt-1">Result: {instant || 'Type something...'}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold mb-2">Fast (100ms)</h3>
          <SearchBar
            placeholder="Fast debounce..."
            debounceDelay={100}
            onSearch={setFast}
          />
          <p className="text-sm text-secondary mt-1">Result: {fast || 'Type something...'}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold mb-2">Normal (300ms)</h3>
          <SearchBar
            placeholder="Normal debounce..."
            debounceDelay={300}
            onSearch={setNormal}
          />
          <p className="text-sm text-secondary mt-1">Result: {normal || 'Type something...'}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold mb-2">Slow (1000ms)</h3>
          <SearchBar
            placeholder="Slow debounce..."
            debounceDelay={1000}
            onSearch={setSlow}
          />
          <p className="text-sm text-secondary mt-1">Result: {slow || 'Type something...'}</p>
        </div>
      </div>
    );
  }
};

/**
 * Auto-focus example
 */
export const AutoFocus: Story = {
  args: {
    placeholder: 'This input is auto-focused',
    autoFocus: true,
    showClear: true
  }
};

/**
 * Custom styling
 */
export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      <SearchBar
        placeholder="Default styling..."
        className="search-bar"
      />
      <SearchBar
        placeholder="With custom background..."
        className="search-bar bg-primary bg-opacity-10"
      />
      <SearchBar
        placeholder="With custom border..."
        className="search-bar border-2 border-primary"
      />
    </div>
  )
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  args: {
    placeholder: 'Search in dark mode...',
    showClear: true
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
    placeholder: 'Search in light mode...',
    showClear: true
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
    placeholder: 'Search...',
    size: 'md',
    showClear: true
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
    placeholder: 'Search games...',
    size: 'md',
    showClear: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad'
    }
  }
};

/**
 * With callback logging
 */
export const WithCallbacks: Story = {
  render: () => {
    const [logs, setLogs] = useState<string[]>([]);
    
    const addLog = (message: string) => {
      setLogs(prev => [`${new Date().toLocaleTimeString()}: ${message}`, ...prev.slice(0, 4)]);
    };
    
    return (
      <div className="space-y-4">
        <SearchBar
          placeholder="Type to see callbacks..."
          onChange={(value) => addLog(`onChange: "${value}"`)}
          onSearch={(query) => addLog(`onSearch (debounced): "${query}"`)}
          showClear
          debounceDelay={500}
        />
        
        <Card className="p-4">
          <h4 className="font-semibold mb-2">Event Log:</h4>
          <div className="space-y-1">
            {logs.length === 0 ? (
              <p className="text-sm text-secondary">Start typing to see events...</p>
            ) : (
              logs.map((log, index) => (
                <p key={index} className="text-sm font-mono">{log}</p>
              ))
            )}
          </div>
        </Card>
      </div>
    );
  }
};

/**
 * Playground
 */
export const Playground: Story = {
  args: {
    placeholder: 'Customize this search bar...',
    showClear: true,
    debounceDelay: 300,
    isLoading: false,
    disabled: false,
    autoFocus: false,
    size: 'md'
  }
};