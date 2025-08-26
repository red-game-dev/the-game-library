/**
 * @fileoverview Storybook stories for Tooltip component
 * @module components/ui/Tooltip/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Card } from '../Card';
import { Info, HelpCircle, Settings, Download, Share2, Heart, Star, Bookmark } from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Tooltip component for displaying contextual information on hover or focus.

## Features
- 📍 Multiple positioning options
- ⏱️ Configurable delay
- 🎨 Multiple variants
- 📱 Touch-friendly on mobile
- ♿ Keyboard accessible
- 🌙 Dark mode support
        `
      }
    }
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip content'
    },
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Position of the tooltip (alias for placement)'
    },
    placement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Placement of the tooltip'
    },
    variant: {
      control: 'select',
      options: ['default', 'info', 'warning', 'error'],
      description: 'Visual variant of the tooltip'
    },
    delay: {
      control: 'number',
      description: 'Delay before showing tooltip (ms)'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tooltip is disabled'
    },
    multiline: {
      control: 'boolean',
      description: 'Whether content should wrap'
    },
    className: {
      control: 'text',
      description: 'Custom CSS class'
    }
  }
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tooltip
 */
export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    children: <Button variant="primary">Hover me</Button>
  }
};

/**
 * Different positions
 */
export const Positions: Story = {
  render: () => (
    <div className="flex gap-8 items-center justify-center min-h-20">
      <Tooltip content="Top tooltip" position="top">
        <Button variant="ghost">Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right">
        <Button variant="ghost">Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button variant="ghost">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <Button variant="ghost">Left</Button>
      </Tooltip>
    </div>
  )
};

/**
 * Different variants
 */
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Tooltip content="Default tooltip" variant="default">
        <Button variant="secondary">Default</Button>
      </Tooltip>
      <Tooltip content="Info tooltip" variant="info">
        <Button variant="accent">Info</Button>
      </Tooltip>
      <Tooltip content="Warning tooltip" variant="warning">
        <Button variant="warning">Warning</Button>
      </Tooltip>
      <Tooltip content="Error tooltip" variant="error">
        <Button variant="error">Error</Button>
      </Tooltip>
    </div>
  )
};

/**
 * With icons
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Tooltip content="Information">
        <Button variant="ghost" iconOnly size="sm">
          <Info className="w-4 h-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Help">
        <Button variant="ghost" iconOnly size="sm">
          <HelpCircle className="w-4 h-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Settings">
        <Button variant="ghost" iconOnly size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Download">
        <Button variant="ghost" iconOnly size="sm">
          <Download className="w-4 h-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Share">
        <Button variant="ghost" iconOnly size="sm">
          <Share2 className="w-4 h-4" />
        </Button>
      </Tooltip>
    </div>
  )
};

/**
 * Different delays
 */
export const Delays: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Tooltip content="No delay" delay={0}>
        <Badge variant="info">Instant</Badge>
      </Tooltip>
      <Tooltip content="200ms delay" delay={200}>
        <Badge variant="success">Fast</Badge>
      </Tooltip>
      <Tooltip content="500ms delay" delay={500}>
        <Badge variant="warning">Normal</Badge>
      </Tooltip>
      <Tooltip content="1000ms delay" delay={1000}>
        <Badge variant="error">Slow</Badge>
      </Tooltip>
    </div>
  )
};

/**
 * Long content
 */
export const LongContent: Story = {
  args: {
    content: 'This is a longer tooltip with more detailed information that explains something important to the user.',
    children: <Button>Long tooltip</Button>
  }
};

/**
 * Disabled tooltip
 */
export const Disabled: Story = {
  args: {
    content: 'This tooltip is disabled',
    disabled: true,
    children: <Button>Disabled tooltip</Button>
  }
};

/**
 * Complex content
 */
export const ComplexContent: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-md">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Favorites</span>
          <Tooltip content="Add to favorites">
            <Button variant="ghost" iconOnly size="sm">
              <Heart className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Rating</span>
          <Tooltip content="Rate this item">
            <Button variant="ghost" iconOnly size="sm">
              <Star className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Bookmark</span>
          <Tooltip content="Save for later">
            <Button variant="ghost" iconOnly size="sm">
              <Bookmark className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Settings</span>
          <Tooltip content="Configure options">
            <Button variant="ghost" iconOnly size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>
      </Card>
    </div>
  )
};

/**
 * Mobile viewport - optimized for touch devices
 */
export const Mobile: Story = {
  args: {
    content: 'Mobile tooltip',
    children: <div>Touch trigger</div>
  },
  render: () => (
    <div className="p-4 space-y-4">
      <h2 className="text-base font-semibold mb-3">Mobile Tooltips</h2>
      <p className="text-sm text-secondary mb-4">
        On mobile devices, tooltips appear on tap instead of hover for better touch interaction.
      </p>
      
      <div className="space-y-4">
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Help</span>
            <Tooltip content="Tap for help information" position="left">
              <Button variant="ghost" iconOnly size="sm">
                <HelpCircle className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        </Card>
        
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Info</span>
            <Tooltip content="Additional details about this item" position="left">
              <Button variant="ghost" iconOnly size="sm">
                <Info className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        </Card>
        
        <div className="flex gap-2 justify-center">
          <Tooltip content="Share" position="top">
            <Button variant="primary" iconOnly size="md">
              <Share2 className="w-5 h-5" />
            </Button>
          </Tooltip>
          <Tooltip content="Download" position="top">
            <Button variant="primary" iconOnly size="md">
              <Download className="w-5 h-5" />
            </Button>
          </Tooltip>
          <Tooltip content="Settings" position="top">
            <Button variant="primary" iconOnly size="md">
              <Settings className="w-5 h-5" />
            </Button>
          </Tooltip>
        </div>
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
  args: {
    content: 'Tablet tooltip',
    children: <div>Hover trigger</div>
  },
  render: () => (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Tablet Tooltips</h2>
      <p className="text-base text-secondary mb-6">
        Tooltips optimized for tablet viewing with appropriate sizing.
      </p>
      
      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
        {[
          { icon: Heart, label: 'Like', tooltip: 'Add to favorites' },
          { icon: Star, label: 'Rate', tooltip: 'Rate this content' },
          { icon: Bookmark, label: 'Save', tooltip: 'Save for later' },
          { icon: Share2, label: 'Share', tooltip: 'Share with others' },
          { icon: Download, label: 'Download', tooltip: 'Download to device' },
          { icon: Settings, label: 'Settings', tooltip: 'Configure options' }
        ].map(({ icon: Icon, label, tooltip }) => (
          <Card key={label} className="p-4">
            <div className="flex flex-col items-center gap-2">
              <Tooltip content={tooltip} position="top">
                <Button variant="ghost" iconOnly size="lg">
                  <Icon className="w-5 h-5" />
                </Button>
              </Tooltip>
              <span className="text-sm text-secondary">{label}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  }
};

/**
 * Responsive showcase
 */
export const ResponsiveShowcase: Story = {
  args: {
    content: 'Responsive tooltip',
    children: <div>Responsive trigger</div>
  },
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h2 className="text-xl font-bold mb-4">Responsive Tooltip Showcase</h2>
        <p className="text-secondary mb-6">
          Tooltips adapt to different screen sizes and input methods.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-4 justify-center flex-wrap">
          <Tooltip content="Primary action" position="top">
            <Button variant="primary">Action</Button>
          </Tooltip>
          <Tooltip content="Secondary action" position="top">
            <Button variant="secondary">Secondary</Button>
          </Tooltip>
          <Tooltip content="More options" position="top">
            <Button variant="ghost">Options</Button>
          </Tooltip>
        </div>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Interactive Elements</h3>
              <p className="text-sm text-secondary">Hover or tap the icons</p>
            </div>
            <div className="flex gap-2">
              <Tooltip content="Edit">
                <Button variant="ghost" iconOnly size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </Tooltip>
              <Tooltip content="Share">
                <Button variant="ghost" iconOnly size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </Tooltip>
              <Tooltip content="More">
                <Button variant="ghost" iconOnly size="sm">
                  <Info className="w-4 h-4" />
                </Button>
              </Tooltip>
            </div>
          </div>
        </Card>
        
        <div className="flex justify-center">
          <Tooltip 
            content="This tooltip adapts its position and behavior based on the device and screen size"
            position="bottom"
            multiline={true}
          >
            <Badge variant="info" size="lg">
              Hover or tap for info
            </Badge>
          </Tooltip>
        </div>
      </div>
    </div>
  )
};

/**
 * Multiline Content
 */
export const MultilineContent: Story = {
  render: () => (
    <div className="flex gap-4 items-center justify-center min-h-32">
      <Tooltip 
        content="This is a single line tooltip"
        multiline={false}
      >
        <Button variant="ghost">Single Line</Button>
      </Tooltip>
      <Tooltip 
        content="This is a multiline tooltip with longer content that will wrap to multiple lines when needed for better readability"
        multiline={true}
      >
        <Button variant="ghost">Multiline</Button>
      </Tooltip>
    </div>
  )
};

/**
 * With Different Delays
 */
export const DifferentDelays: Story = {
  render: () => (
    <div className="flex gap-4 items-center justify-center">
      <Tooltip content="No delay" delay={0}>
        <Button variant="secondary">Instant</Button>
      </Tooltip>
      <Tooltip content="200ms delay" delay={200}>
        <Button variant="secondary">Fast</Button>
      </Tooltip>
      <Tooltip content="500ms delay" delay={500}>
        <Button variant="secondary">Normal</Button>
      </Tooltip>
      <Tooltip content="1000ms delay" delay={1000}>
        <Button variant="secondary">Slow</Button>
      </Tooltip>
    </div>
  )
};

/**
 * All Variants Demo
 */
export const AllVariantsDemo: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Tooltip Variants</h3>
        <p className="text-sm text-secondary">Different colors for different contexts</p>
      </div>
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <Tooltip content="Default tooltip style" variant="default" position="top">
          <Card className="p-4 text-center cursor-pointer hover:bg-surface-hover transition-colors">
            <div className="text-sm font-medium">Default</div>
            <div className="text-xs text-secondary mt-1">Neutral gray</div>
          </Card>
        </Tooltip>
        <Tooltip content="Info tooltip with blue gradient background" variant="info" position="top" multiline={true}>
          <Card className="p-4 text-center cursor-pointer hover:bg-surface-hover transition-colors">
            <div className="text-sm font-medium text-blue-400">Info</div>
            <div className="text-xs text-secondary mt-1">Blue gradient</div>
          </Card>
        </Tooltip>
        <Tooltip content="Warning tooltip with orange gradient background" variant="warning" position="top" multiline={true}>
          <Card className="p-4 text-center cursor-pointer hover:bg-surface-hover transition-colors">
            <div className="text-sm font-medium text-orange-400">Warning</div>
            <div className="text-xs text-secondary mt-1">Orange gradient</div>
          </Card>
        </Tooltip>
        <Tooltip content="Error tooltip with red gradient background" variant="error" position="top" multiline={true}>
          <Card className="p-4 text-center cursor-pointer hover:bg-surface-hover transition-colors">
            <div className="text-sm font-medium text-red-400">Error</div>
            <div className="text-xs text-secondary mt-1">Red gradient</div>
          </Card>
        </Tooltip>
      </div>
    </div>
  )
};

/**
 * Position vs Placement
 */
export const PositionVsPlacement: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Using &lsquo;position&lsquo; prop (alias)</h3>
        <div className="flex gap-4 items-center justify-center">
          <Tooltip content="Using position='top'" position="top">
            <Button variant="ghost">Top</Button>
          </Tooltip>
          <Tooltip content="Using position='right'" position="right">
            <Button variant="ghost">Right</Button>
          </Tooltip>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Using &lsquo;placement&lsquo; prop</h3>
        <div className="flex gap-4 items-center justify-center">
          <Tooltip content="Using placement='bottom'" placement="bottom">
            <Button variant="ghost">Bottom</Button>
          </Tooltip>
          <Tooltip content="Using placement='left'" placement="left">
            <Button variant="ghost">Left</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  render: () => (
    <div className="flex gap-4 items-center justify-center min-h-32">
      <Tooltip content="Default in dark mode" variant="default">
        <Button variant="secondary">Default</Button>
      </Tooltip>
      <Tooltip content="Info in dark mode" variant="info">
        <Button variant="accent">Info</Button>
      </Tooltip>
      <Tooltip content="Warning in dark mode" variant="warning">
        <Button variant="warning">Warning</Button>
      </Tooltip>
      <Tooltip content="Error in dark mode" variant="error">
        <Button variant="error">Error</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

/**
 * Light mode
 */
export const LightMode: Story = {
  render: () => (
    <div className="flex gap-4 items-center justify-center min-h-32">
      <Tooltip content="Default in light mode" variant="default">
        <Button variant="secondary">Default</Button>
      </Tooltip>
      <Tooltip content="Info in light mode" variant="info">
        <Button variant="accent">Info</Button>
      </Tooltip>
      <Tooltip content="Warning in light mode" variant="warning">
        <Button variant="warning">Warning</Button>
      </Tooltip>
      <Tooltip content="Error in light mode" variant="error">
        <Button variant="error">Error</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'light' }
  }
};

/**
 * Neon theme - Cyberpunk tooltips
 */
export const NeonTheme: Story = {
  render: () => (
    <div data-theme="neon" className="p-8" style={{ background: 'rgb(3, 7, 18)' }}>
      <h3 className="text-lg font-semibold text-purple-400 mb-6">Neon Theme Tooltips</h3>
      <div className="flex gap-4 items-center justify-center min-h-32">
        <Tooltip content="Neural link established" variant="default">
          <Button variant="primary">Hover Me</Button>
        </Tooltip>
        <Tooltip content="System scan complete" variant="info">
          <Button variant="accent">Info</Button>
        </Tooltip>
        <Tooltip content="Low bandwidth detected" variant="warning">
          <Button variant="warning">Warning</Button>
        </Tooltip>
        <Tooltip content="Connection terminated" variant="error">
          <Button variant="error">Error</Button>
        </Tooltip>
      </div>
      <div className="flex gap-4 items-center justify-center mt-6">
        <Tooltip 
          content={
            <div>
              <div className="font-semibold text-purple-300">Multi-line Tooltip</div>
              <div className="text-purple-200">Enhanced with neon glow effects</div>
            </div>
          }
          variant="default"
        >
          <Button variant="ghost">Complex Content</Button>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

/**
 * Gold theme - Premium tooltips
 */
export const GoldTheme: Story = {
  render: () => (
    <div data-theme="gold" className="p-8" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
      <h3 className="text-lg font-semibold text-yellow-400 mb-6">Gold Theme Tooltips</h3>
      <div className="flex gap-4 items-center justify-center min-h-32">
        <Tooltip content="VIP member exclusive" variant="default">
          <Button variant="primary">Premium</Button>
        </Tooltip>
        <Tooltip content="Bonus activated" variant="info">
          <Button variant="accent">Rewards</Button>
        </Tooltip>
        <Tooltip content="Limited time offer" variant="warning">
          <Button variant="warning">Special</Button>
        </Tooltip>
        <Tooltip content="Access restricted" variant="error">
          <Button variant="error">Locked</Button>
        </Tooltip>
      </div>
      <div className="flex gap-4 items-center justify-center mt-6">
        <Tooltip 
          content={
            <div>
              <div className="font-semibold text-yellow-300">VIP Benefits</div>
              <div className="text-yellow-200">Unlock exclusive features</div>
            </div>
          }
          variant="default"
        >
          <Button variant="ghost">View Details</Button>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

/**
 * All themes comparison
 */
export const AllThemes: Story = {
  render: () => (
    <div className="space-y-6">
      <div data-theme="light" className="p-6 bg-white rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Light Theme</h3>
        <div className="space-y-8">
          <div>
            <p className="text-sm font-medium mb-4">Variants</p>
            <div className="flex gap-3 justify-center">
              <Tooltip content="Default tooltip">
                <Button size="sm">Default</Button>
              </Tooltip>
              <Tooltip content="Information tooltip" variant="info">
                <Button size="sm" variant="secondary">Info</Button>
              </Tooltip>
              <Tooltip content="Warning tooltip" variant="warning">
                <Button size="sm" variant="warning">Warning</Button>
              </Tooltip>
              <Tooltip content="Error tooltip" variant="error">
                <Button size="sm" variant="error">Error</Button>
              </Tooltip>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-4">Placements</p>
            <div className="flex gap-3 justify-center">
              <Tooltip content="Top placement" placement="top">
                <Button size="sm" variant="outline">Top</Button>
              </Tooltip>
              <Tooltip content="Right placement" placement="right">
                <Button size="sm" variant="outline">Right</Button>
              </Tooltip>
              <Tooltip content="Bottom placement" placement="bottom">
                <Button size="sm" variant="outline">Bottom</Button>
              </Tooltip>
              <Tooltip content="Left placement" placement="left">
                <Button size="sm" variant="outline">Left</Button>
              </Tooltip>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-4">Multiline</p>
            <div className="flex justify-center">
              <Tooltip 
                content="This is a multiline tooltip that can contain longer text and wrap to multiple lines for better readability"
                multiline
              >
                <Button size="sm" variant="ghost">Multiline</Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      
      <div data-theme="dark" className="p-6 bg-gray-900 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Dark Theme</h3>
        <div className="space-y-8">
          <div>
            <p className="text-sm font-medium text-gray-300 mb-4">Variants</p>
            <div className="flex gap-3 justify-center">
              <Tooltip content="Default tooltip">
                <Button size="sm">Default</Button>
              </Tooltip>
              <Tooltip content="Information tooltip" variant="info">
                <Button size="sm" variant="secondary">Info</Button>
              </Tooltip>
              <Tooltip content="Warning tooltip" variant="warning">
                <Button size="sm" variant="warning">Warning</Button>
              </Tooltip>
              <Tooltip content="Error tooltip" variant="error">
                <Button size="sm" variant="error">Error</Button>
              </Tooltip>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300 mb-4">Placements</p>
            <div className="flex gap-3 justify-center">
              <Tooltip content="Top placement" placement="top">
                <Button size="sm" variant="outline">Top</Button>
              </Tooltip>
              <Tooltip content="Right placement" placement="right">
                <Button size="sm" variant="outline">Right</Button>
              </Tooltip>
              <Tooltip content="Bottom placement" placement="bottom">
                <Button size="sm" variant="outline">Bottom</Button>
              </Tooltip>
              <Tooltip content="Left placement" placement="left">
                <Button size="sm" variant="outline">Left</Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: 'rgb(3, 7, 18)' }}>
        <h3 className="text-lg font-semibold text-purple-400 mb-3">Neon Theme</h3>
        <div className="space-y-8">
          <div>
            <p className="text-sm font-medium text-cyan-400 mb-4">Variants</p>
            <div className="flex gap-3 justify-center">
              <Tooltip content="Default tooltip">
                <Button size="sm">Default</Button>
              </Tooltip>
              <Tooltip content="Information tooltip" variant="info">
                <Button size="sm" variant="secondary">Info</Button>
              </Tooltip>
              <Tooltip content="Warning tooltip" variant="warning">
                <Button size="sm" variant="warning">Warning</Button>
              </Tooltip>
              <Tooltip content="Error tooltip" variant="error">
                <Button size="sm" variant="error">Error</Button>
              </Tooltip>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-cyan-400 mb-4">Placements</p>
            <div className="flex gap-3 justify-center">
              <Tooltip content="Top placement" placement="top">
                <Button size="sm" variant="outline">Top</Button>
              </Tooltip>
              <Tooltip content="Right placement" placement="right">
                <Button size="sm" variant="outline">Right</Button>
              </Tooltip>
              <Tooltip content="Bottom placement" placement="bottom">
                <Button size="sm" variant="outline">Bottom</Button>
              </Tooltip>
              <Tooltip content="Left placement" placement="left">
                <Button size="sm" variant="outline">Left</Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <h3 className="text-lg font-semibold text-yellow-400 mb-3">Gold Theme</h3>
        <div className="space-y-8">
          <div>
            <p className="text-sm font-medium text-yellow-300 mb-4">Variants</p>
            <div className="flex gap-3 justify-center">
              <Tooltip content="Default tooltip">
                <Button size="sm">Default</Button>
              </Tooltip>
              <Tooltip content="Information tooltip" variant="info">
                <Button size="sm" variant="secondary">Info</Button>
              </Tooltip>
              <Tooltip content="Warning tooltip" variant="warning">
                <Button size="sm" variant="warning">Warning</Button>
              </Tooltip>
              <Tooltip content="Error tooltip" variant="error">
                <Button size="sm" variant="error">Error</Button>
              </Tooltip>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-yellow-300 mb-4">Placements</p>
            <div className="flex gap-3 justify-center">
              <Tooltip content="Top placement" placement="top">
                <Button size="sm" variant="outline">Top</Button>
              </Tooltip>
              <Tooltip content="Right placement" placement="right">
                <Button size="sm" variant="outline">Right</Button>
              </Tooltip>
              <Tooltip content="Bottom placement" placement="bottom">
                <Button size="sm" variant="outline">Bottom</Button>
              </Tooltip>
              <Tooltip content="Left placement" placement="left">
                <Button size="sm" variant="outline">Left</Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

/**
 * Playground
 */
export const Playground: Story = {
  args: {
    content: 'Customize this tooltip using the controls',
    position: 'top',
    variant: 'default',
    delay: 200,
    disabled: false,
    multiline: false,
    children: <Button variant="primary">Hover for tooltip</Button>
  }
};