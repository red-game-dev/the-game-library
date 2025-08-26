/**
 * Footer Component Stories
 * Storybook stories for the Footer component
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { Footer } from './Footer';

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Site footer with theme switcher, navigation links, newsletter signup, and social media links.',
      },
    },
  },
  argTypes: {
    showThemeSwitcher: {
      control: 'boolean',
      description: 'Show theme switcher buttons',
    },
    showSocials: {
      control: 'boolean',
      description: 'Show social media links',
    },
    showNewsletter: {
      control: 'boolean',
      description: 'Show newsletter signup section',
    },
    compact: {
      control: 'boolean',
      description: 'Use compact layout for minimal footer',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default footer with all features
export const Default: Story = {
  args: {
    showThemeSwitcher: true,
    showSocials: true,
    showNewsletter: true,
    compact: false,
  },
};

// Compact footer for minimal pages
export const Compact: Story = {
  args: {
    compact: true,
    showThemeSwitcher: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal footer with just copyright and theme switcher',
      },
    },
  },
};

// Footer without newsletter
export const WithoutNewsletter: Story = {
  args: {
    showThemeSwitcher: true,
    showSocials: true,
    showNewsletter: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer without the newsletter signup section',
      },
    },
  },
};

// Footer without social links
export const WithoutSocials: Story = {
  args: {
    showThemeSwitcher: true,
    showSocials: false,
    showNewsletter: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer without social media links',
      },
    },
  },
};

// Footer without theme switcher
export const WithoutThemeSwitcher: Story = {
  args: {
    showThemeSwitcher: false,
    showSocials: true,
    showNewsletter: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer without theme switcher buttons',
      },
    },
  },
};

// Minimal footer with only links
export const MinimalLinks: Story = {
  args: {
    showThemeSwitcher: false,
    showSocials: false,
    showNewsletter: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal footer with only navigation links and copyright',
      },
    },
  },
};

// Dark theme footer
export const DarkTheme: Story = {
  args: {
    showThemeSwitcher: true,
    showSocials: true,
    showNewsletter: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ minHeight: '100vh', background: '#111827' }}>
        <div style={{ minHeight: '50vh' }}></div>
        <Story />
      </div>
    ),
  ],
};

// Neon theme footer - Cyberpunk styling
export const NeonTheme: Story = {
  args: {
    showThemeSwitcher: true,
    showSocials: true,
    showNewsletter: true,
  },
  decorators: [
    (Story) => (
      <div data-theme="neon" style={{ minHeight: '100vh', background: 'rgb(3, 7, 18)' }}>
        <div style={{ minHeight: '50vh', padding: '2rem' }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto',
            textAlign: 'center',
            paddingTop: '4rem'
          }}>
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold',
              color: '#a78bfa',
              marginBottom: '1rem',
              textShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
            }}>
              Neural Gaming Interface
            </h1>
            <p style={{ 
              fontSize: '1.2rem',
              color: '#06b6d4',
              opacity: 0.8,
              marginBottom: '2rem'
            }}>
              Experience the future of gaming in the digital realm
            </p>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Cyberpunk-themed footer with neon glow effects and futuristic styling'
      }
    }
  }
};

// Gold theme footer - Premium VIP styling  
export const GoldTheme: Story = {
  args: {
    showThemeSwitcher: true,
    showSocials: true,
    showNewsletter: true,
  },
  decorators: [
    (Story) => (
      <div data-theme="gold" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <div style={{ minHeight: '50vh', padding: '2rem' }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto',
            textAlign: 'center',
            paddingTop: '4rem'
          }}>
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold',
              color: '#fbbf24',
              marginBottom: '1rem',
              textShadow: '0 0 20px rgba(251, 191, 36, 0.3)'
            }}>
              VIP Gaming Lounge
            </h1>
            <p style={{ 
              fontSize: '1.2rem',
              color: '#fde68a',
              opacity: 0.9,
              marginBottom: '2rem'
            }}>
              Exclusive premium gaming experience for elite members
            </p>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Luxurious gold-themed footer with premium styling for VIP sections'
      }
    }
  }
};

// Mobile responsive view
export const MobileView: Story = {
  args: {
    showThemeSwitcher: true,
    showSocials: true,
    showNewsletter: true,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story: 'Footer on mobile viewport (320px)',
      },
    },
  },
};

// Tablet responsive view
export const TabletView: Story = {
  args: {
    showThemeSwitcher: true,
    showSocials: true,
    showNewsletter: true,
  },
  parameters: {
    viewport: { defaultViewport: 'tablet' },
    docs: {
      description: {
        story: 'Footer on tablet viewport (768px)',
      },
    },
  },
};

// With page content above
export const WithPageContent: Story = {
  args: {
    showThemeSwitcher: true,
    showSocials: true,
    showNewsletter: true,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ 
          flex: 1, 
          padding: '2rem',
          background: 'var(--color-background)',
          color: 'var(--color-text-primary)'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Content</h1>
          <p style={{ marginBottom: '1rem' }}>
            This demonstrates how the footer looks at the bottom of a page with content above it.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            The footer stays at the bottom of the page and has proper spacing and borders.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};

// Compact footer with page content
export const CompactWithPageContent: Story = {
  args: {
    compact: true,
    showThemeSwitcher: true,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ 
          flex: 1, 
          padding: '2rem',
          background: 'var(--color-background)',
          color: 'var(--color-text-primary)'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Minimal Page</h1>
          <p>
            This page uses the compact footer variant which takes up less space.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};

// All themes comparison
export const AllThemes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div data-theme="light" style={{ background: '#ffffff' }}>
        <h3 style={{ padding: '1rem', color: '#111827' }}>Light Theme</h3>
        <Footer showNewsletter={false} />
      </div>
      <div data-theme="dark" style={{ background: '#111827' }}>
        <h3 style={{ padding: '1rem', color: '#f3f4f6' }}>Dark Theme</h3>
        <Footer showNewsletter={false} />
      </div>
      <div data-theme="neon" style={{ background: '#030712' }}>
        <h3 style={{ padding: '1rem', color: '#a78bfa' }}>Neon Theme</h3>
        <Footer showNewsletter={false} />
      </div>
      <div data-theme="gold" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <h3 style={{ padding: '1rem', color: '#fbbf24' }}>Gold Theme</h3>
        <Footer showNewsletter={false} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer appearance across all available themes',
      },
    },
  },
};