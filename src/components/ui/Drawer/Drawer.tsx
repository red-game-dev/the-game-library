/**
 * Drawer Component
 * A versatile drawer/sidebar component for mobile and desktop
 */

'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import '@/styles/components/base/drawer.css';

export interface DrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Position of the drawer */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** Size of the drawer */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Show overlay */
  showOverlay?: boolean;
  /** Close on overlay click */
  closeOnOverlay?: boolean;
  /** Close on ESC key */
  closeOnEsc?: boolean;
  /** Show close button */
  showCloseButton?: boolean;
  /** Show header section */
  showHeader?: boolean;
  /** Keep drawer open when other modals/drawers open */
  persistent?: boolean;
  /** Title for the drawer header */
  title?: string;
  /** Custom header content (overrides title) */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Footer variant - controls footer background style */
  footerVariant?: 'default' | 'elevated' | 'bordered';
  /** Footer color - controls footer color scheme */
  footerColor?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'dark';
  /** Content padding */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Children content */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Custom classNames for nested elements */
  classNames?: {
    overlay?: string;
    drawer?: string;
    content?: string;
    header?: string;
    body?: string;
    footer?: string;
  };
  /** Test ID */
  testId?: string;
  /** Lock body scroll when open */
  lockScroll?: boolean;
  /** Animation duration in ms */
  animationDuration?: number;
}

/**
 * Drawer Component
 */
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = 'right',
  size = 'md',
  showOverlay = true,
  closeOnOverlay = true,
  closeOnEsc = true,
  showCloseButton = true,
  showHeader = true,
  persistent = false,
  title,
  header,
  footer,
  footerVariant = 'default',
  footerColor = 'default',
  padding = 'md',
  children,
  className = '',
  classNames,
  testId = 'drawer',
  lockScroll = true,
  animationDuration = 300
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  
  /**
   * Handle ESC key press - only close if closeOnEsc is true
   */
  const handleEscKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEsc && onClose) {
      onClose();
    }
  }, [closeOnEsc, onClose]);
  
  /**
   * Handle overlay click - only close if closeOnOverlay is true
   */
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    // Prevent event bubbling
    e.stopPropagation();
    if (closeOnOverlay && onClose) {
      onClose();
    }
  }, [closeOnOverlay, onClose]);
  
  /**
   * Lock/unlock body scroll
   */
  useEffect(() => {
    if (!lockScroll) return;
    
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, lockScroll]);
  
  /**
   * Handle keyboard events and focus management
   */
  useEffect(() => {
    if (!isOpen) return;
    
    // Store current active element
    previousActiveElement.current = document.activeElement as HTMLElement;
    
    // Add ESC key listener
    if (closeOnEsc) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    // Focus drawer on open
    if (drawerRef.current) {
      drawerRef.current.focus();
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      
      // Restore focus to previous element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, closeOnEsc, handleEscKey]);
  
  /**
   * Trap focus within drawer
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key !== 'Tab' || !drawerRef.current) return;
    
    const focusableElements = drawerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  }, []);
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Overlay */}
      {showOverlay && (
        <div
          className={cn(
            'drawer-overlay',
            persistent && 'drawer-overlay-persistent',
            classNames?.overlay
          )}
          onClick={handleOverlayClick}
          aria-hidden="true"
          data-testid={`${testId}-overlay`}
          style={{ animationDuration: `${animationDuration}ms` }}
        />
      )}
      
      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          'drawer',
          `drawer-${position}`,
          `drawer-${size}`,
          persistent && 'drawer-persistent',
          className,
          classNames?.drawer
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={header ? `${testId}-header` : undefined}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        data-testid={testId}
        style={{ animationDuration: `${animationDuration}ms` }}
      >
        {/* Header - Show based on showHeader prop */}
        {showHeader && (header || title || showCloseButton) && (
          <div 
            className={cn('drawer-header', classNames?.header)}
            id={`${testId}-header`}
            data-testid={`${testId}-header`}
          >
            <div className="drawer-header-content">
              {header || (title && <h2 className="drawer-title">{title}</h2>)}
            </div>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                onClick={onClose}
                className="drawer-close"
                aria-label="Close drawer"
                data-testid={`${testId}-close`}
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        )}
        
        {/* Body/Content - Main scrollable area */}
        <div 
          className={cn(
            'drawer-content will-animate',
            `drawer-content-padding-${padding}`,
            classNames?.content || classNames?.body
          )}
          data-testid={`${testId}-content`}
        >
          {children}
        </div>
        
        {/* Footer - Only show if content provided */}
        {footer && (
          <div 
            className={cn(
              'drawer-footer',
              `drawer-footer-${footerVariant}`,
              `drawer-footer-color-${footerColor}`,
              classNames?.footer
            )}
            data-testid={`${testId}-footer`}
          >
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

Drawer.displayName = 'Drawer';

export default Drawer;