/**
 * @fileoverview Storybook stories for Input component
 * @module components/ui/Input/stories
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input, InputGroup, TextArea } from './Input';
import { ToggleableInput } from './ToggleableInput';
import { Button } from '../Button';
import { 
  Search, 
  Mail, 
  Lock, 
  User, 
  CreditCard,
  Phone,
  Globe,
  AlertCircle,
  Check,
  X,
  DollarSign,
  AtSign
} from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Input component for forms with various states and configurations.

## Features
- 🎨 Multiple variants (default, filled, outline, ghost)
- 📏 5 size options (xs, sm, md, lg, xl)
- 🔍 Icon support (left/right)
- ✅ Validation states (success/error/warning)
- 📝 Label and helper text
- 🔒 Password visibility toggle
- 📱 Full width option
- 🌙 Dark mode support
- ♿ Accessible with proper ARIA attributes
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outline', 'ghost']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    state: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning']
    },
    disabled: {
      control: 'boolean'
    },
    fullWidth: {
      control: 'boolean'
    },
    placeholder: {
      control: 'text'
    },
    label: {
      control: 'text'
    },
    helperText: {
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default input
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    variant: 'default',
    size: 'md'
  }
};

/**
 * All variants
 */
export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Input variant="default" placeholder="Default input" />
      <Input variant="filled" placeholder="Filled input" />
      <Input variant="outline" placeholder="Outline input" />
      <Input variant="ghost" placeholder="Ghost input" />
    </div>
  )
};

/**
 * Size comparison
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-5 w-80">
      <Input size="xs" placeholder="Extra Small" />
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
      <Input size="xl" placeholder="Extra Large" />
    </div>
  )
};

/**
 * With icons
 */
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Input leftIcon={<Search className="w-4 h-4" />} placeholder="Search..." />
      <Input leftIcon={<Mail className="w-4 h-4" />} placeholder="Email address" type="email" />
      <Input leftIcon={<User className="w-4 h-4" />} placeholder="Username" />
      <Input 
        leftIcon={<Lock className="w-4 h-4" />} 
        placeholder="Password" 
        type="password" 
      />
      <Input leftIcon={<DollarSign className="w-4 h-4" />} placeholder="0.00" type="number" />
      <Input leftIcon={<AtSign className="w-4 h-4" />} placeholder="@username" />
    </div>
  )
};

/**
 * Validation states
 */
export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Input 
        state="success" 
        value="Valid input" 
        helperText="This input is valid"
        rightIcon={<Check className="w-4 h-4 text-green-500" />}
      />
      <Input 
        state="error" 
        value="Invalid input" 
        helperText="This input has an error"
        rightIcon={<X className="w-4 h-4 text-red-500" />}
      />
      <Input 
        state="warning" 
        value="Warning input" 
        helperText="This input has a warning"
        rightIcon={<AlertCircle className="w-4 h-4 text-orange-500" />}
      />
    </div>
  )
};

/**
 * With labels and helper text
 */
export const WithLabels: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Input 
        label="Email Address" 
        placeholder="john@example.com"
        helperText="We'll never share your email"
        leftIcon={<Mail className="w-4 h-4" />}
      />
      <Input 
        label="Password" 
        type="password"
        placeholder="Enter password"
        helperText="Must be at least 8 characters"
        leftIcon={<Lock className="w-4 h-4" />}
      />
      <Input 
        label="Phone Number" 
        placeholder="+1 (555) 000-0000"
        helperText="Include country code"
        leftIcon={<Phone className="w-4 h-4" />}
      />
    </div>
  )
};

/**
 * Toggleable inputs (password, API keys, etc.)
 */
export const ToggleableInputs: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <ToggleableInput
        type="password"
        label="Password"
        placeholder="Enter password"
        helperText="Click the eye icon to show/hide password"
        leftIcon={<Lock className="w-4 h-4" />}
      />
      
      <ToggleableInput
        type="password"
        label="API Key"
        placeholder="sk-1234567890abcdef"
        helperText="Your secret API key"
      />
      
      <ToggleableInput
        type="text"
        hiddenType="password"
        label="Credit Card"
        placeholder="1234 5678 9012 3456"
        helperText="Card number is hidden by default"
        leftIcon={<CreditCard className="w-4 h-4" />}
      />
      
      <ToggleableInput
        type="password"
        label="PIN Code"
        placeholder="4-digit PIN"
        allowToggle={false}
        maxLength={4}
        helperText="PIN cannot be revealed"
      />
    </div>
  )
};

/**
 * Input groups
 */
export const InputGroups: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Vertical Layout Examples */}
      <div className="w-96">
        <h3 className="text-lg font-semibold mb-4 text-text">Vertical Layout (Default)</h3>
        <div className="p-6 bg-surface rounded-xl">
          <h4 className="text-base font-medium mb-4 text-text">Login Form</h4>
          <InputGroup direction="vertical" gap="md">
            <Input 
              label="Email" 
              type="email" 
              placeholder="email@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
            />
          </InputGroup>
        </div>
      </div>
      
      {/* Horizontal Layout Examples */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text">Horizontal Layout</h3>
        <div className="p-6 bg-surface rounded-xl">
          <h4 className="text-base font-medium mb-4 text-text">Name Fields</h4>
          <InputGroup direction="horizontal" gap="md">
            <Input 
              label="First Name" 
              placeholder="John"
            />
            <Input 
              label="Last Name" 
              placeholder="Doe"
            />
          </InputGroup>
        </div>
      </div>

      {/* Different Gap Sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text">Gap Size Variations</h3>
        <div className="space-y-6">
          <div className="p-4 bg-surface rounded-xl">
            <h4 className="text-sm font-medium mb-3 text-secondary">Extra Small Gap (xs)</h4>
            <InputGroup direction="horizontal" gap="xs">
              <Input placeholder="Input 1" />
              <Input placeholder="Input 2" />
              <Input placeholder="Input 3" />
            </InputGroup>
          </div>
          
          <div className="p-4 bg-surface rounded-xl">
            <h4 className="text-sm font-medium mb-3 text-secondary">Small Gap (sm)</h4>
            <InputGroup direction="horizontal" gap="sm">
              <Input placeholder="Input 1" />
              <Input placeholder="Input 2" />
              <Input placeholder="Input 3" />
            </InputGroup>
          </div>
          
          <div className="p-4 bg-surface rounded-xl">
            <h4 className="text-sm font-medium mb-3 text-secondary">Medium Gap (md)</h4>
            <InputGroup direction="horizontal" gap="md">
              <Input placeholder="Input 1" />
              <Input placeholder="Input 2" />
              <Input placeholder="Input 3" />
            </InputGroup>
          </div>
          
          <div className="p-4 bg-surface rounded-xl">
            <h4 className="text-sm font-medium mb-3 text-secondary">Large Gap (lg)</h4>
            <InputGroup direction="horizontal" gap="lg">
              <Input placeholder="Input 1" />
              <Input placeholder="Input 2" />
            </InputGroup>
          </div>
          
          <div className="p-4 bg-surface rounded-xl">
            <h4 className="text-sm font-medium mb-3 text-secondary">Extra Large Gap (xl)</h4>
            <InputGroup direction="horizontal" gap="xl">
              <Input placeholder="Input 1" />
              <Input placeholder="Input 2" />
            </InputGroup>
          </div>
        </div>
      </div>

      {/* Complex Form Example */}
      <div className="w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-4 text-text">Complex Form Layout</h3>
        <div className="p-6 bg-surface rounded-xl space-y-4">
          <InputGroup direction="horizontal" gap="md">
            <Input label="First Name" placeholder="John" />
            <Input label="Last Name" placeholder="Doe" />
          </InputGroup>
          
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="john.doe@example.com"
            leftIcon={<Mail className="w-4 h-4" />}
          />
          
          <InputGroup direction="horizontal" gap="md">
            <Input 
              label="Phone" 
              placeholder="+1 (555) 000-0000"
              leftIcon={<Phone className="w-4 h-4" />}
            />
            <Input 
              label="Country" 
              placeholder="United States"
              leftIcon={<Globe className="w-4 h-4" />}
            />
          </InputGroup>
          
          <TextArea 
            label="Bio" 
            placeholder="Tell us about yourself..."
            rows={4}
          />
        </div>
      </div>
    </div>
  )
};

/**
 * Disabled states
 */
export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-3 w-80">
      <Input disabled placeholder="Disabled default" />
      <Input disabled variant="filled" placeholder="Disabled filled" />
      <Input disabled variant="outline" placeholder="Disabled outline" />
      <Input disabled value="Disabled with value" />
    </div>
  )
};

/**
 * TextArea component
 */
export const TextAreaExamples: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <TextArea 
        placeholder="Enter your message..." 
        rows={4}
      />
      <TextArea 
        label="Description"
        placeholder="Describe your game..."
        helperText="Maximum 500 characters"
        rows={5}
      />
      <TextArea 
        label="Review"
        placeholder="Write your review..."
        state="success"
        helperText="Your review has been saved"
        rows={6}
      />
    </div>
  )
};

/**
 * Form example
 */
export const FormExample: Story = {
  render: () => (
    <div className="w-96">
      <div className="p-6 bg-surface rounded-xl">
        <h3 className="text-lg font-semibold mb-6 text-text">Create Account</h3>
        
        <InputGroup direction="vertical" gap="lg">
          <Input 
            label="Username" 
            placeholder="Choose a username"
            leftIcon={<User className="w-4 h-4" />}
            helperText="This will be your display name"
          />
          
          <Input 
            label="Email" 
            type="email"
            placeholder="email@example.com"
            leftIcon={<Mail className="w-4 h-4" />}
            helperText="We'll send a verification email"
          />
          
          <InputGroup direction="horizontal" gap="md">
            <ToggleableInput 
              type="password"
              label="Password" 
              placeholder="Password"
              leftIcon={<Lock className="w-4 h-4" />}
            />
            
            <ToggleableInput 
              type="password"
              label="Confirm Password" 
              placeholder="Confirm"
            />
          </InputGroup>
          
          <div className="text-sm text-secondary">
            Password must be at least 8 characters with numbers
          </div>
        </InputGroup>
        
        <div className="mt-6">
          <Button variant="primary" fullWidth>
            Create Account
          </Button>
        </div>
      </div>
    </div>
  )
};

/**
 * Search variations
 */
export const SearchInputs: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input 
        placeholder="Search games..."
        leftIcon={<Search className="w-4 h-4" />}
      />
      <Input 
        variant="filled"
        placeholder="Search players..."
        leftIcon={<Search className="w-4 h-4" />}
      />
      <Input 
        variant="outline"
        placeholder="Search tournaments..."
        rightIcon={<Search className="w-4 h-4" />}
      />
      <Input 
        size="lg"
        placeholder="Search everything..."
        leftIcon={<Search className="w-5 h-5" />}
        className="font-semibold"
      />
    </div>
  )
};

/**
 * Dark mode
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    () => (
      <div data-theme="dark" className="p-8 bg-gray-900 w-96">
        <div className="space-y-4">
          <Input placeholder="Default input" />
          <Input variant="filled" placeholder="Filled input" />
          <Input variant="outline" placeholder="Outline input" />
          <Input 
            leftIcon={<Search className="w-4 h-4" />}
            placeholder="Search..."
          />
        </div>
      </div>
    )
  ]
};

/**
 * Light mode
 */
export const LightMode: Story = {
  parameters: {
    backgrounds: { default: 'light' }
  },
  decorators: [
    () => (
      <div data-theme="light" className="p-8 bg-white w-96">
        <div className="space-y-4">
          <Input placeholder="Default input" />
          <Input variant="filled" placeholder="Filled input" />
          <Input variant="outline" placeholder="Outline input" />
          <Input 
            leftIcon={<Search className="w-4 h-4" />}
            placeholder="Search..."
          />
        </div>
      </div>
    )
  ]
};

/**
 * Neon theme - Cyberpunk input fields
 */
export const NeonTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    () => (
      <div data-theme="neon" className="p-8" style={{ background: 'rgb(3, 7, 18)' }}>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">Neon Theme Inputs</h3>
          <div className="space-y-4 w-96">
            <Input placeholder="Default neon input" />
            <Input variant="filled" placeholder="Filled neon input" />
            <Input variant="outline" placeholder="Outline neon input" />
            <Input 
              leftIcon={<Search className="w-4 h-4" />}
              placeholder="Search the matrix..."
            />
            <Input 
              label="Username"
              placeholder="Enter username"
              helperText="Choose your hacker alias"
            />
            <Input 
              type="password"
              label="Access Code"
              placeholder="Enter access code"
              rightIcon={<Lock className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>
    )
  ]
};

/**
 * Gold theme - Luxurious input fields
 */
export const GoldTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    () => (
      <div data-theme="gold" className="p-8" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">Gold Theme Inputs</h3>
          <div className="space-y-4 w-96">
            <Input placeholder="Default gold input" />
            <Input variant="filled" placeholder="Filled gold input" />
            <Input variant="outline" placeholder="Outline gold input" />
            <Input 
              leftIcon={<Search className="w-4 h-4" />}
              placeholder="Search premium games..."
            />
            <Input 
              label="VIP Name"
              placeholder="Enter your name"
              helperText="As shown on VIP card"
            />
            <Input 
              type="number"
              label="Bet Amount"
              placeholder="0.00"
              leftIcon={<DollarSign className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>
    )
  ]
};

/**
 * All themes comparison
 */
export const AllThemes: Story = {
  decorators: [
    () => (
      <div className="space-y-6">
        <div data-theme="light" className="p-6 bg-white rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Light Theme</h3>
          <div className="space-y-4 w-80">
            <div>
              <p className="text-sm font-medium mb-2">Variants</p>
              <div className="space-y-2">
                <Input placeholder="Default variant" />
                <Input variant="filled" placeholder="Filled variant" />
                <Input variant="outline" placeholder="Outline variant" />
                <Input variant="ghost" placeholder="Ghost variant" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Validation States</p>
              <div className="space-y-2">
                <Input state="success" placeholder="Success state" value="Valid input" readOnly />
                <Input state="error" placeholder="Error state" value="Invalid input" readOnly />
                <Input state="warning" placeholder="Warning state" value="Warning input" readOnly />
              </div>
            </div>
          </div>
        </div>
        
        <div data-theme="dark" className="p-6 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">Dark Theme</h3>
          <div className="space-y-4 w-80">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-2">Variants</p>
              <div className="space-y-2">
                <Input placeholder="Default variant" />
                <Input variant="filled" placeholder="Filled variant" />
                <Input variant="outline" placeholder="Outline variant" />
                <Input variant="ghost" placeholder="Ghost variant" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300 mb-2">Validation States</p>
              <div className="space-y-2">
                <Input state="success" placeholder="Success state" value="Valid input" readOnly />
                <Input state="error" placeholder="Error state" value="Invalid input" readOnly />
                <Input state="warning" placeholder="Warning state" value="Warning input" readOnly />
              </div>
            </div>
          </div>
        </div>
        
        <div data-theme="neon" className="p-6 rounded-lg" style={{ background: 'rgb(3, 7, 18)' }}>
          <h3 className="text-lg font-semibold text-purple-400 mb-3">Neon Theme</h3>
          <div className="space-y-4 w-80">
            <div>
              <p className="text-sm font-medium text-cyan-400 mb-2">Variants</p>
              <div className="space-y-2">
                <Input placeholder="Default variant" />
                <Input variant="filled" placeholder="Filled variant" />
                <Input variant="outline" placeholder="Outline variant" />
                <Input variant="ghost" placeholder="Ghost variant" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-cyan-400 mb-2">Validation States</p>
              <div className="space-y-2">
                <Input state="success" placeholder="Success state" value="Valid input" readOnly />
                <Input state="error" placeholder="Error state" value="Invalid input" readOnly />
                <Input state="warning" placeholder="Warning state" value="Warning input" readOnly />
              </div>
            </div>
          </div>
        </div>
        
        <div data-theme="gold" className="p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">Gold Theme</h3>
          <div className="space-y-4 w-80">
            <div>
              <p className="text-sm font-medium text-yellow-300 mb-2">Variants</p>
              <div className="space-y-2">
                <Input placeholder="Default variant" />
                <Input variant="filled" placeholder="Filled variant" />
                <Input variant="outline" placeholder="Outline variant" />
                <Input variant="ghost" placeholder="Ghost variant" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-300 mb-2">Validation States</p>
              <div className="space-y-2">
                <Input state="success" placeholder="Success state" value="Valid input" readOnly />
                <Input state="error" placeholder="Error state" value="Invalid input" readOnly />
                <Input state="warning" placeholder="Warning state" value="Warning input" readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  ]
};

/**
 * Mobile viewport
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => (
    <div className="p-4 space-y-3">
      <Input 
        fullWidth
        size="lg"
        placeholder="Search games..."
        leftIcon={<Search className="w-5 h-5" />}
      />
      <Input 
        fullWidth
        size="lg"
        label="Email"
        placeholder="email@example.com"
        leftIcon={<Mail className="w-5 h-5" />}
      />
    </div>
  )
};

/**
 * Tablet viewport
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  },
  render: () => (
    <div className="p-6 space-y-4">
      <Input 
        size="lg"
        placeholder="Search games..."
        leftIcon={<Search className="w-5 h-5" />}
      />
      <InputGroup direction="horizontal" gap="md">
        <Input label="First Name" placeholder="John" />
        <Input label="Last Name" placeholder="Doe" />
      </InputGroup>
    </div>
  )
};

/**
 * Interactive playground
 */
export const Playground: Story = {
  args: {
    placeholder: 'Playground Input',
    variant: 'default',
    size: 'md',
    disabled: false,
    fullWidth: false,
    label: '',
    helperText: ''
  }
};