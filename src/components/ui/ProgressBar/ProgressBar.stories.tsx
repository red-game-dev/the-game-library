/**
 * ProgressBar Component Stories
 * Storybook stories for the ProgressBar component
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProgressBar } from './ProgressBar';
import React, { useState, useEffect } from 'react';

const meta = {
  title: 'UI/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile progress bar component with multiple variants, sizes, and animation options.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0-100)',
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value for the progress',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'gradient'],
      description: 'Visual variant of the progress bar',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the progress bar',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show percentage label',
    },
    label: {
      control: 'text',
      description: 'Custom label text (overrides percentage)',
    },
    striped: {
      control: 'boolean',
      description: 'Whether to show stripes',
    },
    animated: {
      control: 'boolean',
      description: 'Whether stripes should be animated',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the progress is indeterminate',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Border radius style',
    },
    glow: {
      control: 'boolean',
      description: 'Whether to show a glow effect',
    },
    shine: {
      control: 'boolean',
      description: 'Whether to show shine effect (like coming-soon)',
    },
    pulse: {
      control: 'boolean',
      description: 'Whether to pulse (like coming-soon)',
    },
    labelSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the label text',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    value: 60,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
};

export const CustomLabel: Story = {
  args: {
    value: 45,
    label: 'Loading...',
    showLabel: true,
  },
};

// Variants
export const Primary: Story = {
  args: {
    value: 70,
    variant: 'primary',
    showLabel: true,
  },
};

export const Secondary: Story = {
  args: {
    value: 55,
    variant: 'secondary',
    showLabel: true,
  },
};

export const Success: Story = {
  args: {
    value: 100,
    variant: 'success',
    showLabel: true,
  },
};

export const Warning: Story = {
  args: {
    value: 40,
    variant: 'warning',
    showLabel: true,
  },
};

export const Error: Story = {
  args: {
    value: 25,
    variant: 'error',
    showLabel: true,
  },
};

export const Gradient: Story = {
  args: {
    value: 80,
    variant: 'gradient',
    showLabel: true,
  },
};

export const CustomGradient: Story = {
  args: {
    value: 65,
    variant: 'gradient',
    gradientColors: {
      from: '#00f2fe',
      via: '#4facfe',
      to: '#00f2fe',
    },
    showLabel: true,
  },
};

// Sizes
export const ExtraSmall: Story = {
  args: {
    value: 50,
    size: 'xs',
    variant: 'primary',
  },
};

export const Small: Story = {
  args: {
    value: 50,
    size: 'sm',
    variant: 'primary',
  },
};

export const Medium: Story = {
  args: {
    value: 50,
    size: 'md',
    variant: 'primary',
  },
};

export const Large: Story = {
  args: {
    value: 50,
    size: 'lg',
    variant: 'primary',
    showLabel: true,
  },
};

export const ExtraLarge: Story = {
  args: {
    value: 50,
    size: 'xl',
    variant: 'primary',
    showLabel: true,
  },
};

// Striped
export const Striped: Story = {
  args: {
    value: 60,
    variant: 'primary',
    striped: true,
    showLabel: true,
  },
};

export const AnimatedStripes: Story = {
  args: {
    value: 70,
    variant: 'success',
    striped: true,
    animated: true,
    showLabel: true,
  },
};

// Indeterminate
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    variant: 'primary',
  },
};

export const IndeterminateStriped: Story = {
  args: {
    indeterminate: true,
    variant: 'secondary',
    striped: true,
    animated: true,
  },
};

// Rounded variants
export const RoundedNone: Story = {
  args: {
    value: 60,
    variant: 'primary',
    rounded: 'none',
    showLabel: true,
  },
};

export const RoundedSmall: Story = {
  args: {
    value: 60,
    variant: 'primary',
    rounded: 'sm',
    showLabel: true,
  },
};

export const RoundedMedium: Story = {
  args: {
    value: 60,
    variant: 'primary',
    rounded: 'md',
    showLabel: true,
  },
};

export const RoundedLarge: Story = {
  args: {
    value: 60,
    variant: 'primary',
    rounded: 'lg',
    showLabel: true,
  },
};

export const RoundedFull: Story = {
  args: {
    value: 60,
    variant: 'primary',
    rounded: 'full',
    showLabel: true,
  },
};

// Glow effects
export const WithGlow: Story = {
  args: {
    value: 75,
    variant: 'primary',
    glow: true,
    showLabel: true,
  },
};

export const GradientWithGlow: Story = {
  args: {
    value: 85,
    variant: 'gradient',
    glow: true,
    striped: true,
    animated: true,
    showLabel: true,
  },
};

// Coming Soon style effects
export const WithShine: Story = {
  args: {
    value: 70,
    variant: 'gradient',
    shine: true,
    showLabel: true,
  },
};

export const WithPulse: Story = {
  args: {
    value: 60,
    variant: 'primary',
    pulse: true,
    showLabel: true,
  },
};

export const ComingSoonStyle: Story = {
  args: {
    value: 60,
    variant: 'gradient',
    shine: true,
    pulse: true,
    rounded: 'full',
    gradientColors: {
      from: 'var(--purple-500)',
      via: 'var(--pink-500)',
      to: 'var(--purple-500)',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Replicates the Coming Soon page progress bar with loading animation from 0-100%',
      },
    },
  },
};

export const LoadingAnimation: Story = {
  args: {
    variant: 'primary',
    loading: true,
    rounded: 'full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the loading animation that continuously fills from 0% to 100%',
      },
    },
  },
};

// Label size variations
export const LabelSizes: Story = {
  render: () => (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Extra Small Label (xs) - 10px
        </p>
        <ProgressBar value={75} variant="primary" size="md" showLabel labelSize="xs" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Small Label (sm) - 12px - Default
        </p>
        <ProgressBar value={75} variant="secondary" size="md" showLabel labelSize="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Medium Label (md) - 14px
        </p>
        <ProgressBar value={75} variant="success" size="lg" showLabel labelSize="md" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Large Label (lg) - 16px
        </p>
        <ProgressBar value={75} variant="gradient" size="xl" showLabel labelSize="lg" />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Custom Label with Small Text
        </p>
        <ProgressBar 
          value={60} 
          variant="warning" 
          size="lg" 
          label="Processing..." 
          labelSize="xs" 
          showLabel 
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates different label text sizes with appropriate padding adjustments',
      },
    },
  },
};

// Interactive example
const InteractiveProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + 1, 100));
      }, 50);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setIsRunning(false);
    }
  }, [progress, isRunning]);

  return (
    <div style={{ width: '100%' }}>
      <ProgressBar
        value={progress}
        variant={progress < 30 ? 'error' : progress < 70 ? 'warning' : 'success'}
        showLabel
        striped={progress > 0 && progress < 100}
        animated={isRunning}
        glow
        size="lg"
      />
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => setIsRunning(true)}
          disabled={isRunning || progress >= 100}
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--purple-500)',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: isRunning || progress >= 100 ? 'not-allowed' : 'pointer',
            opacity: isRunning || progress >= 100 ? 0.5 : 1,
          }}
        >
          Start
        </button>
        <button
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--gray-500)',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: !isRunning ? 'not-allowed' : 'pointer',
            opacity: !isRunning ? 0.5 : 1,
          }}
        >
          Pause
        </button>
        <button
          onClick={() => {
            setProgress(0);
            setIsRunning(false);
          }}
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--red-500)',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveProgressBar />,
};

// Multiple progress bars example
export const Multiple: Story = {
  render: () => (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>CPU Usage</p>
        <ProgressBar value={35} variant="primary" showLabel size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Memory</p>
        <ProgressBar value={68} variant="warning" showLabel size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Storage</p>
        <ProgressBar value={92} variant="error" showLabel size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Network</p>
        <ProgressBar value={15} variant="success" showLabel size="sm" />
      </div>
    </div>
  ),
};

// Download simulation
const DownloadProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (isDownloading && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => {
          const increment = Math.random() * 10;
          return Math.min(prev + increment, 100);
        });
      }, 200);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setIsDownloading(false);
    }
  }, [progress, isDownloading]);

  const formatBytes = (bytes: number) => {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const totalSize = 1024 * 1024 * 250; // 250 MB
  const downloadedSize = (totalSize * progress) / 100;

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
        <span>game-update-v2.5.zip</span>
        <span>{formatBytes(downloadedSize)} / {formatBytes(totalSize)}</span>
      </div>
      <ProgressBar
        value={progress}
        variant="gradient"
        showLabel
        striped={isDownloading}
        animated={isDownloading}
        size="lg"
        glow
      />
      <button
        onClick={() => {
          if (progress >= 100) {
            setProgress(0);
          }
          setIsDownloading(!isDownloading);
        }}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: progress >= 100 ? 'var(--green-500)' : isDownloading ? 'var(--red-500)' : 'var(--purple-500)',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        {progress >= 100 ? 'Download Complete ✓' : isDownloading ? 'Cancel Download' : 'Start Download'}
      </button>
    </div>
  );
};

export const DownloadSimulation: Story = {
  render: () => <DownloadProgressBar />,
};

// Theme examples
export const DarkTheme: Story = {
  args: {
    value: 70,
    variant: 'primary',
    showLabel: true,
    striped: true,
    animated: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ width: '400px', padding: '2rem', background: '#111827', borderRadius: '0.5rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const LightTheme: Story = {
  args: {
    value: 70,
    variant: 'primary',
    showLabel: true,
    striped: true,
    animated: true,
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
  decorators: [
    (Story) => (
      <div data-theme="light" style={{ width: '400px', padding: '2rem', background: '#ffffff', borderRadius: '0.5rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const NeonTheme: Story = {
  args: {
    value: 80,
    variant: 'primary',
    showLabel: true,
    glow: true,
    shine: true,
    striped: true,
    animated: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div data-theme="neon" style={{ width: '400px', padding: '2rem', background: 'rgb(3, 7, 18)', borderRadius: '0.5rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--purple-400)' }}>Neon Theme Progress</h3>
        <Story />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--cyan-300)' }}>Cyber enhancement loading...</p>
      </div>
    ),
  ],
};

export const GoldTheme: Story = {
  args: {
    value: 65,
    variant: 'gradient',
    showLabel: true,
    striped: true,
    glow: true,
    shine: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div data-theme="gold" style={{ width: '400px', padding: '2rem', background: 'linear-gradient(135deg, #78350f, #422006)', borderRadius: '0.5rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--yellow-400)' }}>Gold Theme Progress</h3>
        <Story />
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--yellow-200)' }}>VIP status loading...</p>
      </div>
    ),
  ],
};

/**
 * All themes comparison
 */
export const AllThemes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div data-theme="light" style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '0.5rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--gray-900)' }}>Light Theme</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <ProgressBar value={60} variant="primary" showLabel />
          <ProgressBar value={75} variant="success" showLabel striped animated />
          <ProgressBar value={40} variant="gradient" showLabel shine />
        </div>
      </div>
      
      <div data-theme="dark" style={{ padding: '1.5rem', background: '#111827', borderRadius: '0.5rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--gray-100)' }}>Dark Theme</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <ProgressBar value={60} variant="primary" showLabel />
          <ProgressBar value={75} variant="success" showLabel striped animated />
          <ProgressBar value={40} variant="gradient" showLabel shine />
        </div>
      </div>
      
      <div data-theme="neon" style={{ padding: '1.5rem', background: 'rgb(3, 7, 18)', borderRadius: '0.5rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--purple-400)' }}>Neon Theme</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <ProgressBar value={60} variant="primary" showLabel glow />
          <ProgressBar value={75} variant="gradient" showLabel striped animated glow shine />
          <ProgressBar value={40} variant="secondary" showLabel pulse />
        </div>
      </div>
      
      <div data-theme="gold" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #78350f, #422006)', borderRadius: '0.5rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--yellow-400)' }}>Gold Theme</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <ProgressBar value={60} variant="gradient" showLabel shine />
          <ProgressBar value={75} variant="warning" showLabel striped glow />
          <ProgressBar value={40} variant="primary" showLabel shine pulse />
        </div>
      </div>
    </div>
  ),
};

// Without Labels - Slim variants
export const SlimProgressBars: Story = {
  render: () => (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Extra Small (8px) - No Label
        </p>
        <ProgressBar value={60} variant="primary" size="xs" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Small (12px) - No Label
        </p>
        <ProgressBar value={60} variant="secondary" size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Medium (16px) - No Label
        </p>
        <ProgressBar value={60} variant="success" size="md" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Same sizes WITH labels (notice min-height applied)
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
          <ProgressBar value={60} variant="primary" size="xs" showLabel />
          <ProgressBar value={60} variant="secondary" size="sm" showLabel />
          <ProgressBar value={60} variant="success" size="md" showLabel />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how progress bars are slimmer without labels and expand to accommodate text when labels are present',
      },
    },
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Default (Blue gradient)
        </p>
        <ProgressBar value={70} variant="default" showLabel />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Primary (Purple)
        </p>
        <ProgressBar value={70} variant="primary" showLabel />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Secondary (Pink)
        </p>
        <ProgressBar value={70} variant="secondary" showLabel />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Success (Green)
        </p>
        <ProgressBar value={70} variant="success" showLabel />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Warning (Yellow)
        </p>
        <ProgressBar value={70} variant="warning" showLabel />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Error (Red)
        </p>
        <ProgressBar value={70} variant="error" showLabel />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Gradient (Customizable)
        </p>
        <ProgressBar value={70} variant="gradient" showLabel />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available color variants including the new default blue gradient',
      },
    },
  },
};

// Combined Effects
export const CombinedEffects: Story = {
  render: () => (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Striped + Animated + Glow
        </p>
        <ProgressBar value={65} variant="primary" striped animated glow showLabel />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Shine + Pulse + Gradient
        </p>
        <ProgressBar value={75} variant="gradient" shine pulse showLabel />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Loading + Shine (Continuous Animation)
        </p>
        <ProgressBar variant="primary" loading shine />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          All Effects Combined
        </p>
        <ProgressBar 
          value={80} 
          variant="gradient" 
          striped 
          animated 
          glow 
          shine 
          pulse 
          showLabel
          size="lg"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how different animation and visual effects can be combined',
      },
    },
  },
};

// Aria Label Example
export const WithAriaLabel: Story = {
  args: {
    value: 45,
    variant: 'primary',
    ariaLabel: 'File upload progress: 45% complete',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with custom aria-label for screen readers',
      },
    },
  },
};

// Custom Max Value
export const CustomMaxValue: Story = {
  render: () => (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Progress: 250/500 (max=500)
        </p>
        <ProgressBar value={250} max={500} variant="primary" showLabel />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Progress: 7/10 tasks (max=10)
        </p>
        <ProgressBar value={7} max={10} variant="success" label="7/10 tasks" />
      </div>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Progress: 150/200 HP (max=200)
        </p>
        <ProgressBar 
          value={150} 
          max={200} 
          variant={150 > 100 ? 'success' : 150 > 50 ? 'warning' : 'error'} 
          label="150/200 HP" 
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars with custom maximum values other than 100',
      },
    },
  },
};

// Mobile responsive example
export const MobileResponsive: Story = {
  render: () => (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Mobile View (320px)</h3>
        <div style={{ width: '320px', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', background: 'var(--color-surface)' }}>
          <ProgressBar value={60} variant="primary" size="md" showLabel shine />
        </div>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Tablet View (768px)</h3>
        <div style={{ width: '768px', maxWidth: '100%', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', background: 'var(--color-surface)' }}>
          <ProgressBar value={60} variant="primary" size="md" showLabel shine />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Desktop View (100%)</h3>
        <div style={{ width: '100%', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', background: 'var(--color-surface)' }}>
          <ProgressBar value={60} variant="primary" size="md" showLabel shine />
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>All Sizes Comparison</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', background: 'var(--color-surface)' }}>
          <div>
            <p style={{ fontSize: '0.75rem', marginBottom: '0.25rem', color: 'var(--color-text-secondary)' }}>Extra Small (xs)</p>
            <ProgressBar value={60} variant="gradient" size="xs" />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', marginBottom: '0.25rem', color: 'var(--color-text-secondary)' }}>Small (sm)</p>
            <ProgressBar value={60} variant="gradient" size="sm" />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', marginBottom: '0.25rem', color: 'var(--color-text-secondary)' }}>Medium (md)</p>
            <ProgressBar value={60} variant="gradient" size="md" />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', marginBottom: '0.25rem', color: 'var(--color-text-secondary)' }}>Large (lg)</p>
            <ProgressBar value={60} variant="gradient" size="lg" />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', marginBottom: '0.25rem', color: 'var(--color-text-secondary)' }}>Extra Large (xl)</p>
            <ProgressBar value={60} variant="gradient" size="xl" showLabel />
          </div>
        </div>
      </div>
    </div>
  ),
};