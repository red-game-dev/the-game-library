/**
 * @fileoverview FormFieldInput component stories
 * @module components/ui/FormField/FormFieldInput/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormFieldInput } from './FormFieldInput';
import React from 'react';

const meta = {
  title: 'UI/FormField/Input',
  component: FormFieldInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A specialized form field component for text inputs with built-in validation, suggestions, and theme support. Extends the base FormField with Input-specific features.'
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label text'
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    required: {
      control: 'boolean',
      description: 'Required field indicator'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    helperText: {
      control: 'text',
      description: 'Helper text below field'
    },
    error: {
      control: 'text',
      description: 'Error message'
    },
    success: {
      control: 'text',
      description: 'Success message'
    },
    showCount: {
      control: 'boolean',
      description: 'Show character counter'
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length'
    },
  },
} satisfies Meta<typeof FormFieldInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Input
 */
export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username'
  }
};

/**
 * Input Types
 */
export const InputTypes: Story = {
  args: { label: 'Default' },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldInput
        label="Text Input"
        type="text"
        placeholder="Enter text..."
      />
      <FormFieldInput
        label="Email Input"
        type="email"
        placeholder="john@example.com"
      />
      <FormFieldInput
        label="Password Input"
        type="password"
        placeholder="Enter password..."
      />
      <FormFieldInput
        label="Number Input"
        type="number"
        placeholder="Enter number..."
        min={0}
        max={100}
      />
      <FormFieldInput
        label="Search Input"
        type="search"
        placeholder="Search..."
      />
      <FormFieldInput
        label="Tel Input"
        type="tel"
        placeholder="+1 (555) 000-0000"
      />
      <FormFieldInput
        label="URL Input"
        type="url"
        placeholder="https://example.com"
      />
    </div>
  )
};

/**
 * Validation States
 */
export const ValidationStates: Story = {
  args: { label: 'Default' },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldInput
        label="Error State"
        value="invalid@"
        error="Please enter a valid email address"
        type="email"
      />
      <FormFieldInput
        label="Success State"
        value="john@example.com"
        success="Email is valid and available"
        type="email"
      />
      <FormFieldInput
        label="Warning State"
        value="admin"
        warning="This username might be restricted"
      />
      <FormFieldInput
        label="Info State"
        placeholder="Choose wisely..."
        helperText="Username cannot be changed later"
      />
    </div>
  )
};

/**
 * With Character Count
 */
export const WithCharacterCount: Story = {
  args: { label: 'Default' },
  render: () => {
    const [value, setValue] = React.useState('Hello World');
    
    return (
      <FormFieldInput
        label="Display Name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        showCount
        maxLength={30}
        helperText="This will be shown on your profile"
      />
    );
  }
};

/**
 * With Suggestions
 */
export const WithSuggestions: Story = {
  args: { label: 'Default' },
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <FormFieldInput
        label="Mention Users"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type @ to mention..."
        helperText="Start typing @ to see suggestions"
      />
    );
  }
};

/**
 * Required Fields
 */
export const RequiredFields: Story = {
  args: { label: 'Default' },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldInput
        label="Required with Helper"
        required
        helperText="This field is mandatory"
        placeholder="Enter value..."
      />
      <FormFieldInput
        label="Required with Error"
        required
        error="This field is required"
        placeholder="Cannot be empty..."
      />
      <FormFieldInput
        label="Required with Tooltip"
        required
        tooltip="Why is this required?"
        placeholder="Important field..."
      />
    </div>
  )
};

/**
 * Disabled States
 */
export const DisabledStates: Story = {
  args: { label: 'Default' },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldInput
        label="Disabled Empty"
        disabled
        placeholder="Cannot edit..."
      />
      <FormFieldInput
        label="Disabled with Value"
        disabled
        value="Locked value"
      />
      <FormFieldInput
        label="Disabled with Helper"
        disabled
        value="System generated"
        helperText="This value is set automatically"
      />
    </div>
  )
};

/**
 * Complex Example
 */
export const ComplexExample: Story = {
  args: { label: 'Default' },
  render: () => {
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    
    const emailValid = email.includes('@') && email.includes('.');
    const usernameValid = username.length >= 3;
    
    return (
      <div className="flex flex-col gap-4 min-w-100">
        <FormFieldInput
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="john@example.com"
          error={email && !emailValid ? 'Invalid email format' : undefined}
          success={email && emailValid ? 'Valid email' : undefined}
          helperText="We'll send a verification link"
        />
        
        <FormFieldInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Choose a username"
          showCount
          maxLength={20}
          error={username && !usernameValid ? 'Too short' : undefined}
          success={username && usernameValid ? 'Username available' : undefined}
          helperText="Minimum 3 characters"
        />
      </div>
    );
  }
};

/**
 * All Themes - Default
 */
export const AllThemesDefault: Story = {
  args: { label: 'Default' },
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <FormFieldInput
          label="Username"
          placeholder="Enter username..."
          required
          helperText="Choose a unique username"
        />
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <FormFieldInput
          label="Username"
          placeholder="Enter username..."
          required
          helperText="Choose a unique username"
        />
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <FormFieldInput
          label="Username"
          placeholder="Enter username..."
          required
          helperText="Choose a unique username"
        />
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <FormFieldInput
          label="Username"
          placeholder="Enter username..."
          required
          helperText="Choose a unique username"
        />
      </div>
    </div>
  )
};

/**
 * All Themes - Validation
 */
export const AllThemesValidation: Story = {
  args: { label: 'Default' },
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <div className="space-y-4">
          <FormFieldInput label="Error" value="bad" error="Invalid input" />
          <FormFieldInput label="Success" value="good" success="Valid!" />
          <FormFieldInput label="Warning" value="hmm" warning="Check this" />
        </div>
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <div className="space-y-4">
          <FormFieldInput label="Error" value="bad" error="Invalid input" />
          <FormFieldInput label="Success" value="good" success="Valid!" />
          <FormFieldInput label="Warning" value="hmm" warning="Check this" />
        </div>
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <div className="space-y-4">
          <FormFieldInput label="Error" value="bad" error="Invalid input" />
          <FormFieldInput label="Success" value="good" success="Valid!" />
          <FormFieldInput label="Warning" value="hmm" warning="Check this" />
        </div>
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <div className="space-y-4">
          <FormFieldInput label="Error" value="bad" error="Invalid input" />
          <FormFieldInput label="Success" value="good" success="Valid!" />
          <FormFieldInput label="Warning" value="hmm" warning="Check this" />
        </div>
      </div>
    </div>
  )
};

/**
 * All Themes - With Features
 */
export const AllThemesFeatures: Story = {
  args: { label: 'Default' },
  render: () => {
    return (
      <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
        <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
          <FormFieldInput
            label="With Features"
            placeholder="Type here..."
            showCount
            maxLength={50}
            tooltip="Help text"
          />
        </div>
        
        <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
          <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
          <FormFieldInput
            label="With Features"
            placeholder="Type here..."
            showCount
            maxLength={50}
            tooltip="Help text"
          />
        </div>
        
        <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
          <FormFieldInput
            label="With Features"
            placeholder="Type here..."
            showCount
            maxLength={50}
            tooltip="Help text"
          />
        </div>
        
        <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
          <FormFieldInput
            label="With Features"
            placeholder="Type here..."
            showCount
            maxLength={50}
            tooltip="Help text"
          />
        </div>
      </div>
    );
  }
};

/**
 * Mobile Responsive
 */
export const Mobile: Story = {
  args: { label: 'Default' },
  parameters: {
    viewport: { defaultViewport: 'mobile1' }
  },
  render: () => (
    <div className="p-4">
      <FormFieldInput
        label="Mobile Input"
        type="email"
        placeholder="email@example.com"
        required
        helperText="Optimized for mobile devices"
      />
    </div>
  )
};

/**
 * Accessibility
 */
export const Accessibility: Story = {
  args: { label: 'Default' },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldInput
        label="Accessible Input"
        required
        placeholder="Has ARIA attributes..."
        helperText="Properly labeled for screen readers"
        error="Error is announced"
        aria-label="Accessible text input"
        aria-describedby="input-helper input-error"
        aria-required="true"
        aria-invalid="true"
      />
      
      <FormFieldInput
        label="With Instructions"
        placeholder="Tab to navigate..."
        helperText="Use arrow keys to select suggestions"
      />
    </div>
  )
};

/**
 * Interactive Example
 */
export const Interactive: Story = {
  args: {
    label: 'Interactive Input',
    type: 'text',
    placeholder: 'Try the controls...',
    helperText: 'Experiment with different settings',
    required: false,
    disabled: false,
    showCount: false,
    maxLength: 100
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls to experiment with different FormFieldInput configurations.'
      }
    }
  }
};