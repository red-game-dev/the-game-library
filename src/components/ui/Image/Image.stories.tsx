/**
 * @fileoverview Storybook stories for Image component
 * @module components/ui/Image/stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Image, ImageFallback } from './Image';

const meta: Meta<typeof Image> = {
  title: 'UI/Image',
  component: Image,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Image component with built-in fallback, lazy loading, and various display options.

## Features
- 🖼️ Automatic fallback on error
- 🔄 Loading states with skeleton
- 📐 Multiple aspect ratios
- 🎨 Object fit options
- 📱 Responsive sizing
- ⚡ Lazy loading support
- 🌙 Dark mode aware fallback
- ♿ Alt text support
        `
      }
    }
  },
  argTypes: {
    aspectRatio: {
      control: 'select',
      options: ['auto', 'square', 'video', 'portrait', 'landscape', 'wide']
    },
    objectFit: {
      control: 'select',
      options: ['contain', 'cover', 'fill', 'none', 'scale-down']
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full']
    },
    loading: {
      control: 'select',
      options: ['lazy', 'eager']
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default image
 */
export const Default: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Sample image',
    width: 400,
    height: 300
  }
};

/**
 * Aspect ratios
 */
export const AspectRatios: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 max-w-4xl">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">Square (1:1)</h3>
        <Image
          src="https://picsum.photos/300/300"
          alt="Square image"
          aspectRatio="square"
          width={300}
          height={300}
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">Video (16:9)</h3>
        <Image
          src="https://picsum.photos/400/225"
          alt="Video ratio image"
          aspectRatio="video"
          width={400}
          height={225}
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">Portrait (3:4)</h3>
        <Image
          src="https://picsum.photos/300/400"
          alt="Portrait image"
          aspectRatio="portrait"
          width={300}
          height={400}
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">Landscape (4:3)</h3>
        <Image
          src="https://picsum.photos/400/300"
          alt="Landscape image"
          aspectRatio="landscape"
          width={400}
          height={300}
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">Landscape (21:9)</h3>
        <Image
          src="https://picsum.photos/420/180"
          alt="Landscape image"
          aspectRatio="landscape"
          width={420}
          height={180}
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">Auto</h3>
        <Image
          src="https://picsum.photos/350/250"
          alt="Auto aspect image"
          aspectRatio="auto"
          width={350}
          height={250}
        />
      </div>
    </div>
  )
};

/**
 * Object fit options
 */
export const ObjectFit: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 max-w-4xl">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">Cover</h3>
        <div className="w-64 h-48 bg-gray-100 dark:bg-gray-800">
          <Image
            src="https://picsum.photos/400/600"
            alt="Cover fit"
            objectFit="cover"
            className="w-full h-full"
            width={256}
            height={192}
          />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">Contain</h3>
        <div className="w-64 h-48 bg-gray-100 dark:bg-gray-800">
          <Image
            src="https://picsum.photos/400/600"
            alt="Contain fit"
            objectFit="contain"
            className="w-full h-full"
            width={256}
            height={192}
          />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">Fill</h3>
        <div className="w-64 h-48 bg-gray-100 dark:bg-gray-800">
          <Image
            src="https://picsum.photos/400/600"
            alt="Fill fit"
            objectFit="fill"
            className="w-full h-full"
            width={256}
            height={192}
          />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">None</h3>
        <div className="w-64 h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <Image
            src="https://picsum.photos/400/600"
            alt="None fit"
            objectFit="none"
            className="w-full h-full"
            width={256}
            height={192}
          />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">Scale Down</h3>
        <div className="w-64 h-48 bg-gray-100 dark:bg-gray-800">
          <Image
            src="https://picsum.photos/200/150"
            alt="Scale down fit"
            objectFit="scale-down"
            className="w-full h-full"
            width={256}
            height={192}
          />
        </div>
      </div>
    </div>
  )
};

/**
 * Rounded corners
 */
export const RoundedCorners: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 max-w-4xl">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">None</h3>
        <Image
          src="https://picsum.photos/200/200"
          alt="No rounding"
          rounded={false}
          width={200}
          height={200}
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">Small</h3>
        <Image
          src="https://picsum.photos/200/200"
          alt="Small rounding"
          rounded="sm"
          width={200}
          height={200}
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">Medium</h3>
        <Image
          src="https://picsum.photos/200/200"
          alt="Medium rounding"
          rounded="md"
          width={200}
          height={200}
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">Large</h3>
        <Image
          src="https://picsum.photos/200/200"
          alt="Large rounding"
          rounded="lg"
          width={200}
          height={200}
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">Extra Large</h3>
        <Image
          src="https://picsum.photos/200/200"
          alt="Extra large rounding"
          rounded="xl"
          width={200}
          height={200}
        />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-3 text-text">Full (Circle)</h3>
        <Image
          src="https://picsum.photos/200/200"
          alt="Full rounding"
          rounded="full"
          width={200}
          height={200}
        />
      </div>
    </div>
  )
};

/**
 * Loading states
 */
export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-4 text-text">Loading Skeleton</h3>
        <div className="flex gap-4">
          <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
          <div className="w-64 h-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
          <div className="w-32 h-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-4 text-text">Loaded Images</h3>
        <div className="flex gap-4">
          <Image
            src="https://picsum.photos/192/192"
            alt="Loaded 1"
            width={192}
            height={192}
            className="rounded-lg"
          />
          <Image
            src="https://picsum.photos/256/192"
            alt="Loaded 2"
            width={256}
            height={192}
            className="rounded-lg"
          />
          <Image
            src="https://picsum.photos/128/192"
            alt="Loaded 3"
            width={128}
            height={192}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  )
};

/**
 * Error fallback
 */
export const ErrorFallback: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-4 text-text">Failed to Load (Shows Fallback)</h3>
        <div className="grid grid-cols-3 gap-4">
          <Image
            src="https://invalid-url-that-will-fail.com/image.jpg"
            alt="Failed image 1"
            width={200}
            height={200}
            fallback={<ImageFallback message="Image Not Available" />}
          />
          <Image
            src="https://another-invalid-url.com/image.jpg"
            alt="Failed image 2"
            width={200}
            height={200}
            showDefaultFallback={true}
          />
          <Image
            src="https://broken-link.com/image.jpg"
            alt="Failed image 3"
            width={200}
            height={200}
            fallback={<ImageFallback message="404" />}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-4 text-text">Custom Fallback Component</h3>
        <ImageFallback
          message="Custom Fallback"
          className="w-64 h-48"
        />
      </div>
    </div>
  )
};

/**
 * Game card images
 */
export const GameCardImages: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-2xl">
      <div className="bg-surface-elevated rounded-lg overflow-hidden">
        <Image
          src="https://picsum.photos/400/225"
          alt="Game thumbnail"
          aspectRatio="video"
          width={400}
          height={225}
        />
        <div className="p-4">
          <h3 className="font-semibold text-text">Game Title</h3>
          <p className="text-sm text-secondary">Action RPG</p>
        </div>
      </div>
      
      <div className="bg-surface-elevated rounded-lg overflow-hidden">
        <Image
          src="https://picsum.photos/400/225?random=2"
          alt="Game thumbnail"
          aspectRatio="video"
          width={400}
          height={225}
        />
        <div className="p-4">
          <h3 className="font-semibold text-text">Another Game</h3>
          <p className="text-sm text-secondary">Strategy</p>
        </div>
      </div>
    </div>
  )
};

/**
 * Avatar images
 */
export const Avatars: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold mb-4 text-text">User Avatars</h3>
        <div className="flex gap-4 items-center">
          <Image
            src="https://picsum.photos/32/32?random=1"
            alt="User avatar"
            rounded="full"
            width={32}
            height={32}
          />
          <Image
            src="https://picsum.photos/40/40?random=2"
            alt="User avatar"
            rounded="full"
            width={40}
            height={40}
          />
          <Image
            src="https://picsum.photos/48/48?random=3"
            alt="User avatar"
            rounded="full"
            width={48}
            height={48}
          />
          <Image
            src="https://picsum.photos/56/56?random=4"
            alt="User avatar"
            rounded="full"
            width={56}
            height={56}
          />
          <Image
            src="https://picsum.photos/64/64?random=5"
            alt="User avatar"
            rounded="full"
            width={64}
            height={64}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-4 text-text">Avatar with Fallback</h3>
        <div className="flex gap-4 items-center">
          <Image
            src="https://invalid-avatar-url.com/user1.jpg"
            alt="User 1"
            rounded="full"
            width={48}
            height={48}
            fallback={<ImageFallback message="U1" />}
          />
          <Image
            src="https://invalid-avatar-url.com/user2.jpg"
            alt="User 2"
            rounded="full"
            width={48}
            height={48}
            fallback={<ImageFallback message="U2" />}
          />
          <Image
            src="https://invalid-avatar-url.com/user3.jpg"
            alt="User 3"
            rounded="full"
            width={48}
            height={48}
            fallback={<ImageFallback message="U3" />}
          />
        </div>
      </div>
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
    (Story) => (
      <div data-theme="dark" className="p-8 bg-gray-900">
        <div className="grid grid-cols-2 gap-6">
          <Image
            src="https://picsum.photos/300/200"
            alt="Dark mode image"
            rounded="lg"
            width={300}
            height={200}
          />
          <Image
            src="https://invalid-url.com/image.jpg"
            alt="Dark mode fallback"
            rounded="lg"
            width={300}
            height={200}
            fallback={<ImageFallback message="Failed to Load" />}
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
    (Story) => (
      <div data-theme="light" className="p-8 bg-white">
        <div className="grid grid-cols-2 gap-6">
          <Image
            src="https://picsum.photos/300/200"
            alt="Light mode image"
            rounded="lg"
            width={300}
            height={200}
          />
          <Image
            src="https://invalid-url.com/image.jpg"
            alt="Light mode fallback"
            rounded="lg"
            width={300}
            height={200}
            fallback={<ImageFallback message="Failed to Load" />}
          />
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
    <div className="p-4">
      <Image
        src="https://picsum.photos/350/200"
        alt="Mobile image"
        className="w-full"
        rounded="lg"
        width={350}
        height={200}
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
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4">
        <Image
          src="https://picsum.photos/350/200"
          alt="Tablet image 1"
          rounded="lg"
          width={350}
          height={200}
        />
        <Image
          src="https://picsum.photos/350/200?random=2"
          alt="Tablet image 2"
          rounded="lg"
          width={350}
          height={200}
        />
      </div>
    </div>
  )
};

/**
 * Interactive playground
 */
export const Playground: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Playground image',
    width: 400,
    height: 300,
    aspectRatio: 'auto',
    objectFit: 'cover',
    rounded: 'md',
    loading: 'lazy'
  }
};