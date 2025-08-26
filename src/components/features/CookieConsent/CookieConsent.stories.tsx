/**
 * @fileoverview Storybook stories for CookieConsent component
 * @module components/features/CookieConsent/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { CookieConsent } from './CookieConsent';
import { useState, useEffect } from 'react';

const meta = {
  title: 'Features/CookieConsent',
  component: CookieConsent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'GDPR-compliant cookie consent banner with customizable options. Uses Modal on mobile and Drawer on desktop for optimal UX.'
      }
    }
  },
  argTypes: {
    bannerSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the cookie banner drawer (desktop only)'
    },
    lockScroll: {
      control: 'boolean',
      description: 'Whether to lock scroll when banner is open'
    },
    persistent: {
      control: 'boolean',
      description: 'Whether to keep drawer open when showing preferences modal (desktop only)'
    },
    mobileBreakpoint: {
      control: 'number',
      description: 'Breakpoint for switching between mobile and desktop view'
    }
  }
} satisfies Meta<typeof CookieConsent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component to reset localStorage for demo
const CookieConsentWrapper = (args: any) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Clear cookie consent from localStorage for demo purposes
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-consent-date');
  }, [key]);

  return (
    <div>
      <button
        onClick={() => {
          localStorage.removeItem('cookie-consent');
          localStorage.removeItem('cookie-consent-date');
          setKey(prev => prev + 1);
        }}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Reset Cookie Consent
      </button>
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Cookie Consent Demo</h1>
          <p className="text-gray-600 mb-8">
            This is a demo page showing the cookie consent banner. Click "Reset Cookie Consent" to show the banner again.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-6 bg-surface rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-2">Sample Content {i}</h3>
                <p className="text-sm text-gray-600">
                  This is placeholder content to demonstrate the cookie consent banner overlay.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CookieConsent key={key} {...args} />
    </div>
  );
};

// Default story
export const Default: Story = {
  render: (args) => <CookieConsentWrapper {...args} />
};

// Small banner size (desktop)
export const SmallBanner: Story = {
  args: {
    bannerSize: 'sm'
  },
  render: (args) => <CookieConsentWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Small height banner, ideal for minimal intrusion'
      }
    }
  }
};

// Medium banner size (desktop)
export const MediumBanner: Story = {
  args: {
    bannerSize: 'md'
  },
  render: (args) => <CookieConsentWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Medium height banner, balanced visibility and content'
      }
    }
  }
};

// Large banner size (desktop)
export const LargeBanner: Story = {
  args: {
    bannerSize: 'lg'
  },
  render: (args) => <CookieConsentWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Large height banner, more prominent with better readability'
      }
    }
  }
};

// Extra large banner size (desktop)
export const ExtraLargeBanner: Story = {
  args: {
    bannerSize: 'xl'
  },
  render: (args) => <CookieConsentWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Extra large banner, maximum visibility and impact'
      }
    }
  }
};

// Without scroll lock
export const WithoutScrollLock: Story = {
  args: {
    lockScroll: false
  },
  render: (args) => <CookieConsentWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Banner without scroll lock, allows page scrolling while banner is open'
      }
    }
  }
};

// Non-persistent mode
export const NonPersistent: Story = {
  args: {
    persistent: false
  },
  render: (args) => <CookieConsentWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Non-persistent mode: drawer closes when preferences modal opens'
      }
    }
  }
};

// Custom mobile breakpoint
export const CustomBreakpoint: Story = {
  args: {
    mobileBreakpoint: 1024
  },
  render: (args) => <CookieConsentWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Custom breakpoint at 1024px for tablet/desktop switching'
      }
    },
    viewport: {
      defaultViewport: 'tablet'
    }
  }
};

// Mobile view
export const MobileView: Story = {
  render: (args) => <CookieConsentWrapper {...args} />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile2'
    },
    docs: {
      description: {
        story: 'Cookie consent on mobile devices uses a modal instead of drawer'
      }
    }
  }
};

// Dark theme
export const DarkTheme: Story = {
  render: (args) => (
    <div className="dark">
      <CookieConsentWrapper {...args} />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Cookie consent banner in dark theme'
      }
    }
  }
};

// Preferences modal demo
export const PreferencesModal: Story = {
  render: () => {
    const [showPreferences, setShowPreferences] = useState(true);
    const [preferences, setPreferences] = useState({
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
    });

    return (
      <div className="p-8">
        <button
          onClick={() => setShowPreferences(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Show Preferences Modal
        </button>
        
        {showPreferences && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full">
              <h2 className="text-xl font-semibold mb-4">Cookie Preferences</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                We use different types of cookies to optimize your experience.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Necessary Cookies</h3>
                    <p className="text-sm text-gray-600">Always enabled</p>
                  </div>
                  <input type="checkbox" checked disabled className="ml-4" />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Analytics Cookies</h3>
                    <p className="text-sm text-gray-600">Help us understand usage</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                    className="ml-4" 
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Marketing Cookies</h3>
                    <p className="text-sm text-gray-600">For targeted advertising</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    className="ml-4" 
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">Personalization Cookies</h3>
                    <p className="text-sm text-gray-600">Remember your preferences</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={preferences.personalization}
                    onChange={(e) => setPreferences({...preferences, personalization: e.target.checked})}
                    className="ml-4" 
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Saved preferences:', preferences);
                    setShowPreferences(false);
                  }}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Standalone preferences modal for managing cookie settings'
      }
    }
  }
};

// Responsive showcase
export const ResponsiveShowcase: Story = {
  render: (args) => (
    <div className="space-y-8">
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Desktop View (Drawer)</h3>
        <p className="text-sm text-gray-600 mb-4">
          On desktop, the cookie consent uses a drawer component that slides up from the bottom.
        </p>
        <div className="bg-gray-100 p-4 rounded" style={{ minHeight: '200px' }}>
          <CookieConsentWrapper {...args} />
        </div>
      </div>
      
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Mobile View (Modal)</h3>
        <p className="text-sm text-gray-600 mb-4">
          On mobile, the cookie consent uses a modal for better touch interaction.
        </p>
        <div className="bg-gray-100 p-4 rounded max-w-sm mx-auto" style={{ minHeight: '400px' }}>
          <CookieConsentWrapper {...args} mobileBreakpoint={9999} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows how cookie consent adapts between desktop and mobile views'
      }
    }
  }
};