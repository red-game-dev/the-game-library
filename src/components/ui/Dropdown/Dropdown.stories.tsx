/**
 * @fileoverview Storybook stories for the Dropdown component
 * @module components/ui/Dropdown/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Dropdown, type DropdownOption } from './Dropdown';
import { 
  Gamepad2, 
  Building2, 
  Tag, 
  Layers,
  Heart,
  Star,
  TrendingUp,
  Clock,
  Cpu,
  Zap,
  Eye,
  Volume2,
  Award,
  Trophy,
  Crown
} from 'lucide-react';

/**
 * Dropdown component for selecting from a list of options
 * 
 * Provides a customizable dropdown/select component with:
 * - Icon support
 * - Search functionality
 * - Multiple sizes and variants
 * - Keyboard navigation
 * - Clear button
 * - Custom rendering
 */
const meta = {
  title: 'UI/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible dropdown component with search, icons, and keyboard navigation support.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the dropdown'
    },
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'ghost'],
      description: 'Visual variant of the dropdown'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled'
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality'
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button when value is selected'
    },
    compact: {
      control: 'boolean',
      description: 'Compact mode for inline usage'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Take full width of container'
    }
  }
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default dropdown with basic options
 */
export const Default: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' }
    ],
    placeholder: 'Select an option',
    onChange: (value) => console.log('Selected:', value)
  }
};

/**
 * Dropdown with icons for each option
 */
export const WithIcons: Story = {
  args: {
    options: [
      { value: 'games', label: 'Games', icon: <Gamepad2 className="w-4 h-4" /> },
      { value: 'providers', label: 'Providers', icon: <Building2 className="w-4 h-4" /> },
      { value: 'tags', label: 'Tags', icon: <Tag className="w-4 h-4" /> },
      { value: 'all', label: 'All Categories', icon: <Layers className="w-4 h-4" /> }
    ],
    placeholder: 'Select category',
    value: 'games'
  }
};

/**
 * Searchable dropdown for large lists
 */
export const Searchable: Story = {
  args: {
    options: [
      { value: 'slots', label: 'Slot Games' },
      { value: 'table', label: 'Table Games' },
      { value: 'live', label: 'Live Casino' },
      { value: 'instant', label: 'Instant Win' },
      { value: 'poker', label: 'Video Poker' },
      { value: 'scratch', label: 'Scratch Cards' },
      { value: 'bingo', label: 'Bingo' },
      { value: 'keno', label: 'Keno' },
      { value: 'sports', label: 'Sports Betting' },
      { value: 'virtual', label: 'Virtual Sports' }
    ],
    searchable: true,
    placeholder: 'Search game types...'
  }
};

/**
 * Dropdown with disabled options
 */
export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'active', label: 'Active' },
      { value: 'pending', label: 'Pending', disabled: true },
      { value: 'completed', label: 'Completed' },
      { value: 'archived', label: 'Archived (Coming Soon)', disabled: true }
    ],
    placeholder: 'Select status'
  }
};

/**
 * Small size dropdown
 */
export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    placeholder: 'Small dropdown'
  }
};

/**
 * Large size dropdown
 */
export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    placeholder: 'Large dropdown'
  }
};

/**
 * Subtle variant
 */
export const SubtleVariant: Story = {
  args: {
    ...WithIcons.args,
    variant: 'subtle'
  }
};

/**
 * Ghost variant for minimal UI
 */
export const GhostVariant: Story = {
  args: {
    ...WithIcons.args,
    variant: 'ghost',
    compact: true
  }
};

/**
 * Clearable dropdown
 */
export const Clearable: Story = {
  args: {
    ...Default.args,
    clearable: true,
    value: 'option2'
  }
};

/**
 * Full width dropdown
 */
export const FullWidth: Story = {
  render: (args) => (
    <div style={{ width: '400px' }}>
      <Dropdown {...args} />
    </div>
  ),
  args: {
    ...Default.args,
    fullWidth: true,
    placeholder: 'Full width dropdown'
  }
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: 'option1'
  }
};

/**
 * Compact mode for inline usage
 */
export const CompactMode: Story = {
  args: {
    options: [
      { value: 'all', label: 'All', icon: <Layers className="w-3 h-3" /> },
      { value: 'games', label: 'Games', icon: <Gamepad2 className="w-3 h-3" /> },
      { value: 'providers', label: 'Providers', icon: <Building2 className="w-3 h-3" /> }
    ],
    compact: true,
    variant: 'ghost',
    value: 'all'
  }
};

/**
 * Interactive example with state management
 */
export const Interactive: Story = {
  args: {
    options: [] // Will be overridden in render
  },
  render: () => {
    const [value, setValue] = useState<string>('');
    const [searchType, setSearchType] = useState<string>('all');
    
    const gameOptions: DropdownOption[] = [
      { value: 'slots', label: 'Slot Games', icon: <Star className="w-4 h-4" /> },
      { value: 'table', label: 'Table Games', icon: <Layers className="w-4 h-4" /> },
      { value: 'live', label: 'Live Casino', icon: <Heart className="w-4 h-4" /> },
      { value: 'instant', label: 'Instant Win', icon: <TrendingUp className="w-4 h-4" /> }
    ];
    
    const filterOptions: DropdownOption[] = [
      { value: 'all', label: 'All', icon: <Layers className="w-3 h-3" /> },
      { value: 'popular', label: 'Popular', icon: <TrendingUp className="w-3 h-3" /> },
      { value: 'new', label: 'New', icon: <Clock className="w-3 h-3" /> },
      { value: 'favorites', label: 'Favorites', icon: <Heart className="w-3 h-3" /> }
    ];
    
    return (
      <div className="space-y-6 p-8 bg-surface rounded-lg min-w-96">
        <div>
          <h3 className="text-lg font-semibold mb-4">Game Selection</h3>
          <Dropdown
            options={gameOptions}
            value={value}
            onChange={setValue}
            placeholder="Choose a game type"
            clearable
            searchable
          />
          {value && (
            <p className="mt-2 text-sm text-secondary">
              Selected: <span className="font-medium text-primary">{value}</span>
            </p>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Filter Type</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm">Show:</span>
            <Dropdown
              options={filterOptions}
              value={searchType}
              onChange={setSearchType}
              compact
              variant="ghost"
              size="sm"
            />
          </div>
        </div>
      </div>
    );
  }
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    ...Default.args,
    placeholder: 'Loading options...',
    disabled: true
  }
};

/**
 * Empty state
 */
export const EmptyState: Story = {
  args: {
    options: [],
    placeholder: 'No options available'
  }
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  args: {
    ...WithIcons.args
  }
};

/**
 * Light mode
 */
export const LightMode: Story = {
  parameters: {
    backgrounds: { default: 'light' }
  },
  args: {
    ...WithIcons.args
  }
};

/**
 * Neon theme - Cyberpunk dropdowns
 */
export const NeonTheme: Story = {
  args: {
    options: []
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  render: () => (
    <div data-theme="neon" className="p-8" style={{ background: 'rgb(3, 7, 18)' }}>
      <h3 className="text-lg font-semibold text-purple-400 mb-6">Neon Theme Dropdowns</h3>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-purple-300 mb-2 block">Select Interface</label>
          <Dropdown
            placeholder="Choose your interface"
            options={[
              { value: 'neural', label: 'Neural Link', icon: <Cpu className="w-4 h-4" /> },
              { value: 'haptic', label: 'Haptic Feedback', icon: <Zap className="w-4 h-4" /> },
              { value: 'visual', label: 'Visual Cortex', icon: <Eye className="w-4 h-4" /> },
              { value: 'audio', label: 'Audio Stream', icon: <Volume2 className="w-4 h-4" /> }
            ]}
          />
        </div>
        <div>
          <label className="text-sm text-purple-300 mb-2 block">System Status</label>
          <Dropdown
            variant="subtle"
            options={[
              { value: 'online', label: 'Online' },
              { value: 'standby', label: 'Standby' },
              { value: 'offline', label: 'Offline' }
            ]}
            defaultValue="online"
          />
        </div>
      </div>
    </div>
  )
};

/**
 * Gold theme - Premium dropdowns
 */
export const GoldTheme: Story = {
  args: {
    options: []
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  render: () => (
    <div data-theme="gold" className="p-8" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
      <h3 className="text-lg font-semibold text-yellow-400 mb-6">Gold Theme Dropdowns</h3>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-yellow-300 mb-2 block">VIP Tier</label>
          <Dropdown
            placeholder="Select your tier"
            options={[
              { value: 'bronze', label: 'Bronze Member', icon: <Award className="w-4 h-4" /> },
              { value: 'silver', label: 'Silver Member', icon: <Star className="w-4 h-4" /> },
              { value: 'gold', label: 'Gold Member', icon: <Trophy className="w-4 h-4" /> },
              { value: 'platinum', label: 'Platinum Elite', icon: <Crown className="w-4 h-4" /> }
            ]}
          />
        </div>
        <div>
          <label className="text-sm text-yellow-300 mb-2 block">Rewards</label>
          <Dropdown
            variant="subtle"
            options={[
              { value: 'bonus', label: 'Daily Bonus' },
              { value: 'cashback', label: 'Cashback' },
              { value: 'freespins', label: 'Free Spins' }
            ]}
            defaultValue="bonus"
          />
        </div>
      </div>
    </div>
  )
};

/**
 * All themes comparison
 */
export const AllThemes: Story = {
  args: {
    options: []
  },
  render: () => (
    <div className="space-y-6">
      <div data-theme="light" className="p-6 bg-white rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Light Theme</h3>
        <Dropdown
          placeholder="Select option"
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' }
          ]}
        />
      </div>
      
      <div data-theme="dark" className="p-6 bg-gray-900 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Dark Theme</h3>
        <Dropdown
          placeholder="Select option"
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' }
          ]}
        />
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: 'rgb(3, 7, 18)' }}>
        <h3 className="text-lg font-semibold text-purple-400 mb-3">Neon Theme</h3>
        <Dropdown
          placeholder="Select option"
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' }
          ]}
        />
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <h3 className="text-lg font-semibold text-yellow-400 mb-3">Gold Theme</h3>
        <Dropdown
          placeholder="Select option"
          options={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' }
          ]}
        />
      </div>
    </div>
  )
};

/**
 * Mobile viewport
 */
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' }
  },
  args: {
    ...Default.args,
    fullWidth: true
  }
};

/**
 * RTL Support
 */
export const RTLSupport: Story = {
  render: (args) => (
    <div dir="rtl" style={{ width: '300px' }}>
      <Dropdown {...args} />
    </div>
  ),
  args: {
    options: [
      { value: 'ar', label: 'العربية' },
      { value: 'he', label: 'עברית' },
      { value: 'fa', label: 'فارسی' }
    ],
    placeholder: 'اختر اللغة',
    fullWidth: true
  }
};