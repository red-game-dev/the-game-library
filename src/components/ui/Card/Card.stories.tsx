/**
 * @fileoverview Storybook stories for Card component
 * @module components/ui/Card/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { Card, CardHeader, CardBody, CardFooter, CardMedia } from './Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Heart, Play } from 'lucide-react';
import Image from 'next/image';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Base Card component for consistent card layouts across the application.

## Features
- 📏 Multiple size variants (xs to xxl)
- 🎨 Interactive and static modes
- 🪟 Glass morphism effect option
- 📱 Responsive design
- ♿ Accessibility compliant
- 🎭 Composable with sub-components

## Usage
The Card component can be used as a container or composed with CardHeader, CardBody, CardFooter, and CardMedia sub-components.
        `
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg']
    },
    interactive: {
      control: { type: 'boolean' }
    },
    bordered: {
      control: { type: 'boolean' }
    },
    shadow: {
      control: { type: 'select' },
      options: [false, true, 'sm', 'md', 'lg', 'xl', '2xl']
    },
    glass: {
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default card
 */
export const Default: Story = {
  args: {
    size: 'md',
    variant: 'default',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text">Card Title</h3>
        <p className="text-secondary">This is a basic card with content.</p>
      </div>
    )
  }
};

/**
 * Interactive card with hover effects
 */
export const Interactive: Story = {
  args: {
    interactive: true,
    size: 'md',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text">Interactive Card</h3>
        <p className="text-secondary">Hover over this card to see the effect.</p>
      </div>
    )
  }
};

/**
 * Interactive variants with hover effects
 */
export const InteractiveVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(['primary', 'secondary', 'accent', 'success', 'warning', 'info'] as const).map(variant => (
        <Card key={variant} variant={variant} size="md" interactive bordered shadow>
          <h3 className="text-lg font-semibold mb-2 text-white">Interactive {variant}</h3>
          <p className="text-white opacity-90">
            Hover to see the effect on this {variant} card
          </p>
        </Card>
      ))}
    </div>
  )
};

/**
 * Card with composed sub-components
 */
export const Composed: Story = {
  render: () => (
    <Card size="lg" interactive>
      <CardMedia aspectRatio="video">
        <Image
          src="https://picsum.photos/seed/card/600/400"
          alt="Sample"
          fill
          className="object-cover"
        />
      </CardMedia>
      <CardHeader
        title="Game Title"
        subtitle="By Game Studio"
        actions={
          <Button variant="ghost" iconOnly size="sm">
            <Heart className="w-4 h-4" />
          </Button>
        }
      />
      <CardBody
        description="This is a longer description of the game that can be expanded to show more details about gameplay, features, and other information that players might find interesting."
        expandable
      />
      <CardFooter className="flex justify-between items-center p-4">
        <Badge variant="new" size="sm">NEW</Badge>
        <Button variant="primary" size="sm" leftIcon={<Play className="w-4 h-4" />}>
          Play Now
        </Button>
      </CardFooter>
    </Card>
  )
};

/**
 * Glass morphism card
 */
export const Glass: Story = {
  args: {
    glass: true,
    size: 'md',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text">Glass Card</h3>
        <p className="text-secondary">This card has a glass morphism effect with proper text contrast for excellent readability.</p>
        <div className="mt-4">
          <Badge variant="new" size="sm">NEW</Badge>
          <Badge variant="hot" size="sm" className="ml-2">HOT</Badge>
        </div>
      </div>
    )
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="p-8 bg-gradient-to-br from-purple-500 to-pink-500">
        <Story />
      </div>
    )
  ]
};

/**
 * All color variants
 */
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'] as const).map(variant => (
        <Card key={variant} variant={variant} size="sm" bordered>
          <h3 className="text-lg font-semibold mb-2 text-text">{variant.charAt(0).toUpperCase() + variant.slice(1)}</h3>
          <p className={variant === 'default' ? 'text-secondary' : 'text-white'}>
            This is a {variant} card variant
          </p>
        </Card>
      ))}
    </div>
  )
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const).map(size => (
        <Card key={size} size={size}>
          <h3 className="text-lg font-semibold mb-4 text-text">Size: {size}</h3>
          <p className="text-secondary">Card content</p>
        </Card>
      ))}
    </div>
  )
};

/**
 * Without border
 */
export const NoBorder: Story = {
  args: {
    bordered: false,
    shadow: true,
    size: 'md',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text">No Border</h3>
        <p className="text-secondary">This card has shadow but no border.</p>
      </div>
    )
  }
};

/**
 * Shadow variations
 */
export const ShadowVariations: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card size="md">
        <h3 className="text-lg font-semibold mb-2 text-text">No Shadow</h3>
        <p className="text-secondary">No shadow applied</p>
      </Card>
      <Card size="md" shadow="sm">
        <h3 className="text-lg font-semibold mb-2 text-text">Small Shadow</h3>
        <p className="text-secondary">shadow=&quot;sm&quot;</p>
      </Card>
      <Card size="md" shadow="md">
        <h3 className="text-lg font-semibold mb-2 text-text">Medium Shadow</h3>
        <p className="text-secondary">shadow=&quot;md&quot;</p>
      </Card>
      <Card size="md" shadow="lg">
        <h3 className="text-lg font-semibold mb-2 text-text">Large Shadow</h3>
        <p className="text-secondary">shadow=&quot;lg&quot;</p>
      </Card>
      <Card size="md" shadow="xl">
        <h3 className="text-lg font-semibold mb-2 text-text">XL Shadow</h3>
        <p className="text-secondary">shadow=&quot;xl&quot;</p>
      </Card>
      <Card size="md" shadow="2xl">
        <h3 className="text-lg font-semibold mb-2 text-text">2XL Shadow</h3>
        <p className="text-secondary">shadow=&quot;2xl&quot;</p>
      </Card>
    </div>
  )
};

/**
 * Card with expandable description
 */
export const ExpandableDescription: Story = {
  render: () => (
    <Card size="md">
      <CardHeader title="Article Title" subtitle="5 min read" />
      <CardBody
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        maxLength={80}
        expandable
      />
    </Card>
  )
};

/**
 * Card grid layout
 */
export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} interactive>
          <CardMedia aspectRatio="4-3">
            <Image
              src={`https://picsum.photos/seed/grid-${i}/400/300`}
              alt={`Item ${i + 1}`}
              fill
              className="object-cover"
            />
          </CardMedia>
          <CardHeader
            title={`Item ${i + 1}`}
            subtitle="Subtitle"
            actions={<Badge variant="hot" size="xs">HOT</Badge>}
          />
        </Card>
      ))}
    </div>
  )
};

/**
 * Glass cards showcase
 */
export const GlassShowcase: Story = {
  render: () => (
    <div className="p-8 bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-400 min-h-screen">
      <div className="grid grid-cols-1 gap-6">
        <Card glass size="md" interactive>
          <h3 className="text-xl font-bold mb-2 text-text">Premium Glass</h3>
          <p className="text-secondary mb-4">
            Beautiful glass effect with perfect text contrast for readability.
          </p>
          <Button variant="primary" size="sm" fullWidth>
            Get Started
          </Button>
        </Card>
        
        <Card glass size="md" interactive>
          <h3 className="text-xl font-bold mb-2 text-text">Featured Game</h3>
          <p className="text-secondary mb-4">
            Experience the thrill with our featured gaming content.
          </p>
          <div className="flex gap-2">
            <Badge variant="hot">HOT</Badge>
            <Badge variant="new">NEW</Badge>
          </div>
        </Card>
        
        <Card glass size="md" interactive>
          <h3 className="text-xl font-bold mb-2 text-text">Special Offer</h3>
          <p className="text-secondary mb-4">
            Limited time promotion with exclusive benefits.
          </p>
          <Button variant="accent" size="sm" fullWidth>
            Claim Now
          </Button>
        </Card>
      </div>
    </div>
  )
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  args: {
    size: 'md',
    interactive: true,
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text">Dark Mode Card</h3>
        <p className="text-secondary">This card adapts to dark mode.</p>
      </div>
    )
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div data-theme="dark" className="p-4 bg-background">
        <Story />
      </div>
    )
  ]
};

/**
 * Light mode
 */
export const LightMode: Story = {
  args: {
    size: 'md',
    interactive: true,
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text">Light Mode Card</h3>
        <p className="text-secondary">This card adapts to light mode.</p>
      </div>
    )
  },
  parameters: {
    backgrounds: { default: 'light' }
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div data-theme="light" className="p-4 bg-background">
        <Story />
      </div>
    )
  ]
};

/**
 * Neon theme card with cyberpunk aesthetics
 */
export const NeonTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    () => (
      <div data-theme="neon" className="p-8" style={{ background: 'rgb(3, 7, 18)' }}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">Neon Theme Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card interactive glass>
              <h4 className="text-lg font-semibold text-purple-300">Glass Card</h4>
              <p className="text-purple-100 mt-2">Neon glass morphism effect</p>
            </Card>
            <Card interactive variant="primary">
              <h4 className="text-lg font-semibold text-white">Primary Card</h4>
              <p className="text-purple-100 mt-2">Vibrant neon styling</p>
            </Card>
            <Card interactive bordered>
              <h4 className="text-lg font-semibold text-purple-300">Bordered Card</h4>
              <p className="text-purple-100 mt-2">Glowing border effect</p>
            </Card>
            <Card interactive>
              <h4 className="text-lg font-semibold text-purple-300">Standard Card</h4>
              <p className="text-purple-100 mt-2">Clean neon styling</p>
            </Card>
          </div>
        </div>
      </div>
    )
  ]
};

/**
 * Gold theme card with luxurious styling
 */
export const GoldTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    () => (
      <div data-theme="gold" className="p-8" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">Gold Theme Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card interactive glass>
              <h4 className="text-lg font-semibold text-yellow-300">Premium Glass</h4>
              <p className="text-yellow-100 mt-2">Elegant glass effect</p>
            </Card>
            <Card interactive variant="warning">
              <h4 className="text-lg font-semibold text-white">Golden Card</h4>
              <p className="text-yellow-100 mt-2">Luxurious gold styling</p>
            </Card>
            <Card interactive bordered>
              <h4 className="text-lg font-semibold text-yellow-300">Gold Border</h4>
              <p className="text-yellow-100 mt-2">Premium bordered style</p>
            </Card>
            <Card interactive>
              <h4 className="text-lg font-semibold text-yellow-300">Classic Gold</h4>
              <p className="text-yellow-100 mt-2">Timeless elegance</p>
            </Card>
          </div>
        </div>
      </div>
    )
  ]
};

/**
 * All themes showcase
 */
export const AllThemes: Story = {
  render: () => (
    <div className="space-y-6">
      <div data-theme="light" className="p-6 bg-white rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Light Theme</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-3">Variants</p>
            <div className="grid grid-cols-2 gap-3">
              <Card variant="default" size="sm">
                <h4 className="font-semibold text-sm">Default</h4>
                <p className="text-xs text-secondary">Standard card</p>
              </Card>
              <Card variant="primary" size="sm">
                <h4 className="font-semibold text-sm text-white">Primary</h4>
                <p className="text-xs text-white opacity-90">Primary variant</p>
              </Card>
              <Card variant="secondary" size="sm">
                <h4 className="font-semibold text-sm text-white">Secondary</h4>
                <p className="text-xs text-white opacity-90">Secondary variant</p>
              </Card>
              <Card variant="accent" size="sm">
                <h4 className="font-semibold text-sm text-white">Accent</h4>
                <p className="text-xs text-white opacity-90">Accent variant</p>
              </Card>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Interactive & Glass Effects</p>
            <div className="grid grid-cols-2 gap-3">
              <Card interactive size="sm">
                <h4 className="font-semibold text-sm">Interactive</h4>
                <p className="text-xs text-secondary">Hover effects</p>
              </Card>
              <Card glass size="sm">
                <h4 className="font-semibold text-sm">Glass</h4>
                <p className="text-xs text-secondary">Glass morphism</p>
              </Card>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Shadow Variants</p>
            <div className="grid grid-cols-3 gap-3">
              <Card size="sm" shadow="sm">
                <h4 className="font-semibold text-sm">Small</h4>
                <p className="text-xs text-secondary">shadow=&quot;sm&quot;</p>
              </Card>
              <Card size="sm" shadow="md">
                <h4 className="font-semibold text-sm">Medium</h4>
                <p className="text-xs text-secondary">shadow=&quot;md&quot;</p>
              </Card>
              <Card size="sm" shadow="lg">
                <h4 className="font-semibold text-sm">Large</h4>
                <p className="text-xs text-secondary">shadow=&quot;lg&quot;</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <div data-theme="dark" className="p-6 bg-gray-900 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">Dark Theme</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-300 mb-3">Variants</p>
            <div className="grid grid-cols-2 gap-3">
              <Card variant="default" size="sm">
                <h4 className="font-semibold text-sm">Default</h4>
                <p className="text-xs text-secondary">Standard card</p>
              </Card>
              <Card variant="primary" size="sm">
                <h4 className="font-semibold text-sm text-white">Primary</h4>
                <p className="text-xs text-white opacity-90">Primary variant</p>
              </Card>
              <Card variant="secondary" size="sm">
                <h4 className="font-semibold text-sm text-white">Secondary</h4>
                <p className="text-xs text-white opacity-90">Secondary variant</p>
              </Card>
              <Card variant="accent" size="sm">
                <h4 className="font-semibold text-sm text-white">Accent</h4>
                <p className="text-xs text-white opacity-90">Accent variant</p>
              </Card>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300 mb-3">Interactive & Glass Effects</p>
            <div className="grid grid-cols-2 gap-3">
              <Card interactive size="sm">
                <h4 className="font-semibold text-sm">Interactive</h4>
                <p className="text-xs text-secondary">Hover effects</p>
              </Card>
              <Card glass size="sm">
                <h4 className="font-semibold text-sm">Glass</h4>
                <p className="text-xs text-secondary">Glass morphism</p>
              </Card>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300 mb-3">Shadow Variants</p>
            <div className="grid grid-cols-3 gap-3">
              <Card size="sm" shadow="sm">
                <h4 className="font-semibold text-sm">Small</h4>
                <p className="text-xs text-secondary">shadow=&quot;sm&quot;</p>
              </Card>
              <Card size="sm" shadow="md">
                <h4 className="font-semibold text-sm">Medium</h4>
                <p className="text-xs text-secondary">shadow=&quot;md&quot;</p>
              </Card>
              <Card size="sm" shadow="lg">
                <h4 className="font-semibold text-sm">Large</h4>
                <p className="text-xs text-secondary">shadow=&quot;lg&quot;</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: 'rgb(3, 7, 18)' }}>
        <h3 className="text-lg font-semibold text-purple-400 mb-4">Neon Theme</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-cyan-400 mb-3">Variants</p>
            <div className="grid grid-cols-2 gap-3">
              <Card variant="default" size="sm">
                <h4 className="font-semibold text-sm text-purple-300">Default</h4>
                <p className="text-xs text-purple-200">Standard card</p>
              </Card>
              <Card variant="primary" size="sm">
                <h4 className="font-semibold text-sm text-white">Primary</h4>
                <p className="text-xs text-cyan-200">Primary variant</p>
              </Card>
              <Card variant="secondary" size="sm">
                <h4 className="font-semibold text-sm text-white">Secondary</h4>
                <p className="text-xs text-purple-200">Secondary variant</p>
              </Card>
              <Card variant="accent" size="sm">
                <h4 className="font-semibold text-sm text-white">Accent</h4>
                <p className="text-xs text-cyan-200">Accent variant</p>
              </Card>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-cyan-400 mb-3">Interactive & Glass Effects</p>
            <div className="grid grid-cols-2 gap-3">
              <Card interactive size="sm">
                <h4 className="font-semibold text-sm text-purple-300">Interactive</h4>
                <p className="text-xs text-purple-200">Neon glow effects</p>
              </Card>
              <Card glass size="sm">
                <h4 className="font-semibold text-sm text-purple-300">Glass</h4>
                <p className="text-xs text-purple-200">Cyberpunk glass</p>
              </Card>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-cyan-400 mb-3">Shadow Variants</p>
            <div className="grid grid-cols-3 gap-3">
              <Card size="sm" shadow="sm">
                <h4 className="font-semibold text-sm text-purple-300">Small</h4>
                <p className="text-xs text-purple-200">Subtle glow</p>
              </Card>
              <Card size="sm" shadow="md">
                <h4 className="font-semibold text-sm text-purple-300">Medium</h4>
                <p className="text-xs text-purple-200">Moderate glow</p>
              </Card>
              <Card size="sm" shadow="lg">
                <h4 className="font-semibold text-sm text-purple-300">Large</h4>
                <p className="text-xs text-purple-200">Intense glow</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <h3 className="text-lg font-semibold text-yellow-400 mb-4">Gold Theme</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-yellow-300 mb-3">Variants</p>
            <div className="grid grid-cols-2 gap-3">
              <Card variant="default" size="sm">
                <h4 className="font-semibold text-sm text-yellow-300">Default</h4>
                <p className="text-xs text-yellow-200">Standard card</p>
              </Card>
              <Card variant="primary" size="sm">
                <h4 className="font-semibold text-sm text-white">Primary</h4>
                <p className="text-xs text-yellow-200">Primary variant</p>
              </Card>
              <Card variant="warning" size="sm">
                <h4 className="font-semibold text-sm text-white">Gold</h4>
                <p className="text-xs text-yellow-200">Warning/Gold variant</p>
              </Card>
              <Card variant="accent" size="sm">
                <h4 className="font-semibold text-sm text-white">Accent</h4>
                <p className="text-xs text-yellow-200">Accent variant</p>
              </Card>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-yellow-300 mb-3">Interactive & Glass Effects</p>
            <div className="grid grid-cols-2 gap-3">
              <Card interactive size="sm">
                <h4 className="font-semibold text-sm text-yellow-300">Interactive</h4>
                <p className="text-xs text-yellow-200">Golden hover</p>
              </Card>
              <Card glass size="sm">
                <h4 className="font-semibold text-sm text-yellow-300">Glass</h4>
                <p className="text-xs text-yellow-200">Elegant glass</p>
              </Card>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-yellow-300 mb-3">Shadow Variants</p>
            <div className="grid grid-cols-3 gap-3">
              <Card size="sm" shadow="sm">
                <h4 className="font-semibold text-sm text-yellow-300">Small</h4>
                <p className="text-xs text-yellow-200">Soft glow</p>
              </Card>
              <Card size="sm" shadow="md">
                <h4 className="font-semibold text-sm text-yellow-300">Medium</h4>
                <p className="text-xs text-yellow-200">Golden glow</p>
              </Card>
              <Card size="sm" shadow="lg">
                <h4 className="font-semibold text-sm text-yellow-300">Large</h4>
                <p className="text-xs text-yellow-200">Premium glow</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

/**
 * Mobile viewport
 */
export const Mobile: Story = {
  render: () => (
    <div className="space-y-4">
      {/* Single card with responsive padding */}
      <Card className="card-lg" interactive>
        <h3 className="text-base font-semibold mb-2 text-text">Mobile Card</h3>
        <p className="text-sm text-secondary">
          This card uses card-lg class which automatically reduces padding on mobile.
        </p>
      </Card>
      
      {/* Cards in a responsive grid */}
      <div className="grid grid-cols-1 gap-3">
        <Card className="card-md" variant="primary">
          <h3 className="text-base font-semibold mb-1 text-white">Primary</h3>
          <p className="text-sm text-white opacity-90">Optimized for mobile</p>
        </Card>
        <Card className="card-md" variant="accent">
          <h3 className="text-base font-semibold mb-1 text-white">Accent</h3>
          <p className="text-sm text-white opacity-90">Touch-friendly size</p>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  }
};

/**
 * Tablet viewport
 */
export const Tablet: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card className="card-lg" interactive>
        <CardHeader title="Tablet Card 1" subtitle="Responsive padding" />
        <CardBody description="This card uses card-lg which has moderate padding on tablets." />
      </Card>
      <Card className="card-lg" interactive>
        <CardHeader title="Tablet Card 2" subtitle="Touch optimized" />
        <CardBody description="Perfect size for tablet interactions with proper spacing." />
      </Card>
      <Card className="card-md" variant="primary">
        <h3 className="text-lg font-semibold mb-2 text-white">Featured</h3>
        <p className="text-base text-white opacity-90">Tablet-optimized layout</p>
      </Card>
      <Card className="card-md" variant="accent">
        <h3 className="text-lg font-semibold mb-2 text-white">Popular</h3>
        <p className="text-base text-white opacity-90">Perfect for tablet view</p>
      </Card>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  }
};

/**
 * Responsive showcase - shows how cards adapt across breakpoints
 */
export const ResponsiveShowcase: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Card Size Modifiers</h2>
        <div className="grid grid-cols-1 gap-4">
          <Card className="card-sm" bordered>
            <h4 className="font-semibold">card-sm</h4>
            <p className="text-xs text-secondary">Minimal padding</p>
          </Card>
          <Card className="card-md" bordered>
            <h4 className="font-semibold">card-md</h4>
            <p className="text-sm text-secondary">Responsive padding</p>
          </Card>
          <Card className="card-lg" bordered>
            <h4 className="font-semibold">card-lg</h4>
            <p className="text-sm text-secondary">Adapts to viewport</p>
          </Card>
          <Card className="card-xl" bordered>
            <h4 className="font-semibold">card-xl</h4>
            <p className="text-sm text-secondary">Maximum comfort</p>
          </Card>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">Try Different Viewports</h2>
        <p className="text-secondary mb-4">
          Use Storybook&apos;s viewport selector to see how these cards adapt to mobile (320px), tablet (768px), and desktop (1024px+) sizes.
        </p>
        <Card className="card-lg" glass interactive>
          <h3 className="text-lg font-semibold mb-2">Responsive Glass Card</h3>
          <p className="text-secondary">
            This card automatically adjusts its padding based on the viewport size. On mobile, padding is reduced for better space utilization.
          </p>
        </Card>
      </div>
    </div>
  )
};