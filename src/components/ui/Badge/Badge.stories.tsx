/**
 * @fileoverview Storybook stories for Badge component
 * @module components/ui/Badge/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
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
Badge component for labels, status indicators, and tags with comprehensive variant system.

## Features
- 🎨 **25+ Variants** including standard, solid, and outline styles
- 📏 **5 Size Options** (xs, sm, md, lg, xl) with progressive scaling
- 🔄 **Configurable Rounded Corners** (sm, md, lg, full)
- 🎯 **Solid Variants** - High contrast backgrounds ideal for game cards
- 🔳 **Outline Variants** - Subtle transparent backgrounds with colored borders
- ✨ **Special Badges** - NEW, HOT, SALE with pulse animations
- 🔵 **Dot Indicators** for status badges
- 🎯 **Icon Support** with configurable gaps
- 🌙 **Full Theme Support** - Light, Dark, Neon, Gold themes
- ♿ **WCAG AAA Compliant** contrast ratios

## Variant Types
- **Standard**: Semi-transparent backgrounds (default usage)
- **Solid**: Fully opaque backgrounds (game cards, high visibility)
- **Outline**: Transparent backgrounds with colored borders (tags, subtle styling)
- **Special**: NEW, HOT, SALE with gradient effects and animations
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default', 'primary', 'secondary', 'success', 'error', 'warning', 'info', 'new', 'hot', 'sale', 
        'outline', 'outline-default', 'outline-primary', 'outline-secondary', 'outline-success', 'outline-error', 'outline-warning', 'outline-info',
        'solid-default', 'solid-primary', 'solid-secondary', 'solid-success', 'solid-error', 'solid-warning', 'solid-info'
      ]
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    rounded: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full']
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg'],
      description: 'Gap between icon and text'
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
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Standard Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Special Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="new" pulse>NEW</Badge>
          <Badge variant="hot">HOT</Badge>
          <Badge variant="sale">SALE</Badge>
          <Badge variant="pro">PRO</Badge>
          <Badge variant="beta">BETA</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Solid Variants (High Contrast)</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="solid-default">Solid Default</Badge>
          <Badge variant="solid-primary">Solid Primary</Badge>
          <Badge variant="solid-secondary">Solid Secondary</Badge>
          <Badge variant="solid-accent">Solid Accent</Badge>
          <Badge variant="solid-success">Solid Success</Badge>
          <Badge variant="solid-error">Solid Error</Badge>
          <Badge variant="solid-warning">Solid Warning</Badge>
          <Badge variant="solid-info">Solid Info</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Outline Variants (Subtle)</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline-default">Outline Default</Badge>
          <Badge variant="outline-primary">Outline Primary</Badge>
          <Badge variant="outline-secondary">Outline Secondary</Badge>
          <Badge variant="outline-accent">Outline Accent</Badge>
          <Badge variant="outline-success">Outline Success</Badge>
          <Badge variant="outline-error">Outline Error</Badge>
          <Badge variant="outline-warning">Outline Warning</Badge>
          <Badge variant="outline-info">Outline Info</Badge>
        </div>
      </div>
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
      <Badge variant="hot" icon={<Flame className="w-3 h-3" />} gap="sm">
        Hot Deal
      </Badge>
      <Badge variant="new" icon={<Star className="w-3 h-3" />} gap="sm">
        New Release
      </Badge>
      <Badge variant="info" icon={<TrendingUp className="w-3 h-3" />} gap="sm">
        Trending
      </Badge>
      <Badge variant="warning" icon={<Zap className="w-3 h-3" />} gap="sm">
        Limited
      </Badge>
    </div>
  )
};

/**
 * Icon gap variations
 */
export const IconGapVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-secondary w-20">Gap: none</span>
        <Badge variant="primary" icon={<Star className="w-3 h-3" />} gap="none">
          No Gap
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-secondary w-20">Gap: xs</span>
        <Badge variant="primary" icon={<Star className="w-3 h-3" />} gap="xs">
          Extra Small
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-secondary w-20">Gap: sm</span>
        <Badge variant="primary" icon={<Star className="w-3 h-3" />} gap="sm">
          Small (Default)
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-secondary w-20">Gap: md</span>
        <Badge variant="primary" icon={<Star className="w-3 h-3" />} gap="md">
          Medium Gap
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-secondary w-20">Gap: lg</span>
        <Badge variant="primary" icon={<Star className="w-3 h-3" />} gap="lg">
          Large Gap
        </Badge>
      </div>
      <div className="mt-6 p-4 bg-surface-elevated rounded-lg">
        <p className="text-sm text-secondary mb-3">Different sizes with icons:</p>
        <div className="flex flex-wrap gap-2">
          <Badge size="xs" variant="success" icon={<Heart className="w-2 h-2" />} gap="xs">XS</Badge>
          <Badge size="sm" variant="success" icon={<Heart className="w-2.5 h-2.5" />} gap="sm">SM</Badge>
          <Badge size="md" variant="success" icon={<Heart className="w-3 h-3" />} gap="sm">MD</Badge>
          <Badge size="lg" variant="success" icon={<Heart className="w-4 h-4" />} gap="md">LG</Badge>
          <Badge size="xl" variant="success" icon={<Heart className="w-5 h-5" />} gap="lg">XL</Badge>
        </div>
      </div>
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
 * Game tags example - showing both outline variants
 */
export const GameTags: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Default Outline Tags</h3>
        <BadgeGroup gap="sm">
          <Badge variant="outline-default" size="sm" rounded="md">JavaScript</Badge>
          <Badge variant="outline-default" size="sm" rounded="md">React</Badge>
          <Badge variant="outline-default" size="sm" rounded="md">TypeScript</Badge>
          <Badge variant="outline-default" size="sm" rounded="md">Next.js</Badge>
          <Badge variant="outline-default" size="sm" rounded="md">+4</Badge>
        </BadgeGroup>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Colored Outline Tags</h3>
        <BadgeGroup gap="sm">
          <Badge variant="outline-primary" size="sm" rounded="md">Primary</Badge>
          <Badge variant="outline-success" size="sm" rounded="md">Success</Badge>
          <Badge variant="outline-warning" size="sm" rounded="md">Warning</Badge>
          <Badge variant="outline-error" size="sm" rounded="md">Error</Badge>
          <Badge variant="outline-info" size="sm" rounded="md">Info</Badge>
        </BadgeGroup>
      </div>
    </div>
  )
};

/**
 * Game Card Badges - Solid variants for high visibility
 */
export const GameCardBadges: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Game Type Badges (Solid for visibility)</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="solid-warning" size="sm">SLOTS</Badge>
          <Badge variant="solid-success" size="sm">TABLE</Badge>
          <Badge variant="solid-error" size="sm">LIVE</Badge>
          <Badge variant="solid-info" size="sm">INSTANT</Badge>
          <Badge variant="solid-primary" size="sm">JACKPOT</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Game Tags (Outline for subtlety)</h3>
        <BadgeGroup gap="sm">
          <Badge variant="outline-default" size="sm" rounded="md">Action</Badge>
          <Badge variant="outline-default" size="sm" rounded="md">Adventure</Badge>
          <Badge variant="outline-default" size="sm" rounded="md">Multiplayer</Badge>
          <Badge variant="outline-default" size="sm" rounded="md">Strategy</Badge>
          <Badge variant="outline-default" size="sm" rounded="md">+3</Badge>
        </BadgeGroup>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Status Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="new" pulse>NEW</Badge>
          <Badge variant="hot">HOT</Badge>
          <Badge variant="sale">SALE</Badge>
          <Badge variant="solid-success" size="sm">FEATURED</Badge>
        </div>
      </div>
    </div>
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
      <Badge variant="pro" rounded="full">
        PRO
      </Badge>
      <Badge variant="beta" rounded="full">
        BETA
      </Badge>
    </div>
  )
};

/**
 * Pro Badge - Premium member indicator
 */
export const ProBadge: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Badge variant="pro" size="xs">PRO</Badge>
        <Badge variant="pro" size="sm">PRO</Badge>
        <Badge variant="pro" size="md">PRO</Badge>
        <Badge variant="pro" size="lg">PRO</Badge>
        <Badge variant="pro" size="xl">PRO</Badge>
      </div>
      <div className="flex gap-3">
        <Badge variant="pro" rounded="sm">PRO Member</Badge>
        <Badge variant="pro" rounded="md">PRO Account</Badge>
        <Badge variant="pro" rounded="lg">VIP PRO</Badge>
        <Badge variant="pro" rounded="full">Premium PRO</Badge>
      </div>
    </div>
  )
};

/**
 * Beta Badge - Beta feature indicator
 */
export const BetaBadge: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Badge variant="beta" size="xs">BETA</Badge>
        <Badge variant="beta" size="sm">BETA</Badge>
        <Badge variant="beta" size="md">BETA</Badge>
        <Badge variant="beta" size="lg">BETA</Badge>
        <Badge variant="beta" size="xl">BETA</Badge>
      </div>
      <div className="flex gap-3">
        <Badge variant="beta" rounded="sm">Beta Feature</Badge>
        <Badge variant="beta" rounded="md">Beta Access</Badge>
        <Badge variant="beta" rounded="lg">Beta Tester</Badge>
        <Badge variant="beta" rounded="full">Early Beta</Badge>
      </div>
    </div>
  )
};

/**
 * Accent Badge - Accent color for emphasis
 */
export const AccentBadge: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Badge variant="accent" size="sm">Standard Accent</Badge>
        <Badge variant="solid-accent" size="sm">Solid Accent</Badge>
        <Badge variant="outline-accent" size="sm">Outline Accent</Badge>
      </div>
      <div className="flex gap-3">
        <Badge variant="accent" dot>With Dot</Badge>
        <Badge variant="accent" icon={<Zap className="w-3 h-3" />} gap="sm">With Icon</Badge>
        <Badge variant="accent" pulse>With Pulse</Badge>
      </div>
    </div>
  )
};

/**
 * Variant Comparison - Standard vs Solid vs Outline
 */
export const VariantComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Primary Variants Comparison</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-sm w-24">Standard:</span>
            <Badge variant="primary">Primary</Badge>
            <span className="text-xs text-secondary">Semi-transparent background</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm w-24">Solid:</span>
            <Badge variant="solid-primary">Primary</Badge>
            <span className="text-xs text-secondary">Fully opaque background - best for game cards</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm w-24">Outline:</span>
            <Badge variant="outline-primary">Primary</Badge>
            <span className="text-xs text-secondary">Transparent background, colored border</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Success Variants Comparison</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-sm w-24">Standard:</span>
            <Badge variant="success">Success</Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm w-24">Solid:</span>
            <Badge variant="solid-success">Success</Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm w-24">Outline:</span>
            <Badge variant="outline-success">Success</Badge>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Error Variants Comparison</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-sm w-24">Standard:</span>
            <Badge variant="error">Error</Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm w-24">Solid:</span>
            <Badge variant="solid-error">Error</Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm w-24">Outline:</span>
            <Badge variant="outline-error">Error</Badge>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-surface-elevated rounded-lg">
        <h4 className="font-semibold mb-2">Usage Guidelines:</h4>
        <ul className="text-sm text-secondary space-y-1">
          <li>• <strong>Standard:</strong> Default usage, good contrast for most use cases</li>
          <li>• <strong>Solid:</strong> High visibility needed (game cards, important status)</li>
          <li>• <strong>Outline:</strong> Subtle styling (tags, secondary information)</li>
        </ul>
      </div>
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
    () => (
      <div data-theme="dark" className="p-8 bg-gray-900">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="solid-primary">Solid Primary</Badge>
            <Badge variant="solid-success">Solid Success</Badge>
            <Badge variant="solid-error">Solid Error</Badge>
            <Badge variant="solid-warning">Solid Warning</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline-primary">Outline Primary</Badge>
            <Badge variant="outline-success">Outline Success</Badge>
            <Badge variant="outline-error">Outline Error</Badge>
            <Badge variant="outline-info">Outline Info</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="new" pulse>NEW</Badge>
            <Badge variant="hot">HOT</Badge>
            <Badge variant="sale">SALE</Badge>
          </div>
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
    () => (
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
 * Neon theme - Cyberpunk aesthetic
 */
export const NeonTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    () => (
      <div data-theme="neon" className="p-8" style={{ background: 'rgb(3, 7, 18)' }}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">Neon Theme Badges</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="new" pulse icon={<Star className="w-3 h-3" />} gap="sm">NEW</Badge>
            <Badge variant="hot" icon={<Flame className="w-3 h-3" />} gap="sm">HOT</Badge>
            <Badge variant="sale" icon={<Zap className="w-3 h-3" />} gap="sm">SALE</Badge>
          </div>
        </div>
      </div>
    )
  ]
};

/**
 * Gold theme - Luxurious feel
 */
export const GoldTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    () => (
      <div data-theme="gold" className="p-8" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">Gold Theme Badges</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="new" pulse icon={<Star className="w-3 h-3" />} gap="sm">NEW</Badge>
            <Badge variant="hot" icon={<Flame className="w-3 h-3" />} gap="sm">HOT</Badge>
            <Badge variant="sale" icon={<Zap className="w-3 h-3" />} gap="sm">SALE</Badge>
          </div>
        </div>
      </div>
    )
  ]
};

/**
 * All themes comparison
 */
export const AllThemes: Story = {
  decorators: [
    () => (
      <div className="space-y-6">
        <div data-theme="light" className="p-6 bg-white rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Light Theme</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">Standard</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Solid (High Contrast)</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="solid-primary">Solid Primary</Badge>
                <Badge variant="solid-secondary">Solid Secondary</Badge>
                <Badge variant="solid-accent">Solid Accent</Badge>
                <Badge variant="solid-success">Solid Success</Badge>
                <Badge variant="solid-error">Solid Error</Badge>
                <Badge variant="solid-warning">Solid Warning</Badge>
                <Badge variant="solid-info">Solid Info</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Outline (Subtle)</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline-primary">Outline Primary</Badge>
                <Badge variant="outline-secondary">Outline Secondary</Badge>
                <Badge variant="outline-accent">Outline Accent</Badge>
                <Badge variant="outline-success">Outline Success</Badge>
                <Badge variant="outline-error">Outline Error</Badge>
                <Badge variant="outline-warning">Outline Warning</Badge>
                <Badge variant="outline-info">Outline Info</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Special</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="new" pulse>NEW</Badge>
                <Badge variant="hot">HOT</Badge>
                <Badge variant="sale">SALE</Badge>
                <Badge variant="pro">PRO</Badge>
                <Badge variant="beta">BETA</Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div data-theme="dark" className="p-6 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">Dark Theme</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-2">Standard</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300 mb-2">Solid (High Contrast)</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="solid-primary">Solid Primary</Badge>
                <Badge variant="solid-secondary">Solid Secondary</Badge>
                <Badge variant="solid-accent">Solid Accent</Badge>
                <Badge variant="solid-success">Solid Success</Badge>
                <Badge variant="solid-error">Solid Error</Badge>
                <Badge variant="solid-warning">Solid Warning</Badge>
                <Badge variant="solid-info">Solid Info</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300 mb-2">Outline (Subtle)</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline-primary">Outline Primary</Badge>
                <Badge variant="outline-secondary">Outline Secondary</Badge>
                <Badge variant="outline-accent">Outline Accent</Badge>
                <Badge variant="outline-success">Outline Success</Badge>
                <Badge variant="outline-error">Outline Error</Badge>
                <Badge variant="outline-warning">Outline Warning</Badge>
                <Badge variant="outline-info">Outline Info</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300 mb-2">Special</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="new" pulse>NEW</Badge>
                <Badge variant="hot">HOT</Badge>
                <Badge variant="sale">SALE</Badge>
                <Badge variant="pro">PRO</Badge>
                <Badge variant="beta">BETA</Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div data-theme="neon" className="p-6 rounded-lg" style={{ background: 'rgb(3, 7, 18)' }}>
          <h3 className="text-lg font-semibold text-purple-400 mb-3">Neon Theme</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-cyan-400 mb-2">Standard</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-cyan-400 mb-2">Solid (High Contrast)</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="solid-primary">Solid Primary</Badge>
                <Badge variant="solid-secondary">Solid Secondary</Badge>
                <Badge variant="solid-accent">Solid Accent</Badge>
                <Badge variant="solid-success">Solid Success</Badge>
                <Badge variant="solid-error">Solid Error</Badge>
                <Badge variant="solid-warning">Solid Warning</Badge>
                <Badge variant="solid-info">Solid Info</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-cyan-400 mb-2">Outline (Subtle)</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline-primary">Outline Primary</Badge>
                <Badge variant="outline-secondary">Outline Secondary</Badge>
                <Badge variant="outline-accent">Outline Accent</Badge>
                <Badge variant="outline-success">Outline Success</Badge>
                <Badge variant="outline-error">Outline Error</Badge>
                <Badge variant="outline-warning">Outline Warning</Badge>
                <Badge variant="outline-info">Outline Info</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-cyan-400 mb-2">Special</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="new" pulse>NEW</Badge>
                <Badge variant="hot">HOT</Badge>
                <Badge variant="sale">SALE</Badge>
                <Badge variant="pro">PRO</Badge>
                <Badge variant="beta">BETA</Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div data-theme="gold" className="p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">Gold Theme</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-yellow-300 mb-2">Standard</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-300 mb-2">Solid (High Contrast)</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="solid-primary">Solid Primary</Badge>
                <Badge variant="solid-secondary">Solid Secondary</Badge>
                <Badge variant="solid-accent">Solid Accent</Badge>
                <Badge variant="solid-success">Solid Success</Badge>
                <Badge variant="solid-error">Solid Error</Badge>
                <Badge variant="solid-warning">Solid Warning</Badge>
                <Badge variant="solid-info">Solid Info</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-300 mb-2">Outline (Subtle)</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline-primary">Outline Primary</Badge>
                <Badge variant="outline-secondary">Outline Secondary</Badge>
                <Badge variant="outline-accent">Outline Accent</Badge>
                <Badge variant="outline-success">Outline Success</Badge>
                <Badge variant="outline-error">Outline Error</Badge>
                <Badge variant="outline-warning">Outline Warning</Badge>
                <Badge variant="outline-info">Outline Info</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-300 mb-2">Special</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="new" pulse>NEW</Badge>
                <Badge variant="hot">HOT</Badge>
                <Badge variant="sale">SALE</Badge>
                <Badge variant="pro">PRO</Badge>
                <Badge variant="beta">BETA</Badge>
              </div>
            </div>
          </div>
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
              <Badge size={size} variant="accent">Accent</Badge>
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
        <h3 className="text-lg font-semibold text-text mb-6">Special Variants Across Sizes</h3>
        <div className="space-y-4">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
            <div key={size} className="flex gap-3 items-center mb-2">
              <span className="text-sm w-8">{size.toUpperCase()}:</span>
              <Badge size={size} variant="new">NEW</Badge>
              <Badge size={size} variant="hot">HOT</Badge>
              <Badge size={size} variant="sale">SALE</Badge>
              <Badge size={size} variant="pro">PRO</Badge>
              <Badge size={size} variant="beta">BETA</Badge>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-text mb-6">Special Effects</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <Badge variant="new" pulse size="xs">NEW Pulse</Badge>
            <Badge variant="hot" pulse size="sm">HOT Pulse</Badge>
            <Badge variant="sale" pulse size="md">SALE Pulse</Badge>
            <Badge variant="pro" pulse size="lg">PRO Pulse</Badge>
            <Badge variant="beta" pulse size="xl">BETA Pulse</Badge>
          </div>
          <div className="flex gap-3">
            <Badge variant="success" dot size="xs">Success Dot</Badge>
            <Badge variant="warning" dot size="sm">Warning Dot</Badge>
            <Badge variant="error" dot size="md">Error Dot</Badge>
            <Badge variant="info" dot size="lg">Info Dot</Badge>
            <Badge variant="accent" dot size="xl">Accent Dot</Badge>
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