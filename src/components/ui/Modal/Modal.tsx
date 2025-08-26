/**
 * @fileoverview Modal component for dialogs and overlays
 * @module components/ui/Modal
 */

'use client';

import React, { useEffect, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from '../Button';
import { cn } from '@/lib/utils';
import '@/styles/components/base/modal.css';

/**
 * Modal sizes
 */
export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Modal positions
 */
export type ModalPosition = 'center' | 'top' | 'bottom';

/**
 * Validation types for modal
 */
export type ModalValidationType = 'error' | 'warning' | 'info' | 'persistent';

/**
 * Props for the Modal component
 * @interface ModalProps
 */
export interface ModalProps {
  /** Whether modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal description */
  description?: string;
  /** Modal size */
  size?: ModalSize;
  /** Modal position */
  position?: ModalPosition;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether to close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Whether to close on Escape key */
  closeOnEscape?: boolean;
  /** Whether to show overlay */
  showOverlay?: boolean;
  /** Whether to prevent body scroll when open */
  preventScroll?: boolean;
  /** Padding size for modal content ('none' | 'sm' | 'md' | 'lg') */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Custom className for modal */
  className?: string;
  /** Custom className for overlay */
  overlayClassName?: string;
  /** Custom classNames for nested elements */
  classNames?: {
    overlay?: string;
    container?: string;
    content?: string;
    header?: string;
    body?: string;
    footer?: string;
  };
  /** Children content */
  children?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Custom z-index for stacking modals */
  zIndex?: number;
  /** Validation type - controls modal behavior on invalid close attempts */
  validationType?: ModalValidationType;
  /** Callback to validate before closing - return false to prevent close */
  onValidate?: () => boolean | Promise<boolean>;
  /** Whether modal is persistent (reopens when closed without validation) */
  persistent?: boolean;
  /** Callback when validation fails */
  onValidationFail?: () => void;
  /** Test ID */
  testId?: string;
}

/**
 * Get size classes for modal
 */
const getSizeClass = (size: ModalSize): string => {
  return `modal-${size}`;
};

/**
 * Get position classes for modal
 */
const getPositionClass = (position: ModalPosition): string => {
  return `modal-${position}`;
};

/**
 * Modal Component
 * 
 * @description A flexible modal component for dialogs, alerts, and overlays.
 * Supports various sizes, positions, and configurations.
 * 
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 *   description="Are you sure you want to continue?"
 *   footer={
 *     <>
 *       <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
 *       <Button variant="primary">Confirm</Button>
 *     </>
 *   }
 * >
 *   <p>Modal content goes here</p>
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  position = 'center',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showOverlay = true,
  preventScroll = true,
  padding = 'md',
  className = '',
  overlayClassName = '',
  classNames,
  children,
  zIndex,
  footer,
  validationType,
  onValidate,
  persistent = false,
  onValidationFail,
  testId = 'modal'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [internalOpen, setInternalOpen] = useState(isOpen);

  // Sync internal state with prop
  useEffect(() => {
    setInternalOpen(isOpen);
  }, [isOpen]);

  // Handle validation and close
  const handleClose = useCallback(async () => {
    // If there's a validation function, check it first
    if (onValidate) {
      const isValid = await onValidate();
      if (!isValid) {
        // Handle validation failure based on type
        if (validationType === 'error') {
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 500);
        }
        
        if (onValidationFail) {
          onValidationFail();
        }
        
        // For persistent modals, temporarily close then reopen
        if (persistent || validationType === 'persistent') {
          setInternalOpen(false);
          setTimeout(() => {
            setInternalOpen(true);
          }, 100);
          return;
        }
        
        // Don't close if validation fails and not persistent
        return;
      }
    }
    
    // Close the modal if validation passes or no validation
    setInternalOpen(false);
    onClose();
  }, [onValidate, onClose, validationType, onValidationFail, persistent]);

  // Handle escape key
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (closeOnEscape && event.key === 'Escape') {
      handleClose();
    }
  }, [closeOnEscape, handleClose]);

  // Handle overlay click
  const handleOverlayClick = useCallback((event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      handleClose();
    }
  }, [closeOnOverlayClick, handleClose]);

  // Lock body scroll
  useEffect(() => {
    if (!internalOpen) return;

    if (preventScroll) {
      document.body.classList.add('modal-open');
      return () => {
        document.body.classList.remove('modal-open');
      };
    }
  }, [internalOpen, preventScroll]);

  // Add escape key listener
  useEffect(() => {
    if (!internalOpen) return;

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [internalOpen, handleEscape]);

  // Focus trap
  useEffect(() => {
    if (!internalOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus first element
    firstElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTab);
    return () => {
      modal.removeEventListener('keydown', handleTab);
    };
  }, [internalOpen]);

  if (!internalOpen) return null;

  const modalContent = (
    <>
      {/* Overlay */}
      {showOverlay && (
        <div 
          className={cn('modal-overlay', overlayClassName, classNames?.overlay)}
          onClick={handleOverlayClick}
          aria-hidden="true"
          style={zIndex ? { zIndex } : undefined}
        />
      )}
      
      {/* Modal Container */}
      <div
        className={cn(
          'modal-container',
          getPositionClass(position),
          size === 'full' && 'modal-full-container',
          !showOverlay && 'pointer-events-none',
          classNames?.container
        )}
        onClick={handleOverlayClick}
        data-testid={`${testId}-overlay`}
        style={zIndex ? { zIndex: zIndex + 1 } : undefined}
      >
        {/* Modal */}
        <div
          ref={modalRef}
          className={cn(
            'modal-content will-animate',
            getSizeClass(size),
            `modal-padding-${padding}`,
            isShaking && 'modal-shake',
            className,
            classNames?.content
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? `${testId}-title` : undefined}
          aria-describedby={description ? `${testId}-description` : undefined}
          data-testid={testId}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || description || showCloseButton) && (
            <div className={cn('modal-header', classNames?.header)}>
              {(title || description) && (
                <div className="modal-header-content">
                  {title && (
                    <h2 
                      id={`${testId}-title`}
                      className="text-xl font-semibold text-text"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p 
                      id={`${testId}-description`}
                      className="mt-1 text-sm text-secondary"
                    >
                      {description}
                    </p>
                  )}
                </div>
              )}
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconOnly
                  onClick={handleClose}
                  className="modal-close-button"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>
          )}

          {/* Body */}
          <div className={cn('modal-body', classNames?.body)}>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className={cn('modal-footer', classNames?.footer)}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );

  // Use portal to render modal at root level
  if (typeof window === 'undefined') return null;
  
  return createPortal(
    modalContent,
    document.body
  );
};

/**
 * ModalHeader component for custom headers
 */
export interface ModalHeaderProps {
  /** Title */
  title?: string;
  /** Description */
  description?: string;
  /** Close handler */
  onClose?: () => void;
  /** Show close button */
  showCloseButton?: boolean;
  /** Children */
  children?: React.ReactNode;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  description,
  onClose,
  showCloseButton = true,
  children
}) => {
  return (
    <div className="modal-header">
      <div className="modal-header-content">
        {title && <h2 className="text-xl font-semibold text-text">{title}</h2>}
        {description && <p className="mt-1 text-sm text-secondary">{description}</p>}
        {children}
      </div>
      {showCloseButton && onClose && (
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          onClick={onClose}
          className="modal-close-button"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};

/**
 * ModalBody component for content
 */
export interface ModalBodyProps {
  /** Custom className */
  className?: string;
  /** Children */
  children?: React.ReactNode;
}

export const ModalBody: React.FC<ModalBodyProps> = ({
  className = '',
  children
}) => {
  return (
    <div className={`modal-body ${className}`}>
      {children}
    </div>
  );
};

/**
 * ModalFooter component for actions
 */
export interface ModalFooterProps {
  /** Custom className */
  className?: string;
  /** Children */
  children?: React.ReactNode;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  className = '',
  children
}) => {
  return (
    <div className={`modal-footer ${className}`}>
      {children}
    </div>
  );
};

export default Modal;