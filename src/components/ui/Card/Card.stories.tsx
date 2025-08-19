/**
 * @fileoverview Storybook stories for Card component
 * @module components/ui/Card/stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter, CardMedia } from './Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Heart, Share2, Play } from 'lucide-react';
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
      control: { type: 'boolean' }
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
    (Story) => (
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
    (Story) => (
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
    (Story) => (
      <div data-theme="light" className="p-4 bg-background">
        <Story />
      </div>
    )
  ]
};

/**
 * Mobile viewport - optimized for small screens
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
 * Tablet viewport - medium screen optimization
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