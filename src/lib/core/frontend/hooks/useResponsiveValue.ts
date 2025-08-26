/**
 * useResponsiveValue Hook
 * Efficiently handles responsive values with debounced window resize events
 */

import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from './useDebounce';

interface ResponsiveBreakpoints<T = any> {
  xs?: T; // < 390px (Mobile portrait)
  sm?: T; // < 640px (Large phones) 
  md?: T; // < 768px (Small tablets - iPad Mini portrait)
  lg?: T; // < 1024px (Standard tablets landscape + small laptops)
  xl?: T; // < 1280px (Laptops)
  '2xl'?: T; // < 1440px (Desktop)
  '3xl'?: T; // >= 1440px (Large desktop)
}

interface UseResponsiveValueOptions<T> {
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** SSR fallback breakpoint */
  ssrBreakpoint?: keyof ResponsiveBreakpoints<T>;
}

/**
 * Get responsive value based on current window width
 * @param values - Object with breakpoint keys and values
 * @param options - Configuration options
 * @returns Current responsive value
 * 
 * @example
 * ```typescript
 * const slidesPerView = useResponsiveValue({
 *   xs: 1,
 *   sm: 2,
 *   md: 3,
 *   lg: 4,
 *   xl: 5
 * });
 * ```
 */
export function useResponsiveValue<T>(
  values: ResponsiveBreakpoints<T>,
  options: UseResponsiveValueOptions<T> = {}
): T {
  const { debounceMs = 150, ssrBreakpoint = 'lg' } = options;
  
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window === 'undefined') {
      // SSR fallback - return a reasonable default
      return 1024;
    }
    return window.innerWidth;
  });
  
  // Debounce window width to prevent excessive re-renders
  const debouncedWidth = useDebounce(windowWidth, debounceMs);
  
  // Memoize the responsive value calculation
  const responsiveValue = useMemo(() => {
    // During SSR, return the specified fallback
    if (typeof window === 'undefined') {
      const ssrFallback = values[ssrBreakpoint] || values.lg || values.md || values.sm || values.xs;
      if (ssrFallback === undefined) {
        throw new Error('useResponsiveValue: At least one breakpoint value must be defined');
      }
      return ssrFallback;
    }
    
    // Determine current breakpoint based on debounced width - UPDATED 2024 breakpoints
    if (debouncedWidth < 390 && values.xs !== undefined) return values.xs;    // Mobile portrait
    if (debouncedWidth < 640 && values.sm !== undefined) return values.sm;    // Large phones  
    if (debouncedWidth < 768 && values.md !== undefined) return values.md;    // Small tablets (iPad Mini 768px)
    if (debouncedWidth < 1024 && values.lg !== undefined) return values.lg;   // Standard tablets landscape
    if (debouncedWidth < 1280 && values.xl !== undefined) return values.xl;   // Laptops
    if (debouncedWidth < 1440 && values['2xl'] !== undefined) return values['2xl']; // Desktop
    if (values['3xl'] !== undefined) return values['3xl'];                    // Large desktop
    
    // Fallback to largest defined value
    const fallback = values.xl || values.lg || values.md || values.sm || values.xs;
    if (fallback === undefined) {
      throw new Error('useResponsiveValue: At least one breakpoint value must be defined');
    }
    return fallback;
  }, [debouncedWidth, values, ssrBreakpoint]);
  
  // Set up resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return responsiveValue;
}

/**
 * Specialized hook for slides per view in carousels - UPDATED for better tablet experience
 */
export function useResponsiveSlidesPerView(defaultValue = 5): number {
  return useResponsiveValue<number>({
    xs: 1,              // < 390px Mobile portrait: 1 slide
    sm: 1,              // < 640px Large phones: 1 slide
    md: 2,              // < 768px Tablets (iPad Mini): 2 slides ✅
    lg: 3,              // < 1024px Standard tablets landscape: 3 slides
    xl: defaultValue,   // < 1280px Laptops: custom or 5
    '2xl': defaultValue, // < 1440px Desktop: custom or 5
    '3xl': defaultValue  // >= 1440px Large desktop: custom or 5
  });
}

