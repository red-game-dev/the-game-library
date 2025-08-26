/**
 * Header Component Stories
 * Comprehensive stories showcasing all Header variations
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Header } from './Header';
import { NAVIGATION_ITEMS } from '@/lib/core/config/constants/routes.constants';
import { 
  Home,
  Gamepad2,
  Trophy,
  Star,
  Gift,
  Users,
  MessageCircle,
  HelpCircle
} from 'lucide-react';

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/games',
        query: {},
        push: () => Promise.resolve(),
        replace: () => Promise.resolve(),
        forward: () => Promise.resolve(),
        back: () => Promise.resolve(),
        prefetch: () => Promise.resolve(),
        refresh: () => Promise.resolve(),
      },
    },
    docs: {
      description: {
        component: `
Main navigation header with responsive design for desktop and mobile.
Includes navigation menu, user section, theme switcher, and mobile drawer.

## Features
- **Responsive Navigation**: Desktop nav bar, mobile drawer
- **User Authentication**: Login/signup or user profile display
- **Theme Switching**: Support for light, dark, neon, and gold themes
- **Dropdown Menus**: Multi-level navigation support
- **Search Integration**: Quick access to search functionality
- **Favorites Counter**: Display favorite items count
- **Sticky Header**: Optional fixed positioning with scroll effects
- **Transparent Mode**: Header with background on scroll

## Usage
\`\`\`tsx
import { Header } from '@/components/layout/Header';

<Header
  user={{
    name: 'John Doe',
    avatar: '/avatar.jpg',
    balance: 1000
  }}
  fixed
  showThemeSwitcher
/>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    showUser: {
      control: 'boolean',
      description: 'Show user section in header'
    },
    user: {
      control: 'object',
      description: 'User data for authenticated state'
    },
    navigationItems: {
      control: 'object',
      description: 'Custom navigation items'
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search button'
    },
    showThemeSwitcher: {
      control: 'boolean',
      description: 'Show theme switcher button'
    },
    fixed: {
      control: 'boolean',
      description: 'Fixed header at top of viewport'
    },
    transparent: {
      control: 'boolean',
      description: 'Transparent header with background on scroll'
    },
    logo: {
      control: false,
      description: 'Custom logo component'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  decorators: [
    (Story) => {
      // Provide stores and mocked navigation
      return <Story />;
    }
  ]
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default header configuration
 */
export const Default: Story = {
  args: {
    showUser: true,
    showSearch: true,
    showThemeSwitcher: true,
    fixed: true,
    transparent: false,
    navigationItems: NAVIGATION_ITEMS
  }
};

/**
 * Header with authenticated user
 */
export const Authenticated: Story = {
  args: {
    ...Default.args,
    user: {
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      balance: 2500.50
    }
  }
};

/**
 * Header without user section
 */
export const NoUserSection: Story = {
  args: {
    ...Default.args,
    showUser: false
  }
};

/**
 * Header without search
 */
export const NoSearch: Story = {
  args: {
    ...Default.args,
    showSearch: false
  }
};

/**
 * Header without theme switcher
 */
export const NoThemeSwitcher: Story = {
  args: {
    ...Default.args,
    showThemeSwitcher: false
  }
};

/**
 * Transparent header
 */
export const Transparent: Story = {
  args: {
    ...Default.args,
    transparent: true
  },
  decorators: [
    (Story) => (
      <div>
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '400px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          zIndex: -1
        }} />
        <Story />
        <div style={{ padding: '100px 20px', height: '200vh' }}>
          <h1>Scroll to see header background appear</h1>
          <p>The transparent header gets a background when you scroll.</p>
        </div>
      </div>
    )
  ]
};

/**
 * Non-fixed header
 */
export const NonFixed: Story = {
  args: {
    ...Default.args,
    fixed: false
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div style={{ padding: '20px', height: '200vh' }}>
          <h1>Non-Fixed Header</h1>
          <p>This header scrolls with the page content.</p>
        </div>
      </div>
    )
  ]
};

/**
 * Custom navigation items
 */
export const CustomNavigation: Story = {
  args: {
    ...Default.args,
    navigationItems: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/dashboard',
        icon: <Home className="w-4 h-4" />
      },
      {
        id: 'games',
        label: 'Games',
        href: '/games',
        icon: <Gamepad2 className="w-4 h-4" />,
        badge: 'NEW'
      },
      {
        id: 'rewards',
        label: 'Rewards',
        href: '/rewards',
        icon: <Gift className="w-4 h-4" />,
        isNew: true
      },
      {
        id: 'community',
        label: 'Community',
        href: '/community',
        icon: <Users className="w-4 h-4" />,
        children: [
          { id: 'forum', label: 'Forum', href: '/forum' },
          { id: 'chat', label: 'Live Chat', href: '/chat', icon: <MessageCircle className="w-4 h-4" /> },
          { id: 'leaderboard', label: 'Leaderboard', href: '/leaderboard', icon: <Trophy className="w-4 h-4" /> }
        ]
      },
      {
        id: 'help',
        label: 'Help',
        href: '/help',
        icon: <HelpCircle className="w-4 h-4" />
      }
    ]
  }
};

/**
 * Minimal header
 */
export const Minimal: Story = {
  args: {
    showUser: false,
    showSearch: false,
    showThemeSwitcher: false,
    navigationItems: [
      {
        id: 'home',
        label: 'Home',
        href: '/'
      },
      {
        id: 'games',
        label: 'Games',
        href: '/games'
      },
      {
        id: 'about',
        label: 'About',
        href: '/about'
      }
    ]
  }
};

/**
 * Header with badges
 */
export const WithBadges: Story = {
  args: {
    ...Default.args,
    navigationItems: [
      {
        id: 'home',
        label: 'Home',
        href: '/',
        icon: <Home className="w-4 h-4" />
      },
      {
        id: 'games',
        label: 'Games',
        href: '/games',
        icon: <Gamepad2 className="w-4 h-4" />,
        badge: '99+'
      },
      {
        id: 'promotions',
        label: 'Promotions',
        href: '/promotions',
        icon: <Star className="w-4 h-4" />,
        badge: '5',
        isNew: true
      },
      {
        id: 'tournaments',
        label: 'Tournaments',
        href: '/tournaments',
        icon: <Trophy className="w-4 h-4" />,
        isHot: true
      }
    ]
  }
};

/**
 * Custom logo
 */
export const CustomLogo: Story = {
  args: {
    ...Default.args,
    logo: (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        fontSize: 'clamp(16px, 2.5vw, 20px)',
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        whiteSpace: 'nowrap'
      }}>
        <Gamepad2 style={{ 
          width: 'clamp(24px, 4vw, 32px)', 
          height: 'clamp(24px, 4vw, 32px)', 
          color: '#667eea',
          flexShrink: 0
        }} />
        <span style={{ display: 'inline-block' }}>MEGA GAMES</span>
      </div>
    )
  }
};

/**
 * Mobile view
 */
export const Mobile: Story = {
  args: {
    ...Default.args,
    user: {
      name: 'John',
      balance: 100
    }
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

/**
 * Tablet view
 */
export const Tablet: Story = {
  args: {
    ...Default.args,
    user: {
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=2',
      balance: 1500
    }
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  }
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  args: {
    ...Default.args,
    user: {
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?img=5',
      balance: 5000
    }
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ minHeight: '100vh', background: 'var(--color-background)' }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Neon theme - Cyberpunk header
 */
export const NeonTheme: Story = {
  args: {
    ...Default.args,
    user: {
      name: 'Cyber_User',
      avatar: 'https://i.pravatar.cc/150?img=8',
      balance: 10000
    },
    navigationItems: [
      {
        id: 'home',
        label: 'Matrix',
        href: '/',
        icon: <Home className="w-4 h-4" />
      },
      {
        id: 'games',
        label: 'Neural Games',
        href: '/games',
        icon: <Gamepad2 className="w-4 h-4" />,
        badge: 'LIVE'
      },
      {
        id: 'cyber-promos',
        label: 'Quantum Rewards',
        href: '/promotions',
        icon: <Star className="w-4 h-4" />,
        isHot: true
      },
      {
        id: 'tournaments',
        label: 'Code Battles',
        href: '/tournaments',
        icon: <Trophy className="w-4 h-4" />
      }
    ]
  },
  decorators: [
    (Story) => (
      <div data-theme="neon" style={{ minHeight: '100vh', background: 'rgb(3, 7, 18)' }}>
        <Story />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-purple-400 mb-4">Neural Interface Active</h1>
          <p className="text-cyan-300">Cyberpunk-themed header with neon glow effects</p>
        </div>
      </div>
    )
  ]
};

/**
 * Gold theme - Premium VIP header
 */
export const GoldTheme: Story = {
  args: {
    ...Default.args,
    user: {
      name: 'VIP_Elite',
      avatar: 'https://i.pravatar.cc/150?img=12',
      balance: 50000
    },
    navigationItems: [
      {
        id: 'home',
        label: 'Royal Suite',
        href: '/',
        icon: <Home className="w-4 h-4" />
      },
      {
        id: 'games',
        label: 'Premium Games',
        href: '/games',
        icon: <Gamepad2 className="w-4 h-4" />,
        badge: 'VIP'
      },
      {
        id: 'gold-promos',
        label: 'Platinum Rewards',
        href: '/promotions',
        icon: <Star className="w-4 h-4" />,
        isNew: true
      },
      {
        id: 'tournaments',
        label: 'Elite Tournaments',
        href: '/tournaments',
        icon: <Trophy className="w-4 h-4" />
      }
    ]
  },
  decorators: [
    (Story) => (
      <div data-theme="gold" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <Story />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-yellow-400 mb-4">VIP Exclusive Access</h1>
          <p className="text-yellow-200">Luxurious gold theme for premium members</p>
        </div>
      </div>
    )
  ]
};

/**
 * Long navigation items
 */
export const LongNavigation: Story = {
  args: {
    ...Default.args,
    navigationItems: [
      { id: '1', label: 'Home', href: '/' },
      { id: '2', label: 'All Games', href: '/games' },
      { id: '3', label: 'New Releases', href: '/new' },
      { id: '4', label: 'Popular Now', href: '/popular' },
      { id: '5', label: 'Tournaments', href: '/tournaments' },
      { id: '6', label: 'Promotions', href: '/promotions' },
      { id: '7', label: 'VIP Club', href: '/vip' },
      { id: '8', label: 'Support', href: '/support' },
      { id: '9', label: 'About Us', href: '/about' },
      { id: '10', label: 'Contact', href: '/contact' }
    ]
  }
};

/**
 * With scroll content
 */
export const WithScrollContent: Story = {
  args: {
    ...Default.args,
    transparent: true,
    user: {
      name: 'Player One',
      balance: 777
    }
  },
  decorators: [
    (Story) => (
      <div>
        <div style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
          zIndex: -1
        }} />
        <Story />
        <div style={{ padding: '100px 20px', minHeight: '300vh' }}>
          <h1 style={{ color: 'white', marginBottom: '20px', fontSize: '3rem' }}>Game Library</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '40px', fontSize: '1.2rem' }}>
            Scroll down to see the header background appear when scrolling
          </p>
          
          {/* First section */}
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{ color: 'white', marginBottom: '20px' }}>Featured Games</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '40px'
            }}>
              {[...Array(12)].map((_, i) => (
                <div key={`featured-${i}`} style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '20px',
                  color: 'white',
                  height: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h3>Featured Game {i + 1}</h3>
                    <p style={{ opacity: 0.8 }}>Amazing gameplay experience</p>
                  </div>
                  <button style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer'
                  }}>Play Now</button>
                </div>
              ))}
            </div>
          </section>

          {/* Second section */}
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{ color: 'white', marginBottom: '20px' }}>Popular Games</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '40px'
            }}>
              {[...Array(20)].map((_, i) => (
                <div key={`popular-${i}`} style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  padding: '20px',
                  color: 'white',
                  height: '150px'
                }}>
                  <h4>Game {i + 1}</h4>
                  <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Provider Name</p>
                </div>
              ))}
            </div>
          </section>

          {/* Third section */}
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{ color: 'white', marginBottom: '20px' }}>New Releases</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {[...Array(8)].map((_, i) => (
                <div key={`new-${i}`} style={{
                  background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  color: 'white',
                  height: '180px'
                }}>
                  <div style={{ 
                    background: 'rgba(255,255,255,0.1)',
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    marginBottom: '12px'
                  }}>NEW</div>
                  <h3>New Game {i + 1}</h3>
                  <p style={{ opacity: 0.8, marginTop: '8px' }}>Just released this week!</p>
                </div>
              ))}
            </div>
          </section>

          <p style={{ 
            color: 'white', 
            textAlign: 'center',
            fontSize: '1.5rem',
            marginTop: '80px',
            opacity: 0.6
          }}>
            Keep scrolling to test the header behavior...
          </p>
        </div>
      </div>
    )
  ]
};