/**
 * ProfileCard Component Stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProfileCard } from './ProfileCard';

const meta = {
  title: 'Features/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An attractive profile card component displaying user information with balance and avatar.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'User name'
    },
    avatar: {
      control: 'text',
      description: 'User avatar URL'
    },
    balance: {
      control: 'number',
      description: 'User balance'
    },
    previousBalance: {
      control: 'number',
      description: 'Previous balance for change indicator'
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'drawer'],
      description: 'Card variant'
    },
    showBalanceChange: {
      control: 'boolean',
      description: 'Show balance change indicator'
    },
    showCurrency: {
      control: 'boolean',
      description: 'Show currency symbol'
    },
    currencySymbol: {
      control: 'text',
      description: 'Currency symbol'
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler'
    }
  }
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default profile card
 */
export const Default: Story = {
  args: {
    name: 'Guest Player',
    balance: 1003.57,
    showBalanceChange: true,
    showCurrency: true
  }
};

/**
 * With avatar image
 */
export const WithAvatar: Story = {
  args: {
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=3',
    balance: 5432.10,
    showBalanceChange: true
  }
};

/**
 * Compact variant for header
 */
export const Compact: Story = {
  args: {
    name: 'Guest Player',
    balance: 1002.10,
    variant: 'compact',
    showBalanceChange: false
  }
};

/**
 * Drawer variant with decoration
 */
export const Drawer: Story = {
  args: {
    name: 'Guest Player',
    balance: 1003.57,
    variant: 'drawer',
    showBalanceChange: true,
    previousBalance: 950.00
  }
};

/**
 * VIP player with high balance
 */
export const VIPPlayer: Story = {
  args: {
    name: 'VIP Player',
    avatar: 'https://i.pravatar.cc/150?img=8',
    balance: 25000.00,
    variant: 'drawer',
    showBalanceChange: true,
    previousBalance: 24500.00
  }
};

/**
 * Balance increase
 */
export const BalanceIncrease: Story = {
  args: {
    name: 'Lucky Player',
    balance: 1500.00,
    previousBalance: 1000.00,
    showBalanceChange: true
  }
};

/**
 * Balance decrease
 */
export const BalanceDecrease: Story = {
  args: {
    name: 'Player',
    balance: 800.00,
    previousBalance: 1000.00,
    showBalanceChange: true
  }
};

/**
 * No balance (new player)
 */
export const NoBalance: Story = {
  args: {
    name: 'New Player',
    balance: 0,
    showBalanceChange: false
  }
};

/**
 * Different currency
 */
export const EuroCurrency: Story = {
  args: {
    name: 'European Player',
    balance: 1234.56,
    currencySymbol: '€',
    showCurrency: true
  }
};

/**
 * Clickable card
 */
export const Clickable: Story = {
  args: {
    name: 'Click Me',
    balance: 999.99,
    onClick: () => console.log('Profile clicked!')
  }
};

/**
 * Long name handling
 */
export const LongName: Story = {
  args: {
    name: 'Very Long Player Name That Should Be Truncated',
    balance: 1234.56,
    variant: 'compact'
  }
};

/**
 * Mobile responsive
 */
export const Mobile: Story = {
  args: {
    name: 'Mobile Player',
    balance: 567.89,
    variant: 'compact'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  args: {
    name: 'Dark Mode Player',
    balance: 2345.67,
    showBalanceChange: true,
    previousBalance: 2000.00
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

/**
 * Neon theme
 */
export const NeonTheme: Story = {
  args: {
    name: 'Neon Player',
    balance: 3456.78,
    variant: 'drawer',
    showBalanceChange: true,
    previousBalance: 3000.00
  },
  decorators: [
    (Story) => (
      <div data-theme="neon">
        <Story />
      </div>
    )
  ]
};

/**
 * Gold theme
 */
export const GoldTheme: Story = {
  args: {
    name: 'Gold Player',
    balance: 10000.00,
    variant: 'drawer',
    showBalanceChange: true,
    previousBalance: 9500.00
  },
  decorators: [
    (Story) => (
      <div data-theme="gold">
        <Story />
      </div>
    )
  ]
};