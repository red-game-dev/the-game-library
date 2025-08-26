/**
 * @fileoverview Share utilities for social sharing and clipboard
 * @module lib/core/shared/utils/share
 */

/**
 * Share options interface
 */
export interface ShareOptions {
  title: string;
  text?: string;
  url: string;
}

/**
 * Share result interface
 */
export interface ShareResult {
  success: boolean;
  method: 'native' | 'clipboard' | 'failed';
  message?: string;
}

/**
 * Check if native share API is available
 */
export function canShare(): boolean {
  return typeof navigator !== 'undefined' && 'share' in navigator;
}

/**
 * Check if clipboard API is available
 */
export function canCopyToClipboard(): boolean {
  return typeof navigator !== 'undefined' && 'clipboard' in navigator;
}

/**
 * Share content using native share API or fallback to clipboard
 * @param options - Share options (title, text, url)
 * @returns Promise with share result
 * @example
 * const result = await shareContent({
 *   title: 'Check this out!',
 *   text: 'Amazing game',
 *   url: 'https://example.com/game/123'
 * });
 */
export async function shareContent(options: ShareOptions): Promise<ShareResult> {
  try {
    // Try native share first if available
    if (canShare()) {
      try {
        await navigator.share(options);
        return {
          success: true,
          method: 'native',
          message: 'Content shared successfully'
        };
      } catch (error) {
        // User cancelled or error occurred
        if (error instanceof Error && error.name === 'AbortError') {
          return {
            success: false,
            method: 'native',
            message: 'Share cancelled'
          };
        }
        // Fall through to clipboard fallback
      }
    }

    // Fallback to clipboard
    if (canCopyToClipboard()) {
      await copyToClipboard(options.url);
      return {
        success: true,
        method: 'clipboard',
        message: 'Link copied to clipboard'
      };
    }

    // No sharing method available
    return {
      success: false,
      method: 'failed',
      message: 'Sharing is not supported on this device'
    };
  } catch (error) {
    return {
      success: false,
      method: 'failed',
      message: error instanceof Error ? error.message : 'Failed to share'
    };
  }
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copied
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (!canCopyToClipboard()) {
    throw new Error('Clipboard API is not available');
  }
  
  await navigator.clipboard.writeText(text);
}

/**
 * Generate share URL for social platforms
 * @param platform - Social platform name
 * @param url - URL to share
 * @param options - Additional options (title, text, hashtags)
 * @returns Share URL for the platform
 */
export function generateSocialShareUrl(
  platform: 'twitter' | 'facebook' | 'linkedin' | 'whatsapp' | 'telegram',
  url: string,
  options: {
    title?: string;
    text?: string;
    hashtags?: string[];
  } = {}
): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = options.text ? encodeURIComponent(options.text) : '';
  
  switch (platform) {
    case 'twitter':
      const hashtags = options.hashtags?.join(',') || '';
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}${hashtags ? `&hashtags=${hashtags}` : ''}`;
    
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    
    case 'whatsapp':
      return `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
    
    case 'telegram':
      return `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
    
    default:
      return url;
  }
}

/**
 * Open share URL in a popup window
 * @param url - Share URL
 * @param options - Window options
 */
export function openSharePopup(
  url: string,
  options: {
    width?: number;
    height?: number;
    title?: string;
  } = {}
): Window | null {
  const { width = 600, height = 400, title = 'Share' } = options;
  
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;
  
  return window.open(
    url,
    title,
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
  );
}