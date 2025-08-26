/**
 * @fileoverview Enhanced Image component with fallback support
 * @module components/ui/Image
 */

'use client';

import React, { useState, useEffect } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { ImageOff } from 'lucide-react';
import '@/styles/components/base/image.css';

/**
 * Aspect ratio variants
 */
export type ImageAspectRatio = 
  | 'square'     // 1:1
  | 'video'      // 16:9
  | 'portrait'   // 9:16
  | 'landscape'  // 21:9
  | '4-3'        // 4:3
  | '3-2'        // 3:2
  | '16-9'       // 16:9
  | '1-1'        // 1:1
  | 'auto';      // No fixed aspect ratio

/**
 * Image object fit options
 */
export type ImageObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

/**
 * Props for Image component
 */
export interface ImageProps extends Omit<NextImageProps, 'onError' | 'onLoad'> {
  /** Aspect ratio of the image container */
  aspectRatio?: ImageAspectRatio;
  /** Object fit behavior */
  objectFit?: ImageObjectFit;
  /** Fallback content to show when image fails to load */
  fallback?: React.ReactNode;
  /** Fallback image URL to try when main image fails */
  fallbackSrc?: string;
  /** Whether to show default fallback */
  showDefaultFallback?: boolean;
  /** Custom className for the container */
  containerClassName?: string;
  /** Custom className for fallback container */
  fallbackClassName?: string;
  /** Whether to show loading shimmer */
  showLoadingShimmer?: boolean;
  /** Whether to add rounded corners */
  rounded?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Callback when image loads successfully */
  onLoad?: () => void;
  /** Callback when image fails to load */
  onError?: () => void;
  /** Whether to use Next.js Image optimization */
  useNextImage?: boolean;
}

/**
 * Default fallback component
 */
export const ImageFallback: React.FC<{ 
  className?: string;
  message?: string;
}> = ({ 
  className = '', 
  message = 'Image not available' 
}) => (
  <div className={`image-fallback ${className}`}>
    <ImageOff className="image-fallback-icon" />
    <span className="image-fallback-text">{message}</span>
  </div>
);

/**
 * Get aspect ratio classes
 */
const getAspectRatioClass = (ratio: ImageAspectRatio): string => {
  const ratioMap = {
    'square': 'aspect-square',
    'video': 'aspect-video',
    'portrait': 'aspect-portrait',
    'landscape': 'aspect-landscape',
    '4-3': 'aspect-4-3',
    '3-2': 'aspect-3-2',
    '16-9': 'aspect-16-9',
    '1-1': 'aspect-1-1',
    'auto': ''
  };
  return ratioMap[ratio] || '';
};

/**
 * Get rounded classes
 */
const getRoundedClass = (rounded: ImageProps['rounded']): string => {
  if (!rounded) return '';
  if (rounded === true) return 'rounded-lg';
  
  const roundedMap = {
    'sm': 'rounded',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'xl': 'rounded-xl',
    'full': 'rounded-full'
  };
  return roundedMap[rounded] || '';
};

/**
 * Image Component
 * 
 * @description Enhanced Next.js Image component with automatic fallback handling,
 * aspect ratios, loading states, and error handling.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Image
 *   src="/path/to/image.jpg"
 *   alt="Description"
 *   width={400}
 *   height={300}
 * />
 * 
 * // With aspect ratio and fallback
 * <Image
 *   src="/path/to/image.jpg"
 *   alt="Description"
 *   aspectRatio="16-9"
 *   fallback={<CustomFallback />}
 *   rounded="lg"
 * />
 * 
 * // Fill container with cover
 * <Image
 *   src="/path/to/image.jpg"
 *   alt="Description"
 *   fill
 *   objectFit="cover"
 * />
 * ```
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  aspectRatio = 'auto',
  objectFit = 'cover',
  fallback,
  fallbackSrc,
  showDefaultFallback = true,
  containerClassName = '',
  fallbackClassName = '',
  showLoadingShimmer = true,
  rounded = false,
  onLoad,
  onError,
  useNextImage = true,
  className = '',
  ...props
}) => {
  // Use the src as is, or fallback will handle missing images
  const [currentSrc, setCurrentSrc] = useState(src);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [triedFallback, setTriedFallback] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    // If we have a fallback URL and haven't tried it yet
    if (fallbackSrc && !triedFallback) {
      setCurrentSrc(fallbackSrc);
      setTriedFallback(true);
      // Don't set error yet, try the fallback
      return;
    }
    
    // All attempts failed, show error state
    setError(true);
    setIsLoading(false);
    onError?.();
  };

  const containerClasses = [
    'relative',
    getAspectRatioClass(aspectRatio),
    getRoundedClass(rounded),
    'overflow-hidden',
    containerClassName
  ].filter(Boolean).join(' ');

  const imageClasses = [
    objectFit === 'cover' ? 'object-cover' : '',
    objectFit === 'contain' ? 'object-contain' : '',
    objectFit === 'fill' ? 'object-fill' : '',
    objectFit === 'none' ? 'object-none' : '',
    objectFit === 'scale-down' ? 'object-scale-down' : '',
    'transition-opacity duration-300',
    isLoading ? 'opacity-0' : 'opacity-100',
    className
  ].filter(Boolean).join(' ');

  // Reset when src changes
  useEffect(() => {
    if (src !== currentSrc && !triedFallback) {
      setCurrentSrc(src);
      setError(false);
      setIsLoading(true);
      setTriedFallback(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // If there's an error or no src, show fallback
  if (error || !currentSrc) {
    // If we have a fallbackSrc and haven't tried it yet, use it
    if (fallbackSrc && !triedFallback && !error) {
      setCurrentSrc(fallbackSrc);
      setTriedFallback(true);
      setError(false);
      setIsLoading(true);
    } else {
      // Show fallback content
      if (fallback) {
        return <div className={containerClasses}>{fallback}</div>;
      }
      if (showDefaultFallback) {
        return (
          <div className={containerClasses}>
            <ImageFallback className={fallbackClassName} />
          </div>
        );
      }
      return null;
    }
  }

  return (
    <div className={containerClasses}>
      {/* Loading shimmer */}
      {showLoadingShimmer && isLoading && (
        <div className="absolute inset-0 image-loading" />
      )}
      
      {/* Image */}
      {useNextImage ? (
        <NextImage
          src={currentSrc}
          alt={alt}
          className={imageClasses}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={currentSrc as string}
          alt={alt}
          className={`${props.fill ? 'absolute inset-0 w-full h-full' : ''} ${imageClasses}`}
          onLoad={handleLoad}
          onError={handleError}
          width={props.width as number}
          height={props.height as number}
        />
      )}
    </div>
  );
};

Image.displayName = 'Image';

export default Image;