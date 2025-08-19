/**
 * @fileoverview Storybook stories for Button component
 * @module components/ui/Button/stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonGroup } from './Button';
import { 
  Play, 
  Heart, 
  ShoppingCart, 
  Download, 
  Settings, 
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Edit,
  Share2,
  Copy,
  ExternalLink,
  Check,
  X
} from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Button component with multiple variants, sizes, and states.

## Features
- 🎨 9 variants including gradient effects
- 📏 5 size options (xs, sm, md, lg, xl)
- 🔄 Loading states with spinner
- 🎯 Icon support (left/right)
- 📱 Full width option
- ⚡ Hover and active animations
- 🌙 Dark mode support
- ♿ Keyboard accessible
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'success', 'error', 'warning', 'ghost', 'outline', 'link']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    loading: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    },
    fullWidth: {
      control: 'boolean'
    },
    iconOnly: {
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
 * Default button
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md'
  }
};

/**
 * All variants showcase
 */
export const Variants: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold text-text mb-6">Standard Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="success">Success</Button>
          <Button variant="error">Error</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-text mb-6">Outline Color Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" outlineColor="purple">Purple</Button>
          <Button variant="outline" outlineColor="blue">Blue</Button>
          <Button variant="outline" outlineColor="green">Green</Button>
          <Button variant="outline" outlineColor="red">Red</Button>
          <Button variant="outline" outlineColor="orange">Orange</Button>
          <Button variant="outline" outlineColor="cyan">Cyan</Button>
          <Button variant="outline" outlineColor="pink">Pink</Button>
          <Button variant="outline" outlineColor="gray">Gray</Button>
        </div>
      </div>
    </div>
  )
};

/**
 * Size comparison
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="xs" variant="primary">Extra Small</Button>
      <Button size="sm" variant="primary">Small</Button>
      <Button size="md" variant="primary">Medium</Button>
      <Button size="lg" variant="primary">Large</Button>
      <Button size="xl" variant="primary">Extra Large</Button>
    </div>
  )
};

/**
 * With icons
 */
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-text mb-6">Icons with Text</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <Button leftIcon={<Play className="w-4 h-4" />} variant="primary">
              Play Game
            </Button>
            <Button rightIcon={<ChevronRight className="w-4 h-4" />} variant="secondary">
              Next
            </Button>
            <Button leftIcon={<ChevronLeft className="w-4 h-4" />} rightIcon={<ChevronRight className="w-4 h-4" />} variant="accent">
              Browse
            </Button>
          </div>
          <div className="flex gap-3">
            <Button leftIcon={<Download className="w-4 h-4" />} variant="success">
              Download
            </Button>
            <Button leftIcon={<ShoppingCart className="w-4 h-4" />} variant="warning">
              Add to Cart
            </Button>
            <Button leftIcon={<Heart className="w-4 h-4" />} variant="error">
              Favorite
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
};

/**
 * Icon only buttons
 */
export const IconOnly: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button iconOnly size="xs" variant="primary">
        <Settings className="w-3 h-3" />
      </Button>
      <Button iconOnly size="sm" variant="secondary">
        <Heart className="w-4 h-4" />
      </Button>
      <Button iconOnly size="md" variant="accent">
        <Plus className="w-5 h-5" />
      </Button>
      <Button iconOnly size="lg" variant="error">
        <Trash2 className="w-6 h-6" />
      </Button>
      <Button iconOnly size="xl" variant="success">
        <Check className="w-7 h-7" />
      </Button>
    </div>
  )
};

/**
 * Loading states
 */
export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-text mb-6">Loading Sizes</h3>
        <div className="flex gap-3">
          <Button loading size="xs">Loading XS</Button>
          <Button loading size="sm">Loading SM</Button>
          <Button loading size="md">Loading MD</Button>
          <Button loading size="lg">Loading LG</Button>
          <Button loading size="xl">Loading XL</Button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-text mb-6">Loading Icon Only</h3>
        <div className="flex gap-3">
          <Button loading iconOnly size="md" variant="primary" />
          <Button loading iconOnly size="md" variant="secondary" />
          <Button loading iconOnly size="md" variant="accent" />
        </div>
      </div>
    </div>
  )
};

/**
 * Disabled states
 */
export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button disabled variant="primary">Primary</Button>
      <Button disabled variant="secondary">Secondary</Button>
      <Button disabled variant="accent">Accent</Button>
      <Button disabled variant="success">Success</Button>
      <Button disabled variant="error">Error</Button>
      <Button disabled variant="warning">Warning</Button>
      <Button disabled variant="ghost">Ghost</Button>
      <Button disabled variant="outline">Outline</Button>
      <Button disabled variant="link">Link</Button>
    </div>
  )
};

/**
 * Full width buttons
 */
export const FullWidth: Story = {
  render: () => (
    <div className="w-96 space-y-3">
      <Button fullWidth variant="primary" leftIcon={<Play className="w-4 h-4" />}>
        Play Now
      </Button>
      <Button fullWidth variant="secondary" leftIcon={<Download className="w-4 h-4" />}>
        Download Game
      </Button>
      <Button fullWidth variant="accent" leftIcon={<ShoppingCart className="w-4 h-4" />}>
        Purchase
      </Button>
    </div>
  )
};

/**
 * Button groups
 */
export const Groups: Story = {
  render: () => (
    <div className="space-y-16">
      <div>
        <h3 className="text-lg font-semibold text-text mb-6">Horizontal Group (spacing: sm)</h3>
        <ButtonGroup spacing="sm">
          <Button variant="outline" size="sm">Left</Button>
          <Button variant="outline" size="sm">Center</Button>
          <Button variant="outline" size="sm">Right</Button>
        </ButtonGroup>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-text mb-6">Vertical Group (spacing: md)</h3>
        <ButtonGroup direction="vertical" spacing="md">
          <Button variant="primary" fullWidth>Option 1</Button>
          <Button variant="primary" fullWidth>Option 2</Button>
          <Button variant="primary" fullWidth>Option 3</Button>
        </ButtonGroup>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-text mb-6">Icon Group</h3>
        <ButtonGroup spacing="xs">
          <Button iconOnly size="sm" variant="ghost">
            <Edit className="w-4 h-4" />
          </Button>
          <Button iconOnly size="sm" variant="ghost">
            <Copy className="w-4 h-4" />
          </Button>
          <Button iconOnly size="sm" variant="ghost">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button iconOnly size="sm" variant="ghost">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
};

/**
 * Gaming use cases
 */
export const GamingUseCases: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold text-text mb-6">Game Actions</h3>
        <div className="flex gap-3">
          <Button variant="primary" size="lg" leftIcon={<Play className="w-5 h-5" />}>
            Play Now
          </Button>
          <Button variant="accent" size="lg" leftIcon={<Download className="w-5 h-5" />}>
            Install
          </Button>
          <Button variant="outline" size="lg" leftIcon={<Settings className="w-5 h-5" />}>
            Settings
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-text mb-6">Social Actions</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" leftIcon={<Heart className="w-4 h-4" />}>
            Like
          </Button>
          <Button variant="ghost" size="sm" leftIcon={<Share2 className="w-4 h-4" />}>
            Share
          </Button>
          <Button variant="ghost" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Follow
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-text mb-6">Purchase Actions</h3>
        <div className="flex gap-3">
          <Button variant="success" leftIcon={<ShoppingCart className="w-4 h-4" />}>
            Buy Now $29.99
          </Button>
          <Button variant="warning" leftIcon={<Plus className="w-4 h-4" />}>
            Add to Wishlist
          </Button>
        </div>
      </div>
    </div>
  )
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" className="p-8 bg-gray-900">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>
    )
  ]
};

/**
 * Light mode
 */
export const LightMode: Story = {
  parameters: {
    backgrounds: { default: 'light' }
  },
  decorators: [
    (Story) => (
      <div data-theme="light" className="p-8 bg-white">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
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
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div className="p-4 space-y-3">
      <Button fullWidth variant="primary" size="lg" leftIcon={<Play className="w-5 h-5" />}>
        Play Now
      </Button>
      <Button fullWidth variant="secondary" size="lg" leftIcon={<Download className="w-5 h-5" />}>
        Download
      </Button>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" leftIcon={<Heart className="w-4 h-4" />}>
          Like
        </Button>
        <Button variant="ghost" size="sm" leftIcon={<Share2 className="w-4 h-4" />}>
          Share
        </Button>
      </div>
    </div>
  )
};

/**
 * Tablet viewport
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  render: () => (
    <div className="p-6 space-y-4">
      <div className="flex gap-3">
        <Button variant="primary" size="lg" leftIcon={<Play className="w-5 h-5" />}>
          Play Now
        </Button>
        <Button variant="secondary" size="lg" leftIcon={<Download className="w-5 h-5" />}>
          Download
        </Button>
        <Button variant="outline" size="lg" leftIcon={<Settings className="w-5 h-5" />}>
          Settings
        </Button>
      </div>
    </div>
  )
};

/**
 * Interactive playground
 */
export const Playground: Story = {
  args: {
    children: 'Playground Button',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
    iconOnly: false
  }
};