/**
 * @fileoverview FormFieldSelect component stories
 * @module components/ui/FormField/FormFieldSelect/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormFieldSelect } from './FormFieldSelect';
import React from 'react';

const meta = {
  title: 'UI/FormField/Select',
  component: FormFieldSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A specialized form field component for select/dropdown inputs with built-in validation, multi-select support, search functionality, and theme support.'
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label text'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no selection'
    },
    multiple: {
      control: 'boolean',
      description: 'Enable multi-select mode'
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality'
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button'
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
    showSuggestions: {
      control: 'boolean',
      description: 'Show suggestion chips'
    }
  },
} satisfies Meta<typeof FormFieldSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
  { label: 'Option 4', value: 'opt4' },
  { label: 'Option 5', value: 'opt5' }
];

const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Brazil', value: 'br' }
];

/**
 * Default Select
 */
export const Default: Story = {
  args: {
    label: 'Select Option',
    options: defaultOptions,
    placeholder: 'Choose an option'
  }
};

/**
 * Single Select
 */
export const SingleSelect: Story = {
  args: { label: "Default", options: [] },
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <FormFieldSelect
        label="Choose Country"
        options={countryOptions}
        value={value}
        onChange={setValue}
        placeholder="Select a country"
        helperText="Select your country of residence"
      />
    );
  }
};

/**
 * Multi Select
 */
export const MultiSelect: Story = {
  args: { label: "Default", options: [] },
  render: () => {
    const [value, setValue] = React.useState<string>('');
    
    const skillOptions = [
      { label: 'JavaScript', value: 'js' },
      { label: 'TypeScript', value: 'ts' },
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Node.js', value: 'node' },
      { label: 'Python', value: 'python' },
      { label: 'Java', value: 'java' }
    ];
    
    return (
      <FormFieldSelect
        label="Select Skills"
        options={skillOptions}
        value={value}
        onChange={setValue}
        placeholder="Choose a skill"
        helperText="Select your primary skill"
      />
    );
  }
};

/**
 * Searchable Select
 */
export const SearchableSelect: Story = {
  args: { label: "Default", options: [] },
  render: () => {
    const [value, setValue] = React.useState('');
    
    const cityOptions = [
      { label: 'New York', value: 'ny' },
      { label: 'Los Angeles', value: 'la' },
      { label: 'Chicago', value: 'chi' },
      { label: 'Houston', value: 'hou' },
      { label: 'Phoenix', value: 'phx' },
      { label: 'Philadelphia', value: 'phl' },
      { label: 'San Antonio', value: 'sa' },
      { label: 'San Diego', value: 'sd' },
      { label: 'Dallas', value: 'dal' },
      { label: 'San Jose', value: 'sj' }
    ];
    
    return (
      <FormFieldSelect
        label="City"
        options={cityOptions}
        value={value}
        onChange={setValue}
        searchable
        placeholder="Search for a city..."
        helperText="Type to filter cities"
      />
    );
  }
};

/**
 * With Validation States
 */
export const ValidationStates: Story = {
  args: { label: "Default", options: [] },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldSelect
        label="Error State"
        options={defaultOptions}
        value=""
        error="Please select an option"
        placeholder="Required selection"
      />
      
      <FormFieldSelect
        label="Success State"
        options={defaultOptions}
        value="opt1"
        success="Valid selection"
        placeholder="Choose option"
      />
      
      <FormFieldSelect
        label="Warning State"
        options={defaultOptions}
        value="opt2"
        warning="This option has limitations"
        placeholder="Choose option"
      />
      
      <FormFieldSelect
        label="Info State"
        options={defaultOptions}
        value=""
        helperText="Select your preferred option"
        placeholder="Choose option"
      />
    </div>
  )
};

/**
 * With Suggestions
 */
export const WithSuggestions: Story = {
  args: { label: "Default", options: [] },
  render: () => {
    const [value, setValue] = React.useState('');
    
    const gameTypeOptions = [
      { label: 'Slots', value: 'slots' },
      { label: 'Table Games', value: 'table' },
      { label: 'Live Casino', value: 'live' },
      { label: 'Instant Win', value: 'instant' },
      { label: 'Virtual Sports', value: 'virtual' }
    ];
    
    const suggestions = [
      { label: 'Most Popular', value: 'slots' },
      { label: 'New Games', value: 'instant' },
      { label: 'Live Dealers', value: 'live' }
    ];
    
    return (
      <FormFieldSelect
        label="Game Type"
        options={gameTypeOptions}
        value={value}
        onChange={setValue}
        placeholder="Select game type"
        suggestions={suggestions}
        showSuggestions
        helperText="Choose from suggestions or select manually"
      />
    );
  }
};

/**
 * Disabled States
 */
export const DisabledStates: Story = {
  args: { label: "Default", options: [] },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldSelect
        label="Disabled Empty"
        options={defaultOptions}
        disabled
        placeholder="Cannot select"
      />
      
      <FormFieldSelect
        label="Disabled with Value"
        options={defaultOptions}
        value="opt1"
        disabled
        placeholder="Cannot change"
      />
      
      <FormFieldSelect
        label="Disabled with Selection"
        options={defaultOptions}
        value="opt1"
        disabled
        helperText="Selection is locked"
      />
    </div>
  )
};

/**
 * Complex Example
 */
export const ComplexExample: Story = {
  args: { label: "Default", options: [] },
  render: () => {
    const [country, setCountry] = React.useState('');
    const [languages, setLanguages] = React.useState<string[]>([]);
    
    const languageOptions = [
      { label: 'English', value: 'en' },
      { label: 'Spanish', value: 'es' },
      { label: 'French', value: 'fr' },
      { label: 'German', value: 'de' },
      { label: 'Italian', value: 'it' },
      { label: 'Portuguese', value: 'pt' },
      { label: 'Russian', value: 'ru' },
      { label: 'Chinese', value: 'zh' },
      { label: 'Japanese', value: 'ja' },
      { label: 'Korean', value: 'ko' }
    ];
    
    return (
      <div className="flex flex-col gap-6 p-6 border rounded-lg min-w-120">
        <h3 className="text-lg font-semibold">User Preferences</h3>
        
        <FormFieldSelect
          label="Country"
          options={countryOptions}
          value={country}
          onChange={setCountry}
          required
          placeholder="Select your country"
          error={!country ? "Country is required" : undefined}
          searchable
          clearable
        />
        
        <FormFieldSelect
          label="Languages"
          options={languageOptions}
          value={languages[0] || ''}
          onChange={(value) => setLanguages([value])}
          searchable
          placeholder="Select languages you speak"
          helperText="Select languages you speak"
        />
        
        <button 
          className={`px-4 py-2 rounded ${country ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500'}`}
          disabled={!country}
        >
          Save Preferences
        </button>
      </div>
    );
  }
};

/**
 * All Themes - Default
 */
export const AllThemesDefault: Story = {
  args: { label: "Default", options: [] },
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <FormFieldSelect
          label="Select Option"
          options={defaultOptions}
          placeholder="Choose..."
          helperText="Pick your preference"
        />
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <FormFieldSelect
          label="Select Option"
          options={defaultOptions}
          placeholder="Choose..."
          helperText="Pick your preference"
        />
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <FormFieldSelect
          label="Select Option"
          options={defaultOptions}
          placeholder="Choose..."
          helperText="Pick your preference"
        />
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <FormFieldSelect
          label="Select Option"
          options={defaultOptions}
          placeholder="Choose..."
          helperText="Pick your preference"
        />
      </div>
    </div>
  )
};

/**
 * All Themes - Multi Select
 */
export const AllThemesMultiSelect: Story = {
  args: { label: "Default", options: [] },
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <FormFieldSelect
          label="Single Select"
          options={defaultOptions}
          value="opt1"
          placeholder="Select option..."
        />
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <FormFieldSelect
          label="Single Select"
          options={defaultOptions}
          value="opt1"
          placeholder="Select option..."
        />
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <FormFieldSelect
          label="Single Select"
          options={defaultOptions}
          value="opt1"
          placeholder="Select option..."
        />
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <FormFieldSelect
          label="Single Select"
          options={defaultOptions}
          value="opt1"
          placeholder="Select option..."
        />
      </div>
    </div>
  )
};

/**
 * All Themes - Validation
 */
export const AllThemesValidation: Story = {
  args: { label: "Default", options: [] },
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <div className="space-y-4">
          <FormFieldSelect label="Error" options={defaultOptions} error="Required" />
          <FormFieldSelect label="Success" options={defaultOptions} value="opt1" success="Valid!" />
          <FormFieldSelect label="Warning" options={defaultOptions} value="opt2" warning="Note" />
        </div>
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <div className="space-y-4">
          <FormFieldSelect label="Error" options={defaultOptions} error="Required" />
          <FormFieldSelect label="Success" options={defaultOptions} value="opt1" success="Valid!" />
          <FormFieldSelect label="Warning" options={defaultOptions} value="opt2" warning="Note" />
        </div>
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <div className="space-y-4">
          <FormFieldSelect label="Error" options={defaultOptions} error="Required" />
          <FormFieldSelect label="Success" options={defaultOptions} value="opt1" success="Valid!" />
          <FormFieldSelect label="Warning" options={defaultOptions} value="opt2" warning="Note" />
        </div>
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <div className="space-y-4">
          <FormFieldSelect label="Error" options={defaultOptions} error="Required" />
          <FormFieldSelect label="Success" options={defaultOptions} value="opt1" success="Valid!" />
          <FormFieldSelect label="Warning" options={defaultOptions} value="opt2" warning="Note" />
        </div>
      </div>
    </div>
  )
};

/**
 * Mobile Responsive
 */
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' }
  },
  args: { label: "Default", options: [] },
  render: () => (
    <div className="p-4">
      <FormFieldSelect
        label="Mobile Select"
        options={defaultOptions}
        placeholder="Choose option..."
        required
        helperText="Optimized for mobile"
      />
    </div>
  )
};

/**
 * Accessibility
 */
export const Accessibility: Story = {
  args: { label: "Default", options: [] },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldSelect
        label="Accessible Select"
        options={defaultOptions}
        required
        placeholder="Has ARIA attributes"
        helperText="Keyboard navigable"
        aria-label="Accessible dropdown"
        aria-describedby="select-helper"
        aria-required="true"
      />
      
      <FormFieldSelect
        label="With Instructions"
        options={defaultOptions}
        placeholder="Use arrow keys..."
        helperText="Arrow keys to navigate, Enter to select"
      />
    </div>
  )
};

/**
 * Interactive Example
 */
export const Interactive: Story = {
  args: {
    label: 'Interactive Select',
    options: defaultOptions,
    placeholder: 'Try the controls...',
    helperText: 'Experiment with settings',
    multiple: false,
    searchable: false,
    clearable: false,
    disabled: false,
    required: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls to experiment with different FormFieldSelect configurations.'
      }
    }
  }
};