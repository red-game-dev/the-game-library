/**
 * @fileoverview FormField component stories
 * @module components/ui/FormField/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormField } from './FormField';
import { Input } from '@/components/ui/Input';

const meta = {
  title: 'UI/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible form field wrapper component that provides consistent labeling, validation messages, helper text, tooltips, and suggestion features. Supports all form input types with theme switching.'
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label text'
    },
    required: {
      control: 'boolean',
      description: 'Shows required indicator'
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the field'
    },
    error: {
      control: 'text',
      description: 'Error message'
    },
    success: {
      control: 'text',
      description: 'Success message'
    },
    warning: {
      control: 'text',
      description: 'Warning message'
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text for help icon'
    },
    showCount: {
      control: 'boolean',
      description: 'Show character count'
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length'
    },
    showSuggestions: {
      control: 'boolean',
      description: 'Show suggestion chips'
    }
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default FormField
 */
export const Default: Story = {
  args: {
    label: 'Email Address',
    children: <Input type="email" placeholder="john@example.com" />
  }
};

/**
 * Required Field
 */
export const Required: Story = {
  args: {
    label: 'Username',
    required: true,
    children: <Input type="text" placeholder="Enter username" />
  }
};

/**
 * With Helper Text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    helperText: 'Must be at least 8 characters with numbers and symbols',
    children: <Input type="password" placeholder="Enter password" />
  }
};

/**
 * With Tooltip
 */
export const WithTooltip: Story = {
  args: {
    label: 'API Key',
    tooltip: 'You can find your API key in the settings page',
    children: <Input type="text" placeholder="sk_live_..." />
  }
};

/**
 * Validation States
 */
export const ValidationStates: Story = {
  args: { children: <div>Form content</div> },
  render: () => (
    <div className="flex flex-col gap-6 min-w-100">
      <FormField
        label="Error State"
        error="This field is required"
      >
        <Input type="text" state="error" />
      </FormField>
      
      <FormField
        label="Success State"
        success="Username is available"
      >
        <Input type="text" state="success" defaultValue="johndoe" />
      </FormField>
      
      <FormField
        label="Warning State"
        warning="This username will be public"
      >
        <Input type="text" state="warning" defaultValue="john123" />
      </FormField>
      
      <FormField
        label="Info State"
        helperText="Enter your preferred display name"
      >
        <Input type="text" />
      </FormField>
    </div>
  )
};

/**
 * With Character Count
 */
export const WithCharacterCount: Story = {
  args: { children: <div>Form content</div> },
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <FormField
        label="Bio"
        helperText="Tell us about yourself"
        showCount
        maxLength={200}
      >
        <textarea
          className="form-input"
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write your bio..."
        />
      </FormField>
    );
  }
};

/**
 * With Suggestions
 */
export const WithSuggestions: Story = {
  args: { children: <div>Form content</div> },
  render: () => {
    const suggestions = [
      { label: 'React', value: 'react' },
      { label: 'TypeScript', value: 'typescript' },
      { label: 'Next.js', value: 'nextjs' },
      { label: 'Tailwind', value: 'tailwind' },
      { label: 'Node.js', value: 'nodejs' }
    ];
    
    return (
      <FormField
        label="Skills"
        helperText="Select your technical skills"
        suggestions={suggestions}
        showSuggestions
      >
        <Input type="text" placeholder="Type to search skills..." />
      </FormField>
    );
  }
};

/**
 * Custom Suggestions
 */
export const CustomSuggestions: Story = {
  args: { children: <div>Form content</div> },
  render: () => {
    const suggestions = [
      { label: 'Gaming', value: 'gaming' },
      { label: 'Sports', value: 'sports' },
      { label: 'Music', value: 'music' },
      { label: 'Movies', value: 'movies' }
    ];
    
    return (
      <FormField
        label="Interests"
        helperText="Add your interests"
        suggestions={suggestions}
        showSuggestions
      >
        <Input type="text" placeholder="Select interests" />
      </FormField>
    );
  }
};

/**
 * Complex Example
 */
export const ComplexExample: Story = {
  args: { children: <div>Form content</div> },
  render: () => (
    <div className="flex flex-col gap-6 min-w-120">
      <FormField
        label="Project Name"
        required
        tooltip="This will be displayed publicly"
        error="Project name already exists"
      >
        <Input type="text" state="error" defaultValue="my-project" />
      </FormField>
      
      <FormField
        label="Description"
        helperText="Describe your project in detail. Markdown formatting is supported"
        showCount
        maxLength={500}
      >
        <textarea
          className="form-input"
          rows={4}
          placeholder="Project description..."
        />
      </FormField>
      
      <FormField
        label="Tags"
        helperText="Add relevant tags to help others discover your project"
        suggestions={[
          { label: 'Open Source', value: 'opensource' },
          { label: 'JavaScript', value: 'javascript' },
          { label: 'Web App', value: 'webapp' },
          { label: 'Mobile', value: 'mobile' }
        ]}
        showSuggestions
      >
        <Input type="text" placeholder="Add tags..." />
      </FormField>
    </div>
  )
};

/**
 * All Themes - Default
 */
export const AllThemesDefault: Story = {
  args: { children: <div>Form content</div> },
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <FormField
          label="Email Address"
          required
          helperText="We'll never share your email"
          tooltip="Your primary contact email"
        >
          <Input type="email" placeholder="john@example.com" />
        </FormField>
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <FormField
          label="Email Address"
          required
          helperText="We'll never share your email"
          tooltip="Your primary contact email"
        >
          <Input type="email" placeholder="john@example.com" />
        </FormField>
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <FormField
          label="Email Address"
          required
          helperText="We'll never share your email"
          tooltip="Your primary contact email"
        >
          <Input type="email" placeholder="john@example.com" />
        </FormField>
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <FormField
          label="Email Address"
          required
          helperText="We'll never share your email"
          tooltip="Your primary contact email"
        >
          <Input type="email" placeholder="john@example.com" />
        </FormField>
      </div>
    </div>
  )
};

/**
 * All Themes - Validation States
 */
export const AllThemesValidation: Story = {
  args: { children: <div>Form content</div> },
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <div className="space-y-4">
          <FormField label="Error" error="Invalid input">
            <Input type="text" state="error" />
          </FormField>
          <FormField label="Success" success="Looks good!">
            <Input type="text" state="success" />
          </FormField>
          <FormField label="Warning" warning="Be careful">
            <Input type="text" state="warning" />
          </FormField>
        </div>
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <div className="space-y-4">
          <FormField label="Error" error="Invalid input">
            <Input type="text" state="error" />
          </FormField>
          <FormField label="Success" success="Looks good!">
            <Input type="text" state="success" />
          </FormField>
          <FormField label="Warning" warning="Be careful">
            <Input type="text" state="warning" />
          </FormField>
        </div>
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <div className="space-y-4">
          <FormField label="Error" error="Invalid input">
            <Input type="text" state="error" />
          </FormField>
          <FormField label="Success" success="Looks good!">
            <Input type="text" state="success" />
          </FormField>
          <FormField label="Warning" warning="Be careful">
            <Input type="text" state="warning" />
          </FormField>
        </div>
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <div className="space-y-4">
          <FormField label="Error" error="Invalid input">
            <Input type="text" state="error" />
          </FormField>
          <FormField label="Success" success="Looks good!">
            <Input type="text" state="success" />
          </FormField>
          <FormField label="Warning" warning="Be careful">
            <Input type="text" state="warning" />
          </FormField>
        </div>
      </div>
    </div>
  )
};

/**
 * All Themes - With Suggestions
 */
export const AllThemesSuggestions: Story = {
  args: { children: <div>Form content</div> },
  render: () => {
    const suggestions = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
      { label: 'Option 3', value: 'opt3' }
    ];
    
    return (
      <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
        <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
          <FormField
            label="Select Options"
            suggestions={suggestions}
            showSuggestions
          >
            <Input type="text" placeholder="Choose..." />
          </FormField>
        </div>
        
        <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
          <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
          <FormField
            label="Select Options"
            suggestions={suggestions}
            showSuggestions
          >
            <Input type="text" placeholder="Choose..." />
          </FormField>
        </div>
        
        <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
          <FormField
            label="Select Options"
            suggestions={suggestions}
            showSuggestions
          >
            <Input type="text" placeholder="Choose..." />
          </FormField>
        </div>
        
        <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
          <FormField
            label="Select Options"
            suggestions={suggestions}
            showSuggestions
          >
            <Input type="text" placeholder="Choose..." />
          </FormField>
        </div>
      </div>
    );
  }
};

/**
 * Mobile Responsive
 */
export const Mobile: Story = {
  args: { children: <div>Form content</div> },
  parameters: {
    viewport: { defaultViewport: 'mobile1' }
  },
  render: () => (
    <div className="p-4">
      <FormField
        label="Mobile Input"
        required
        helperText="This adapts to mobile screens"
        tooltip="Optimized for touch"
      >
        <Input type="text" placeholder="Enter text..." />
      </FormField>
    </div>
  )
};

/**
 * Accessibility
 */
export const Accessibility: Story = {
  args: { children: <div>Form content</div> },
  render: () => (
    <div className="flex flex-col gap-6 min-w-100">
      <FormField
        label="Accessible Field"
        required
        helperText="This field has proper ARIA attributes"
        error="This error is announced to screen readers"
      >
        <Input
          type="text"
          placeholder="Type here..."
          aria-describedby="field-error field-helper"
          aria-invalid="true"
          aria-required="true"
        />
      </FormField>
      
      <FormField
        label="Field with Instructions"
        tooltip="Additional help is available"
        helperText="Press Tab to navigate between fields"
      >
        <Input
          type="email"
          placeholder="email@example.com"
          aria-label="Email address input"
        />
      </FormField>
    </div>
  )
};

/**
 * Interactive Example
 */
export const Interactive: Story = {
  args: {
    label: 'Interactive Field',
    helperText: 'Use the controls to experiment',
    required: false,
    showCount: false,
    showSuggestions: false,
    children: <Input type="text" placeholder="Interactive input..." />
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls to experiment with different FormField configurations.'
      }
    }
  }
};

import React from 'react';