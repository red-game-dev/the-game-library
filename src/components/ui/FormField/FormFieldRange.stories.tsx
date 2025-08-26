/**
 * @fileoverview FormFieldRange component stories
 * @module components/ui/FormField/FormFieldRange/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormFieldRange } from './FormFieldRange';
import React from 'react';

const meta = {
  title: 'UI/FormField/Range',
  component: FormFieldRange,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A specialized form field component for range slider inputs with built-in value display, tick marks, suggestions, and theme support. Perfect for numeric selections and percentage-based inputs.'
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label text'
    },
    value: {
      control: 'number',
      description: 'Current value'
    },
    config: {
      control: 'object',
      description: 'Range configuration object'
    },
    showSuggestions: {
      control: 'boolean',
      description: 'Show suggestion presets'
    },
    required: {
      control: 'boolean',
      description: 'Required field indicator'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    }
  },
} satisfies Meta<typeof FormFieldRange>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Range
 */
export const Default: Story = {
  args: {
    label: 'Volume',
    config: {
      min: 0,
      max: 100,
      step: 1
    },
    value: 50
  }
};

/**
 * With Value Display
 */
export const WithValueDisplay: Story = {
  args: {
    label: 'Progress',
    config: {
      min: 0,
      max: 100,
      step: 1,
      showValue: true,
      suffix: '%'
    }
  },
  render: () => {
    const [value, setValue] = React.useState(75);
    
    return (
      <FormFieldRange
        label="Progress"
        value={value}
        onChange={setValue}
        config={{
          min: 0,
          max: 100,
          step: 1,
          showValue: true,
          suffix: '%'
        }}
        helperText={`Current progress: ${value}%`}
      />
    );
  }
};

/**
 * With Tick Marks
 */
export const WithTickMarks: Story = {
  args: {
    label: 'Rating',
    config: {
      min: 1,
      max: 10,
      step: 1,
      showTicks: true,
      showValue: true
    }
  },
  render: () => {
    const [value, setValue] = React.useState(5);
    
    return (
      <FormFieldRange
        label="Rating"
        value={value}
        onChange={setValue}
        config={{
          min: 1,
          max: 10,
          step: 1,
          showTicks: true,
          showValue: true
        }}
        helperText="Rate from 1 to 10"
      />
    );
  }
};

/**
 * Price Range
 */
export const PriceRange: Story = {
  args: {
    label: 'Budget',
    config: {
      min: 0,
      max: 1000,
      step: 50,
      showValue: true,
      prefix: '$',
      showTicks: true
    }
  },
  render: () => {
    const [value, setValue] = React.useState(250);
    
    return (
      <FormFieldRange
        label="Budget"
        value={value}
        onChange={setValue}
        config={{
          min: 0,
          max: 1000,
          step: 50,
          showValue: true,
          prefix: '$',
          showTicks: true
        }}
        helperText="Select your budget range"
      />
    );
  }
};

/**
 * Percentage Range
 */
export const PercentageRange: Story = {
  args: {
    label: 'RTP (Return to Player)',
    config: {
      min: 85,
      max: 99,
      step: 0.5,
      showValue: true,
      suffix: '%'
    }
  },
  render: () => {
    const [rtp, setRtp] = React.useState(96);
    
    return (
      <FormFieldRange
        label="RTP (Return to Player)"
        value={rtp}
        onChange={setRtp}
        config={{
          min: 85,
          max: 99,
          step: 0.5,
          showValue: true,
          suffix: '%'
        }}
        helperText={`Games with ${rtp}% return rate`}
        tooltip="Higher RTP means better returns"
      />
    );
  }
};

/**
 * With Suggestions
 */
export const WithSuggestions: Story = {
  args: {
    label: 'Quality Settings',
    config: {
      min: 0,
      max: 100,
      step: 25,
      showValue: true,
      suffix: '%'
    }
  },
  render: () => {
    const [value, setValue] = React.useState(50);
    
    const suggestions = [
      { label: 'Low', value: 25 },
      { label: 'Medium', value: 50 },
      { label: 'High', value: 75 },
      { label: 'Maximum', value: 100 }
    ];
    
    return (
      <FormFieldRange
        label="Quality Settings"
        value={value}
        onChange={setValue}
        config={{
          min: 0,
          max: 100,
          step: 25,
          showValue: true,
          suffix: '%'
        }}
        suggestions={suggestions}
        showSuggestions
        helperText="Choose from presets or adjust manually"
      />
    );
  }
};

/**
 * Custom Step Values
 */
export const CustomSteps: Story = {
  args: {
    label: 'Default',
    config: { min: 0, max: 10, step: 0.1, showValue: true }
  },
  render: () => (
    <div className="flex flex-col gap-6 min-w-100">
      <FormFieldRange
        label="Fine Control (0.1 steps)"
        config={{
          min: 0,
          max: 10,
          step: 0.1,
          showValue: true
        }}
        value={5.5}
      />
      
      <FormFieldRange
        label="Coarse Control (10 steps)"
        config={{
          min: 0,
          max: 200,
          step: 10,
          showValue: true,
          showTicks: true
        }}
        value={100}
      />
      
      <FormFieldRange
        label="Binary Choice"
        config={{
          min: 0,
          max: 1,
          step: 1,
          showValue: true,
          showTicks: true
        }}
        value={0}
        helperText="Off (0) or On (1)"
      />
    </div>
  )
};

/**
 * Validation States
 */
export const ValidationStates: Story = {
  args: {
    label: 'Default',
    config: { min: 0, max: 100, showValue: true }
  },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldRange
        label="Error State"
        config={{ min: 0, max: 100, showValue: true }}
        value={10}
        error="Value too low"
      />
      
      <FormFieldRange
        label="Success State"
        config={{ min: 0, max: 100, showValue: true }}
        value={75}
        success="Perfect value!"
      />
      
      <FormFieldRange
        label="Warning State"
        config={{ min: 0, max: 100, showValue: true }}
        value={90}
        warning="Getting close to limit"
      />
      
      <FormFieldRange
        label="Info State"
        config={{ min: 0, max: 100, showValue: true }}
        value={50}
        helperText="Balanced setting"
      />
    </div>
  )
};

/**
 * Disabled States
 */
export const DisabledStates: Story = {
  args: {
    label: 'Default',
    config: { min: 0, max: 100, showValue: true },
    disabled: true
  },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldRange
        label="Disabled at Minimum"
        config={{ min: 0, max: 100, showValue: true }}
        value={0}
        disabled
      />
      
      <FormFieldRange
        label="Disabled at Maximum"
        config={{ min: 0, max: 100, showValue: true }}
        value={100}
        disabled
      />
      
      <FormFieldRange
        label="Disabled Mid-Range"
        config={{ min: 0, max: 100, showValue: true }}
        value={50}
        disabled
        helperText="This value is locked"
      />
    </div>
  )
};

/**
 * Complex Example - Audio Mixer
 */
export const ComplexExample: Story = {
  args: {
    label: 'Master Volume',
    config: { min: 0, max: 100, step: 5, showValue: true, suffix: '%', showTicks: true },
    required: true
  },
  render: () => {
    const [master, setMaster] = React.useState(80);
    const [music, setMusic] = React.useState(60);
    const [effects, setEffects] = React.useState(70);
    const [voice, setVoice] = React.useState(90);
    
    return (
      <div className="flex flex-col gap-6 p-6 border rounded-lg min-w-120">
        <h3 className="text-lg font-semibold">Audio Settings</h3>
        
        <FormFieldRange
          label="Master Volume"
          value={master}
          onChange={setMaster}
          config={{
            min: 0,
            max: 100,
            step: 5,
            showValue: true,
            suffix: '%',
            showTicks: true
          }}
          suggestions={[
            { label: 'Mute', value: 0 },
            { label: 'Low', value: 25 },
            { label: 'Normal', value: 75 },
            { label: 'Max', value: 100 }
          ]}
          showSuggestions
          required
        />
        
        <FormFieldRange
          label="Music Volume"
          value={music}
          onChange={setMusic}
          config={{
            min: 0,
            max: 100,
            step: 5,
            showValue: true,
            suffix: '%'
          }}
          helperText="Background music volume"
        />
        
        <FormFieldRange
          label="Sound Effects"
          value={effects}
          onChange={setEffects}
          config={{
            min: 0,
            max: 100,
            step: 5,
            showValue: true,
            suffix: '%'
          }}
          helperText="Game sound effects"
        />
        
        <FormFieldRange
          label="Voice Chat"
          value={voice}
          onChange={setVoice}
          config={{
            min: 0,
            max: 100,
            step: 5,
            showValue: true,
            suffix: '%'
          }}
          helperText="Voice communication volume"
        />
        
        <button className="px-4 py-2 bg-primary text-white rounded">
          Apply Settings
        </button>
      </div>
    );
  }
};

/**
 * All Themes - Default
 */
export const AllThemesDefault: Story = {
  args: {
    label: 'Brightness',
    config: { min: 0, max: 100, showValue: true, suffix: '%' },
    value: 75
  },
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <FormFieldRange
          label="Brightness"
          config={{
            min: 0,
            max: 100,
            showValue: true,
            suffix: '%'
          }}
          value={75}
          helperText="Adjust display brightness"
        />
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <FormFieldRange
          label="Brightness"
          config={{
            min: 0,
            max: 100,
            showValue: true,
            suffix: '%'
          }}
          value={75}
          helperText="Adjust display brightness"
        />
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <FormFieldRange
          label="Brightness"
          config={{
            min: 0,
            max: 100,
            showValue: true,
            suffix: '%'
          }}
          value={75}
          helperText="Adjust display brightness"
        />
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <FormFieldRange
          label="Brightness"
          config={{
            min: 0,
            max: 100,
            showValue: true,
            suffix: '%'
          }}
          value={75}
          helperText="Adjust display brightness"
        />
      </div>
    </div>
  )
};

/**
 * All Themes - With Ticks
 */
export const AllThemesWithTicks: Story = {
  args: {
    label: 'Level',
    config: { min: 1, max: 5, step: 1, showValue: true, showTicks: true },
    value: 3
  },
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <FormFieldRange
          label="Level"
          config={{
            min: 1,
            max: 5,
            step: 1,
            showValue: true,
            showTicks: true
          }}
          value={3}
        />
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <FormFieldRange
          label="Level"
          config={{
            min: 1,
            max: 5,
            step: 1,
            showValue: true,
            showTicks: true
          }}
          value={3}
        />
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <FormFieldRange
          label="Level"
          config={{
            min: 1,
            max: 5,
            step: 1,
            showValue: true,
            showTicks: true
          }}
          value={3}
        />
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <FormFieldRange
          label="Level"
          config={{
            min: 1,
            max: 5,
            step: 1,
            showValue: true,
            showTicks: true
          }}
          value={3}
        />
      </div>
    </div>
  )
};

/**
 * Mobile Responsive
 */
export const Mobile: Story = {
  args: {
    label: 'Mobile Slider',
    config: { min: 0, max: 100, showValue: true, suffix: '%' },
    value: 50
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' }
  },
  render: () => (
    <div className="p-4">
      <FormFieldRange
        label="Mobile Slider"
        config={{
          min: 0,
          max: 100,
          showValue: true,
          suffix: '%'
        }}
        value={50}
        helperText="Touch-friendly slider"
      />
    </div>
  )
};

/**
 * Accessibility
 */
export const Accessibility: Story = {
  args: {
    label: 'Accessible Range',
    config: { min: 0, max: 100, showValue: true, suffix: '%' },
    value: 50,
    required: true
  },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldRange
        label="Accessible Range"
        config={{
          min: 0,
          max: 100,
          showValue: true,
          suffix: '%'
        }}
        value={50}
        required
        helperText="Keyboard navigable with arrow keys"
        aria-label="Accessible range slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
      />
      
      <FormFieldRange
        label="With Instructions"
        config={{
          min: 0,
          max: 10,
          step: 1,
          showValue: true
        }}
        value={5}
        helperText="Use arrow keys to adjust value"
      />
    </div>
  )
};

/**
 * Interactive Example
 */
export const Interactive: Story = {
  args: {
    label: 'Interactive Range',
    config: {
      min: 0,
      max: 100,
      step: 5,
      showValue: true,
      showTicks: false,
      prefix: '',
      suffix: ''
    },
    value: 50,
    helperText: 'Use controls to experiment',
    showSuggestions: false,
    required: false,
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls to experiment with different FormFieldRange configurations.'
      }
    }
  }
};