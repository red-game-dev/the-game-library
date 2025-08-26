/**
 * @fileoverview Storybook stories for Alert component
 * @module components/ui/Alert/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { Alert } from './Alert';
import { Button } from '../Button';
import { useState } from 'react';
import { Bell, Zap, Shield, Star } from 'lucide-react';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Alert component for displaying notifications, messages, and feedback to users. Supports multiple variants, sizes, and dismissible functionality.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: 'Visual variant of the alert'
    },
    type: {
      control: 'select',
      options: ['inline', 'toast', 'banner', 'card'],
      description: 'Alert type affecting styling and behavior'
    },
    size: {
      control: 'select', 
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the alert'
    },
    iconSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Custom icon size'
    },
    iconStyle: {
      control: 'select',
      options: ['default', 'square'],
      description: 'Icon style - default or square'
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed'
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the icon'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether alert should fill its container'
    },
    title: {
      control: 'text',
      description: 'Alert title'
    },
    animate: {
      control: 'boolean',
      description: 'Whether to animate entrance'
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Whether details are initially expanded'
    },
    inlineActions: {
      control: 'boolean',
      description: 'Keep action buttons inline on mobile'
    }
  }
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default alert
 */
export const Default: Story = {
  args: {
    children: 'This is a default alert message.',
    variant: 'default'
  }
};

/**
 * Alert variants
 */
export const Variants: Story = {
  args: {
    children: ''
  },
  render: () => (
    <div className="space-y-4">
      <Alert variant="default">
        Default alert for general information
      </Alert>
      <Alert variant="info">
        Info alert for informational messages
      </Alert>
      <Alert variant="success">
        Success alert for positive feedback
      </Alert>
      <Alert variant="warning">
        Warning alert for cautionary messages
      </Alert>
      <Alert variant="error">
        Error alert for error messages
      </Alert>
    </div>
  )
};

/**
 * With titles
 */
export const WithTitles: Story = {
  args: {
    children: ''
  },
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" title="Information">
        Your profile has been updated successfully.
      </Alert>
      <Alert variant="success" title="Success!">
        Your game has been added to favorites.
      </Alert>
      <Alert variant="warning" title="Warning">
        Your session will expire in 5 minutes.
      </Alert>
      <Alert variant="error" title="Error">
        Failed to load game data. Please try again.
      </Alert>
    </div>
  )
};

/**
 * Size variants
 */
export const Sizes: Story = {
  args: {
    children: ''
  },
  render: () => (
    <div className="space-y-4">
      <Alert size="sm" variant="info" title="Small Alert">
        This is a small alert with compact spacing.
      </Alert>
      <Alert size="md" variant="success" title="Medium Alert">
        This is a medium alert with standard spacing.
      </Alert>
      <Alert size="lg" variant="warning" title="Large Alert">
        This is a large alert with generous spacing.
      </Alert>
    </div>
  )
};

/**
 * Dismissible alerts
 */
export const Dismissible: Story = {
  args: {
    children: ''
  },
  render: () => {
    const [alerts, setAlerts] = useState([
      { id: 1, variant: 'info' as const, message: 'Click the X to dismiss this alert' },
      { id: 2, variant: 'success' as const, message: 'Game added to library!' },
      { id: 3, variant: 'warning' as const, message: 'Low balance warning' },
      { id: 4, variant: 'error' as const, message: 'Connection lost' }
    ]);
    
    return (
      <div className="space-y-4">
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            variant={alert.variant}
            dismissible
            onDismiss={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
          >
            {alert.message}
          </Alert>
        ))}
        {alerts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-secondary mb-4">All alerts dismissed!</p>
            <Button onClick={() => window.location.reload()}>
              Refresh to reset
            </Button>
          </div>
        )}
      </div>
    );
  }
};

/**
 * Custom icons
 */
export const CustomIcons: Story = {
  args: {
    children: ''
  },
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" icon={<Bell className="alert-icon" />}>
        New notification received
      </Alert>
      <Alert variant="success" icon={<Star className="alert-icon" />}>
        Achievement unlocked!
      </Alert>
      <Alert variant="warning" icon={<Shield className="alert-icon" />}>
        Security update available
      </Alert>
      <Alert variant="error" icon={<Zap className="alert-icon" />}>
        Power surge detected
      </Alert>
    </div>
  )
};

/**
 * Without icons
 */
export const NoIcon: Story = {
  args: {
    children: ''
  },
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" showIcon={false}>
        Alert without icon - cleaner look
      </Alert>
      <Alert variant="success" showIcon={false} title="Success">
        Operation completed successfully
      </Alert>
    </div>
  )
};

/**
 * Full width alerts
 */
export const FullWidth: Story = {
  args: {
    children: ''
  },
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" fullWidth title="System Update">
        A new version is available. Please refresh your browser to get the latest features.
      </Alert>
      <Alert variant="warning" fullWidth dismissible onDismiss={() => {}}>
        Maintenance scheduled for tonight at 2:00 AM UTC. The platform will be unavailable for approximately 30 minutes.
      </Alert>
    </div>
  )
};

/**
 * Complex content
 */
export const ComplexContent: Story = {
  args: {
    children: ''
  },
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" title="Multiple Paragraphs">
        <p>This alert contains multiple paragraphs of content.</p>
        <p className="mt-2">Each paragraph maintains proper spacing and readability.</p>
      </Alert>
      
      <Alert variant="success" title="With List">
        <p>Your order has been confirmed:</p>
        <ul className="mt-2 ml-4 list-disc">
          <li>Order #12345</li>
          <li>Total: $99.99</li>
          <li>Estimated delivery: 3-5 days</li>
        </ul>
      </Alert>
      
      <Alert 
        variant="warning" 
        title="With Actions" 
        dismissible 
        onDismiss={() => {}}
        actions={
          <>
            <Button size="sm" variant="primary">Upgrade Now</Button>
            <Button size="sm" variant="ghost">Learn More</Button>
          </>
        }
      >
        Your free trial expires in 3 days.
      </Alert>
    </div>
  )
};

/**
 * Game-specific alerts
 */
export const GameAlerts: Story = {
  args: {
    children: ''
  },
  render: () => (
    <div className="space-y-4">
      <Alert variant="success" title="New Game Added!">
        &quot;Sweet Bonanza&quot; has been added to your favorites.
      </Alert>
      
      <Alert variant="info" title="Jackpot Alert!">
        The Mega Millions jackpot is now over $1,000,000!
      </Alert>
      
      <Alert variant="warning" title="Session Reminder">
        You&apos;ve been playing for 2 hours. Remember to take a break!
      </Alert>
      
      <Alert variant="error" title="Game Unavailable">
        This game is currently under maintenance. Please try again later.
      </Alert>
    </div>
  )
};

/**
 * Toast-like usage
 */
export const ToastSimulation: Story = {
  args: {
    children: ''
  },
  render: () => {
    const [toasts, setToasts] = useState<Array<{
      id: number;
      variant: 'info' | 'success' | 'warning' | 'error';
      message: string;
    }>>([]);
    
    const addToast = (variant: 'info' | 'success' | 'warning' | 'error', message: string) => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, variant, message }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 3000);
    };
    
    return (
      <div>
        <div className="flex gap-2 mb-8">
          <Button 
            variant="primary"
            onClick={() => addToast('success', 'Action completed!')}
          >
            Success Toast
          </Button>
          <Button 
            variant="accent"
            onClick={() => addToast('info', 'Here\'s some information')}
          >
            Info Toast
          </Button>
          <Button 
            variant="warning"
            onClick={() => addToast('warning', 'Be careful!')}
          >
            Warning Toast
          </Button>
          <Button 
            variant="error"
            onClick={() => addToast('error', 'Something went wrong')}
          >
            Error Toast
          </Button>
        </div>
        
        <div className="fixed top-4 right-4 space-y-3 z-50">
          {toasts.map(toast => (
            <Alert
              key={toast.id}
              variant={toast.variant}
              size="sm"
              dismissible
              onDismiss={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
            >
              {toast.message}
            </Alert>
          ))}
        </div>
      </div>
    );
  }
};

/**
 * Dark mode comparison
 */
export const DarkMode: Story = {
  args: {
    children: ''
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" title="Dark Mode">
        Alerts adapt to dark mode automatically
      </Alert>
      <Alert variant="success">
        Colors are optimized for dark backgrounds
      </Alert>
      <Alert variant="warning">
        Maintains excellent contrast in all themes
      </Alert>
      <Alert variant="error" dismissible onDismiss={() => {}}>
        Dismissible alerts work in dark mode too
      </Alert>
    </div>
  )
};

/**
 * Light mode comparison
 */
export const LightMode: Story = {
  args: {
    children: ''
  },
  parameters: {
    backgrounds: { default: 'light' }
  },
  render: () => (
    <div className="space-y-4" data-theme="light">
      <Alert variant="info" title="Light Mode">
        Alerts adapt to light mode automatically
      </Alert>
      <Alert variant="success">
        Colors are optimized for light backgrounds
      </Alert>
      <Alert variant="warning">
        Maintains excellent contrast in all themes
      </Alert>
      <Alert variant="error" dismissible onDismiss={() => {}}>
        Dismissible alerts work in light mode too
      </Alert>
    </div>
  )
};

/**
 * Neon theme - Cyberpunk alerts
 */
export const NeonTheme: Story = {
  args: {
    children: ''
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  render: () => (
    <div className="space-y-4 p-8" data-theme="neon" style={{ background: 'rgb(3, 7, 18)' }}>
      <h3 className="text-lg font-semibold text-purple-400 mb-4">Neon Theme Alerts</h3>
      <Alert variant="info" title="System Update">
        Neural interface update available. Jack in to download.
      </Alert>
      <Alert variant="success" title="Connection Established">
        Successfully connected to the matrix. Bandwidth optimal.
      </Alert>
      <Alert variant="warning" title="Security Warning">
        Firewall breach detected. Initiating countermeasures.
      </Alert>
      <Alert variant="error" title="Critical Error" dismissible onDismiss={() => {}}>
        System overload imminent. Disconnect recommended.
      </Alert>
      <Alert variant="default" icon>
        Welcome to the neon-lit digital frontier.
      </Alert>
    </div>
  )
};

/**
 * Gold theme - Premium alerts
 */
export const GoldTheme: Story = {
  args: {
    children: ''
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  render: () => (
    <div className="space-y-4 p-8" data-theme="gold" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
      <h3 className="text-lg font-semibold text-yellow-400 mb-4">Gold Theme Alerts</h3>
      <Alert variant="info" title="VIP Notice">
        Exclusive content available for premium members.
      </Alert>
      <Alert variant="success" title="Reward Earned">
        Congratulations! You&apos;ve unlocked a golden achievement.
      </Alert>
      <Alert variant="warning" title="Limited Time">
        Premium offer expires in 24 hours. Act now!
      </Alert>
      <Alert variant="error" title="Access Denied" dismissible onDismiss={() => {}}>
        VIP membership required for this feature.
      </Alert>
      <Alert variant="default" icon>
        Experience luxury gaming at its finest.
      </Alert>
    </div>
  )
};

/**
 * All themes comparison
 */
export const AllThemes: Story = {
  args: {
    children: ''
  },
  render: () => (
    <div className="space-y-6">
      <div data-theme="light" className="p-6 bg-white rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Light Theme</h3>
        <div className="space-y-2">
          <Alert variant="info">Information alert in light theme</Alert>
          <Alert variant="success">Success alert in light theme</Alert>
        </div>
      </div>
      
      <div data-theme="dark" className="p-6 bg-gray-900 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Dark Theme</h3>
        <div className="space-y-2">
          <Alert variant="info">Information alert in dark theme</Alert>
          <Alert variant="success">Success alert in dark theme</Alert>
        </div>
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: 'rgb(3, 7, 18)' }}>
        <h3 className="text-lg font-semibold text-purple-400 mb-3">Neon Theme</h3>
        <div className="space-y-2">
          <Alert variant="info">Information alert in neon theme</Alert>
          <Alert variant="success">Success alert in neon theme</Alert>
        </div>
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <h3 className="text-lg font-semibold text-yellow-400 mb-3">Gold Theme</h3>
        <div className="space-y-2">
          <Alert variant="info">Information alert in gold theme</Alert>
          <Alert variant="success">Success alert in gold theme</Alert>
        </div>
      </div>
    </div>
  )
};

/**
 * Expandable details
 */
export const ExpandableDetails: Story = {
  args: {
    children: ''
  },
  render: () => (
    <div className="space-y-4">
      <Alert 
        variant="error" 
        title="Connection Failed"
        details={
          <div>
            <p className="mb-2">
              Error Code: <code>NET_ERR_CONNECTION_REFUSED</code>
            </p>
            <p className="mb-2">
              Timestamp: <code>{new Date().toISOString()}</code>
            </p>
            <p>Please check your internet connection and try again.</p>
          </div>
        }
      >
        Unable to connect to the game server.
      </Alert>
      
      <Alert 
        variant="info" 
        title="System Requirements"
        details={
          <ul className="list-disc ml-4 space-y-1">
            <li>Minimum RAM: 4GB</li>
            <li>Recommended RAM: 8GB</li>
            <li>Graphics: DirectX 11 compatible</li>
            <li>Network: Broadband connection</li>
            <li>Storage: 2GB available space</li>
          </ul>
        }
        defaultExpanded
      >
        Check if your system meets the requirements.
      </Alert>
    </div>
  )
};

/**
 * Different types
 */
export const Types: Story = {
  args: {
    children: ''
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Different alert types for various use cases'
      }
    }
  },
  render: () => (
    <div className="space-y-6 min-w-[600px]">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-text">Inline Type</h3>
        <Alert type="inline" variant="info">
          Default inline alert for contextual messages
        </Alert>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-text">Toast Type</h3>
        <Alert type="toast" variant="success" dismissible onDismiss={() => {}}>
          Toast-style alert with shadow
        </Alert>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-text">Banner Type</h3>
        <Alert type="banner" variant="warning" title="Maintenance Notice">
          Full-width banner alert for important announcements
        </Alert>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3 text-text">Card Type</h3>
        <Alert type="card" variant="info" title="Welcome!" 
          actions={
            <Button size="sm" variant="primary">Get Started</Button>
          }
        >
          Card-style alert with more padding and shadow
        </Alert>
      </div>
    </div>
  )
};

/**
 * With action buttons
 */
export const WithActions: Story = {
  args: {
    children: ''
  },
  render: () => (
    <div className="space-y-4">
      <Alert 
        variant="info" 
        title="New Feature Available"
        inlineActions
        actions={
          <>
            <Button size="sm" variant="primary">Try Now</Button>
            <Button size="sm" variant="ghost">Maybe Later</Button>
          </>
        }
      >
        We&apos;ve added a new tournament mode! Join now to compete.
      </Alert>
      
      <Alert 
        variant="error" 
        title="Payment Failed"
        actions={
          <>
            <Button size="sm" variant="primary" className="alert-action-btn">Retry Payment</Button>
            <Button size="sm" variant="secondary" className="alert-action-btn">Use Different Card</Button>
            <Button size="sm" variant="ghost" className="alert-action-btn">Contact Support</Button>
          </>
        }
        dismissible
        onDismiss={() => {}}
      >
        Your payment could not be processed. Please try again.
      </Alert>
    </div>
  )
};

/**
 * Combined features
 */
export const CombinedFeatures: Story = {
  args: {
    children: ''
  },
  render: () => (
    <Alert 
      type="card"
      variant="warning" 
      title="Account Security Alert"
      dismissible
      onDismiss={() => alert('Dismissed')}
      details={
        <div className="space-y-2">
          <p>We detected a login attempt from:</p>
          <ul className="list-disc ml-4">
            <li>Location: Unknown Location</li>
            <li>Device: Chrome on Windows</li>
            <li>IP Address: 192.168.1.1</li>
            <li>Time: {new Date().toLocaleString()}</li>
          </ul>
          <p className="mt-3">If this wasn&apos;t you, please secure your account immediately.</p>
        </div>
      }
      actions={
        <>
          <Button size="sm" variant="error">Secure Account</Button>
          <Button size="sm" variant="primary">This Was Me</Button>
          <Button size="sm" variant="ghost">Learn More</Button>
        </>
      }
    >
      Unusual login activity detected on your account.
    </Alert>
  )
};

/**
 * Square icon style
 */
export const SquareIconStyle: Story = {
  args: {
    children: ''
  },
  render: () => (
    <div className="space-y-4">
      <Alert 
        variant="error" 
        title="Connection Failed"
        iconStyle="square"
        iconSize="lg"
        details={
          <div>
            <p className="mb-2">
              Error Code: <code>NET_ERR_CONNECTION_REFUSED</code>
            </p>
            <p className="mb-2">
              Timestamp: <code>{new Date().toISOString()}</code>
            </p>
            <p>Please check your internet connection and try again.</p>
          </div>
        }
      >
        Unable to connect to the game server.
      </Alert>
      
      <Alert 
        variant="info" 
        title="System Requirements"
        iconStyle="square"
        iconSize="xl"
        details={
          <ul className="list-disc space-y-1">
            <li>Minimum RAM: 4GB</li>
            <li>Recommended RAM: 8GB</li>
            <li>Graphics: DirectX 11 compatible</li>
            <li>Network: Broadband connection</li>
            <li>Storage: 2GB available space</li>
          </ul>
        }
        defaultExpanded
      >
        Check if your system meets the requirements.
      </Alert>
      
      <Alert
        variant="success"
        title="Large Icon Example"
        iconStyle="square"
        iconSize="xl"
        dismissible
        onDismiss={() => {}}
      >
        This alert uses a large square icon on the left side for better visual hierarchy.
      </Alert>
    </div>
  )
};

/**
 * All Sizes Comparison
 */
export const AllSizesComparison: Story = {
  args: {
    children: ''
  },
  render: () => (
    <div className="space-y-4">
      <Alert size="xs" variant="info" title="XS Size" iconSize="xs">
        Extra small alert with matching icon
      </Alert>
      <Alert size="sm" variant="success" title="SM Size" iconSize="sm">
        Small alert with matching icon
      </Alert>
      <Alert size="md" variant="warning" title="MD Size" iconSize="md">
        Medium alert with matching icon
      </Alert>
      <Alert size="lg" variant="error" title="LG Size" iconSize="lg">
        Large alert with matching icon
      </Alert>
      <Alert size="xl" variant="info" title="XL Size" iconSize="xl">
        Extra large alert with matching icon
      </Alert>
    </div>
  )
};

/**
 * Mixed Icon Styles
 */
export const MixedIconStyles: Story = {
  args: {
    children: ''
  },
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" iconStyle="default" iconSize="md" title="Default Icon Style">
        Standard icon presentation inline with content
      </Alert>
      <Alert variant="success" iconStyle="square" iconSize="lg" title="Square Icon Style">
        Large square icon on the left for better visual hierarchy
      </Alert>
      <Alert variant="warning" iconStyle="square" iconSize="xl" title="Square XL Icon" dismissible>
        Extra large square icon for maximum impact
      </Alert>
    </div>
  )
};

/**
 * Playground
 */
export const Playground: Story = {
  args: {
    variant: 'info',
    type: 'inline',
    title: 'Playground Alert',
    children: 'Customize this alert using the controls panel',
    dismissible: true,
    showIcon: true,
    size: 'md',
    fullWidth: false,
    animate: true,
    iconSize: undefined,
    iconStyle: 'default',
    onDismiss: () => alert('Alert dismissed!')
  }
};
/**
 * Mobile viewport
 */
export const Mobile: Story = {
  args: {
    children: 'Mobile alert'
  },
  render: () => {
    const [alerts, setAlerts] = useState({
      success: true,
      warning: true,
      error: true,
      info: true
    });
    
    const dismissAlert = (type: keyof typeof alerts) => {
      setAlerts(prev => ({ ...prev, [type]: false }));
    };
    
    return (
      <div className="p-3 space-y-4">
        <h2 className="text-base font-semibold mb-2">Mobile Alerts</h2>
        <p className="text-sm text-secondary mb-3">
          Alerts optimized for mobile with full-width layout and touch-friendly dismiss buttons.
        </p>
        
        {alerts.success && (
          <Alert
            variant="success"
            type="inline"
            size="sm"
            fullWidth
            dismissible
            onDismiss={() => dismissAlert('success')}
            title="Success!"
          >
            <p className="text-sm">Your changes have been saved successfully.</p>
          </Alert>
        )}
        
        {alerts.warning && (
          <Alert
            variant="warning"
            type="inline"
            size="sm"
            fullWidth
            dismissible
            onDismiss={() => dismissAlert('warning')}
            title="Warning"
          >
            <p className="text-sm">Your session will expire in 5 minutes.</p>
          </Alert>
        )}
        
        {alerts.error && (
          <Alert
            variant="error"
            type="inline"
            size="sm"
            fullWidth
            dismissible
            onDismiss={() => dismissAlert('error')}
            title="Error"
          >
            <p className="text-sm">Failed to connect to the server. Please try again.</p>
          </Alert>
        )}
        
        {alerts.info && (
          <Alert
            variant="info"
            type="banner"
            size="sm"
            fullWidth
            dismissible={false}
            title="Pro Tip"
          >
            <p className="text-sm">Swipe left on any item to see more options.</p>
          </Alert>
        )}
        
        <div className="pt-4">
          <Button 
            variant="primary" 
            size="sm"
            fullWidth
            onClick={() => setAlerts({ success: true, warning: true, error: true, info: true })}
          >
            Reset All Alerts
          </Button>
        </div>
      </div>
    );
  },
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
  args: {
    children: 'Tablet alert'
  },
  render: () => {
    const [notifications, setNotifications] = useState([
      { id: 1, variant: 'info' as const, title: 'New feature available', message: 'Check out our new dark mode!' },
      { id: 2, variant: 'success' as const, title: 'Profile updated', message: 'Your profile has been successfully updated.' },
      { id: 3, variant: 'warning' as const, title: 'Storage almost full', message: 'You have used 90% of your storage quota.' },
    ]);
    
    const removeNotification = (id: number) => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    };
    
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl font-semibold mb-3">Tablet Notifications</h2>
        <p className="text-base text-secondary mb-4">
          Alerts optimized for tablet viewing with appropriate sizing and spacing.
        </p>
        
        <div className="space-y-4">
          {notifications.map(notification => (
            <Alert
              key={notification.id}
              variant={notification.variant}
              type="inline"
              fullWidth
              dismissible
              onDismiss={() => removeNotification(notification.id)}
              title={notification.title}
              animate
            >
              <p className="text-sm">{notification.message}</p>
            </Alert>
          ))}
          
          {notifications.length === 0 && (
            <Alert
              variant="default"
              type="inline"
              fullWidth
              showIcon={false}
            >
              <p className="text-center text-secondary">No notifications</p>
            </Alert>
          )}
        </div>
        
        <div className="mt-6 flex gap-3">
          <Button 
            variant="primary" 
            onClick={() => {
              const newId = Math.max(...notifications.map(n => n.id), 0) + 1;
              setNotifications(prev => [...prev, {
                id: newId,
                variant: 'info',
                title: 'New notification',
                message: 'This is a new notification message.'
              }]);
            }}
          >
            Add Notification
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setNotifications([])}
          >
            Clear All
          </Button>
        </div>
      </div>
    );
  },
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
    children: 'Responsive alert'
  },
  render: () => (
    <div className="space-y-8 p-4">
      <div>
        <h2 className="text-xl font-bold mb-4">Responsive Alert Showcase</h2>
        <p className="text-secondary mb-6">
          Try different viewport sizes to see how alerts adapt to various screen sizes.
        </p>
      </div>
      
      <div className="space-y-4">
        <Alert
          variant="info"
          type="banner"
          fullWidth
          title="Banner Alert"
        >
          <p className="text-sm">
            This banner alert spans the full width and adapts its padding and font size based on viewport.
          </p>
        </Alert>
        
        <div className="grid grid-cols-1 gap-4">
          <Alert
            variant="success"
            type="card"
            title="Success Alert"
            dismissible
          >
            <p className="text-sm">
              Card-style alert with shadow and proper spacing for readability.
            </p>
          </Alert>
          
          <Alert
            variant="warning"
            type="inline"
            title="Inline Warning"
          >
            <p className="text-sm">
              Inline alerts integrate seamlessly with content flow.
            </p>
          </Alert>
        </div>
        
        <Alert
          variant="error"
          type="toast"
          title="Toast Notification"
          dismissible
          actions={
            <Button variant="ghost" size="sm">
              Retry
            </Button>
          }
        >
          <p className="text-sm">
            Toast-style alerts are perfect for temporary notifications.
          </p>
        </Alert>
      </div>
    </div>
  )
};
