/**
 * @fileoverview FormFieldTextarea component stories
 * @module components/ui/FormField/FormFieldTextarea/stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormFieldTextarea } from './FormFieldTextarea';
import React from 'react';

const meta = {
  title: 'UI/FormField/Textarea',
  component: FormFieldTextarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A specialized form field component for textarea inputs with built-in validation, character counting, auto-resize, and theme support.'
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
      description: 'Placeholder text'
    },
    rows: {
      control: 'number',
      description: 'Number of visible rows'
    },
    required: {
      control: 'boolean',
      description: 'Required field indicator'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    showCount: {
      control: 'boolean',
      description: 'Show character counter'
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length'
    },
    helperText: {
      control: 'text',
      description: 'Helper text below field'
    },
    error: {
      control: 'text',
      description: 'Error message'
    }
  },
} satisfies Meta<typeof FormFieldTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Textarea
 */
export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
    rows: 4
  }
};

/**
 * Textarea Sizes
 */
export const TextareaSizes: Story = {
  args: {
    label: 'Default',
    rows: 4
  },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldTextarea
        label="Small (2 rows)"
        rows={2}
        placeholder="Compact textarea..."
      />
      <FormFieldTextarea
        label="Medium (4 rows)"
        rows={4}
        placeholder="Standard textarea..."
      />
      <FormFieldTextarea
        label="Large (6 rows)"
        rows={6}
        placeholder="Expanded textarea..."
      />
      <FormFieldTextarea
        label="Extra Large (10 rows)"
        rows={10}
        placeholder="Full size textarea..."
      />
    </div>
  )
};

/**
 * With Character Count
 */
export const WithCharacterCount: Story = {
  args: {
    label: 'Bio',
    rows: 4,
    showCount: true,
    maxLength: 200
  },
  render: () => {
    const [value, setValue] = React.useState('This is some initial text to show the character counter in action.');
    
    return (
      <FormFieldTextarea
        label="Bio"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        showCount
        maxLength={200}
        rows={4}
        helperText="Write a short bio about yourself"
        placeholder="Tell us about yourself..."
      />
    );
  }
};

/**
 * Auto Resize
 */
export const AutoResize: Story = {
  args: {
    label: 'Auto-resizing Textarea',
    rows: 3
  },
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <div className="min-w-100">
        <FormFieldTextarea
          label="Auto-resizing Textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          placeholder="Type to see auto-resize in action..."
          helperText="This textarea grows as you type"
        />
      </div>
    );
  }
};

/**
 * Resize Options
 */
export const ResizeOptions: Story = {
  args: {
    label: 'Default',
    rows: 3
  },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldTextarea
        label="No Resize"
        rows={3}
        placeholder="Cannot be resized..."
      />
      <FormFieldTextarea
        label="Vertical Resize Only"
        rows={3}
        placeholder="Drag bottom edge to resize..."
      />
      <FormFieldTextarea
        label="Horizontal Resize Only"
        rows={3}
        placeholder="Drag right edge to resize..."
      />
      <FormFieldTextarea
        label="Both Directions"
        rows={3}
        placeholder="Drag corner to resize..."
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
    rows: 3
  },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldTextarea
        label="Error State"
        value="Too short"
        error="Minimum 50 characters required"
        rows={3}
      />
      <FormFieldTextarea
        label="Success State"
        value="This content looks great and meets all requirements!"
        success="Content validated successfully"
        rows={3}
      />
      <FormFieldTextarea
        label="Warning State"
        value="This content may contain sensitive information"
        warning="Please review before submitting"
        rows={3}
      />
      <FormFieldTextarea
        label="Info State"
        placeholder="Start typing..."
        helperText="Markdown formatting is supported"
        rows={3}
      />
    </div>
  )
};

/**
 * With Suggestions
 */
export const WithSuggestions: Story = {
  args: {
    label: 'Article Content',
    rows: 5,
  },
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <FormFieldTextarea
        label="Article Content"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={5}
        placeholder="Write your article..."
        helperText="Use suggestions to tag content sections"
      />
    );
  }
};

/**
 * Required Fields
 */
export const RequiredFields: Story = {
  args: {
    label: 'Default',
    required: true,
    rows: 3
  },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldTextarea
        label="Required Feedback"
        required
        rows={3}
        placeholder="Your feedback is important..."
        helperText="Please provide detailed feedback"
      />
      <FormFieldTextarea
        label="Required with Error"
        required
        value=""
        error="This field cannot be empty"
        rows={3}
      />
      <FormFieldTextarea
        label="Required with Character Limit"
        required
        showCount
        maxLength={500}
        rows={4}
        placeholder="Required with max 500 characters..."
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
    disabled: true,
    rows: 3
  },
  render: () => (
    <div className="flex flex-col gap-4 min-w-100">
      <FormFieldTextarea
        label="Disabled Empty"
        disabled
        rows={3}
        placeholder="Cannot edit..."
      />
      <FormFieldTextarea
        label="Disabled with Value"
        disabled
        value="This content is read-only and cannot be modified by the user."
        rows={3}
      />
      <FormFieldTextarea
        label="Disabled with Helper"
        disabled
        value="System generated content"
        helperText="This field is automatically populated"
        rows={3}
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
    const [comment, setComment] = React.useState('');
    const [review, setReview] = React.useState('');
    
    return (
      <div className="flex flex-col gap-6 p-6 border rounded-lg min-w-120">
        <h3 className="text-lg font-semibold">Product Review Form</h3>
        
        <FormFieldTextarea
          label="Review Title"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={2}
          required
          maxLength={100}
          showCount
          placeholder="Summarize your experience..."
          error={review.length < 10 && review.length > 0 ? "Too short" : undefined}
          success={review.length >= 10 ? "Good title!" : undefined}
        />
        
        <FormFieldTextarea
          label="Detailed Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          required
          maxLength={1000}
          showCount
          placeholder="Share your detailed experience..."
          helperText="Help others by being specific about pros and cons. Your review will be public after moderation."
        />
        
        <button 
          className={`px-4 py-2 rounded ${review && comment ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500'}`}
          disabled={!review || !comment}
        >
          Submit Review
        </button>
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
        <FormFieldTextarea
          label="Comments"
          rows={3}
          placeholder="Share your thoughts..."
          helperText="Be respectful and constructive"
        />
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <FormFieldTextarea
          label="Comments"
          rows={3}
          placeholder="Share your thoughts..."
          helperText="Be respectful and constructive"
        />
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <FormFieldTextarea
          label="Comments"
          rows={3}
          placeholder="Share your thoughts..."
          helperText="Be respectful and constructive"
        />
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <FormFieldTextarea
          label="Comments"
          rows={3}
          placeholder="Share your thoughts..."
          helperText="Be respectful and constructive"
        />
      </div>
    </div>
  )
};

/**
 * All Themes - With Features
 */
export const AllThemesFeatures: Story = {
  args: { label: 'Default' },
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8 min-w-300">
      <div data-theme="light" className="p-6 rounded-lg" style={{ background: 'white' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Light Theme</h3>
        <FormFieldTextarea
          label="With Features"
          rows={3}
          showCount
          maxLength={200}
          value="Sample text"
          tooltip="Help available"
        />
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <FormFieldTextarea
          label="With Features"
          rows={3}
          showCount
          maxLength={200}
          value="Sample text"
          tooltip="Help available"
        />
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <FormFieldTextarea
          label="With Features"
          rows={3}
          showCount
          maxLength={200}
          value="Sample text"
          tooltip="Help available"
        />
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <FormFieldTextarea
          label="With Features"
          rows={3}
          showCount
          maxLength={200}
          value="Sample text"
          tooltip="Help available"
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
          <FormFieldTextarea label="Error" rows={2} error="Invalid" value="Bad" />
          <FormFieldTextarea label="Success" rows={2} success="Valid!" value="Good" />
          <FormFieldTextarea label="Warning" rows={2} warning="Check" value="Hmm" />
        </div>
      </div>
      
      <div data-theme="dark" className="p-6 rounded-lg" style={{ background: '#1f2937' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-100">Dark Theme</h3>
        <div className="space-y-4">
          <FormFieldTextarea label="Error" rows={2} error="Invalid" value="Bad" />
          <FormFieldTextarea label="Success" rows={2} success="Valid!" value="Good" />
          <FormFieldTextarea label="Warning" rows={2} warning="Check" value="Hmm" />
        </div>
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: '#030712' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#22d3ee' }}>Neon Theme</h3>
        <div className="space-y-4">
          <FormFieldTextarea label="Error" rows={2} error="Invalid" value="Bad" />
          <FormFieldTextarea label="Success" rows={2} success="Valid!" value="Good" />
          <FormFieldTextarea label="Warning" rows={2} warning="Check" value="Hmm" />
        </div>
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: '#78350f' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#fef3c7' }}>Gold Theme</h3>
        <div className="space-y-4">
          <FormFieldTextarea label="Error" rows={2} error="Invalid" value="Bad" />
          <FormFieldTextarea label="Success" rows={2} success="Valid!" value="Good" />
          <FormFieldTextarea label="Warning" rows={2} warning="Check" value="Hmm" />
        </div>
      </div>
    </div>
  )
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
      <FormFieldTextarea
        label="Mobile Textarea"
        rows={4}
        placeholder="Optimized for mobile..."
        required
        showCount
        maxLength={300}
        helperText="Touch-friendly input"
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
      <FormFieldTextarea
        label="Accessible Textarea"
        required
        rows={3}
        placeholder="Has ARIA attributes..."
        helperText="Screen reader optimized"
        error="Error is announced"
        aria-label="Accessible text area"
        aria-describedby="textarea-helper textarea-error"
        aria-required="true"
        aria-invalid="true"
      />
      
      <FormFieldTextarea
        label="With Instructions"
        rows={3}
        placeholder="Tab to navigate..."
        helperText="Supports keyboard shortcuts"
      />
    </div>
  )
};

/**
 * Interactive Example
 */
export const Interactive: Story = {
  args: {
    label: 'Interactive Textarea',
    placeholder: 'Try the controls...',
    rows: 4,
    helperText: 'Experiment with different settings',
    showCount: false,
    maxLength: 500,
    required: false,
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls to experiment with different FormFieldTextarea configurations.'
      }
    }
  }
};