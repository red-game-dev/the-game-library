/**
 * @fileoverview Storybook stories for SearchBar component
 * @module components/features/SearchBar/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { SearchBar } from './SearchBar';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { generateMockGames } from '@/lib/core/test';

const meta: Meta<typeof SearchBar> = {
  title: 'Features/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
SearchBar component for game search functionality with debouncing, loading states, and search type toggle.

## Features
- 🔍 Search with debouncing
- 🎮 Search type toggle (games/providers/tags/all)
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
    enableTypeDropdown: {
      control: 'boolean',
      description: 'Enable search type dropdown (games/providers/tags)'
    },
    defaultSearchType: {
      control: 'select',
      options: ['all', 'games', 'providers', 'tags'],
      description: 'Default search type when dropdown is enabled'
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
    
    const mockGames = generateMockGames(10).map(game => game.title);
    
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
 * With search type toggle
 */
export const WithTypeDropdown: Story = {
  render: () => {
    const [searchResults, setSearchResults] = useState<{
      query: string;
      type?: string;
      timestamp: number;
    } | null>(null);

    return (
      <div className="space-y-4">
        <SearchBar
          placeholder="Search games, providers, or tags..."
          enableTypeDropdown
          defaultSearchType="all"
          showClear
          onSearch={(query, type) => {
            setSearchResults({
              query,
              type: type || 'all',
              timestamp: Date.now()
            });
          }}
        />
        
        {searchResults && (
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Search Details:</h4>
            <div className="space-y-1">
              <p className="text-sm"><strong>Query:</strong> {searchResults.query || '(empty)'}</p>
              <p className="text-sm"><strong>Type:</strong> {searchResults.type}</p>
              <p className="text-sm"><strong>Time:</strong> {new Date(searchResults.timestamp).toLocaleTimeString()}</p>
            </div>
          </Card>
        )}
      </div>
    );
  }
};

/**
 * Search type examples
 */
export const SearchTypes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-2">All (Default)</h3>
        <SearchBar
          placeholder="Search everything..."
          enableTypeDropdown
          defaultSearchType="all"
          showClear
        />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">Games Only</h3>
        <SearchBar
          placeholder="Search games..."
          enableTypeDropdown
          defaultSearchType="games"
          showClear
        />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">Providers Only</h3>
        <SearchBar
          placeholder="Search providers..."
          enableTypeDropdown
          defaultSearchType="providers"
          showClear
        />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">Tags Only</h3>
        <SearchBar
          placeholder="Search tags..."
          enableTypeDropdown
          defaultSearchType="tags"
          showClear
        />
      </div>
    </div>
  )
};

/**
 * Mobile with type toggle
 */
export const MobileWithToggle: Story = {
  args: {
    placeholder: 'Search...',
    enableTypeDropdown: true,
    defaultSearchType: 'all',
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
 * Playground
 */
export const Playground: Story = {
  args: {
    placeholder: 'Customize this search bar...',
    enableTypeDropdown: false,
    defaultSearchType: 'all',
    showClear: true,
    debounceDelay: 300,
    isLoading: false,
    disabled: false,
    autoFocus: false,
    size: 'md'
  }
};

/**
 * Neon theme - Cyberpunk search
 */
export const NeonTheme: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState<'all' | 'games' | 'providers' | 'tags'>('all');
    
    return (
      <div data-theme="neon" className="p-8" style={{ background: 'rgb(3, 7, 18)' }}>
        <h3 className="text-lg font-semibold text-purple-400 mb-6">Neon Theme Search</h3>
        <div className="space-y-4">
          <SearchBar
            placeholder="Search the matrix..."
            enableTypeDropdown={true}
            defaultSearchType={searchType}
            onSearch={(query, type) => {
              setSearchQuery(query);
              setSearchType(type || 'all');
            }}
            size="lg"
          />
          
          {searchQuery && (
            <div className="text-cyan-300 text-sm">
              Searching {searchType}: <span className="text-purple-400">{searchQuery}</span>
            </div>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

/**
 * Gold theme - Premium search
 */
export const GoldTheme: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState<'all' | 'games' | 'providers' | 'tags'>('all');
    
    return (
      <div data-theme="gold" className="p-8" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <h3 className="text-lg font-semibold text-yellow-400 mb-6">Gold Theme Search</h3>
        <div className="space-y-4">
          <SearchBar
            placeholder="Search VIP games..."
            enableTypeDropdown={true}
            defaultSearchType={searchType}
            onSearch={(query, type) => {
              setSearchQuery(query);
              setSearchType(type || 'all');
            }}
            size="lg"
          />
          
          {searchQuery && (
            <div className="text-yellow-200 text-sm">
              Premium search for {searchType}: <span className="text-yellow-400">{searchQuery}</span>
            </div>
          )}
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
    return (
      <div className="space-y-6">
        <div data-theme="light" className="p-6 bg-white rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Light Theme</h3>
          <SearchBar placeholder="Search games..." size="md" />
        </div>
        
        <div data-theme="dark" className="p-6 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">Dark Theme</h3>
          <SearchBar placeholder="Search games..." size="md" />
        </div>
        
        <div data-theme="neon" className="p-6 rounded-lg" style={{ background: 'rgb(3, 7, 18)' }}>
          <h3 className="text-lg font-semibold text-purple-400 mb-3">Neon Theme</h3>
          <SearchBar 
            placeholder="Search the matrix..." 
            size="md"
            className="border border-purple-500 border-opacity-20"
          />
        </div>
        
        <div data-theme="gold" className="p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">Gold Theme</h3>
          <SearchBar 
            placeholder="Search VIP games..." 
            size="md"
            className="border border-yellow-500 border-opacity-20"
          />
        </div>
      </div>
    );
  }
};