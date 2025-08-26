/**
 * Pagination Component Stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { Pagination } from './Pagination';
import { useState } from 'react';

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible pagination component for navigating through pages of content. Supports multiple variants, sizes, and configurations.'
      }
    }
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Current active page number'
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages'
    },
    totalItems: {
      control: 'number',
      description: 'Total number of items (optional)'
    },
    itemsPerPage: {
      control: 'number',
      description: 'Number of items per page'
    },
    maxButtons: {
      control: { type: 'number', min: 3, max: 10 },
      description: 'Maximum number of page buttons to display'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the pagination'
    },
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'dots'],
      description: 'Visual style variant'
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Show first/last page buttons'
    },
    showPrevNext: {
      control: 'boolean',
      description: 'Show previous/next buttons'
    },
    showPageInfo: {
      control: 'boolean',
      description: 'Show page X of Y information'
    },
    showItemsInfo: {
      control: 'boolean',
      description: 'Show items range information'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all pagination controls'
    }
  }
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default pagination with all controls
 */
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page)
  }
};

/**
 * Interactive pagination example
 */
export const Interactive: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
    totalItems: 385,
    itemsPerPage: 20,
    showItemsInfo: true,
    onPageChange: (page) => console.log('Page changed to:', page)
  },
  render: function PaginationWithState(args) {
    const [currentPage, setCurrentPage] = useState(1);
    
    return (
      <div className="space-y-4">
        <Pagination
          {...args}
          currentPage={currentPage}
          totalPages={20}
          totalItems={385}
          itemsPerPage={20}
          onPageChange={setCurrentPage}
          showItemsInfo
        />
        <div className="text-center text-sm text-secondary">
          Current page: {currentPage}
        </div>
      </div>
    );
  }
};

/**
 * Small size variant
 */
export const Small: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    size: 'sm',
    onPageChange: (page) => console.log('Page changed to:', page)
  }
};

/**
 * Large size variant
 */
export const Large: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    size: 'lg',
    onPageChange: (page) => console.log('Page changed to:', page)
  }
};

/**
 * Minimal variant - only prev/next
 */
export const Minimal: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    variant: 'minimal',
    showPageInfo: true,
    showFirstLast: false,
    onPageChange: (page) => console.log('Page changed to:', page)
  }
};

/**
 * With items information
 */
export const WithItemsInfo: Story = {
  args: {
    currentPage: 2,
    totalPages: 10,
    totalItems: 195,
    itemsPerPage: 20,
    showItemsInfo: true,
    onPageChange: (page) => console.log('Page changed to:', page)
  }
};

/**
 * With page information
 */
export const WithPageInfo: Story = {
  args: {
    currentPage: 5,
    totalPages: 25,
    showPageInfo: true,
    onPageChange: (page) => console.log('Page changed to:', page)
  }
};

/**
 * Many pages with ellipsis
 */
export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 100,
    maxButtons: 5,
    onPageChange: (page) => console.log('Page changed to:', page)
  }
};

/**
 * First page state
 */
export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page)
  }
};

/**
 * Last page state
 */
export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page)
  }
};

/**
 * Single page (hidden)
 */
export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page) => console.log('Page changed to:', page)
  }
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    disabled: true,
    onPageChange: (page) => console.log('Page changed to:', page)
  }
};

/**
 * Custom styling with className
 */
export const CustomStyled: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    className: 'p-4 bg-surface rounded-lg shadow-lg',
    onPageChange: (page) => console.log('Page changed to:', page)
  }
};

/**
 * Dark theme
 */
export const DarkTheme: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page)
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" className="p-8 bg-background rounded-lg">
        <Story />
      </div>
    )
  ]
};

/**
 * Light theme
 */
export const LightTheme: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page)
  },
  parameters: {
    backgrounds: { default: 'light' }
  },
  decorators: [
    (Story) => (
      <div data-theme="light" className="p-8 bg-white rounded-lg">
        <Story />
      </div>
    )
  ]
};

/**
 * Neon theme - Cyberpunk pagination
 */
export const NeonTheme: Story = {
  args: {
    currentPage: 5,
    totalPages: 15,
    showPageInfo: true,
    onPageChange: (page) => console.log('Page changed to:', page)
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    (Story) => (
      <div data-theme="neon" className="p-8" style={{ background: 'rgb(3, 7, 18)' }}>
        <h3 className="text-lg font-semibold text-purple-400 mb-4">Neon Theme Pagination</h3>
        <Story />
        <div className="mt-4 text-sm text-cyan-300">
          Navigate through the digital realm
        </div>
      </div>
    )
  ]
};

/**
 * Gold theme - Premium pagination
 */
export const GoldTheme: Story = {
  args: {
    currentPage: 7,
    totalPages: 20,
    showPageInfo: true,
    showItemsInfo: true,
    totalItems: 385,
    itemsPerPage: 20,
    onPageChange: (page) => console.log('Page changed to:', page)
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    (Story) => (
      <div data-theme="gold" className="p-8" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <h3 className="text-lg font-semibold text-yellow-400 mb-4">Gold Theme Pagination</h3>
        <Story />
        <div className="mt-4 text-sm text-yellow-200">
          Premium content navigation
        </div>
      </div>
    )
  ]
};

/**
 * All themes comparison
 */
export const AllThemes: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page)
  },
  render: () => (
    <div className="space-y-6">
      <div data-theme="light" className="p-6 bg-white rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Light Theme</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium mb-3">Default Variant (Full)</p>
            <Pagination 
              currentPage={3} 
              totalPages={10} 
              totalItems={247}
              itemsPerPage={25}
              showFirstLast 
              showPageInfo
              showItemsInfo
              onPageChange={(page) => console.log('Page changed to:', page)}
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Minimal Variant</p>
            <Pagination 
              variant="minimal"
              currentPage={5} 
              totalPages={20} 
              showPageInfo
              onPageChange={(page) => console.log('Page changed to:', page)}
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Dots Variant</p>
            <Pagination 
              variant="dots"
              currentPage={7} 
              totalPages={15} 
              maxButtons={5}
              onPageChange={(page) => console.log('Page changed to:', page)}
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Size Variants</p>
            <div className="space-y-3">
              <Pagination size="sm" currentPage={2} totalPages={5} onPageChange={(page) => console.log('Page changed to:', page)} />
              <Pagination size="lg" currentPage={2} totalPages={5} showFirstLast onPageChange={(page) => console.log('Page changed to:', page)} />
            </div>
          </div>
        </div>
      </div>
      
      <div data-theme="dark" className="p-6 bg-gray-900 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Dark Theme</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-300 mb-3">Default Variant (Full)</p>
            <Pagination 
              currentPage={3} 
              totalPages={10} 
              totalItems={247}
              itemsPerPage={25}
              showFirstLast 
              showPageInfo
              showItemsInfo
              onPageChange={(page) => console.log('Page changed to:', page)}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300 mb-3">Minimal Variant</p>
            <Pagination 
              variant="minimal"
              currentPage={5} 
              totalPages={20} 
              showPageInfo
              onPageChange={(page) => console.log('Page changed to:', page)}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300 mb-3">Dots Variant</p>
            <Pagination 
              variant="dots"
              currentPage={7} 
              totalPages={15} 
              maxButtons={5}
              onPageChange={(page) => console.log('Page changed to:', page)}
            />
          </div>
        </div>
      </div>
      
      <div data-theme="neon" className="p-6 rounded-lg" style={{ background: 'rgb(3, 7, 18)' }}>
        <h3 className="text-lg font-semibold text-purple-400 mb-3">Neon Theme</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-cyan-400 mb-3">Default Variant (Full)</p>
            <Pagination 
              currentPage={3} 
              totalPages={10} 
              totalItems={247}
              itemsPerPage={25}
              showFirstLast 
              showPageInfo
              showItemsInfo
              onPageChange={(page) => console.log('Page changed to:', page)}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-cyan-400 mb-3">Minimal Variant</p>
            <Pagination 
              variant="minimal"
              currentPage={5} 
              totalPages={20} 
              showPageInfo
              onPageChange={(page) => console.log('Page changed to:', page)}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-cyan-400 mb-3">Dots Variant</p>
            <Pagination 
              variant="dots"
              currentPage={7} 
              totalPages={15} 
              maxButtons={5}
              onPageChange={(page) => console.log('Page changed to:', page)}
            />
          </div>
        </div>
      </div>
      
      <div data-theme="gold" className="p-6 rounded-lg" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
        <h3 className="text-lg font-semibold text-yellow-400 mb-3">Gold Theme</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-yellow-300 mb-3">Default Variant (Full)</p>
            <Pagination 
              currentPage={3} 
              totalPages={10} 
              totalItems={247}
              itemsPerPage={25}
              showFirstLast 
              showPageInfo
              showItemsInfo
              onPageChange={(page) => console.log('Page changed to:', page)}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-yellow-300 mb-3">Minimal Variant</p>
            <Pagination 
              variant="minimal"
              currentPage={5} 
              totalPages={20} 
              showPageInfo
              onPageChange={(page) => console.log('Page changed to:', page)}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-yellow-300 mb-3">Dots Variant</p>
            <Pagination 
              variant="dots"
              currentPage={7} 
              totalPages={15} 
              maxButtons={5}
              onPageChange={(page) => console.log('Page changed to:', page)}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

/**
 * Mobile responsive
 */
export const Mobile: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page)
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};