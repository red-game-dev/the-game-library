/**
 * Drawer Component Stories
 * Comprehensive stories showcasing all Drawer variations
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Link } from '@/components/ui/Link';
import { 
  Settings, 
  User, 
  Heart, 
  Bell, 
  Home,
  Gamepad2,
  Trophy,
  Star,
  Search,
} from 'lucide-react';

const meta = {
  title: 'UI/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A versatile drawer/sidebar component that slides in from any edge of the screen.
Perfect for navigation menus, settings panels, filters, and more.

## Features
- **Multiple positions**: left, right, top, bottom
- **Size variants**: sm, md, lg, xl, full
- **Accessibility**: Focus trap, ESC key, ARIA attributes
- **Scroll lock**: Prevents body scroll when open
- **Customizable animations**: Configurable duration
- **Theme support**: Adapts to light, dark, neon, and gold themes

## Usage
\`\`\`tsx
import { Drawer } from '@/components/ui/Drawer';

<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="right"
  size="md"
  header={<h2>Settings</h2>}
  footer={<Button>Save Changes</Button>}
>
  {/* Content */}
</Drawer>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the drawer is open'
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Position of the drawer'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size of the drawer'
    },
    showOverlay: {
      control: 'boolean',
      description: 'Show overlay behind drawer'
    },
    closeOnOverlay: {
      control: 'boolean',
      description: 'Close drawer when overlay is clicked'
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Close drawer when ESC key is pressed'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in drawer'
    },
    lockScroll: {
      control: 'boolean',
      description: 'Lock body scroll when drawer is open'
    },
    animationDuration: {
      control: { type: 'range', min: 100, max: 1000, step: 100 },
      description: 'Animation duration in milliseconds'
    },
    showHeader: {
      control: 'boolean',
      description: 'Show or hide the drawer header section'
    },
    persistent: {
      control: 'boolean',
      description: 'Whether drawer can stay open while other modals/drawers are displayed'
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding size for drawer content'
    },
    classNames: {
      control: 'object',
      description: 'Custom CSS classes for nested elements (overlay, drawer, content, header, body, footer)'
    }
  }
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default drawer configuration (no title)
 */
export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    position: 'right',
    size: 'md',
    showOverlay: true,
    closeOnOverlay: true,
    closeOnEsc: true,
    showCloseButton: true,
    lockScroll: true,
    children: (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Content Area</h2>
        <p className="text-secondary mb-4">
          Default drawer without a title. Only shows close button in header.
        </p>
        <Button variant="primary" fullWidth>
          Action Button
        </Button>
      </div>
    )
  }
};

/**
 * Drawer with custom title
 */
export const WithTitle: Story = {
  args: {
    ...Default.args,
    title: 'Settings',
    children: (
      <div className="p-4">
        <p className="text-secondary">Custom title in the header.</p>
      </div>
    )
  }
};

/**
 * Drawer without header (showHeader prop: false)
 */
export const NoHeader: Story = {
  args: {
    ...Default.args,
    showHeader: false,
    title: 'Hidden Header',
    children: (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">No Header Drawer</h2>
        <p className="text-secondary">
          The header section is completely hidden using showHeader prop set to false.
          No title or close button is shown.
        </p>
        <Button variant="secondary" className="mt-4">
          Manual Close Action
        </Button>
      </div>
    )
  }
};

/**
 * Persistent drawer (persistent prop: true)
 */
export const PersistentDrawer: Story = {
  args: {
    ...Default.args,
    persistent: true,
    title: 'Persistent Drawer',
    children: (
      <div className="p-4">
        <p className="text-secondary mb-4">
          This drawer has persistent prop set to true. It can stay open while other modals or drawers are displayed.
        </p>
        <p className="text-sm text-secondary">
          Useful for scenarios like cookie consent where the drawer should remain visible behind other interactions.
        </p>
      </div>
    )
  }
};

/**
 * Custom padding (padding prop)
 */
export const CustomPadding: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: null
  },
  render: () => {
    const [openNone, setOpenNone] = useState(false);
    const [openSm, setOpenSm] = useState(false);
    const [openMd, setOpenMd] = useState(false);
    const [openLg, setOpenLg] = useState(false);
    
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Drawer Padding Options</h2>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => setOpenNone(true)}>No Padding</Button>
          <Button onClick={() => setOpenSm(true)}>Small Padding</Button>
          <Button onClick={() => setOpenMd(true)}>Medium Padding</Button>
          <Button onClick={() => setOpenLg(true)}>Large Padding</Button>
        </div>
        
        <Drawer
          isOpen={openNone}
          onClose={() => setOpenNone(false)}
          title="No Padding"
          padding="none"
        >
          <div className="bg-purple-100 dark:bg-purple-900 p-4">
            <p>Content with no drawer padding (padding="none")</p>
            <p className="text-sm text-secondary mt-2">Content extends to edges</p>
          </div>
        </Drawer>
        
        <Drawer
          isOpen={openSm}
          onClose={() => setOpenSm(false)}
          title="Small Padding"
          padding="sm"
        >
          <div className="bg-purple-100 dark:bg-purple-900 p-4">
            <p>Content with small drawer padding (padding="sm")</p>
            <p className="text-sm text-secondary mt-2">Compact spacing</p>
          </div>
        </Drawer>
        
        <Drawer
          isOpen={openMd}
          onClose={() => setOpenMd(false)}
          title="Medium Padding"
          padding="md"
        >
          <div className="bg-purple-100 dark:bg-purple-900 p-4">
            <p>Content with medium drawer padding (padding="md")</p>
            <p className="text-sm text-secondary mt-2">Default spacing</p>
          </div>
        </Drawer>
        
        <Drawer
          isOpen={openLg}
          onClose={() => setOpenLg(false)}
          title="Large Padding"
          padding="lg"
        >
          <div className="bg-purple-100 dark:bg-purple-900 p-4">
            <p>Content with large drawer padding (padding="lg")</p>
            <p className="text-sm text-secondary mt-2">Generous spacing</p>
          </div>
        </Drawer>
      </div>
    );
  }
};

/**
 * Custom classNames for nested elements
 */
export const CustomClassNames: Story = {
  args: {
    ...Default.args,
    title: 'Custom Styled Drawer',
    classNames: {
      overlay: 'custom-overlay-class',
      drawer: 'custom-drawer-class',
      content: 'custom-content-class',
      header: 'custom-header-class',
      body: 'custom-body-class',
      footer: 'custom-footer-class'
    },
    footer: (
      <div className="flex gap-2">
        <Button variant="secondary" fullWidth>Cancel</Button>
        <Button variant="primary" fullWidth>Apply</Button>
      </div>
    ),
    children: (
      <div className="space-y-4">
        <h3 className="font-semibold">ClassNames Prop</h3>
        <p className="text-secondary">
          This drawer uses the classNames prop to apply custom CSS classes to nested elements:
        </p>
        <ul className="text-sm space-y-1">
          <li>• overlay: "custom-overlay-class"</li>
          <li>• drawer: "custom-drawer-class"</li>
          <li>• content: "custom-content-class"</li>
          <li>• header: "custom-header-class"</li>
          <li>• body: "custom-body-class"</li>
          <li>• footer: "custom-footer-class"</li>
        </ul>
        <p className="text-sm text-secondary">
          Useful for applying specific styles without modifying the component.
        </p>
      </div>
    )
  }
};

/**
 * Drawer with only close button (most common)
 */
export const OnlyCloseButton: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    children: (
      <div className="p-4">
        <p className="text-secondary">Most common case - no title, just a close button in the header.</p>
      </div>
    )
  }
};

/**
 * Drawer from left side
 */
export const LeftPosition: Story = {
  args: {
    ...Default.args,
    position: 'left',
    title: 'Navigation',
    children: (
      <div className="p-4">
        <p className="text-secondary">Slides in from the left side of the screen.</p>
      </div>
    )
  }
};

/**
 * Drawer from top (position prop: 'top')
 */
export const TopPosition: Story = {
  args: {
    ...Default.args,
    position: 'top',
    size: 'sm',
    title: 'Top Position',
    children: (
      <div className="p-4 text-center">
        <p className="text-secondary">Perfect for notifications or alerts.</p>
      </div>
    )
  }
};

/**
 * Drawer from bottom (position prop: 'bottom')
 */
export const BottomPosition: Story = {
  args: {
    ...Default.args,
    position: 'bottom',
    size: 'md',
    title: 'Bottom Position',
    children: (
      <div className="p-4">
        <p className="text-secondary">Great for mobile action sheets.</p>
      </div>
    )
  }
};

/**
 * Small size drawer (size prop: 'sm')
 */
export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    title: 'Small Size',
    children: (
      <div className="p-4">
        <p className="text-sm text-secondary">Compact size for simple content.</p>
      </div>
    )
  }
};

/**
 * Large size drawer (size prop: 'lg')
 */
export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    title: 'Large Size',
    children: (
      <div className="p-4">
        <p className="text-secondary">More space for complex content and forms.</p>
      </div>
    )
  }
};

/**
 * Extra large size drawer (size prop: 'xl')
 */
export const ExtraLargeSize: Story = {
  args: {
    ...Default.args,
    size: 'xl',
    title: 'Extra Large Size',
    children: (
      <div className="p-4">
        <p className="text-secondary">Maximum space while maintaining margins.</p>
      </div>
    )
  }
};

/**
 * Full size drawer (size prop: 'full')
 */
export const FullSize: Story = {
  args: {
    ...Default.args,
    size: 'full',
    title: 'Full Size',
    children: (
      <div className="p-4">
        <p className="text-secondary">Takes up the entire screen width/height.</p>
      </div>
    )
  }
};

/**
 * Drawer with header and footer
 */
export const WithHeaderFooter: Story = {
  args: {
    ...Default.args,
    header: (
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">Custom Header</h2>
        <Badge variant="primary">Pro</Badge>
      </div>
    ),
    footer: (
      <div className="flex gap-2">
        <Button variant="secondary" fullWidth>Cancel</Button>
        <Button variant="primary" fullWidth>Save Changes</Button>
      </div>
    ),
    children: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Username</label>
          <input type="text" className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input type="email" className="w-full px-3 py-2 border rounded-md" />
        </div>
      </div>
    )
  }
};

/**
 * Navigation drawer example
 */
export const NavigationDrawer: Story = {
  args: {
    ...Default.args,
    position: 'left',
    title: 'Navigation',
    header: (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-semibold">John Doe</div>
          <div className="text-sm text-secondary">john@example.com</div>
        </div>
      </div>
    ),
    children: (
      <nav className="space-y-1">
        <Link 
          href="/" 
          variant="ghost"
          fullWidth
          gap="md"
          leftIcon={<Home className="w-5 h-5" />}
        >
          Home
        </Link>
        <Link 
          href="/games"
          variant="ghost"
          fullWidth
          gap="md"
          leftIcon={<Gamepad2 className="w-5 h-5" />}
          rightIcon={<Badge variant="error" size="sm">New</Badge>}
        >
          Games
        </Link>
        <Link 
          href="/tournaments"
          variant="ghost"
          fullWidth
          gap="md"
          leftIcon={<Trophy className="w-5 h-5" />}
        >
          Tournaments
        </Link>
        <Link 
          href="/favorites"
          variant="ghost"
          fullWidth
          gap="md"
          leftIcon={<Star className="w-5 h-5" />}
          rightIcon={<Badge variant="primary" size="sm">12</Badge>}
        >
          Favorites
        </Link>
        <Link 
          href="/settings"
          variant="ghost"
          fullWidth
          gap="md"
          leftIcon={<Settings className="w-5 h-5" />}
        >
          Settings
        </Link>
      </nav>
    )
  }
};

/**
 * Filter panel drawer
 */
export const FilterDrawer: Story = {
  args: {
    ...Default.args,
    position: 'right',
    size: 'sm',
    title: 'Filters',
    footer: (
      <div className="flex gap-2">
        <Button variant="ghost" fullWidth>Clear All</Button>
        <Button variant="primary" fullWidth>Apply Filters</Button>
      </div>
    ),
    children: (
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Category</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Slots</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Table Games</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Live Casino</span>
            </label>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-2">Provider</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>NetEnt</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Microgaming</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Play&apos;n GO</span>
            </label>
          </div>
        </div>
      </div>
    )
  }
};

/**
 * Without overlay
 */
export const NoOverlay: Story = {
  args: {
    ...Default.args,
    showOverlay: false,
    children: (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">No Overlay</h2>
        <p className="text-secondary">
          The drawer appears without a background overlay, allowing interaction with the page behind.
        </p>
      </div>
    )
  }
};

/**
 * Without close button
 */
export const NoCloseButton: Story = {
  args: {
    ...Default.args,
    showCloseButton: false,
    title: 'No Close Button',
    children: (
      <div className="p-4">
        <p className="text-secondary mb-4">
          Close button is hidden. Users can close using ESC key or clicking the overlay.
        </p>
        <Button variant="secondary" fullWidth>
          Close Drawer
        </Button>
      </div>
    )
  }
};

/**
 * Disabled close interactions
 */
export const NoCloseInteractions: Story = {
  args: {
    ...Default.args,
    closeOnOverlay: false,
    closeOnEsc: false,
    showCloseButton: false,
    title: 'Controlled Closing',
    footer: (
      <Button variant="primary" fullWidth>
        Manual Close Required
      </Button>
    ),
    children: (
      <div className="p-4">
        <p className="text-secondary">
          All automatic close interactions are disabled. The drawer can only be closed programmatically.
        </p>
      </div>
    )
  }
};

/**
 * Fast animation (animationDuration prop: 150ms)
 */
export const FastAnimation: Story = {
  args: {
    ...Default.args,
    animationDuration: 150,
    title: 'Fast Animation (150ms)',
    children: (
      <div className="p-4">
        <p className="text-secondary">Opens and closes with a quick 150ms animation.</p>
      </div>
    )
  }
};

/**
 * Slow animation (animationDuration prop: 600ms)
 */
export const SlowAnimation: Story = {
  args: {
    ...Default.args,
    animationDuration: 600,
    title: 'Slow Animation (600ms)',
    children: (
      <div className="p-4">
        <p className="text-secondary">Opens and closes with a smooth 600ms animation.</p>
      </div>
    )
  }
};

/**
 * All props disabled (closeOnOverlay, closeOnEsc, showCloseButton)
 */
export const AllCloseMethodsDisabled: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    closeOnOverlay: false,
    closeOnEsc: false,
    showCloseButton: false,
    title: 'No Close Options',
    footer: (
      <Button variant="primary" fullWidth>
        Manual Close Required
      </Button>
    ),
    children: (
      <div className="p-4">
        <p className="text-secondary">
          All automatic close methods are disabled. Only programmatic closing works.
        </p>
      </div>
    )
  }
};

/**
 * With overlay but not clickable (showOverlay: true, closeOnOverlay: false)
 */
export const OverlayNotClickable: Story = {
  args: {
    ...Default.args,
    showOverlay: true,
    closeOnOverlay: false,
    title: 'Non-Clickable Overlay',
    children: (
      <div className="p-4">
        <p className="text-secondary">
          Overlay is visible but clicking it won&apos;t close the drawer.
        </p>
      </div>
    )
  }
};

/**
 * Without scroll lock (lockScroll: false)
 */
export const ScrollNotLocked: Story = {
  args: {
    ...Default.args,
    lockScroll: false,
    title: 'Scroll Not Locked',
    children: (
      <div className="p-4">
        <p className="text-secondary">
          The page behind can still be scrolled while drawer is open.
        </p>
      </div>
    )
  }
};

/**
 * Custom className prop
 */
export const WithCustomClass: Story = {
  args: {
    ...Default.args,
    className: 'my-custom-drawer-class',
    title: 'Custom CSS Class',
    children: (
      <div className="p-4">
        <p className="text-secondary">
          Drawer with custom CSS class for additional styling.
        </p>
      </div>
    )
  }
};

/**
 * Custom testId prop
 */
export const WithCustomTestId: Story = {
  args: {
    ...Default.args,
    testId: 'my-special-drawer',
    title: 'Custom Test ID',
    children: (
      <div className="p-4">
        <p className="text-secondary">
          Drawer with custom test ID for testing (data-testid=&quot;my-special-drawer&quot;).
        </p>
      </div>
    )
  }
};

/**
 * Instant open/close (animationDuration: 0)
 */
export const InstantAnimation: Story = {
  args: {
    ...Default.args,
    animationDuration: 0,
    title: 'No Animation',
    children: (
      <div className="p-4">
        <p className="text-secondary">
          Opens and closes instantly with no animation.
        </p>
      </div>
    )
  }
};

/**
 * Interactive example with state management
 */
export const Interactive = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('right');
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold">Interactive Drawer Demo</h2>
        
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => setIsOpen(true)}>
            Open Drawer
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Position</label>
            <select 
              value={position} 
              onChange={(e) => setPosition(e.target.value as 'left' | 'right' | 'top' | 'bottom')}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <select 
              value={size} 
              onChange={(e) => setSize(e.target.value as 'sm' | 'md' | 'lg' | 'xl' | 'full')}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
              <option value="full">Full</option>
            </select>
          </div>
        </div>
      </div>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={position}
        size={size}
        header={
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Interactive Drawer</h2>
            <Badge variant="primary">{position} / {size}</Badge>
          </div>
        }
        footer={
          <Button 
            variant="primary" 
            fullWidth
            onClick={() => setIsOpen(false)}
          >
            Close Drawer
          </Button>
        }
      >
        <div className="space-y-4">
          <p className="text-secondary">
            This drawer is configured with:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Position: <strong>{position}</strong></li>
            <li>Size: <strong>{size}</strong></li>
          </ul>
          <p className="text-sm text-secondary">
            Try changing the position and size using the controls outside the drawer.
          </p>
        </div>
      </Drawer>
    </div>
  );
};

/**
 * Footer variant - Default
 */
export const FooterVariantDefault: Story = {
  args: {
    ...Default.args,
    footer: (
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="md">Cancel</Button>
        <Button variant="primary" size="md">Save Changes</Button>
      </div>
    ),
    footerVariant: 'default',
    children: (
      <div className="p-4">
        <h3 className="font-semibold mb-2">Default Footer Variant</h3>
        <p className="text-secondary">
          The default footer variant inherits the drawer&apos;s background with no additional styling.
        </p>
      </div>
    )
  }
};

/**
 * Footer variant - Elevated
 */
export const FooterVariantElevated: Story = {
  args: {
    ...Default.args,
    footer: (
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="md">Cancel</Button>
        <Button variant="primary" size="md">Save Changes</Button>
      </div>
    ),
    footerVariant: 'elevated',
    children: (
      <div className="p-4">
        <h3 className="font-semibold mb-2">Elevated Footer Variant</h3>
        <p className="text-secondary">
          The elevated footer has a subtle shadow and different background to create visual separation.
        </p>
      </div>
    )
  }
};

/**
 * Footer variant - Bordered
 */
export const FooterVariantBordered: Story = {
  args: {
    ...Default.args,
    footer: (
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="md">Cancel</Button>
        <Button variant="primary" size="md">Save Changes</Button>
      </div>
    ),
    footerVariant: 'bordered',
    children: (
      <div className="p-4">
        <h3 className="font-semibold mb-2">Bordered Footer Variant</h3>
        <p className="text-secondary">
          The bordered footer features a prominent border using the primary color for emphasis.
        </p>
      </div>
    )
  }
};

/**
 * Footer colors - Primary
 */
export const FooterColorPrimary: Story = {
  args: {
    ...Default.args,
    footer: (
      <div className="flex gap-2 justify-between">
        <span>Primary Footer</span>
        <Button variant="secondary" size="sm">Action</Button>
      </div>
    ),
    footerVariant: 'elevated',
    footerColor: 'primary',
    children: (
      <div className="p-4">
        <p>Footer with primary color scheme</p>
      </div>
    )
  }
};

/**
 * Footer colors - Success
 */
export const FooterColorSuccess: Story = {
  args: {
    ...Default.args,
    footer: (
      <div className="flex gap-2 justify-between">
        <span>✓ All changes saved</span>
        <Button variant="secondary" size="sm">Continue</Button>
      </div>
    ),
    footerVariant: 'elevated',
    footerColor: 'success',
    children: (
      <div className="p-4">
        <p>Footer with success color scheme</p>
      </div>
    )
  }
};

/**
 * Footer colors - Warning
 */
export const FooterColorWarning: Story = {
  args: {
    ...Default.args,
    footer: (
      <div className="flex gap-2 justify-between">
        <span>⚠️ Unsaved changes</span>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">Discard</Button>
          <Button variant="primary" size="sm">Save</Button>
        </div>
      </div>
    ),
    footerVariant: 'elevated',
    footerColor: 'warning',
    children: (
      <div className="p-4">
        <p>Footer with warning color scheme</p>
      </div>
    )
  }
};

/**
 * Footer colors - Error
 */
export const FooterColorError: Story = {
  args: {
    ...Default.args,
    footer: (
      <div className="flex gap-2 justify-between">
        <span>❌ Action required</span>
        <Button variant="secondary" size="sm">Fix Issues</Button>
      </div>
    ),
    footerVariant: 'elevated',
    footerColor: 'error',
    children: (
      <div className="p-4">
        <p>Footer with error color scheme</p>
      </div>
    )
  }
};

/**
 * Footer colors - Dark
 */
export const FooterColorDark: Story = {
  args: {
    ...Default.args,
    footer: (
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Apply</Button>
      </div>
    ),
    footerVariant: 'elevated',
    footerColor: 'dark',
    children: (
      <div className="p-4">
        <p>Footer with dark color scheme</p>
      </div>
    )
  }
};

/**
 * Mobile optimized drawer
 */
export const Mobile: Story = {
  args: {
    ...Default.args,
    position: 'bottom',
    size: 'md',
    children: (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Mobile Action Sheet</h2>
        <div className="space-y-2">
          <Button variant="ghost" fullWidth>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button variant="ghost" fullWidth>
            <Heart className="w-4 h-4 mr-2" />
            Add to Favorites
          </Button>
          <Button variant="ghost" fullWidth>
            <Bell className="w-4 h-4 mr-2" />
            Set Notification
          </Button>
          <hr className="my-2" />
          <Button variant="ghost" fullWidth className="text-danger">
            Cancel
          </Button>
        </div>
      </div>
    )
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

/**
 * Dark mode drawer
 */
export const DarkMode: Story = {
  args: {
    ...Default.args,
    children: (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Dark Mode Drawer</h2>
        <p className="text-secondary">
          The drawer automatically adapts to the current theme settings.
        </p>
      </div>
    )
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    (Story) => (
      <div data-theme="dark">
        <Story />
      </div>
    )
  ]
};

/**
 * Neon theme drawer - Cyberpunk interface
 */
export const NeonTheme: Story = {
  args: {
    ...Default.args,
    title: 'Neural Interface',
    header: (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
          <span className="text-xs font-bold text-white">AI</span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-purple-400">Neural Interface</h2>
          <span className="text-xs text-cyan-300">System Online</span>
        </div>
      </div>
    ),
    footer: (
      <div className="flex gap-2">
        <Button variant="ghost" fullWidth>Disconnect</Button>
        <Button variant="primary" fullWidth>Execute</Button>
      </div>
    ),
    children: (
      <div className="space-y-4">
        <div className="p-3 rounded-lg border border-purple-500 border-opacity-20">
          <h3 className="font-semibold text-purple-400 mb-2">System Status</h3>
          <p className="text-cyan-300 text-sm">All neural networks are operational</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-purple-400">CPU Load</span>
            <span className="text-cyan-300">47%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-purple-400">Memory</span>
            <span className="text-cyan-300">8.2 GB</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-purple-400">Network</span>
            <span className="text-green-400">Connected</span>
          </div>
        </div>
      </div>
    )
  },
  decorators: [
    (Story) => (
      <div data-theme="neon" style={{ background: 'rgb(3, 7, 18)', minHeight: '100vh' }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Gold theme drawer - VIP premium interface
 */
export const GoldTheme: Story = {
  args: {
    ...Default.args,
    title: 'VIP Lounge',
    header: (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
          <span className="text-xs font-bold text-white">VIP</span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-yellow-400">VIP Elite Access</h2>
          <span className="text-xs text-yellow-200">Platinum Member</span>
        </div>
      </div>
    ),
    footer: (
      <div className="flex gap-2">
        <Button variant="ghost" fullWidth>Exit Lounge</Button>
        <Button variant="primary" fullWidth>Upgrade Tier</Button>
      </div>
    ),
    children: (
      <div className="space-y-4">
        <div className="p-3 rounded-lg border border-yellow-500 border-opacity-20">
          <h3 className="font-semibold text-yellow-400 mb-2">Member Benefits</h3>
          <p className="text-yellow-200 text-sm">Exclusive access to premium games and rewards</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-yellow-400">Current Balance</span>
            <span className="text-yellow-200">$50,000</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-yellow-400">VIP Points</span>
            <span className="text-yellow-200">12,500</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-yellow-400">Tier Status</span>
            <span className="text-yellow-300">Platinum</span>
          </div>
        </div>
      </div>
    )
  },
  decorators: [
    (Story) => (
      <div data-theme="gold" style={{ background: 'linear-gradient(135deg, #78350f, #422006)', minHeight: '100vh' }}>
        <Story />
      </div>
    )
  ]
};

/**
 * All themes comparison
 */
export const AllThemes: Story = {
  args: {
    isOpen: false,
    onClose: () => console.log('Drawer closed'),
    children: <div>Theme comparison content</div>
  },
  render: () => {
    const [lightOpen, setLightOpen] = useState(false);
    const [darkOpen, setDarkOpen] = useState(false);
    const [neonOpen, setNeonOpen] = useState(false);
    const [goldOpen, setGoldOpen] = useState(false);
    
    return (
      <div className="p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Drawer Themes Comparison</h2>
        
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          <Button onClick={() => setLightOpen(true)} variant="secondary">
            Open Light Theme
          </Button>
          <Button onClick={() => setDarkOpen(true)} variant="secondary">
            Open Dark Theme
          </Button>
          <Button onClick={() => setNeonOpen(true)} variant="secondary">
            Open Neon Theme
          </Button>
          <Button onClick={() => setGoldOpen(true)} variant="secondary">
            Open Gold Theme
          </Button>
        </div>
        
        {/* Light Theme Drawer */}
        <div data-theme="light">
          <Drawer
            isOpen={lightOpen}
            onClose={() => setLightOpen(false)}
            title="Light Theme"
            position="right"
            size="md"
          >
            <div className="p-4 space-y-3">
              <p className="text-gray-600">Clean and bright interface for day time use</p>
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900">Features</h4>
                <ul className="text-sm text-gray-700 mt-1">
                  <li>• High contrast readability</li>
                  <li>• Clean white backgrounds</li>
                  <li>• Professional appearance</li>
                </ul>
              </div>
            </div>
          </Drawer>
        </div>
        
        {/* Dark Theme Drawer */}
        <div data-theme="dark">
          <Drawer
            isOpen={darkOpen}
            onClose={() => setDarkOpen(false)}
            title="Dark Theme"
            position="right"
            size="md"
          >
            <div className="p-4 space-y-3">
              <p className="text-gray-300">Comfortable dark interface for night gaming</p>
              <div className="p-3 bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-white">Features</h4>
                <ul className="text-sm text-gray-300 mt-1">
                  <li>• Reduced eye strain</li>
                  <li>• OLED-friendly</li>
                  <li>• Sleek appearance</li>
                </ul>
              </div>
            </div>
          </Drawer>
        </div>
        
        {/* Neon Theme Drawer */}
        <div data-theme="neon" style={{ background: 'rgb(3, 7, 18)' }}>
          <Drawer
            isOpen={neonOpen}
            onClose={() => setNeonOpen(false)}
            title="Neon Interface"
            position="right"
            size="md"
          >
            <div className="p-4 space-y-3">
              <p className="text-cyan-300">Cyberpunk interface for futuristic gaming</p>
              <div className="p-3 rounded-lg border border-purple-500 border-opacity-20">
                <h4 className="font-semibold text-purple-400">Features</h4>
                <ul className="text-sm text-cyan-300 mt-1">
                  <li>• Neon glow effects</li>
                  <li>• Cyberpunk aesthetics</li>
                  <li>• Immersive experience</li>
                </ul>
              </div>
            </div>
          </Drawer>
        </div>
        
        {/* Gold Theme Drawer */}
        <div data-theme="gold" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
          <Drawer
            isOpen={goldOpen}
            onClose={() => setGoldOpen(false)}
            title="VIP Lounge"
            position="right"
            size="md"
          >
            <div className="p-4 space-y-3">
              <p className="text-yellow-200">Premium interface for VIP members</p>
              <div className="p-3 rounded-lg border border-yellow-500 border-opacity-20">
                <h4 className="font-semibold text-yellow-400">Features</h4>
                <ul className="text-sm text-yellow-200 mt-1">
                  <li>• Luxurious gold accents</li>
                  <li>• Premium styling</li>
                  <li>• Elite experience</li>
                </ul>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
};