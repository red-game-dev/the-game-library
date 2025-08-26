/**
 * @fileoverview Label component stories
 * @module components/ui/Label/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { Label } from './Label';

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible label component for form fields with multiple sizes, variants, and states. Supports theme switching and accessibility features.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Label size variant'
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'muted'],
      description: 'Label style variant'
    },
    required: {
      control: 'boolean',
      description: 'Shows required indicator'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state styling'
    },
    error: {
      control: 'boolean',
      description: 'Error state styling'
    },
    children: {
      control: 'text',
      description: 'Label text content'
    },
    htmlFor: {
      control: 'text',
      description: 'Associated form element ID'
    }
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Label
 */
export const Default: Story = {
  args: {
    children: 'Email Address'
  }
};

/**
 * Label Sizes
 */
export const Sizes: Story = {
  args: { children: 'Default' },
  render: () => (
    <div className="flex flex-col gap-4 min-w-96">
      <Label size="xs">Extra Small Label (xs)</Label>
      <Label size="sm">Small Label (sm)</Label>
      <Label size="md">Medium Label (md)</Label>
      <Label size="lg">Large Label (lg)</Label>
      <Label size="xl">Extra Large Label (xl)</Label>
    </div>
  )
};

/**
 * Label Variants
 */
export const Variants: Story = {
  args: { children: 'Default' },
  render: () => (
    <div className="flex flex-col gap-4 min-w-96">
      <Label variant="default">Default Variant</Label>
      <Label variant="primary">Primary Variant</Label>
      <Label variant="secondary">Secondary Variant</Label>
      <Label variant="muted">Muted Variant</Label>
    </div>
  )
};

/**
 * Label States
 */
export const States: Story = {
  args: { children: 'Default' },
  render: () => (
    <div className="flex flex-col gap-4 min-w-96">
      <Label>Normal State</Label>
      <Label required>Required Field</Label>
      <Label disabled>Disabled State</Label>
      <Label error>Error State</Label>
      <Label required error>Required with Error</Label>
      <Label disabled required>Disabled Required</Label>
    </div>
  )
};

/**
 * With Form Elements
 */
export const WithFormElements: Story = {
  args: { children: 'Default' },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" required>
          Email Address
        </Label>
        <input
          id="email"
          type="email"
          className="px-3 py-2 border rounded-md"
          placeholder="john@example.com"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <Label htmlFor="password" error>
          Password
        </Label>
        <input
          id="password"
          type="password"
          className="px-3 py-2 border border-red-500 rounded-md"
          placeholder="Enter password"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <Label htmlFor="bio" variant="secondary">
          Bio
        </Label>
        <textarea
          id="bio"
          className="px-3 py-2 border rounded-md"
          rows={3}
          placeholder="Tell us about yourself"
        />
      </div>
    </div>
  )
};

/**
 * All Themes - Default
 */
export const AllThemesDefault: Story = {
  args: { children: 'Default' },
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <div className="space-y-3">
          <Label>Default Label</Label>
          <Label variant="primary">Primary Label</Label>
          <Label variant="secondary">Secondary Label</Label>
          <Label variant="muted">Muted Label</Label>
          <Label required>Required Label</Label>
          <Label error>Error Label</Label>
          <Label disabled>Disabled Label</Label>
        </div>
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <div className="space-y-3">
          <Label>Default Label</Label>
          <Label variant="primary">Primary Label</Label>
          <Label variant="secondary">Secondary Label</Label>
          <Label variant="muted">Muted Label</Label>
          <Label required>Required Label</Label>
          <Label error>Error Label</Label>
          <Label disabled>Disabled Label</Label>
        </div>
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <div className="space-y-3">
          <Label>Default Label</Label>
          <Label variant="primary">Primary Label</Label>
          <Label variant="secondary">Secondary Label</Label>
          <Label variant="muted">Muted Label</Label>
          <Label required>Required Label</Label>
          <Label error>Error Label</Label>
          <Label disabled>Disabled Label</Label>
        </div>
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <div className="space-y-3">
          <Label>Default Label</Label>
          <Label variant="primary">Primary Label</Label>
          <Label variant="secondary">Secondary Label</Label>
          <Label variant="muted">Muted Label</Label>
          <Label required>Required Label</Label>
          <Label error>Error Label</Label>
          <Label disabled>Disabled Label</Label>
        </div>
      </div>
    </div>
  )
};

/**
 * All Themes - Sizes
 */
export const AllThemesSizes: Story = {
  args: { children: 'Default' },
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <div className="space-y-2">
          <Label size="xs">Extra Small</Label>
          <Label size="sm">Small</Label>
          <Label size="md">Medium</Label>
          <Label size="lg">Large</Label>
          <Label size="xl">Extra Large</Label>
        </div>
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <div className="space-y-2">
          <Label size="xs">Extra Small</Label>
          <Label size="sm">Small</Label>
          <Label size="md">Medium</Label>
          <Label size="lg">Large</Label>
          <Label size="xl">Extra Large</Label>
        </div>
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <div className="space-y-2">
          <Label size="xs">Extra Small</Label>
          <Label size="sm">Small</Label>
          <Label size="md">Medium</Label>
          <Label size="lg">Large</Label>
          <Label size="xl">Extra Large</Label>
        </div>
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <div className="space-y-2">
          <Label size="xs">Extra Small</Label>
          <Label size="sm">Small</Label>
          <Label size="md">Medium</Label>
          <Label size="lg">Large</Label>
          <Label size="xl">Extra Large</Label>
        </div>
      </div>
    </div>
  )
};

/**
 * Combinations
 */
export const Combinations: Story = {
  args: { children: 'Default' },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <Label size="lg" variant="primary" required>
        Large Primary Required
      </Label>
      <Label size="sm" variant="secondary" disabled>
        Small Secondary Disabled
      </Label>
      <Label size="md" variant="muted" error>
        Medium Muted Error
      </Label>
      <Label size="xl" variant="default" required error>
        Extra Large Default Required Error
      </Label>
      <Label size="xs" variant="primary" disabled required>
        Extra Small Primary Disabled Required
      </Label>
    </div>
  )
};

/**
 * Accessibility
 */
export const Accessibility: Story = {
  args: { children: 'Default' },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <Label htmlFor="accessible-input" required>
          Accessible Label with For Attribute
        </Label>
        <input
          id="accessible-input"
          type="text"
          className="mt-2 px-3 py-2 border rounded-md w-full"
          aria-required="true"
          aria-label="Accessible input field"
        />
      </div>
      
      <div>
        <Label htmlFor="error-input" error required>
          Field with Error
        </Label>
        <input
          id="error-input"
          type="text"
          className="mt-2 px-3 py-2 border border-red-500 rounded-md w-full"
          aria-invalid="true"
          aria-describedby="error-message"
        />
        <span id="error-message" className="text-sm text-red-500 mt-1">
          This field is required
        </span>
      </div>
    </div>
  )
};

/**
 * Interactive Example
 */
export const Interactive: Story = {
  args: {
    children: 'Interactive Label',
    size: 'md',
    variant: 'default',
    required: false,
    disabled: false,
    error: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls to experiment with different label configurations.'
      }
    }
  }
};