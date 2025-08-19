/**
 * @fileoverview Storybook stories for Badge component
 * @module components/ui/Badge/stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BadgeGroup } from './Badge';
import { Flame, Star, TrendingUp, Zap, Heart, ShoppingCart } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Badge component for labels, status indicators, and tags with improved styling.

## Features
- 🎨 Multiple variants including gradients for special badges
- 📏 5 size options (xs, sm, md, lg, xl)
- 🔄 Configurable rounded corners (sm, md, lg, full)
- ✨ Pulse animation for attention
- 🔵 Dot indicators
- 🎯 Icon support
- 🌙 Dark mode support
- ♿ WCAG AAA compliant contrast
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'error', 'warning', 'info', 'new', 'hot', 'sale', 'outline']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    rounded: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full']
    },
    pulse: {
      control: 'boolean'
    },
    dot: {
      control: 'boolean'
    },
    children: {
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default badge
 */
export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md'
  }
};

/**
 * All variants showcase
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="new" pulse>NEW</Badge>
      <Badge variant="hot">HOT</Badge>
      <Badge variant="sale">SALE</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
};

/**
 * Size comparison - Progressive scaling
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge size="xs" variant="primary">XS</Badge>
        <Badge size="sm" variant="primary">SM</Badge>
        <Badge size="md" variant="primary">MD</Badge>
        <Badge size="lg" variant="primary">LG</Badge>
        <Badge size="xl" variant="primary">XL</Badge>
      </div>
      <div className="text-sm text-secondary space-y-1">
        <p>• XS: 10px font, minimal padding</p>
        <p>• SM: 12px font, small padding</p>
        <p>• MD: 14px font, medium padding</p>
        <p>• LG: 16px font, large padding</p>
        <p>• XL: 18px font, extra large padding</p>
      </div>
    </div>
  )
};

/**
 * Rounded corner variations
 */
export const RoundedCorners: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge rounded="sm" variant="success">Small</Badge>
      <Badge rounded="md" variant="success">Medium</Badge>
      <Badge rounded="lg" variant="success">Large</Badge>
      <Badge rounded="full" variant="success">Full</Badge>
    </div>
  )
};

/**
 * With icons
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="hot" icon={<Flame className="w-3 h-3" />}>
        Hot Deal
      </Badge>
      <Badge variant="new" icon={<Star className="w-3 h-3" />}>
        New Release
      </Badge>
      <Badge variant="info" icon={<TrendingUp className="w-3 h-3" />}>
        Trending
      </Badge>
      <Badge variant="warning" icon={<Zap className="w-3 h-3" />}>
        Limited
      </Badge>
    </div>
  )
};

/**
 * With dot indicators
 */
export const WithDots: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="success" dot>
        Online
      </Badge>
      <Badge variant="error" dot>
        Offline
      </Badge>
      <Badge variant="warning" dot>
        Away
      </Badge>
      <Badge variant="info" dot>
        Busy
      </Badge>
    </div>
  )
};

/**
 * Game tags example
 */
export const GameTags: Story = {
  render: () => (
    <BadgeGroup gap="sm">
      <Badge variant="outline" size="sm" rounded="md">JavaScript</Badge>
      <Badge variant="outline" size="sm" rounded="md">React</Badge>
      <Badge variant="outline" size="sm" rounded="md">TypeScript</Badge>
      <Badge variant="outline" size="sm" rounded="md">Next.js</Badge>
      <Badge variant="outline" size="sm" rounded="md">+4</Badge>
    </BadgeGroup>
  )
};

/**
 * Special badges with animation
 */
export const SpecialBadges: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="new" pulse rounded="full">
        NEW
      </Badge>
      <Badge variant="hot" pulse rounded="full">
        HOT
      </Badge>
      <Badge variant="sale" pulse rounded="full">
        SALE
      </Badge>
    </div>
  )
};

/**
 * Badge groups with all gap variations
 */
export const Groups: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-text mb-4">Gap: xs (0.125rem)</h3>
        <BadgeGroup gap="xs">
          <Badge variant="primary" size="xs">React</Badge>
          <Badge variant="primary" size="xs">Vue</Badge>
          <Badge variant="primary" size="xs">Angular</Badge>
          <Badge variant="primary" size="xs">Svelte</Badge>
        </BadgeGroup>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-text mb-4">Gap: sm (0.25rem)</h3>
        <BadgeGroup gap="sm">
          <Badge variant="success" size="sm">Active</Badge>
          <Badge variant="warning" size="sm">Pending</Badge>
          <Badge variant="error" size="sm">Inactive</Badge>
          <Badge variant="info" size="sm">Unknown</Badge>
        </BadgeGroup>
      </div>
      <div>
        <p className="text-sm text-secondary mb-2">Gap: md (0.5rem)</p>
        <BadgeGroup gap="md">
          <Badge variant="info">Info 1</Badge>
          <Badge variant="info">Info 2</Badge>
          <Badge variant="info">Info 3</Badge>
          <Badge variant="info">Info 4</Badge>
        </BadgeGroup>
      </div>
      <div>
        <p className="text-sm text-secondary mb-2">Gap: lg (0.75rem)</p>
        <BadgeGroup gap="lg">
          <Badge variant="secondary" size="lg">Large 1</Badge>
          <Badge variant="secondary" size="lg">Large 2</Badge>
          <Badge variant="secondary" size="lg">Large 3</Badge>
          <Badge variant="secondary" size="lg">Large 4</Badge>
        </BadgeGroup>
      </div>
    </div>
  )
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  args: {
    children: 'Dark Mode Badge',
    variant: 'default'
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" className="p-8 bg-gray-900">
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="new" pulse>NEW</Badge>
          <Badge variant="hot">HOT</Badge>
        </div>
      </div>
    )
  ]
};

/**
 * Light mode
 */
export const LightMode: Story = {
  args: {
    children: 'Light Mode Badge',
    variant: 'default'
  },
  parameters: {
    backgrounds: { default: 'light' }
  },
  decorators: [
    (Story) => (
      <div data-theme="light" className="p-8 bg-white">
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="new" pulse>NEW</Badge>
          <Badge variant="hot">HOT</Badge>
        </div>
      </div>
    )
  ]
};

/**
 * Mobile viewport
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => (
    <div className="flex flex-wrap gap-1 p-4">
      <Badge size="xs" variant="primary">Mobile</Badge>
      <Badge size="xs" variant="success">Optimized</Badge>
      <Badge size="xs" variant="info">Touch</Badge>
    </div>
  )
};

/**
 * Tablet viewport
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  },
  render: () => (
    <div className="flex gap-2 p-4">
      <Badge size="sm" variant="primary">Tablet</Badge>
      <Badge size="sm" variant="success">View</Badge>
      <Badge size="sm" variant="info">Responsive</Badge>
    </div>
  )
};

/**
 * Use cases
 */
export const UseCases: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold text-text mb-6">E-commerce</h3>
        <div className="flex gap-2">
          <Badge variant="sale" icon={<ShoppingCart className="w-3 h-3" />}>
            50% OFF
          </Badge>
          <Badge variant="hot" pulse>
            Best Seller
          </Badge>
          <Badge variant="new">
            New Arrival
          </Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-text mb-4">Gaming</h3>
        <div className="flex gap-2">
          <Badge variant="error">PvP</Badge>
          <Badge variant="success">Co-op</Badge>
          <Badge variant="warning">Ranked</Badge>
          <Badge variant="info">Casual</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-text mb-4">Status Indicators</h3>
        <div className="flex gap-2">
          <Badge variant="success" dot size="sm">Available</Badge>
          <Badge variant="warning" dot size="sm">In Meeting</Badge>
          <Badge variant="error" dot size="sm">Do Not Disturb</Badge>
        </div>
      </div>
    </div>
  )
};

/**
 * All props combinations showcase
 */
export const AllPropsCombinations: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold text-text mb-6">All Sizes with Different Variants</h3>
        <div className="space-y-4">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
            <div key={size} className="flex gap-3 items-center mb-2">
              <span className="text-sm w-8">{size.toUpperCase()}:</span>
              <Badge size={size} variant="default">Default</Badge>
              <Badge size={size} variant="primary">Primary</Badge>
              <Badge size={size} variant="secondary">Secondary</Badge>
              <Badge size={size} variant="success">Success</Badge>
              <Badge size={size} variant="error">Error</Badge>
              <Badge size={size} variant="warning">Warning</Badge>
              <Badge size={size} variant="info">Info</Badge>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-text mb-6">Rounded Variations per Size</h3>
        <div className="space-y-4">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
            <div key={size} className="flex gap-3 items-center mb-2">
              <span className="text-sm w-8">{size.toUpperCase()}:</span>
              <Badge size={size} rounded="sm" variant="primary">Round SM</Badge>
              <Badge size={size} rounded="md" variant="primary">Round MD</Badge>
              <Badge size={size} rounded="lg" variant="primary">Round LG</Badge>
              <Badge size={size} rounded="full" variant="primary">Round Full</Badge>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-text mb-6">Special Effects</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <Badge variant="new" pulse size="xs">XS Pulse</Badge>
            <Badge variant="hot" pulse size="sm">SM Pulse</Badge>
            <Badge variant="sale" pulse size="md">MD Pulse</Badge>
            <Badge variant="new" pulse size="lg">LG Pulse</Badge>
            <Badge variant="hot" pulse size="xl">XL Pulse</Badge>
          </div>
          <div className="flex gap-3">
            <Badge variant="success" dot size="xs">XS Dot</Badge>
            <Badge variant="warning" dot size="sm">SM Dot</Badge>
            <Badge variant="error" dot size="md">MD Dot</Badge>
            <Badge variant="info" dot size="lg">LG Dot</Badge>
            <Badge variant="primary" dot size="xl">XL Dot</Badge>
          </div>
        </div>
      </div>
    </div>
  )
};

/**
 * Interactive playground
 */
export const Playground: Story = {
  args: {
    children: 'Playground Badge',
    variant: 'primary',
    size: 'md',
    rounded: 'md',
    pulse: false,
    dot: false
  }
};