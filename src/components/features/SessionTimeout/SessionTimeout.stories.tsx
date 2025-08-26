import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useEffect } from 'react';
import { SessionTimeout } from './SessionTimeout';
import { useAuthStore } from '@/lib/core/frontend/stores/auth/useAuthStore';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';

const meta = {
  title: 'Features/SessionTimeout',
  component: SessionTimeout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Session timeout warning component for accessibility compliance. Displays a warning before the user session expires and allows them to extend it.'
      }
    }
  },
  argTypes: {
    sessionTimeout: {
      control: { type: 'number', min: 10000, max: 3600000, step: 10000 },
      description: 'Total session timeout in milliseconds'
    },
    warningTime: {
      control: { type: 'number', min: 5000, max: 600000, step: 5000 },
      description: 'Time before timeout to show warning in milliseconds'
    },
    enabled: {
      control: 'boolean',
      description: 'Enable or disable the session timeout feature'
    },
    demoMode: {
      control: 'boolean',
      description: 'Demo mode - shows modal immediately and loops for testing'
    }
  },
  decorators: [
    (Story) => {
      // Ensure user is authenticated for demo
      useEffect(() => {
        const store = useAuthStore.getState();
        if (!store.isAuthenticated) {
          store.initializeGuestMode();
          store.login({
            name: 'Demo User',
            email: 'demo@example.com',
            balance: 1000
          });
        }
      }, []);
      
      return (
        <div style={{ minHeight: '100vh', padding: '2rem', position: 'relative' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1>Session Timeout Demo</h1>
            <p>This component displays a modal warning before the session expires.</p>
            <Alert variant="info" className="mb-4">
              <strong>How to test:</strong>
              <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem', listStyle: 'disc' }}>
                <li>Stories with demo mode show the modal immediately</li>
                <li>Click &quot;Extend Session&quot; or &quot;I Understand&quot; to dismiss</li>
                <li>The modal will reappear after 1 second in demo mode</li>
                <li>Enable the &quot;Enabled&quot; story for real timeout behavior</li>
              </ul>
            </Alert>
          </div>
          <Story />
        </div>
      );
    }
  ]
} satisfies Meta<typeof SessionTimeout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - disabled by default
export const Default: Story = {
  args: {
    enabled: false,
    sessionTimeout: 30 * 60 * 1000,
    warningTime: 5 * 60 * 1000
  }
};

// Demo mode - shows instantly and loops for testing
export const DemoMode: Story = {
  args: {
    enabled: true,
    demoMode: true,
    sessionTimeout: 30000,
    warningTime: 5000 // 5 second countdown
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo mode for testing. Modal appears immediately and reappears 1 second after dismissal. Perfect for testing UI and interactions.'
      }
    }
  }
};

// Enabled with default timing
export const Enabled: Story = {
  args: {
    enabled: true,
    sessionTimeout: 30 * 60 * 1000,
    warningTime: 5 * 60 * 1000
  }
};

// Quick demo - shows warning immediately with demo mode
export const QuickDemo: Story = {
  args: {
    enabled: true,
    demoMode: true,  // Demo mode shows immediately
    sessionTimeout: 30000, // 30 seconds total
    warningTime: 10000 // 10 seconds countdown
  },
  parameters: {
    docs: {
      description: {
        story: 'Quick demonstration - warning appears immediately. Click "Extend Session" or "I Understand" to see it reappear after 1 second.'
      }
    }
  }
};

// Immediate warning for testing
export const ImmediateWarning: Story = {
  args: {
    enabled: true,
    demoMode: true,  // Demo mode shows immediately
    sessionTimeout: 60000, // 60 seconds total
    warningTime: 60000 // 60 seconds countdown
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the warning modal immediately with a 60-second countdown. Buttons will make it reappear after 1 second for continuous testing.'
      }
    }
  }
};

// Mobile view
export const Mobile: Story = {
  args: {
    enabled: true,
    demoMode: true,  // Demo mode shows immediately
    sessionTimeout: 30000,
    warningTime: 15000
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Session timeout warning on mobile devices.'
      }
    }
  }
};

// Dark mode
export const DarkMode: Story = {
  args: {
    enabled: true,
    demoMode: true,  // Demo mode shows immediately
    sessionTimeout: 30000,
    warningTime: 20000
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Session timeout warning in dark mode.'
      }
    }
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
        return () => {
          document.documentElement.removeAttribute('data-theme');
        };
      }, []);
      return <Story />;
    }
  ]
};

// With user interaction tracking (demo mode for instant display)
export const WithInteraction: Story = {
  args: {
    enabled: true,
    demoMode: true,  // Demo mode shows immediately
    sessionTimeout: 30000, // 30 seconds
    warningTime: 15000 // 15 seconds countdown
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the session timeout UI. In demo mode, interactions are disabled to allow continuous testing.'
      }
    }
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', padding: '2rem', position: 'relative' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2>Interactive Demo</h2>
          <p>The session timeout resets when you:</p>
          <ul>
            <li>Move the mouse</li>
            <li>Press any key</li>
            <li>Scroll the page</li>
            <li>Touch the screen (mobile)</li>
          </ul>
          <p>Try interacting with the page to see the timeout reset.</p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <Button variant="primary">Click Me</Button>
            <Button variant="secondary">Or Me</Button>
            <input type="text" placeholder="Or type here" style={{ padding: '0.5rem' }} />
          </div>
        </div>
        <Story />
        <div style={{ height: '200vh', paddingTop: '2rem' }}>
          <p>Scroll down to see more content...</p>
        </div>
      </div>
    )
  ]
};

// Accessibility focused
export const AccessibilityFocus: Story = {
  args: {
    enabled: true,
    demoMode: true,  // Demo mode shows immediately
    sessionTimeout: 20000,
    warningTime: 15000
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accessibility features including ARIA announcements and keyboard navigation.'
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    }
  }
};