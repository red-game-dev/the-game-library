/**
 * @fileoverview Storybook stories for Link component
 * @module components/ui/Link/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { Link } from './Link';
import { 
  Home, 
  ArrowRight, 
  Download, 
  Settings, 
  ExternalLink,
  Mail,
  Phone,
  ChevronRight,
  User,
  Heart
} from 'lucide-react';

const meta = {
  title: 'UI/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible link component with Next.js integration, multiple variants, and icon support. Automatically handles internal and external links with proper routing and security attributes.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'ghost', 'outline', 'underline'],
      description: 'Visual style variant of the link'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the link text and padding'
    },
    padding: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Padding size for the link'
    },
    outlineColor: {
      control: 'select',
      options: ['purple', 'blue', 'green', 'red', 'orange', 'cyan', 'pink', 'gray'],
      description: 'Color for outline variant',
      if: { arg: 'variant', eq: 'outline' }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the link is disabled'
    },
    loading: {
      control: 'boolean',
      description: 'Whether the link is in loading state'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the link takes full width'
    },
    iconOnly: {
      control: 'boolean',
      description: 'Whether the link shows only an icon'
    },
    external: {
      control: 'boolean',
      description: 'Whether the link is external'
    },
    useNextLink: {
      control: 'boolean',
      description: 'Whether to use Next.js Link component'
    },
    href: {
      control: 'text',
      description: 'Link destination URL'
    },
    children: {
      control: 'text',
      description: 'Link text content'
    }
  }
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    href: '/games',
    children: 'Browse Games'
  }
};

export const Primary: Story = {
  args: {
    href: '/games',
    variant: 'primary',
    children: 'Primary Link'
  }
};

export const Secondary: Story = {
  args: {
    href: '/games',
    variant: 'secondary',
    children: 'Secondary Link'
  }
};

export const Accent: Story = {
  args: {
    href: '/games',
    variant: 'accent',
    children: 'Accent Link'
  }
};

export const Success: Story = {
  args: {
    href: '/games',
    variant: 'success',
    children: 'Success Link'
  }
};

export const Error: Story = {
  args: {
    href: '/games',
    variant: 'error',
    children: 'Error Link'
  }
};

export const Warning: Story = {
  args: {
    href: '/games',
    variant: 'warning',
    children: 'Warning Link'
  }
};

export const Ghost: Story = {
  args: {
    href: '/games',
    variant: 'ghost',
    children: 'Ghost Link'
  }
};

export const Underline: Story = {
  args: {
    href: '/games',
    variant: 'underline',
    children: 'Underlined Link'
  }
};

// Outline variants
export const OutlineDefault: Story = {
  args: {
    href: '/games',
    variant: 'outline',
    children: 'Outline Link'
  }
};

export const OutlineColors: Story = {
  args: {
    href: '/games'
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Link href="/games" variant="outline" outlineColor="purple">Purple</Link>
      <Link href="/games" variant="outline" outlineColor="blue">Blue</Link>
      <Link href="/games" variant="outline" outlineColor="green">Green</Link>
      <Link href="/games" variant="outline" outlineColor="red">Red</Link>
      <Link href="/games" variant="outline" outlineColor="orange">Orange</Link>
      <Link href="/games" variant="outline" outlineColor="cyan">Cyan</Link>
      <Link href="/games" variant="outline" outlineColor="pink">Pink</Link>
      <Link href="/games" variant="outline" outlineColor="gray">Gray</Link>
    </div>
  )
};

// Sizes
export const Sizes: Story = {
  args: {
    href: '/games'
  },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <Link href="/games" size="xs">Extra Small Link</Link>
      <Link href="/games" size="sm">Small Link</Link>
      <Link href="/games" size="md">Medium Link</Link>
      <Link href="/games" size="lg">Large Link</Link>
      <Link href="/games" size="xl">Extra Large Link</Link>
    </div>
  )
};

// Padding options
export const PaddingOptions: Story = {
  args: {
    href: '/games'
  },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <Link href="/games" variant="ghost" padding="none">No Padding</Link>
      <Link href="/games" variant="ghost" padding="xs">XS Padding</Link>
      <Link href="/games" variant="ghost" padding="sm">Small Padding</Link>
      <Link href="/games" variant="ghost" padding="md">Medium Padding</Link>
      <Link href="/games" variant="ghost" padding="lg">Large Padding</Link>
      <Link href="/games" variant="ghost" padding="xl">XL Padding</Link>
    </div>
  )
};

// With Icons
export const WithLeftIcon: Story = {
  args: {
    href: '/home',
    leftIcon: <Home size={16} />,
    children: 'Home'
  }
};

export const WithRightIcon: Story = {
  args: {
    href: '/next',
    rightIcon: <ArrowRight size={16} />,
    children: 'Next Page'
  }
};

export const WithBothIcons: Story = {
  args: {
    href: '/download',
    leftIcon: <Download size={16} />,
    rightIcon: <ArrowRight size={16} />,
    children: 'Download'
  }
};

export const IconOnly: Story = {
  args: {
    href: '/settings',
    iconOnly: true,
    children: <Settings size={20} />,
    'aria-label': 'Settings'
  }
};

// External link
export const ExternalLinkShowcase: Story = {
  args: {
    href: 'https://example.com',
    external: true,
    children: 'Visit External Site'
  }
};

export const ExternalWithCustomIcon: Story = {
  args: {
    href: 'https://example.com',
    external: true,
    rightIcon: <ExternalLink size={14} />,
    children: 'Custom External Icon'
  }
};

// States
export const Loading: Story = {
  args: {
    href: '/games',
    loading: true,
    children: 'Loading...'
  }
};

export const Disabled: Story = {
  args: {
    href: '/games',
    disabled: true,
    children: 'Disabled Link'
  }
};

export const FullWidth: Story = {
  args: {
    href: '/games',
    fullWidth: true,
    variant: 'primary',
    children: 'Full Width Link'
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    )
  ]
};

// Navigation examples
export const NavigationMenu: Story = {
  args: {
    href: '/'
  },
  render: () => (
    <nav className="flex gap-6">
      <Link href="/" variant="ghost" padding="sm">Home</Link>
      <Link href="/games" variant="ghost" padding="sm">Games</Link>
      <Link href="/promotions" variant="ghost" padding="sm">Promotions</Link>
      <Link href="/tournaments" variant="ghost" padding="sm">Tournaments</Link>
      <Link href="/about" variant="ghost" padding="sm">About</Link>
    </nav>
  )
};

export const BreadcrumbLinks: Story = {
  args: {
    href: '/'
  },
  render: () => (
    <div className="flex items-center gap-2 text-sm">
      <Link href="/" variant="default" size="sm">Home</Link>
      <ChevronRight size={14} className="text-gray-400" />
      <Link href="/games" variant="default" size="sm">Games</Link>
      <ChevronRight size={14} className="text-gray-400" />
      <span className="text-gray-600">Slots</span>
    </div>
  )
};

export const FooterLinks: Story = {
  args: {
    href: '/privacy'
  },
  render: () => (
    <div className="flex flex-col gap-2">
      <Link href="/privacy" variant="underline" size="sm" padding="none">Privacy Policy</Link>
      <Link href="/terms" variant="underline" size="sm" padding="none">Terms of Service</Link>
      <Link href="/cookies" variant="underline" size="sm" padding="none">Cookie Policy</Link>
      <Link href="/responsible-gaming" variant="underline" size="sm" padding="none">Responsible Gaming</Link>
    </div>
  )
};

// Card with links
export const CardWithLinks: Story = {
  args: {
    href: '/profile'
  },
  render: () => (
    <div className="p-6 bg-surface rounded-lg border border-border max-w-md">
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <div className="space-y-3">
        <Link 
          href="/profile" 
          variant="ghost" 
          leftIcon={<User size={16} />}
          fullWidth
          padding="sm"
        >
          View Profile
        </Link>
        <Link 
          href="/favorites" 
          variant="ghost" 
          leftIcon={<Heart size={16} />}
          fullWidth
          padding="sm"
        >
          My Favorites
        </Link>
        <Link 
          href="/settings" 
          variant="ghost" 
          leftIcon={<Settings size={16} />}
          fullWidth
          padding="sm"
        >
          Account Settings
        </Link>
      </div>
    </div>
  )
};

// Contact links
export const ContactLinks: Story = {
  args: {
    href: 'mailto:support@example.com'
  },
  render: () => (
    <div className="flex gap-4">
      <Link 
        href="mailto:support@example.com" 
        variant="outline"
        outlineColor="blue"
        leftIcon={<Mail size={16} />}
        size="sm"
      >
        Email Us
      </Link>
      <Link 
        href="tel:+1234567890" 
        variant="outline"
        outlineColor="green"
        leftIcon={<Phone size={16} />}
        size="sm"
      >
        Call Us
      </Link>
    </div>
  )
};

// Dark mode example
export const DarkMode: Story = {
  args: {
    href: '/games',
    variant: 'primary',
    children: 'Dark Mode Link'
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    )
  ]
};

// All variants showcase
export const AllVariants: Story = {
  args: {
    href: '#'
  },
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Link href="#" variant="default">Default</Link>
      <Link href="#" variant="primary">Primary</Link>
      <Link href="#" variant="secondary">Secondary</Link>
      <Link href="#" variant="accent">Accent</Link>
      <Link href="#" variant="success">Success</Link>
      <Link href="#" variant="error">Error</Link>
      <Link href="#" variant="warning">Warning</Link>
      <Link href="#" variant="ghost">Ghost</Link>
      <Link href="#" variant="outline">Outline</Link>
      <Link href="#" variant="underline">Underline</Link>
    </div>
  )
};