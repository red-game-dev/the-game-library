/**
 * @fileoverview Pagination component for navigating through pages
 * @module components/ui/Pagination
 */

'use client';

import React, { useMemo } from 'react';
import { Button } from '../Button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react';
import '@/styles/components/base/pagination.css';

/**
 * Props for the Pagination component
 */
export interface PaginationProps {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items */
  totalItems?: number;
  /** Number of items per page */
  itemsPerPage?: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Number of page buttons to show */
  maxButtons?: number;
  /** Show first/last buttons */
  showFirstLast?: boolean;
  /** Show prev/next buttons */
  showPrevNext?: boolean;
  /** Show page info */
  showPageInfo?: boolean;
  /** Show items info */
  showItemsInfo?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'default' | 'minimal' | 'dots';
  /** Disabled state */
  disabled?: boolean;
  /** Custom className */
  className?: string;
  /** Test ID */
  testId?: string;
}

/**
 * Pagination Component
 * 
 * @description A flexible pagination component for navigating through pages of content.
 * 
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={handlePageChange}
 *   showFirstLast
 * />
 * ```
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 20,
  onPageChange,
  maxButtons = 5,
  showFirstLast = true,
  showPrevNext = true,
  showPageInfo = false,
  showItemsInfo = false,
  size = 'md',
  variant = 'default',
  disabled = false,
  className = '',
  testId = 'pagination'
}) => {
  /**
   * Calculate page numbers to display
   */
  const pageNumbers = useMemo(() => {
    const pages: (number | 'ellipsis')[] = [];
    
    if (totalPages <= maxButtons) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate range around current page
      const halfMax = Math.floor(maxButtons / 2);
      let start = Math.max(1, currentPage - halfMax);
      let end = Math.min(totalPages, currentPage + halfMax);
      
      // Adjust if at the beginning or end
      if (currentPage <= halfMax) {
        end = maxButtons;
      }
      if (currentPage > totalPages - halfMax) {
        start = totalPages - maxButtons + 1;
      }
      
      // Add first page and ellipsis if needed
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('ellipsis');
      }
      
      // Add page numbers
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis and last page if needed
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  }, [currentPage, totalPages, maxButtons]);

  /**
   * Calculate item range
   */
  const itemRange = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems || currentPage * itemsPerPage);
    return { start, end };
  }, [currentPage, itemsPerPage, totalItems]);

  /**
   * Handle page click
   */
  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages && !disabled) {
      onPageChange(page);
    }
  };

  // Don't render if only one page
  if (totalPages <= 1 && variant !== 'minimal') {
    return null;
  }

  const buttonSize = size === 'sm' ? 'sm' : size === 'lg' ? 'md' : 'sm';

  return (
    <nav
      className={`pagination pagination-${variant} pagination-${size} ${className}`}
      aria-label="Pagination Navigation"
      data-testid={testId}
    >
      <div className="pagination-container">
        {/* Items info */}
        {showItemsInfo && totalItems && (
          <div className="pagination-info text-sm text-secondary">
            Showing {itemRange.start} - {itemRange.end} of {totalItems}
          </div>
        )}

        {/* Pagination controls */}
        <div className="pagination-controls">
          {/* First page button */}
          {showFirstLast && (
            <Button
              variant="ghost"
              size={buttonSize}
              onClick={() => handlePageClick(1)}
              disabled={currentPage === 1 || disabled}
              aria-label="Go to first page"
              className="pagination-btn pagination-btn-first"
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>
          )}

          {/* Previous page button */}
          {showPrevNext && (
            <Button
              variant="ghost"
              size={buttonSize}
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1 || disabled}
              aria-label="Go to previous page"
              className="pagination-btn pagination-btn-prev"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden-mobile ml-1">Previous</span>
            </Button>
          )}

          {/* Page numbers */}
          {variant !== 'minimal' && (
            <div className="pagination-numbers">
              {pageNumbers.map((page, index) => {
                if (page === 'ellipsis') {
                  return (
                    <span
                      key={`ellipsis-${index}`}
                      className="pagination-ellipsis"
                      aria-hidden="true"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </span>
                  );
                }
                
                return (
                  <Button
                    key={page}
                    variant={page === currentPage ? 'primary' : 'ghost'}
                    size={buttonSize}
                    onClick={() => handlePageClick(page)}
                    disabled={disabled}
                    aria-label={`Go to page ${page}`}
                    aria-current={page === currentPage ? 'page' : undefined}
                    className={`pagination-btn pagination-btn-number ${
                      page === currentPage ? 'pagination-btn-active' : ''
                    }`}
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
          )}

          {/* Page info for minimal variant */}
          {variant === 'minimal' && showPageInfo && (
            <div className="pagination-page-info text-sm">
              Page {currentPage} of {totalPages}
            </div>
          )}

          {/* Next page button */}
          {showPrevNext && (
            <Button
              variant="ghost"
              size={buttonSize}
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages || disabled}
              aria-label="Go to next page"
              className="pagination-btn pagination-btn-next"
            >
              <span className="hidden-mobile mr-1">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}

          {/* Last page button */}
          {showFirstLast && (
            <Button
              variant="ghost"
              size={buttonSize}
              onClick={() => handlePageClick(totalPages)}
              disabled={currentPage === totalPages || disabled}
              aria-label="Go to last page"
              className="pagination-btn pagination-btn-last"
            >
              <ChevronsRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Page info */}
        {showPageInfo && variant !== 'minimal' && (
          <div className="pagination-info text-sm text-secondary">
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>
    </nav>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;