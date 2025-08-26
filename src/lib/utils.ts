/**
 * @fileoverview Utility functions for the application
 * @module lib/utils
 * @deprecated Use imports from @/lib/core/shared/utils instead
 * This file is kept for backward compatibility during migration
 */

// Re-export from new structure for backward compatibility
export {
  // String utilities
  slugify as generateSlug,
  truncate,
  truncateText,
  capitalize,
  toTitleCase,
  
  // Number utilities
  formatNumber,
  formatPercentage,
  formatLargeNumber,
  formatCurrency,
  
  // Function utilities
  debounce,
  throttle,
  delay,
  
  // Classname utilities
  cn,
  classNames
} from '@/lib/core/shared/utils';