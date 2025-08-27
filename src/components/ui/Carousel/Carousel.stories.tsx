/**
 * Carousel Stories - Comprehensive Embla options and plugins coverage
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import Image from 'next/image';
import Carousel from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Embla-based carousel component with comprehensive options and plugins support.

## Core Options
- **align**: Start, center, or end alignment of slides
- **axis**: Horizontal (x) or vertical (y) scrolling
- **containScroll**: Trim snaps, keep snaps, or false
- **direction**: Left-to-right (ltr) or right-to-left (rtl)
- **slidesToScroll**: Number of slides to scroll or 'auto'
- **dragFree**: Enable free dragging without snapping
- **loop**: Enable infinite loop
- **skipSnaps**: Allow skipping multiple slides
- **duration**: Animation duration in ms
- **startIndex**: Initial slide index

## Plugins
- **Autoplay**: Automatic slide progression
- **AutoScroll**: Continuous scrolling animation
- **AutoHeight**: Dynamic height adjustment
- **ClassNames**: Custom CSS classes for states
- **WheelGestures**: Mouse wheel navigation
        `
      }
    }
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'Embla carousel options'
    },
    slideSpacing: {
      control: { type: 'number', min: 0, max: 3, step: 0.25 },
      description: 'Gap between slides in rem'
    },
    slidesPerView: {
      control: { type: 'number', min: 1, max: 5, step: 1 },
      description: 'Number of slides visible at once'
    },
    plugins: {
      control: 'object',
      description: 'Plugin configurations'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    },
    showArrows: {
      control: 'boolean',
      description: 'Show navigation arrows'
    },
    showDots: {
      control: 'boolean',
      description: 'Show dot indicators'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to generate numbered slides
const generateSlides = (count: number) => Array.from({ length: count }, (_, i) => i + 1);

// Helper to generate text slides
const generateTextSlides = (texts: string[]) => texts;

// Helper to generate mixed content slides
const generateMixedSlides = () => [
  1,
  "Slide Two",
  <div key="3" className="text-center p-8">
    <h3 className="text-2xl font-bold text-purple-500">Custom Element</h3>
    <p className="text-gray-600 mt-2">With React content</p>
  </div>,
  "Fourth Slide",
  5,
  <div key="6" className="flex flex-col items-center justify-center h-full p-8">
    <span className="text-6xl">🎮</span>
    <span className="text-lg mt-2">Gaming!</span>
  </div>
];

// Helper to generate image slides
const generateImageSlides = (count: number) => Array.from({ length: count }, (_, i) => (
  <div key={i} className="relative w-full" style={{ height: '19rem' }}>
    <Image 
      src={`https://picsum.photos/seed/slide${i}/600/400`}
      alt={`Slide ${i + 1}`}
      className="w-full h-full object-cover rounded-lg"
      width={600}
      height={400}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
    <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
      Image {i + 1}
    </div>
  </div>
));

/**
 * Default carousel
 */
export const Default: Story = {
  args: {
    children: generateSlides(5),
    showArrows: true,
    showDots: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic carousel with default settings. Shows arrows and dots navigation.'
      }
    }
  }
};

// ============================================
// CONTENT TYPE STORIES
// ============================================

/**
 * Text Content Slides
 * Carousel with text content instead of numbers
 */
export const TextSlides: Story = {
  args: {
    children: generateTextSlides([
      "Welcome",
      "Discover Amazing Games",
      "Play Your Favorites",
      "Win Big Prizes",
      "Join the Community"
    ]),
    slideSpacing: 1,
    showArrows: true,
    showDots: true,
    arrowVariant: 'primary'
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel displaying text content. Useful for welcome messages, instructions, or promotional content.'
      }
    }
  }
};

/**
 * Mixed Content Slides
 * Carousel with numbers, text, and React elements
 */
export const MixedContentSlides: Story = {
  args: {
    children: generateMixedSlides(),
    slideSpacing: 1.5,
    showArrows: true,
    showDots: true,
    snap: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel supporting mixed content types - numbers, strings, and React elements. Shows the flexibility of slide content.'
      }
    }
  }
};

/**
 * Image Gallery
 * Carousel displaying images with captions
 */
export const ImageGallery: Story = {
  args: {
    children: generateImageSlides(6),
    slideSpacing: 1,
    itemsPerView: 1,
    showArrows: true,
    showDots: true,
    arrowVariant: 'secondary',
    infinite: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Image gallery carousel with overlay captions. Perfect for showcasing game screenshots or promotional images.'
      }
    }
  }
};

/**
 * Custom React Elements
 * Carousel with fully custom React components
 */
export const CustomElements: Story = {
  args: {
    children: [
      <div key="1" className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-8 text-white h-full flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4">Premium Feature</h2>
        <p className="text-lg">Unlock exclusive content</p>
        <button className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold">
          Learn More
        </button>
      </div>,
      <div key="2" className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-8 text-white h-full flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4">Daily Bonus</h2>
        <p className="text-lg">Claim your rewards</p>
        <div className="mt-4 text-4xl">🎁 💰 🏆</div>
      </div>,
      <div key="3" className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg p-8 text-white h-full flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4">Tournaments</h2>
        <p className="text-lg">Compete with players worldwide</p>
        <div className="mt-4 flex gap-2">
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded">Live Now</span>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded">500 Players</span>
        </div>
      </div>,
      <div key="4" className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-8 text-white h-full flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4">Hot Games</h2>
        <p className="text-lg">Trending this week</p>
        <div className="mt-4 text-4xl">🔥 🎮 🎯</div>
      </div>
    ],
    slideSpacing: 2,
    itemsPerView: 1,
    showArrows: true,
    showDots: true,
    arrowVariant: 'primary',
    autoScroll: true,
    autoScrollInterval: 4000
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully customized React elements as slides. Shows how to create rich, interactive carousel content with custom styling and components.'
      }
    }
  }
};

// ============================================
// PROP-SPECIFIC STORIES
// ============================================

/**
 * Button Variants (Arrows & Dots)
 */
export const VariantGhost: Story = {
  args: {
    children: generateSlides(5),
    showArrows: true,
    showDots: true,
    arrowVariant: 'ghost',
    arrowSize: 'md',
    slideSpacing: 1
  },
  parameters: {
    docs: {
      description: {
        story: 'Ghost variant for both arrows and dots - transparent background with subtle styling. Dots and arrows share the same variant.'
      }
    }
  }
};

export const VariantPrimary: Story = {
  args: {
    children: generateSlides(5),
    showArrows: true,
    showDots: true,
    arrowVariant: 'primary',
    arrowSize: 'md',
    slideSpacing: 1
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary variant - purple theme colors for prominent navigation. Both arrows and dots use the primary styling.'
      }
    }
  }
};

export const VariantSecondary: Story = {
  args: {
    children: generateSlides(5),
    showArrows: true,
    showDots: true,
    arrowVariant: 'secondary',
    arrowSize: 'md',
    slideSpacing: 1
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary variant - gray background for subtle navigation. Consistent styling across arrows and dots.'
      }
    }
  }
};

export const VariantAccent: Story = {
  args: {
    children: generateSlides(5),
    showArrows: true,
    showDots: true,
    arrowVariant: 'accent',
    arrowSize: 'md',
    slideSpacing: 1
  },
  parameters: {
    docs: {
      description: {
        story: 'Accent variant - lime/green colors for eye-catching navigation controls.'
      }
    }
  }
};

export const MixedVariants: Story = {
  args: {
    children: generateSlides(5),
    showArrows: true,
    showDots: true,
    arrowVariant: 'primary',
    dotVariant: 'accent',
    arrowSize: 'md',
    dotSize: 'sm',
    slideSpacing: 1
  },
  parameters: {
    docs: {
      description: {
        story: 'Different variants for arrows (primary) and dots (accent). Shows how you can customize each control type independently.'
      }
    }
  }
};

/**
 * Button Sizes (Arrows & Dots)
 */
export const SizeExtraSmall: Story = {
  args: {
    children: generateSlides(5),
    showArrows: true,
    showDots: true,
    arrowSize: 'xs',
    arrowVariant: 'primary',
    slideSpacing: 1
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra small buttons and dots - minimal space usage for compact interfaces.'
      }
    }
  }
};

export const SizeSmall: Story = {
  args: {
    children: generateSlides(5),
    showArrows: true,
    showDots: true,
    arrowSize: 'sm',
    arrowVariant: 'primary',
    slideSpacing: 1
  },
  parameters: {
    docs: {
      description: {
        story: 'Small navigation controls - good balance between visibility and space.'
      }
    }
  }
};

export const SizeMedium: Story = {
  args: {
    children: generateSlides(5),
    showArrows: true,
    showDots: true,
    arrowSize: 'md',
    arrowVariant: 'primary',
    slideSpacing: 1
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium navigation controls - default size for most use cases.'
      }
    }
  }
};

export const SizeLarge: Story = {
  args: {
    children: generateSlides(5),
    showArrows: true,
    showDots: true,
    arrowSize: 'lg',
    arrowVariant: 'primary',
    slideSpacing: 1
  },
  parameters: {
    docs: {
      description: {
        story: 'Large navigation controls - prominent for touchscreen devices.'
      }
    }
  }
};

export const MixedSizes: Story = {
  args: {
    children: generateSlides(5),
    showArrows: true,
    showDots: true,
    arrowSize: 'lg',
    dotSize: 'xs',
    arrowVariant: 'secondary',
    slideSpacing: 1
  },
  parameters: {
    docs: {
      description: {
        story: 'Different sizes for arrows (large) and dots (extra small). Useful for emphasizing primary navigation.'
      }
    }
  }
};

/**
 * Auto Scroll Feature
 */
export const AutoScrollEnabled: Story = {
  args: {
    children: generateSlides(8),
    autoScroll: true,
    autoScrollInterval: 3000,
    showArrows: false,
    showDots: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with auto-scroll enabled. Advances every 3 seconds automatically.'
      }
    }
  }
};

export const AutoScrollCustomInterval: Story = {
  args: {
    children: generateSlides(5),
    autoScroll: true,
    autoScrollInterval: 1500,
    showArrows: true,
    showDots: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Fast auto-scrolling carousel with 1.5 second intervals. Good for promotional content.'
      }
    }
  }
};

/**
 * Items Per View
 */
export const ItemsPerViewAuto: Story = {
  args: {
    children: generateSlides(10),
    itemsPerView: 'auto',
    slideSpacing: 1,
    showArrows: true,
    showDots: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with automatic item width calculation based on content size.'
      }
    }
  }
};

export const ItemsPerViewFixed: Story = {
  args: {
    children: generateSlides(10),
    itemsPerView: 3,
    slideSpacing: 1,
    showArrows: true,
    showDots: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel showing exactly 3 items at once, evenly distributed.'
      }
    }
  }
};

export const ItemsPerViewCustomWidth: Story = {
  args: {
    children: generateSlides(8),
    itemsPerView: { width: '200px' },
    slideSpacing: 1.5,
    showArrows: true,
    showDots: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with fixed 200px width per item. Useful for consistent card sizes.'
      }
    }
  }
};

/**
 * Snap Scrolling
 */
export const SnapEnabled: Story = {
  args: {
    children: generateSlides(10),
    snap: true,
    itemsPerView: 1,
    showArrows: true,
    showDots: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with snap scrolling - slides snap to position when scrolling.'
      }
    }
  }
};

export const SnapDisabled: Story = {
  args: {
    children: generateSlides(10),
    snap: false,
    itemsPerView: 3,
    showArrows: true,
    showDots: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Free-scrolling carousel without snap points. Allows smooth continuous scrolling.'
      }
    }
  }
};

/**
 * Infinite Scroll
 */
export const InfiniteScrollEnabled: Story = {
  args: {
    children: generateSlides(6),
    infinite: true,
    itemsPerView: 1,
    slideSpacing: 1,
    showArrows: true,
    showDots: true,
    arrowVariant: 'primary',
    snap: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Infinite loop carousel - seamlessly loops from last to first slide. Navigate to the last slide and click next to see the loop.'
      }
    }
  }
};

export const InfiniteScrollDisabled: Story = {
  args: {
    children: generateSlides(5),
    infinite: false,
    itemsPerView: 1,
    slideSpacing: 1,
    showArrows: true,
    showDots: true,
    arrowVariant: 'secondary'
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard carousel that stops at the first and last slides. Arrows will be disabled at boundaries.'
      }
    }
  }
};

/**
 * Swipe Support
 */
export const SwipeEnabled: Story = {
  args: {
    children: generateSlides(8),
    enableSwipe: true,
    itemsPerView: 1,
    slideSpacing: 1,
    showArrows: false,
    showDots: true,
    arrowVariant: 'ghost'
  },
  parameters: {
    docs: {
      description: {
        story: 'Touch-friendly carousel with swipe gestures enabled. Try dragging the slides with mouse or touch. Perfect for mobile devices.'
      }
    }
  }
};

export const SwipeDisabled: Story = {
  args: {
    children: generateSlides(5),
    enableSwipe: false,
    itemsPerView: 1,
    slideSpacing: 1,
    showArrows: true,
    showDots: true,
    arrowVariant: 'primary'
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with swipe disabled - only controllable via buttons. Try dragging - it won\'t work. Useful for preventing accidental swipes.'
      }
    }
  }
};

/**
 * Height Modes
 */
export const HeightAuto: Story = {
  args: {
    children: generateSlides(5),
    height: 'auto',
    itemsPerView: 1,
    showArrows: true,
    showDots: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with automatic height that adjusts to content size.'
      }
    }
  }
};

export const HeightFixed: Story = {
  args: {
    children: generateSlides(5),
    height: 'fixed',
    itemsPerView: 1,
    showArrows: true,
    showDots: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with fixed height (24rem). Ensures consistent layout regardless of content.'
      }
    }
  }
};

/**
 * Combined Features
 */
export const FullFeatured: Story = {
  args: {
    children: generateSlides(12),
    showArrows: true,
    arrowVariant: 'primary',
    arrowSize: 'md',
    showDots: true,
    autoScroll: true,
    autoScrollInterval: 4000,
    itemsPerView: 3,
    snap: true,
    infinite: true,
    enableSwipe: true,
    slideSpacing: 1.5,
    height: 'auto'
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully featured carousel showcasing all available props working together.'
      }
    }
  }
};

export const MinimalCarousel: Story = {
  args: {
    children: generateSlides(5),
    showArrows: false,
    showDots: false,
    autoScroll: false,
    itemsPerView: 1,
    snap: true,
    infinite: false,
    enableSwipe: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal carousel with only swipe navigation. Clean and simple interface.'
      }
    }
  }
};

// ============================================
// PLUGIN: AUTOPLAY
// ============================================

/**
 * Autoplay - Basic
 */
export const AutoplayBasic: Story = {
  args: {
    children: generateSlides(5),
    options: { loop: true },
    plugins: {
      autoplay: true
    }
  }
};

/**
 * Autoplay - Fast (2 seconds)
 */
export const AutoplayFast: Story = {
  args: {
    children: generateSlides(5),
    options: { loop: true },
    plugins: {
      autoplay: {
        delay: 2000,
        stopOnInteraction: false
      }
    }
  }
};

/**
 * Autoplay - Slow (6 seconds)
 */
export const AutoplaySlow: Story = {
  args: {
    children: generateSlides(5),
    options: { loop: true },
    plugins: {
      autoplay: {
        delay: 6000
      }
    }
  }
};

/**
 * Autoplay - Jump (skips animation)
 */
export const AutoplayJump: Story = {
  args: {
    children: generateSlides(5),
    options: { loop: true },
    plugins: {
      autoplay: {
        jump: true,
        delay: 3000
      }
    }
  }
};

/**
 * Autoplay - No stop on hover
 */
export const AutoplayNoStopOnHover: Story = {
  args: {
    children: generateSlides(5),
    options: { loop: true },
    plugins: {
      autoplay: {
        stopOnMouseEnter: false,
        stopOnInteraction: false
      }
    }
  }
};

// ============================================
// PLUGIN: AUTO SCROLL
// ============================================

/**
 * AutoScroll - Basic
 */
export const AutoScrollBasic: Story = {
  args: {
    children: generateSlides(10),
    options: { loop: true },
    plugins: {
      autoScroll: true
    }
  }
};

/**
 * AutoScroll - Slow speed
 */
export const AutoScrollSlow: Story = {
  args: {
    children: generateSlides(10),
    options: { loop: true },
    plugins: {
      autoScroll: {
        speed: 0.5
      }
    }
  }
};

/**
 * AutoScroll - Fast speed
 */
export const AutoScrollFast: Story = {
  args: {
    children: generateSlides(10),
    options: { loop: true },
    plugins: {
      autoScroll: {
        speed: 2
      }
    }
  }
};

/**
 * AutoScroll - Backward direction
 */
export const AutoScrollBackward: Story = {
  args: {
    children: generateSlides(10),
    options: { loop: true },
    plugins: {
      autoScroll: {
        direction: 'backward'
      }
    }
  }
};

/**
 * AutoScroll - With start delay
 */
export const AutoScrollDelayed: Story = {
  args: {
    children: generateSlides(10),
    options: { loop: true },
    plugins: {
      autoScroll: {
        startDelay: 2000,
        speed: 1.5
      }
    }
  }
};

// ============================================
// PLUGIN: AUTO HEIGHT
// ============================================

/**
 * AutoHeight - Variable heights
 */
export const AutoHeightBasic: Story = {
  args: {
    children: generateSlides(5),
    options: {},
    plugins: {
      autoHeight: true
    }
  },
  render: (args) => {
    const customSlides = [1, 2, 3, 4, 5].map(num => (
      <div key={num} style={{ 
        height: `${100 + num * 50}px`,
        background: `linear-gradient(135deg, hsl(${num * 40}, 70%, 50%) 0%, hsl(${num * 40}, 70%, 40%) 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '2rem',
        fontWeight: 'bold'
      }}>
        Height: {100 + num * 50}px
      </div>
    ));
    return <Carousel {...args}>{customSlides}</Carousel>;
  }
};

/**
 * AutoHeight - Custom destroy height
 */
export const AutoHeightCustomDestroy: Story = {
  args: {
    children: generateSlides(5),
    options: {},
    plugins: {
      autoHeight: {
        destroyHeight: '200px'
      }
    }
  }
};

// ============================================
// PLUGIN: CLASS NAMES
// ============================================

/**
 * ClassNames - Basic
 */
export const ClassNamesBasic: Story = {
  args: {
    children: generateSlides(5),
    options: {},
    plugins: {
      classNames: true
    }
  }
};

/**
 * ClassNames - Custom classes
 */
export const ClassNamesCustom: Story = {
  args: {
    children: generateSlides(5),
    options: {},
    plugins: {
      classNames: {
        draggable: 'can-drag',
        dragging: 'is-being-dragged',
        selected: 'current-slide',
        prev: 'previous-slide',
        next: 'next-slide',
        inView: 'visible-slide'
      }
    }
  }
};

// ============================================
// PLUGIN: WHEEL GESTURES
// ============================================

/**
 * WheelGestures - Basic
 */
export const WheelGesturesBasic: Story = {
  args: {
    children: generateSlides(10),
    options: {},
    plugins: {
      wheelGestures: true
    }
  }
};

/**
 * WheelGestures - X-axis forced
 */
export const WheelGesturesXAxis: Story = {
  args: {
    children: generateSlides(10),
    options: {},
    plugins: {
      wheelGestures: {
        forceWheelAxis: 'x'
      }
    }
  }
};

/**
 * WheelGestures - Y-axis forced (for vertical carousel)
 */
export const WheelGesturesYAxis: Story = {
  args: {
    children: generateSlides(10),
    options: {
      axis: 'y'
    },
    plugins: {
      wheelGestures: {
        forceWheelAxis: 'y'
      }
    }
  }
};

// ============================================
// ALIGNMENT OPTIONS
// ============================================

/**
 * Align - Start
 */
export const AlignStart: Story = {
  args: {
    children: generateSlides(5),
    options: {
      align: 'start'
    }
  }
};

/**
 * Align - Center
 */
export const AlignCenter: Story = {
  args: {
    children: generateSlides(5),
    options: {
      align: 'center'
    }
  }
};

/**
 * Align - End
 */
export const AlignEnd: Story = {
  args: {
    children: generateSlides(5),
    options: {
      align: 'end'
    }
  }
};

// ============================================
// DOT INDICATORS
// ============================================

/**
 * With Dots - Basic
 */
export const WithDots: Story = {
  args: {
    children: generateSlides(5),
    options: {
      loop: false
    },
    showArrows: true,
    showDots: true
  }
};

/**
 * Dots Only (No Arrows)
 */
export const DotsOnly: Story = {
  args: {
    children: generateSlides(5),
    options: {
      loop: true
    },
    showArrows: false,
    showDots: true
  }
};

/**
 * Dots with Autoplay
 */
export const DotsWithAutoplay: Story = {
  args: {
    children: generateSlides(6),
    options: {
      loop: true
    },
    plugins: {
      autoplay: {
        delay: 3000
      }
    },
    showArrows: false,
    showDots: true
  }
};

// ============================================
// SLIDE SPACING / GAP
// ============================================

/**
 * No Gap (Multiple slides visible)
 */
export const NoGap: Story = {
  args: {
    children: generateSlides(8),
    slideSpacing: 0,
    slidesPerView: 3,
    options: {
      slidesToScroll: 1
    }
  }
};

/**
 * Small Gap (0.5rem - Multiple slides)
 */
export const SmallGap: Story = {
  args: {
    children: generateSlides(8),
    slideSpacing: 0.5,
    slidesPerView: 3,
    options: {
      slidesToScroll: 1
    }
  }
};

/**
 * Medium Gap (1rem - Multiple slides)
 */
export const MediumGap: Story = {
  args: {
    children: generateSlides(8),
    slideSpacing: 1,
    slidesPerView: 3,
    options: {
      slidesToScroll: 1
    }
  }
};

/**
 * Large Gap (2rem - Multiple slides)
 */
export const LargeGap: Story = {
  args: {
    children: generateSlides(8),
    slideSpacing: 2,
    slidesPerView: 3,
    options: {
      slidesToScroll: 1
    }
  }
};

/**
 * Gap Comparison (3 slides per view)
 */
export const GapComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>No Gap (0rem) - 3 slides visible</h3>
        <Carousel slideSpacing={0} slidesPerView={3} showDots={false}>
          {generateSlides(8)}
        </Carousel>
      </div>
      <div>
        <h3>Small Gap (0.5rem) - 3 slides visible</h3>
        <Carousel slideSpacing={0.5} slidesPerView={3} showDots={false}>
          {generateSlides(8)}
        </Carousel>
      </div>
      <div>
        <h3>Medium Gap (1rem) - 3 slides visible</h3>
        <Carousel slideSpacing={1} slidesPerView={3} showDots={false}>
          {generateSlides(8)}
        </Carousel>
      </div>
      <div>
        <h3>Large Gap (2rem) - 3 slides visible</h3>
        <Carousel slideSpacing={2} slidesPerView={3} showDots={false}>
          {generateSlides(8)}
        </Carousel>
      </div>
    </div>
  )
};

// ============================================
// SLIDES PER VIEW
// ============================================

/**
 * 1 Slide Per View
 */
export const OneSlidePerView: Story = {
  args: {
    children: generateSlides(6),
    slidesPerView: 1,
    slideSpacing: 1,
    showDots: true
  }
};

/**
 * 2 Slides Per View
 */
export const TwoSlidesPerView: Story = {
  args: {
    children: generateSlides(8),
    slidesPerView: 2,
    slideSpacing: 1,
    showDots: true
  }
};

/**
 * 3 Slides Per View
 */
export const ThreeSlidesPerView: Story = {
  args: {
    children: generateSlides(9),
    slidesPerView: 3,
    slideSpacing: 1,
    showDots: true
  }
};

/**
 * 4 Slides Per View
 */
export const FourSlidesPerView: Story = {
  args: {
    children: generateSlides(12),
    slidesPerView: 4,
    slideSpacing: 1,
    showDots: true
  }
};

/**
 * 5 Slides Per View
 */
export const FiveSlidesPerView: Story = {
  args: {
    children: generateSlides(15),
    slidesPerView: 5,
    slideSpacing: 1,
    showDots: true
  }
};

/**
 * Slides Per View Comparison
 */
export const SlidesPerViewComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h3>1 Slide Per View</h3>
        <Carousel slidesPerView={1} slideSpacing={1}>
          {generateSlides(5)}
        </Carousel>
      </div>
      <div>
        <h3>2 Slides Per View</h3>
        <Carousel slidesPerView={2} slideSpacing={1}>
          {generateSlides(6)}
        </Carousel>
      </div>
      <div>
        <h3>3 Slides Per View</h3>
        <Carousel slidesPerView={3} slideSpacing={1}>
          {generateSlides(9)}
        </Carousel>
      </div>
      <div>
        <h3>5 Slides Per View</h3>
        <Carousel slidesPerView={5} slideSpacing={1}>
          {generateSlides(10)}
        </Carousel>
      </div>
    </div>
  )
};

// ============================================
// COMBINATION EXAMPLES
// ============================================

/**
 * Multiple plugins - Autoplay + AutoHeight
 */
export const AutoplayWithAutoHeight: Story = {
  args: {
    children: generateSlides(5),
    options: { loop: true },
    plugins: {
      autoplay: {
        delay: 3000
      },
      autoHeight: true
    }
  }
};

/**
 * Multiple plugins - AutoScroll + WheelGestures
 */
export const AutoScrollWithWheel: Story = {
  args: {
    children: generateSlides(15),
    options: { loop: true },
    plugins: {
      autoScroll: {
        speed: 0.8,
        stopOnInteraction: true
      },
      wheelGestures: true
    }
  }
};

/**
 * Multiple plugins - All plugins active
 */
export const AllPlugins: Story = {
  args: {
    children: generateSlides(10),
    options: { 
      loop: true,
      skipSnaps: true
    },
    plugins: {
      autoplay: {
        delay: 5000,
        stopOnMouseEnter: true
      },
      autoHeight: true,
      classNames: true,
      wheelGestures: true
    }
  }
};

/**
 * Hero Carousel - Typical homepage use
 */
export const HeroCarousel: Story = {
  args: {
    children: generateSlides(4),
    options: {
      loop: true,
      align: 'center',
      skipSnaps: false
    },
    plugins: {
      autoplay: {
        delay: 5000,
        stopOnInteraction: true
      },
      autoHeight: true,
      classNames: true
    },
    showArrows: true,
    showDots: true
  }
};

/**
 * Product Gallery - E-commerce style
 */
export const ProductGallery: Story = {
  args: {
    children: generateSlides(12),
    slidesPerView: 4,
    slideSpacing: 1,
    options: {
      loop: false,
      align: 'start',
      containScroll: 'trimSnaps'
    },
    plugins: {
      wheelGestures: true,
      classNames: {
        selected: 'product-active',
        inView: 'product-visible'
      }
    },
    showDots: true
  }
};

/**
 * Testimonials - AutoScroll showcase
 */
export const TestimonialsCarousel: Story = {
  args: {
    children: generateSlides(6),
    options: {
      loop: true,
      align: 'center',
      slidesToScroll: 1
    },
    plugins: {
      autoScroll: {
        speed: 0.5,
        stopOnMouseEnter: true,
        stopOnFocusIn: true
      }
    },
    showArrows: false,
    showDots: true
  }
};

/**
 * News Ticker - Fast AutoScroll
 */
export const NewsTicker: Story = {
  args: {
    children: generateSlides(20),
    slidesPerView: 5,
    slideSpacing: 1,
    options: {
      loop: true,
      dragFree: true,
      containScroll: false
    },
    plugins: {
      autoScroll: {
        speed: 2,
        stopOnMouseEnter: true
      }
    },
    showArrows: false,
    showDots: false
  }
};

/**
 * Mobile Friendly - Touch optimized
 */
export const MobileFriendly: Story = {
  args: {
    children: generateSlides(5),
    options: {
      loop: false,
      align: 'center',
      skipSnaps: false,
      dragThreshold: 10
    },
    plugins: {
      classNames: true,
      wheelGestures: false // Disabled for mobile
    }
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

/**
 * RTL Support - Right to Left
 */
export const RTLSupport: Story = {
  args: {
    children: generateSlides(6),
    options: {
      direction: 'rtl',
      loop: false,
      align: 'start'
    },
    plugins: {
      classNames: true
    }
  },
  render: (args) => (
    <div dir="rtl" style={{ width: '100%' }}>
      <Carousel {...args} />
    </div>
  )
};

/**
 * RTL with Autoplay
 */
export const RTLAutoplay: Story = {
  args: {
    children: generateSlides(5),
    options: {
      direction: 'rtl',
      loop: true,
      align: 'center'
    },
    plugins: {
      autoplay: {
        delay: 3000
      }
    }
  },
  render: (args) => (
    <div dir="rtl" style={{ width: '100%' }}>
      <Carousel {...args} />
    </div>
  )
};

/**
 * Performance Mode - Minimal plugins
 */
export const PerformanceMode: Story = {
  args: {
    children: generateSlides(50),
    options: {
      loop: false,
      skipSnaps: true,
      duration: 10,
      watchDrag: true,
      watchResize: false,
      watchSlides: false
    },
    plugins: {
      // No plugins for maximum performance
    },
    showArrows: true,
    showDots: false
  }
};

/**
 * Accessibility Enhanced
 */
export const AccessibilityEnhanced: Story = {
  args: {
    children: generateSlides(5),
    options: {
      loop: false,
      skipSnaps: false,
      watchFocus: true,
      dragThreshold: 20
    },
    plugins: {
      classNames: {
        selected: 'aria-current',
        inView: 'aria-visible'
      },
      autoplay: {
        stopOnFocusIn: true,
        delay: 7000 // Longer delay for screen readers
      }
    }
  }
};

/**
 * Interactive Playground - All options available
 */
export const Playground: Story = {
  args: {
    children: generateSlides(12),
    options: {
      align: 'start',
      axis: 'x',
      containScroll: 'trimSnaps',
      direction: 'ltr',
      slidesToScroll: 1,
      dragFree: false,
      dragThreshold: 20,
      inViewThreshold: 0,
      loop: false,
      skipSnaps: false,
      duration: 25,
      startIndex: 0
    },
    slideSpacing: 1,
    slidesPerView: 3,
    plugins: {
      autoplay: false,
      autoScroll: false,
      autoHeight: false,
      classNames: false,
      wheelGestures: false
    },
    className: '',
    showArrows: true,
    showDots: true
  }
};

// ============================================
// PAGINATION DOTS OPTIMIZATION
// ============================================

/**
 * Grouped Pagination - 20 slides, 5 per view
 * Shows how pagination dots are reduced when scrolling by groups
 */
export const GroupedPaginationFive: Story = {
  args: {
    children: generateSlides(20),
    slidesPerView: 5,
    slideSpacing: 1,
    showArrows: true,
    showDots: true,
    infinite: false
  },
  parameters: {
    docs: {
      description: {
        story: 'With 20 slides and 5 slides per view, carousel scrolls 5 at a time resulting in only 4 pagination dots (20÷5=4) instead of 20 individual dots.'
      }
    }
  }
};

/**
 * Grouped Pagination - 20 slides, 4 per view
 */
export const GroupedPaginationFour: Story = {
  args: {
    children: generateSlides(20),
    slidesPerView: 4,
    slideSpacing: 1,
    showArrows: true,
    showDots: true,
    infinite: false
  },
  parameters: {
    docs: {
      description: {
        story: 'With 20 slides and 4 slides per view, carousel scrolls 4 at a time resulting in 5 pagination dots (20÷4=5).'
      }
    }
  }
};

/**
 * Grouped Pagination - 15 slides, 3 per view
 */
export const GroupedPaginationThree: Story = {
  args: {
    children: generateSlides(15),
    slidesPerView: 3,
    slideSpacing: 1,
    showArrows: true,
    showDots: true,
    infinite: false
  },
  parameters: {
    docs: {
      description: {
        story: 'With 15 slides and 3 slides per view, carousel scrolls 3 at a time resulting in 5 pagination dots (15÷3=5).'
      }
    }
  }
};

/**
 * Individual vs Grouped Pagination Comparison
 */
export const PaginationComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <h3>Individual Scrolling (1 slide at a time) - 10 dots for 10 slides</h3>
        <Carousel 
          slidesPerView={3} 
          slideSpacing={1}
          showDots
          showArrows
          options={{ slidesToScroll: 1 }}
        >
          {generateSlides(10)}
        </Carousel>
      </div>
      <div>
        <h3>Grouped Scrolling (3 slides at a time) - ~4 dots for 10 slides</h3>
        <Carousel 
          slidesPerView={3} 
          slideSpacing={1}
          showDots
          showArrows
        >
          {generateSlides(10)}
        </Carousel>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison showing how grouped scrolling reduces pagination dots. Top carousel scrolls 1 slide at a time (10 dots), bottom scrolls 3 at a time (~4 dots).'
      }
    }
  }
};

/**
 * Card Gallery with Grouped Scrolling
 * Realistic example with rich card content
 */
export const CardGalleryGrouped: Story = {
  args: {
    children: Array.from({ length: 20 }, (_, i) => (
      <div key={i} className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-4 text-white h-64 flex flex-col justify-between">
        <div className="text-center">
          <div className="text-4xl mb-2">📦</div>
          <h3 className="text-lg font-bold">Item {i + 1}</h3>
          <p className="text-sm opacity-75">Subtitle Text</p>
        </div>
        <div className="flex justify-between text-xs">
          <span>Value: 96</span>
          <span>⭐ 4.5</span>
        </div>
      </div>
    )),
    slidesPerView: 5,
    slideSpacing: 1.5,
    showArrows: true,
    showDots: true,
    infinite: true,
    autoScroll: true,
    autoScrollInterval: 5000
  },
  parameters: {
    docs: {
      description: {
        story: 'Rich card gallery showing 5 cards at once with grouped pagination. Shows how complex content works with grouped scrolling.'
      }
    }
  }
};

// ============================================
// THEME STORIES
// ============================================

/**
 * Dark mode
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' }
  },
  args: {
    children: generateSlides(5),
    showArrows: true,
    showDots: true,
    arrowVariant: 'primary'
  }
};

/**
 * Light mode
 */
export const LightMode: Story = {
  parameters: {
    backgrounds: { default: 'light' }
  },
  args: {
    children: generateSlides(5),
    showArrows: true,
    showDots: true,
    arrowVariant: 'secondary'
  }
};

/**
 * Neon theme - Cyberpunk carousels
 */
export const NeonTheme: Story = {
  args: {
    children: []
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  render: () => (
    <div data-theme="neon" className="p-8" style={{ background: 'rgb(3, 7, 18)' }}>
      <h3 className="text-lg font-semibold text-purple-400 mb-6">Neon Theme Carousel</h3>
      <Carousel
        showArrows
        showDots
        arrowVariant="accent"
        slidesPerView={3}
        slideSpacing={1.5}
        plugins={{
          autoplay: {
            delay: 3000
          }
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="bg-gradient-to-br from-purple-600 via-purple-700 to-cyan-600 rounded-lg p-6 text-white h-48 flex flex-col justify-center items-center border border-purple-400 border-opacity-50" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' }}>
            <div className="text-4xl mb-2">🎮</div>
            <h3 className="text-lg font-bold">Cyber Game {i + 1}</h3>
            <p className="text-sm opacity-75 text-cyan-300">Neural Interface</p>
          </div>
        ))}
      </Carousel>
    </div>
  )
};

/**
 * Gold theme - Premium carousels
 */
export const GoldTheme: Story = {
  args: {
    children: []
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  render: () => (
    <div data-theme="gold" className="p-8" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
      <h3 className="text-lg font-semibold text-yellow-400 mb-6">Gold Theme Carousel</h3>
      <Carousel
        showArrows
        showDots
        arrowVariant="primary"
        slidesPerView={3}
        slideSpacing={1.5}
        plugins={{
          autoplay: {
            delay: 4000
          }
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="bg-gradient-to-br from-yellow-600 via-amber-600 to-yellow-700 rounded-lg p-6 text-white h-48 flex flex-col justify-center items-center border border-yellow-400 border-opacity-50" style={{ boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)' }}>
            <div className="text-4xl mb-2">👑</div>
            <h3 className="text-lg font-bold">VIP Slot {i + 1}</h3>
            <p className="text-sm opacity-75 text-yellow-200">Premium Access</p>
          </div>
        ))}
      </Carousel>
    </div>
  )
};

/**
 * All themes comparison
 */
export const AllThemes: Story = {
  args: {
    children: []
  },
  render: () => (
    <div className="space-y-6">
      <div data-theme="light" className="p-6 bg-white rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Light Theme</h3>
        <Carousel showArrows showDots slidesPerView={2} slideSpacing={1}>
          {generateSlides(4)}
        </Carousel>
      </div>
      
      <div data-theme="dark" className="p-6 bg-gray-900 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Dark Theme</h3>
        <Carousel showArrows showDots slidesPerView={2} slideSpacing={1}>
          {generateSlides(4)}
        </Carousel>
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: 'rgb(3, 7, 18)' }}>
        <h3 className="text-lg font-semibold text-purple-400 mb-3">Neon Theme</h3>
        <Carousel showArrows showDots slidesPerView={2} slideSpacing={1} arrowVariant="accent">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg p-4 text-white h-32 flex items-center justify-center" style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)' }}>
              <span className="text-2xl font-bold">{i + 1}</span>
            </div>
          ))}
        </Carousel>
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <h3 className="text-lg font-semibold text-yellow-400 mb-3">Gold Theme</h3>
        <Carousel showArrows showDots slidesPerView={2} slideSpacing={1} arrowVariant="primary">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="bg-gradient-to-br from-yellow-600 to-amber-700 rounded-lg p-4 text-white h-32 flex items-center justify-center" style={{ boxShadow: '0 0 15px rgba(251, 191, 36, 0.3)' }}>
              <span className="text-2xl font-bold">{i + 1}</span>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
};
