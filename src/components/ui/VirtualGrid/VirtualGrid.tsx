/**
 * VirtualGrid - Base virtualized grid component
 * Uses TanStack Virtual for performant rendering of large datasets
 */

'use client';

import { useRef, useCallback, useMemo, ReactNode, CSSProperties } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '@/lib/utils';

export interface VirtualGridProps<T = any> {
  items: T[];
  columns?: number;
  gap?: number;
  estimateSize?: number;
  overscan?: number;
  className?: string;
  containerClassName?: string;
  renderItem: (item: T, index: number) => ReactNode;
  getItemKey?: (item: T, index: number) => string | number;
  onEndReached?: () => void;
  endReachedThreshold?: number;
  loading?: boolean;
  loadingComponent?: ReactNode;
  emptyComponent?: ReactNode;
  debug?: boolean;
}

export function VirtualGrid<T = any>({
  items,
  columns = 3,
  gap = 16,
  estimateSize = 300,
  overscan = 3,
  className,
  containerClassName,
  renderItem,
  getItemKey,
  onEndReached,
  endReachedThreshold = 0.8,
  loading = false,
  loadingComponent,
  emptyComponent,
  debug = false,
}: VirtualGridProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const scrollingRef = useRef(false);

  // Calculate responsive columns based on container width
  const getColumns = useCallback(() => {
    if (!parentRef.current) return columns;
    const width = parentRef.current.offsetWidth;
    
    // Responsive breakpoints
    if (width < 640) return 1; // Mobile
    if (width < 768) return 2; // Tablet
    if (width < 1024) return Math.min(columns, 3); // Small desktop
    return columns; // Large desktop
  }, [columns]);

  // Group items into rows for virtualization
  const rows = useMemo(() => {
    const cols = getColumns();
    const result: T[][] = [];
    for (let i = 0; i < items.length; i += cols) {
      result.push(items.slice(i, i + cols));
    }
    return result;
  }, [items, getColumns]);

  // Initialize virtualizer
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan,
    measureElement: (element) => {
      // Auto-measure for dynamic heights
      if (element?.getBoundingClientRect) {
        return element.getBoundingClientRect().height + gap;
      }
      return estimateSize;
    },
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  // Handle infinite scroll
  const handleScroll = useCallback(() => {
    if (!parentRef.current || loading || scrollingRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = parentRef.current;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    if (scrollPercentage >= endReachedThreshold && onEndReached) {
      scrollingRef.current = true;
      onEndReached();
      setTimeout(() => {
        scrollingRef.current = false;
      }, 500);
    }
  }, [loading, endReachedThreshold, onEndReached]);

  // Show empty state
  if (!loading && items.length === 0 && emptyComponent) {
    return (
      <div className={cn('flex items-center justify-center min-h-96', containerClassName)}>
        {emptyComponent}
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className={cn(
        'w-full h-full overflow-auto scrollbar-thin',
        containerClassName
      )}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: `${totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualRow) => {
          const row = rows[virtualRow.index];
          const cols = getColumns();

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div
                className={cn('grid', className)}
                style={{
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                  gap: `${gap}px`,
                } as CSSProperties}
              >
                {row.map((item, colIndex) => {
                  const itemIndex = virtualRow.index * cols + colIndex;
                  const key = getItemKey ? getItemKey(item, itemIndex) : itemIndex;

                  return (
                    <div key={key} className="virtual-grid-item">
                      {renderItem(item, itemIndex)}
                      {debug && (
                        <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded">
                          Row: {virtualRow.index}, Col: {colIndex}, Index: {itemIndex}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {loading && loadingComponent && (
        <div className="flex items-center justify-center py-8">
          {loadingComponent}
        </div>
      )}
    </div>
  );
}

// Export a typed version for better DX
export function createVirtualGrid<T>() {
  return VirtualGrid as React.FC<VirtualGridProps<T>>;
}