/**
 * ErrorPage Component Stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { ErrorPage } from './ErrorPage';

const meta = {
  title: 'Features/ErrorPage',
  component: ErrorPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive error page component for displaying various error states with appropriate actions.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    errorType: {
      control: 'select',
      options: ['400', '401', '403', '404', '408', '429', '500', '502', '503', 'network', 'custom'],
      description: 'Type of error to display'
    },
    title: {
      control: 'text',
      description: 'Custom error title'
    },
    description: {
      control: 'text',
      description: 'Custom error description'
    },
    showRetry: {
      control: 'boolean',
      description: 'Show retry button'
    },
    showGoBack: {
      control: 'boolean',
      description: 'Show go back button'
    },
    showGoHome: {
      control: 'boolean',
      description: 'Show go home button'
    },
    badgeText: {
      control: 'text',
      description: 'Custom badge text'
    },
    badgeVariant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Badge variant'
    },
    showSecurityBadge: {
      control: 'boolean',
      description: 'Show security badge for security-related errors'
    },
    onRetry: {
      action: 'retry',
      description: 'Retry handler'
    },
    onGoBack: {
      action: 'go back',
      description: 'Go back handler'
    },
    onGoHome: {
      action: 'go home',
      description: 'Go home handler'
    }
  }
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 404 - Page Not Found
 */
export const NotFound: Story = {
  args: {
    errorType: '404'
  }
};

/**
 * 500 - Internal Server Error
 */
export const ServerError: Story = {
  args: {
    errorType: '500'
  }
};

/**
 * 401 - Unauthorized
 */
export const Unauthorized: Story = {
  args: {
    errorType: '401'
  }
};

/**
 * 403 - Forbidden
 */
export const Forbidden: Story = {
  args: {
    errorType: '403',
    showSecurityBadge: true
  }
};

/**
 * 400 - Bad Request
 */
export const BadRequest: Story = {
  args: {
    errorType: '400'
  }
};

/**
 * 408 - Request Timeout
 */
export const Timeout: Story = {
  args: {
    errorType: '408'
  }
};

/**
 * 429 - Too Many Requests
 */
export const TooManyRequests: Story = {
  args: {
    errorType: '429'
  }
};

/**
 * 502 - Bad Gateway
 */
export const BadGateway: Story = {
  args: {
    errorType: '502'
  }
};

/**
 * 503 - Service Unavailable
 */
export const ServiceUnavailable: Story = {
  args: {
    errorType: '503'
  }
};

/**
 * Network Error
 */
export const NetworkError: Story = {
  args: {
    errorType: 'network'
  }
};

/**
 * Custom Error
 */
export const CustomError: Story = {
  args: {
    errorType: 'custom',
    title: 'Oops! Something went wrong',
    description: 'We encountered an unexpected issue. Our team has been notified.',
    badgeText: 'Custom',
    badgeVariant: 'warning'
  }
};

/**
 * With Additional Content
 */
export const WithAdditionalContent: Story = {
  args: {
    errorType: '404',
    children: (
      <div style={{ 
        padding: '16px', 
        background: 'rgba(139, 92, 246, 0.1)', 
        borderRadius: '8px',
        marginTop: '16px'
      }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          Looking for something specific? Try searching or browse our popular games.
        </p>
      </div>
    )
  }
};

/**
 * Custom Actions
 */
export const CustomActions: Story = {
  args: {
    errorType: '500',
    showRetry: true,
    showGoBack: true,
    showGoHome: true,
    onRetry: () => alert('Custom retry action'),
    onGoBack: () => alert('Custom go back action'),
    onGoHome: () => alert('Custom go home action')
  }
};

/**
 * Minimal - Only Go Home
 */
export const MinimalGoHome: Story = {
  args: {
    errorType: '404',
    showRetry: false,
    showGoBack: false,
    showGoHome: true
  }
};

/**
 * Retry Only
 */
export const RetryOnly: Story = {
  args: {
    errorType: '500',
    showRetry: true,
    showGoBack: false,
    showGoHome: false
  }
};

/**
 * Mobile Responsive
 */
export const Mobile: Story = {
  args: {
    errorType: '404'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

/**
 * Dark Mode
 */
export const DarkMode: Story = {
  args: {
    errorType: '500'
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

/**
 * Neon Theme
 */
export const NeonTheme: Story = {
  args: {
    errorType: '404'
  },
  decorators: [
    (Story) => (
      <div data-theme="neon" style={{ minHeight: '100vh' }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Gold Theme
 */
export const GoldTheme: Story = {
  args: {
    errorType: '503'
  },
  decorators: [
    (Story) => (
      <div data-theme="gold" style={{ minHeight: '100vh' }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Security Error with Badge
 */
export const SecurityError: Story = {
  args: {
    errorType: '403',
    showSecurityBadge: true,
    title: 'Security Violation Detected',
    description: 'Your access has been restricted due to suspicious activity. Please contact security team.',
    badgeText: 'Security',
    badgeVariant: 'error'
  }
};

/**
 * Maintenance Mode
 */
export const Maintenance: Story = {
  args: {
    errorType: 'custom',
    title: 'Under Maintenance',
    description: 'We are currently performing scheduled maintenance. We\'ll be back shortly!',
    badgeText: 'Maintenance',
    badgeVariant: 'warning',
    showRetry: false,
    showGoBack: false,
    showGoHome: true,
    children: (
      <div style={{ marginTop: '16px', fontSize: '14px', opacity: 0.8 }}>
        <p>Expected completion: 2:00 PM UTC</p>
      </div>
    )
  }
};