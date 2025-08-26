/**
 * PaginationInfo Value Object
 * Represents pagination metadata and navigation utilities
 */

/**
 * Value object representing pagination metadata
 */
export interface PaginationMeta {
  // Core pagination
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  
  // Navigation flags
  hasMore: boolean;
  hasPrevious: boolean;
  hasNextPage?: boolean; // Alias for hasMore
  hasPreviousPage?: boolean; // Alias for hasPrevious
  
  // Current page info
  startIndex: number;
  endIndex: number;
  currentPage?: number; // Alias for page
  totalItems?: number; // Alias for total
}

/**
 * Create pagination metadata from basic inputs
 */
export function createPaginationMeta(
  page: number,
  pageSize: number,
  total: number
): PaginationMeta {
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, total - 1);
  const hasMore = page < totalPages;
  const hasPrevious = page > 1;
  
  return {
    page,
    pageSize,
    total,
    totalPages,
    hasMore,
    hasPrevious,
    hasNextPage: hasMore, // Alias
    hasPreviousPage: hasPrevious, // Alias
    startIndex,
    endIndex,
    currentPage: page, // Alias
    totalItems: total, // Alias
  };
}

/**
 * Calculate page range for pagination UI
 */
export function getPageRange(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): number[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  const halfVisible = Math.floor(maxVisible / 2);
  let start = currentPage - halfVisible;
  let end = currentPage + halfVisible;
  
  if (start < 1) {
    start = 1;
    end = maxVisible;
  }
  
  if (end > totalPages) {
    end = totalPages;
    start = totalPages - maxVisible + 1;
  }
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * Paginate an array of items
 */
export function paginateArray<T>(
  items: T[],
  page: number,
  pageSize: number
): { items: T[]; meta: PaginationMeta } {
  const total = items.length;
  const meta = createPaginationMeta(page, pageSize, total);
  const paginatedItems = items.slice(meta.startIndex, meta.endIndex + 1);
  
  return {
    items: paginatedItems,
    meta
  };
}

/**
 * Check if page number is valid
 */
export function isValidPage(page: number, totalPages: number): boolean {
  return page >= 1 && page <= totalPages;
}

/**
 * Get next page number (returns null if no next page)
 */
export function getNextPage(currentPage: number, totalPages: number): number | null {
  const nextPage = currentPage + 1;
  return isValidPage(nextPage, totalPages) ? nextPage : null;
}

/**
 * Get previous page number (returns null if no previous page)
 */
export function getPreviousPage(currentPage: number): number | null {
  const prevPage = currentPage - 1;
  return prevPage >= 1 ? prevPage : null;
}