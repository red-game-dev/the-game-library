/**
 * @fileoverview FormFieldCheckbox component stories
 * @module components/ui/FormField/FormFieldCheckbox/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormFieldCheckbox } from './FormFieldCheckbox';
import React from 'react';

const meta = {
  title: 'UI/FormField/Checkbox',
  component: FormFieldCheckbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A specialized form field component for checkbox inputs with built-in label, validation states, and theme support. Features custom styling and accessibility enhancements.'
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Main field label (above checkbox)'
    },
    checkboxLabel: {
      control: 'text',
      description: 'Label text next to checkbox'
    },
    rightContent: {
      control: 'text',
      description: 'Content to display on the right side (e.g., count, badge)'
    },
    checked: {
      control: 'boolean',
      description: 'Checked state'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state (partially checked)'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    helperText: {
      control: 'text',
      description: 'Helper text below checkbox'
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
      description: 'Tooltip for help icon'
    }
  },
} satisfies Meta<typeof FormFieldCheckbox>;
export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Checkbox
 */
export const Default: Story = {
  args: {
    checkboxLabel: 'I agree to the terms and conditions'
  }
};
/**
 * With Field Label
 */
export const WithFieldLabel: Story = {
  args: {
    label: 'Preferences',
    checkboxLabel: 'Send me email notifications'
  }
};
/**
 * Checkbox States
 */
export const CheckboxStates: Story = {
  args: { checkboxLabel: 'Default' },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldCheckbox
        checkboxLabel="Unchecked state"
        checked={false}
      />
      <FormFieldCheckbox
        checkboxLabel="Checked state"
        checked={true}
      />
      <FormFieldCheckbox
        checkboxLabel="Indeterminate state"
        indeterminate={true}
      />
      <FormFieldCheckbox
        checkboxLabel="Disabled unchecked"
        disabled={true}
        checked={false}
      />
      <FormFieldCheckbox
        checkboxLabel="Disabled checked"
        disabled={true}
        checked={true}
      />
    </div>
  )
};
/**
 * Gap Variations
 */
export const GapVariations: Story = {
  args: { checkboxLabel: 'Default' },
  render: () => (
    <div className="flex flex-col gap-6 min-w-100">
      <FormFieldCheckbox
        checkboxLabel="Small gap (tightest spacing)"
        gap="sm"
        checked={true}
      />
      <FormFieldCheckbox
        checkboxLabel="Medium gap (default spacing)"
        gap="md"
        checked={true}
      />
      <FormFieldCheckbox
        checkboxLabel="Large gap (more spacing)"
        gap="lg"
        checked={true}
      />
      <FormFieldCheckbox
        checkboxLabel="Default gap with longer text to show alignment"
        gap="md"
        checked={false}
      />
      <FormFieldCheckbox
        checkboxLabel="All elements should be horizontally aligned"
        gap="md"
        checked={true}
        helperText="The checkbox, icon, and text are all on the same line"
      />
    </div>
  )
};
/**
 * Validation States
 */
export const ValidationStates: Story = {
  args: { checkboxLabel: "Default" },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldCheckbox
        checkboxLabel="With error state"
        error="You must accept the terms"
        checked={false}
      />
      <FormFieldCheckbox
        checkboxLabel="With success state"
        success="Thank you for accepting"
        checked={true}
      />
      <FormFieldCheckbox
        checkboxLabel="With warning state"
        warning="This action cannot be undone"
        checked={true}
      />
      <FormFieldCheckbox
        checkboxLabel="With helper text"
        helperText="Optional preference"
        checked={false}
      />
    </div>
  )
};

/**
 * Required Checkbox
 */
export const RequiredCheckbox: Story = {
  args: { checkboxLabel: "Default" },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldCheckbox
        label="Legal Agreement"
        checkboxLabel="I accept the terms of service"
        helperText="You must accept to continue"
      />
      <FormFieldCheckbox
        checkboxLabel="I agree to receive marketing emails"
        error="This field is required"
      />
    </div>
  )
};
/**
 * With Helper Elements
 */
export const WithHelperElements: Story = {
  args: { checkboxLabel: "Default" },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldCheckbox
        checkboxLabel="Enable notifications"
        helperText="You can change this anytime in settings"
      />
      <FormFieldCheckbox
        checkboxLabel="Share usage data"
        tooltip="Help us improve by sharing anonymous usage data"
      />
      <FormFieldCheckbox
        label="Privacy Settings"
        checkboxLabel="Make profile public"
        helperText="Others will be able to see your profile"
        tooltip="Learn more about privacy settings"
      />
    </div>
  )
};
/**
 * With Right Content
 */
export const WithRightContent: Story = {
  args: { checkboxLabel: "Default" },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldCheckbox
        label="Providers"
        checkboxLabel="NetEnt"
        rightContent="147"
        checked={true}
        helperText="Provider with game count"
      />
      <FormFieldCheckbox
        checkboxLabel="Evolution Gaming"
        rightContent="89"
        checked={false}
      />
      <FormFieldCheckbox
        checkboxLabel="Pragmatic Play"
        rightContent={
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            New
          </span>
        }
      />
      <FormFieldCheckbox
        checkboxLabel="Microgaming"
        rightContent={
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-xs">Online</span>
          </span>
        }
        checked={true}
      />
      <FormFieldCheckbox
        checkboxLabel="Play'n GO"
        rightContent={
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">234</span>
            <span className="px-1 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">Hot</span>
          </div>
        }
      />
    </div>
  )
};
/**
 * Provider-style Checkboxes (FilterPanel Pattern)
 */
export const ProviderStyle: Story = {
  args: { checkboxLabel: "Default" },
  render: () => {
    const [providers, setProviders] = React.useState({
      netent: true,
      evolution: false,
      pragmatic: true,
      microgaming: false,
      playtech: false
    });
    const providerData = [
      { id: 'netent', name: 'NetEnt', count: 147 },
      { id: 'evolution', name: 'Evolution Gaming', count: 89 },
      { id: 'pragmatic', name: 'Pragmatic Play', count: 234 },
      { id: 'microgaming', name: 'Microgaming', count: 156 },
      { id: 'playtech', name: 'Playtech', count: 98 }
    ];
    return (
      <div className="flex flex-col gap-3 min-w-100">
        <h3 className="text-lg font-semibold">Game Providers</h3>
        {providerData.map((provider) => (
          <FormFieldCheckbox
            key={provider.id}
            checkboxLabel={provider.name}
            rightContent={provider.count}
            checked={providers[provider.id as keyof typeof providers]}
            onChange={(checked) => 
              setProviders(prev => ({...prev, [provider.id]: checked}))
            }
          />
        ))}
      </div>
    );
  }
};

/**
 * Checkbox Groups
 */
export const CheckboxGroups: Story = {
  args: { checkboxLabel: "Default" },
  render: () => {
    const [selections, setSelections] = React.useState({
      email: true,
      sms: false,
      push: true
    });
    
    return (
      <div className="flex flex-col gap-4 min-w-100">
        <h3 className="text-lg font-semibold">Notification Preferences</h3>
        <FormFieldCheckbox
          checkboxLabel="Email notifications"
          checked={selections.email}
          onChange={(checked) => setSelections({...selections, email: checked})}
          helperText="Daily digest and important updates"
        />
        <FormFieldCheckbox
          checkboxLabel="SMS notifications"
          checked={selections.sms}
          onChange={(checked) => setSelections({...selections, sms: checked})}
          helperText="Only critical alerts"
        />
        <FormFieldCheckbox
          checkboxLabel="Push notifications"
          checked={selections.push}
          onChange={(checked) => setSelections({...selections, push: checked})}
          helperText="Real-time updates in your browser"
        />
      </div>
    );
  }
};

/**
 * Complex Example
 */
export const ComplexExample: Story = {
  args: { checkboxLabel: "Default" },
  render: () => {
    const [agreed, setAgreed] = React.useState(false);
    const [subscribe, setSubscribe] = React.useState(false);
    
    return (
      <div className="flex flex-col gap-6 p-6 border rounded-lg min-w-100">
        <h3 className="text-lg font-semibold">Complete Registration</h3>
        
        <FormFieldCheckbox
          label="Terms & Conditions"
          checkboxLabel="I have read and accept the terms of service"
          checked={agreed}
          onChange={(checked) => setAgreed(checked)}
          error={!agreed ? "You must accept to continue" : undefined}
          helperText="Please review our terms before accepting"
        />
        
        <FormFieldCheckbox
          label="Marketing Preferences"
          checkboxLabel="Send me product updates and special offers"
          checked={subscribe}
          onChange={(checked) => setSubscribe(checked)}
          helperText="You can unsubscribe at any time"
          tooltip="We send maximum 2 emails per month"
        />
        
        <button 
          className={`px-4 py-2 rounded ${agreed ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500'}`}
          disabled={!agreed}
        >
          Continue
        </button>
      </div>
    );
  }
};

/**
 * All Themes - Default
 */
export const AllThemesDefault: Story = {
  args: { checkboxLabel: "Default" },
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <FormFieldCheckbox
          checkboxLabel="Enable feature"
          helperText="This can be changed later"
        />
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <FormFieldCheckbox
          checkboxLabel="Enable feature"
          helperText="This can be changed later"
        />
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <FormFieldCheckbox
          checkboxLabel="Enable feature"
          helperText="This can be changed later"
        />
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <FormFieldCheckbox
          checkboxLabel="Enable feature"
          helperText="This can be changed later"
        />
      </div>
    </div>
  )
};

/**
 * All Themes - States
 */
export const AllThemesStates: Story = {
  args: { checkboxLabel: "Default" },
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <div className="space-y-3">
          <FormFieldCheckbox checkboxLabel="Unchecked" checked={false} />
          <FormFieldCheckbox checkboxLabel="Checked" checked={true} />
          <FormFieldCheckbox checkboxLabel="Disabled" disabled checked={false} />
          <FormFieldCheckbox checkboxLabel="Indeterminate" indeterminate />
        </div>
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <div className="space-y-3">
          <FormFieldCheckbox checkboxLabel="Unchecked" checked={false} />
          <FormFieldCheckbox checkboxLabel="Checked" checked={true} />
          <FormFieldCheckbox checkboxLabel="Disabled" disabled checked={false} />
          <FormFieldCheckbox checkboxLabel="Indeterminate" indeterminate />
        </div>
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <div className="space-y-3">
          <FormFieldCheckbox checkboxLabel="Unchecked" checked={false} />
          <FormFieldCheckbox checkboxLabel="Checked" checked={true} />
          <FormFieldCheckbox checkboxLabel="Disabled" disabled checked={false} />
          <FormFieldCheckbox checkboxLabel="Indeterminate" indeterminate />
        </div>
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <div className="space-y-3">
          <FormFieldCheckbox checkboxLabel="Unchecked" checked={false} />
          <FormFieldCheckbox checkboxLabel="Checked" checked={true} />
          <FormFieldCheckbox checkboxLabel="Disabled" disabled checked={false} />
          <FormFieldCheckbox checkboxLabel="Indeterminate" indeterminate />
        </div>
      </div>
    </div>
  )
};

/**
 * All Themes - Validation
 */
export const AllThemesValidation: Story = {
  args: { checkboxLabel: "Default" },
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <div className="space-y-3">
          <FormFieldCheckbox checkboxLabel="Error" error="Required field" />
          <FormFieldCheckbox checkboxLabel="Success" success="Saved!" checked />
          <FormFieldCheckbox checkboxLabel="Warning" warning="Be careful" />
        </div>
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <div className="space-y-3">
          <FormFieldCheckbox checkboxLabel="Error" error="Required field" />
          <FormFieldCheckbox checkboxLabel="Success" success="Saved!" checked />
          <FormFieldCheckbox checkboxLabel="Warning" warning="Be careful" />
        </div>
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <div className="space-y-3">
          <FormFieldCheckbox checkboxLabel="Error" error="Required field" />
          <FormFieldCheckbox checkboxLabel="Success" success="Saved!" checked />
          <FormFieldCheckbox checkboxLabel="Warning" warning="Be careful" />
        </div>
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <div className="space-y-3">
          <FormFieldCheckbox checkboxLabel="Error" error="Required field" />
          <FormFieldCheckbox checkboxLabel="Success" success="Saved!" checked />
          <FormFieldCheckbox checkboxLabel="Warning" warning="Be careful" />
        </div>
      </div>
    </div>
  )
};

/**
 * Mobile Responsive
 */
export const Mobile: Story = {
  args: { checkboxLabel: "Default" },
  parameters: {
    viewport: { defaultViewport: 'mobile1' }
  },
  render: () => (
    <div className="p-4">
      <FormFieldCheckbox
        label="Mobile Settings"
        checkboxLabel="Enable mobile notifications"
        helperText="Optimized for touch interaction"
      />
    </div>
  )
};

/**
 * Accessibility
 */
export const Accessibility: Story = {
  args: { checkboxLabel: "Default" },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldCheckbox
        checkboxLabel="Screen reader optimized"
        helperText="Proper ARIA labels and roles"
        aria-label="Enable screen reader optimization"
        aria-describedby="checkbox-helper"
      />
      
      <FormFieldCheckbox
        checkboxLabel="Keyboard navigable"
        helperText="Press Space to toggle"
        error="This must be checked"
        aria-required="true"
        aria-invalid="true"
      />
      
      <FormFieldCheckbox
        label="Accessibility Features"
        checkboxLabel="High contrast mode"
        tooltip="Improves visibility"
        helperText="Enhances visual clarity"
      />
    </div>
  )
};

/**
 * Interactive Example
 */
export const Interactive: Story = {
  args: {
    label: 'Interactive Settings',
    checkboxLabel: 'Enable this feature',
    rightContent: '42',
    helperText: 'Use controls to experiment',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls to experiment with different FormFieldCheckbox configurations.'
      }
    }
  }
};