import type { Meta, StoryObj } from '@storybook/react';
import { VirtualGrid } from './VirtualGrid';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { useState } from 'react';

const meta = {
  title: 'UI/VirtualGrid',
  component: VirtualGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'High-performance virtualized grid component using TanStack Virtual. Efficiently renders large datasets by only rendering visible items.'
      }
    }
  },
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Number of columns in the grid'
    },
    gap: {
      control: { type: 'number', min: 0, max: 32 },
      description: 'Gap between grid items in pixels'
    },
    estimateSize: {
      control: { type: 'number', min: 100, max: 500 },
      description: 'Estimated height of each row'
    },
    overscan: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Number of items to render outside visible area'
    },
    debug: {
      control: 'boolean',
      description: 'Show debug overlay with row/column info'
    }
  }
} satisfies Meta<typeof VirtualGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// Generate mock data
const generateMockItems = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i}`,
    title: `Item ${i + 1}`,
    description: `This is item number ${i + 1} in the virtual grid`,
    image: `https://picsum.photos/seed/${i}/400/300`,
    price: Math.floor(Math.random() * 1000) + 100,
    rating: (Math.random() * 5).toFixed(1),
    category: ['Electronics', 'Clothing', 'Books', 'Games', 'Food'][Math.floor(Math.random() * 5)]
  }));
};

// Simple item renderer
const SimpleItemRenderer = (item: any) => (
  <Card className="p-4">
    <div className="aspect-video bg-gray-200 rounded mb-2" />
    <h3 className="font-semibold">{item.title}</h3>
    <p className="text-sm text-gray-600">{item.description}</p>
  </Card>
);

// Complex item renderer
const ComplexItemRenderer = (item: any) => (
  <Card className="overflow-hidden">
    <div 
      className="h-48 bg-cover bg-center"
      style={{ backgroundImage: `url(${item.image})` }}
    />
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <Badge variant="secondary">{item.category}</Badge>
      </div>
      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">${item.price}</span>
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span className="text-sm">{item.rating}</span>
        </div>
      </div>
      <Button className="w-full mt-3" size="sm">Add to Cart</Button>
    </div>
  </Card>
);

// Basic example with 100 items
export const Default: Story = {
  args: {
    items: generateMockItems(100),
    columns: 3,
    gap: 16,
    estimateSize: 200,
    overscan: 3,
    renderItem: SimpleItemRenderer
  },
  render: (args) => (
    <div className="h-screen p-6">
      <VirtualGrid {...args} />
    </div>
  )
};

// Large dataset with 10,000 items
export const LargeDataset: Story = {
  args: {
    items: generateMockItems(10000),
    columns: 4,
    gap: 20,
    estimateSize: 300,
    overscan: 2,
    renderItem: ComplexItemRenderer
  },
  render: (args) => (
    <div className="h-screen p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Virtual Grid with 10,000 Items</h2>
        <p className="text-gray-600">Scroll to see virtualization in action</p>
      </div>
      <div className="h-[calc(100vh-120px)]">
        <VirtualGrid {...args} />
      </div>
    </div>
  )
};

// Responsive columns
export const ResponsiveColumns: Story = {
  args: {
    items: generateMockItems(100),
    columns: 5, // Will adjust based on viewport
    gap: 16,
    renderItem: SimpleItemRenderer
  },
  render: (args) => (
    <div className="h-screen p-6">
      <div className="mb-4">
        <p className="text-sm text-gray-600">Resize viewport to see responsive columns</p>
      </div>
      <VirtualGrid {...args} />
    </div>
  )
};

// With infinite scroll
export const InfiniteScroll: Story = {
  args: {
    items: [],
    columns: 3,
    gap: 16,
    renderItem: ComplexItemRenderer
  },
  render: () => {
    const [items, setItems] = useState(generateMockItems(50));
    const [loading, setLoading] = useState(false);

    const loadMore = () => {
      setLoading(true);
      setTimeout(() => {
        setItems(prev => [...prev, ...generateMockItems(50)]);
        setLoading(false);
      }, 1000);
    };

    return (
      <div className="h-screen p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Infinite Scroll Example</h2>
          <p className="text-gray-600">Items loaded: {items.length}</p>
        </div>
        <div className="h-[calc(100vh-120px)]">
          <VirtualGrid
            items={items}
            columns={3}
            gap={16}
            renderItem={ComplexItemRenderer}
            onEndReached={loadMore}
            endReachedThreshold={0.8}
            loading={loading}
            loadingComponent={<div className="text-center">Loading more...</div>}
          />
        </div>
      </div>
    );
  }
};

// Empty state
export const EmptyState: Story = {
  args: {
    items: [],
    columns: 3,
    gap: 16,
    renderItem: SimpleItemRenderer,
    emptyComponent: (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold mb-2">No items found</h3>
        <p className="text-gray-600">Try adjusting your filters or search criteria</p>
      </div>
    )
  },
  render: (args) => (
    <div className="h-screen p-6">
      <VirtualGrid {...args} />
    </div>
  )
};

// Debug mode
export const DebugMode: Story = {
  args: {
    items: generateMockItems(100),
    columns: 3,
    gap: 16,
    renderItem: SimpleItemRenderer,
    debug: true
  },
  render: (args) => (
    <div className="h-screen p-6">
      <div className="mb-4">
        <p className="text-sm text-gray-600">Debug mode shows row/column indices</p>
      </div>
      <VirtualGrid {...args} />
    </div>
  )
};

// Different column counts
export const SingleColumn: Story = {
  args: {
    items: generateMockItems(50),
    columns: 1,
    gap: 16,
    renderItem: ComplexItemRenderer
  },
  render: (args) => (
    <div className="h-screen p-6">
      <VirtualGrid {...args} />
    </div>
  )
};

export const TwoColumns: Story = {
  args: {
    items: generateMockItems(50),
    columns: 2,
    gap: 20,
    renderItem: ComplexItemRenderer
  },
  render: (args) => (
    <div className="h-screen p-6">
      <VirtualGrid {...args} />
    </div>
  )
};

export const SixColumns: Story = {
  args: {
    items: generateMockItems(100),
    columns: 6,
    gap: 12,
    renderItem: SimpleItemRenderer
  },
  render: (args) => (
    <div className="h-screen p-6">
      <VirtualGrid {...args} />
    </div>
  )
};