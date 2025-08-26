/**
 * @fileoverview FormFieldDualRange component stories
 * @module components/ui/FormField/FormFieldDualRange/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormFieldDualRange } from './FormFieldDualRange';
import { ArrowRight, ChevronRight, Minus, MoveRight, ArrowLeftRight, MoreHorizontal } from 'lucide-react';
import React from 'react';

const meta = {
  title: 'UI/FormField/DualRange',
  component: FormFieldDualRange,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A specialized form field component for dual range slider inputs allowing selection of a range between two values. Perfect for price ranges, date ranges, and filtering scenarios.'
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label text'
    },
    minValue: {
      control: 'number',
      description: 'Lower bound value'
    },
    maxValue: {
      control: 'number',
      description: 'Upper bound value'
    },
    required: {
      control: 'boolean',
      description: 'Required field indicator'
    },
    separator: {
      control: 'text',
      description: 'Separator between inputs (string or React element)',
      defaultValue: '-'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    }
  },
} satisfies Meta<typeof FormFieldDualRange>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Dual Range
 */
export const Default: Story = {
  args: {
    label: 'Select Range',
    config: {
      min: 0,
      max: 100,
      step: 1
    },
    minValue: 25,
    maxValue: 75
  }
};

/**
 * Price Range
 */
export const PriceRange: Story = {
  args: {},
  render: () => {
    const [minPrice, setMinPrice] = React.useState(100);
    const [maxPrice, setMaxPrice] = React.useState(500);
    
    return (
      <FormFieldDualRange
        label="Price Range"
        minValue={minPrice}
        maxValue={maxPrice}
        onMinChange={setMinPrice}
        onMaxChange={setMaxPrice}
        config={{
          min: 0,
          max: 1000,
          step: 50,
          showValues: true,
          prefix: '$',
          showTicks: true
        }}
        helperText={`Products from $${minPrice} to $${maxPrice}`}
      />
    );
  }
};

/**
 * Custom Separators
 */
export const CustomSeparators: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-6 min-w-120">
      <h3 className="text-lg font-semibold">Text Separators</h3>
      
      <FormFieldDualRange
        label="With Dash (Default)"
        minValue={10}
        maxValue={90}
        config={{ min: 0, max: 100 }}
        separator="-"
        helperText="Default separator"
      />
      
      <FormFieldDualRange
        label="With 'to' Text"
        minValue={25}
        maxValue={75}
        config={{ min: 0, max: 100 }}
        separator="to"
        helperText="Text separator for ranges"
      />
      
      <FormFieldDualRange
        label="With 'until' Text"
        minValue={2020}
        maxValue={2024}
        config={{ min: 2015, max: 2030 }}
        separator="until"
        helperText="For date ranges"
      />
      
      <h3 className="text-lg font-semibold mt-4">Icon Separators</h3>
      
      <FormFieldDualRange
        label="With Arrow Right"
        minValue={10}
        maxValue={90}
        config={{ min: 0, max: 100 }}
        separator={<ArrowRight className="w-4 h-4 text-gray-500" />}
        helperText="Direction indicator"
      />
      
      <FormFieldDualRange
        label="With Chevron"
        minValue={10}
        maxValue={90}
        config={{ min: 0, max: 100 }}
        separator={<ChevronRight className="w-4 h-4 text-gray-500" />}
        helperText="Subtle direction"
      />
      
      <FormFieldDualRange
        label="With Double Arrow"
        minValue={10}
        maxValue={90}
        config={{ min: 0, max: 100 }}
        separator={<MoveRight className="w-4 h-4 text-gray-500" />}
        helperText="Range flow"
      />
      
      <FormFieldDualRange
        label="With Bidirectional Arrow"
        minValue={10}
        maxValue={90}
        config={{ min: 0, max: 100 }}
        separator={<ArrowLeftRight className="w-4 h-4 text-gray-500" />}
        helperText="Two-way range"
      />
      
      <FormFieldDualRange
        label="With Dots"
        minValue={10}
        maxValue={90}
        config={{ min: 0, max: 100 }}
        separator={<MoreHorizontal className="w-4 h-4 text-gray-500" />}
        helperText="Ellipsis separator"
      />
      
      <FormFieldDualRange
        label="With Minus Icon"
        minValue={10}
        maxValue={90}
        config={{ min: 0, max: 100 }}
        separator={<Minus className="w-4 h-4 text-gray-500" />}
        helperText="Clean minimal separator"
      />
    </div>
  )
};

/**
 * Separator Alignment Test
 */
export const SeparatorAlignment: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-6 min-w-120">
      <h3 className="text-lg font-semibold">Testing Vertical Alignment</h3>
      
      <FormFieldDualRange
        label="Small Values"
        minValue={1}
        maxValue={9}
        config={{ min: 0, max: 10 }}
        separator="-"
      />
      
      <FormFieldDualRange
        label="Large Values"
        minValue={1000}
        maxValue={9999}
        config={{ min: 0, max: 10000 }}
        separator={<ArrowRight className="w-4 h-4" />}
      />
      
      <FormFieldDualRange
        label="Decimal Values"
        minValue={10.5}
        maxValue={99.9}
        config={{ min: 0, max: 100, step: 0.1 }}
        separator="to"
      />
      
      <FormFieldDualRange
        label="With Prefixes and Suffixes"
        minValue={25}
        maxValue={75}
        config={{ 
          min: 0, 
          max: 100,
          prefix: '$',
          suffix: '.00'
        }}
        separator={<MoveRight className="w-4 h-4" />}
      />
      
      <FormFieldDualRange
        label="Mixed Input Sizes"
        minValue={5}
        maxValue={5000}
        config={{ min: 0, max: 10000 }}
        separator="-"
        helperText="Separator should stay centered regardless of input content"
      />
    </div>
  )
};

/**
 * Percentage Range
 */
export const PercentageRange: Story = {
  args: {},
  render: () => {
    const [minRtp, setMinRtp] = React.useState(94);
    const [maxRtp, setMaxRtp] = React.useState(98);
    
    return (
      <FormFieldDualRange
        label="RTP Range"
        minValue={minRtp}
        maxValue={maxRtp}
        onMinChange={setMinRtp}
        onMaxChange={setMaxRtp}
        config={{
          min: 85,
          max: 99,
          step: 0.5,
          showValues: true,
          suffix: '%'
        }}
        helperText={`Games with RTP between ${minRtp}% and ${maxRtp}%`}
        tooltip="Return to Player percentage range"
      />
    );
  }
};

/**
 * Age Range
 */
export const AgeRange: Story = {
  args: {},
  render: () => {
    const [minAge, setMinAge] = React.useState(18);
    const [maxAge, setMaxAge] = React.useState(65);
    
    return (
      <FormFieldDualRange
        label="Age Range"
        minValue={minAge}
        maxValue={maxAge}
        onMinChange={setMinAge}
        onMaxChange={setMaxAge}
        config={{
          min: 0,
          max: 100,
          step: 1,
          showValues: true,
          suffix: ' years'
        }}
        helperText="Target demographic age range"
      />
    );
  }
};

/**
 * With Suggestions
 */
export const WithSuggestions: Story = {
  args: {},
  render: () => {
    const [min, setMin] = React.useState(30);
    const [max, setMax] = React.useState(70);
    
    const suggestions = [
      { label: 'Low Range', value: [0, 33] },
      { label: 'Mid Range', value: [33, 66] },
      { label: 'High Range', value: [66, 100] },
      { label: 'Full Range', value: [0, 100] }
    ];
    
    return (
      <FormFieldDualRange
        label="Quality Range"
        minValue={min}
        maxValue={max}
        onMinChange={setMin}
        onMaxChange={setMax}
        config={{
          min: 0,
          max: 100,
          step: 10,
          showValues: true,
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
 * Time Range
 */
export const TimeRange: Story = {
  args: {},
  render: () => {
    const [startHour, setStartHour] = React.useState(9);
    const [endHour, setEndHour] = React.useState(17);
    
    const formatHour = (hour: number) => {
      const h = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const ampm = hour < 12 ? 'AM' : 'PM';
      return `${h}:00 ${ampm}`;
    };
    
    return (
      <FormFieldDualRange
        label="Working Hours"
        minValue={startHour}
        maxValue={endHour}
        onMinChange={setStartHour}
        onMaxChange={setEndHour}
        config={{
          min: 0,
          max: 23,
          step: 1,
          showValues: false,
          showTicks: true
        }}
        helperText={`From ${formatHour(startHour)} to ${formatHour(endHour)}`}
      />
    );
  }
};

/**
 * Validation States
 */
export const ValidationStates: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldDualRange
        label="Error State"
        config={{ min: 0, max: 100, showValues: true }}
        minValue={60}
        maxValue={50}
        error="Maximum must be greater than minimum"
      />
      
      <FormFieldDualRange
        label="Success State"
        config={{ min: 0, max: 100, showValues: true }}
        minValue={25}
        maxValue={75}
        success="Valid range selected"
      />
      
      <FormFieldDualRange
        label="Warning State"
        config={{ min: 0, max: 100, showValues: true }}
        minValue={5}
        maxValue={95}
        warning="Range is very broad"
      />
      
      <FormFieldDualRange
        label="Info State"
        config={{ min: 0, max: 100, showValues: true }}
        minValue={40}
        maxValue={60}
        helperText="Balanced range"
      />
    </div>
  )
};

/**
 * Disabled States
 */
export const DisabledStates: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldDualRange
        label="Disabled Narrow Range"
        config={{ min: 0, max: 100, showValues: true }}
        minValue={45}
        maxValue={55}
        disabled
      />
      
      <FormFieldDualRange
        label="Disabled Wide Range"
        config={{ min: 0, max: 100, showValues: true }}
        minValue={10}
        maxValue={90}
        disabled
      />
      
      <FormFieldDualRange
        label="Disabled Full Range"
        config={{ min: 0, max: 100, showValues: true }}
        minValue={0}
        maxValue={100}
        disabled
        helperText="Range is locked"
      />
    </div>
  )
};

/**
 * Complex Example - Product Filter
 */
export const ComplexExample: Story = {
  args: {},
  render: () => {
    const [priceMin, setPriceMin] = React.useState(50);
    const [priceMax, setPriceMax] = React.useState(200);
    const [ratingMin, setRatingMin] = React.useState(3);
    const [ratingMax, setRatingMax] = React.useState(5);
    const [yearMin, setYearMin] = React.useState(2020);
    const [yearMax, setYearMax] = React.useState(2024);
    
    return (
      <div className="flex flex-col gap-6 p-6 border rounded-lg min-w-120">
        <h3 className="text-lg font-semibold">Product Filters</h3>
        
        <FormFieldDualRange
          label="Price Range"
          minValue={priceMin}
          maxValue={priceMax}
          onMinChange={setPriceMin}
          onMaxChange={setPriceMax}
          config={{
            min: 0,
            max: 500,
            step: 10,
            showValues: true,
            prefix: '$',
            showTicks: true
          }}
          suggestions={[
            { label: 'Budget', value: [0, 100] },
            { label: 'Mid-range', value: [100, 300] },
            { label: 'Premium', value: [300, 500] }
          ]}
          showSuggestions
          required
        />
        
        <FormFieldDualRange
          label="Customer Rating"
          minValue={ratingMin}
          maxValue={ratingMax}
          onMinChange={setRatingMin}
          onMaxChange={setRatingMax}
          config={{
            min: 1,
            max: 5,
            step: 0.5,
            showValues: true,
            suffix: ' stars',
            showTicks: true
          }}
          helperText="Filter by customer ratings"
        />
        
        <FormFieldDualRange
          label="Release Year"
          minValue={yearMin}
          maxValue={yearMax}
          onMinChange={setYearMin}
          onMaxChange={setYearMax}
          config={{
            min: 2015,
            max: 2024,
            step: 1,
            showValues: true,
            showTicks: true
          }}
          helperText="Product release year"
        />
        
        <div className="text-sm text-secondary">
          Showing products: ${priceMin}-${priceMax}, {ratingMin}-{ratingMax} stars, {yearMin}-{yearMax}
        </div>
        
        <button className="px-4 py-2 bg-primary text-white rounded">
          Apply Filters
        </button>
      </div>
    );
  }
};

/**
 * All Themes - Default
 */
export const AllThemesDefault: Story = {
  args: {},
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <FormFieldDualRange
          label="Range Selection"
          config={{
            min: 0,
            max: 100,
            showValues: true,
            suffix: '%'
          }}
          minValue={25}
          maxValue={75}
          helperText="Select your range"
        />
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <FormFieldDualRange
          label="Range Selection"
          config={{
            min: 0,
            max: 100,
            showValues: true,
            suffix: '%'
          }}
          minValue={25}
          maxValue={75}
          helperText="Select your range"
        />
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <FormFieldDualRange
          label="Range Selection"
          config={{
            min: 0,
            max: 100,
            showValues: true,
            suffix: '%'
          }}
          minValue={25}
          maxValue={75}
          helperText="Select your range"
        />
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <FormFieldDualRange
          label="Range Selection"
          config={{
            min: 0,
            max: 100,
            showValues: true,
            suffix: '%'
          }}
          minValue={25}
          maxValue={75}
          helperText="Select your range"
        />
      </div>
    </div>
  )
};

/**
 * All Themes - With Ticks
 */
export const AllThemesWithTicks: Story = {
  args: {},
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <FormFieldDualRange
          label="Level Range"
          config={{
            min: 1,
            max: 10,
            step: 1,
            showValues: true,
            showTicks: true
          }}
          minValue={3}
          maxValue={7}
        />
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <FormFieldDualRange
          label="Level Range"
          config={{
            min: 1,
            max: 10,
            step: 1,
            showValues: true,
            showTicks: true
          }}
          minValue={3}
          maxValue={7}
        />
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <FormFieldDualRange
          label="Level Range"
          config={{
            min: 1,
            max: 10,
            step: 1,
            showValues: true,
            showTicks: true
          }}
          minValue={3}
          maxValue={7}
        />
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <FormFieldDualRange
          label="Level Range"
          config={{
            min: 1,
            max: 10,
            step: 1,
            showValues: true,
            showTicks: true
          }}
          minValue={3}
          maxValue={7}
        />
      </div>
    </div>
  )
};

/**
 * Mobile Responsive
 */
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: { defaultViewport: 'mobile1' }
  },
  render: () => (
    <div className="p-4">
      <FormFieldDualRange
        label="Mobile Range"
        config={{
          min: 0,
          max: 100,
          showValues: true,
          suffix: '%'
        }}
        minValue={30}
        maxValue={70}
        helperText="Touch-friendly dual slider"
      />
    </div>
  )
};

/**
 * Accessibility
 */
export const Accessibility: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldDualRange
        label="Accessible Dual Range"
        config={{
          min: 0,
          max: 100,
          showValues: true,
          suffix: '%'
        }}
        minValue={25}
        maxValue={75}
        required
        helperText="Keyboard navigable with Tab and arrow keys"
        aria-label="Accessible dual range slider"
      />
      
      <FormFieldDualRange
        label="With Instructions"
        config={{
          min: 0,
          max: 10,
          step: 1,
          showValues: true
        }}
        minValue={3}
        maxValue={7}
        helperText="Tab to switch sliders, arrows to adjust"
      />
    </div>
  )
};

/**
 * Interactive Example
 */
export const Interactive: Story = {
  args: {
    label: 'Interactive Dual Range',
    config: {
      min: 0,
      max: 100,
      step: 5,
      showValues: true,
      showTicks: false,
      prefix: '',
      suffix: ''
    },
    minValue: 20,
    maxValue: 80,
    helperText: 'Use controls to experiment',
    showSuggestions: false,
    required: false,
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls to experiment with different FormFieldDualRange configurations.'
      }
    }
  }
};