/**
 * @fileoverview Tooltip component for contextual information
 * @module components/ui/Tooltip
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import '@/styles/components/base/tooltip.css';

/**
 * Tooltip placement options
 */
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Props for the Tooltip component
 * @interface TooltipProps
 */
export interface TooltipProps {
  /** Content to show in the tooltip */
  content: React.ReactNode;
  /** Placement of the tooltip */
  placement?: TooltipPlacement;
  /** Position of the tooltip (alias for placement) */
  position?: TooltipPlacement;
  /** Variant style of tooltip */
  variant?: 'default' | 'info' | 'warning' | 'error';
  /** Delay before showing tooltip (ms) */
  delay?: number;
  /** Whether tooltip is disabled */
  disabled?: boolean;
  /** Custom className for tooltip */
  className?: string;
  /** Children that trigger the tooltip */
  children: React.ReactElement;
  /** Whether content should wrap */
  multiline?: boolean;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Tooltip Component
 * 
 * @description A tooltip component that shows contextual information on hover.
 * Uses fixed positioning to escape parent overflow constraints.
 * 
 * @example
 * ```tsx
 * <Tooltip content="This is helpful information">
 *   <button>Hover me</button>
 * </Tooltip>
 * 
 * <Tooltip content={<div>Rich content</div>} placement="right" multiline>
 *   <InfoIcon />
 * </Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  position,
  variant = 'default',
  delay = 200,
  disabled = false,
  className = '',
  children,
  multiline = false,
  testId = 'tooltip'
}) => {
  // position is an alias for placement
  const actualPlacement = position || placement;
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const spacing = 8; // Space between trigger and tooltip

      let top = 0;
      let left = 0;

      switch (actualPlacement) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - spacing;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + spacing;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - spacing;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + spacing;
          break;
      }

      // Keep tooltip within viewport bounds
      const padding = 10;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Adjust horizontal position
      if (left < padding) {
        left = padding;
      } else if (left + tooltipRect.width > viewportWidth - padding) {
        left = viewportWidth - tooltipRect.width - padding;
      }

      // Adjust vertical position
      if (top < padding) {
        top = padding;
      } else if (top + tooltipRect.height > viewportHeight - padding) {
        top = viewportHeight - tooltipRect.height - padding;
      }

      setTooltipPosition({ top, left });
    }
  }, [isVisible, actualPlacement]);

  const handleMouseEnter = () => {
    if (disabled) return;
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsVisible(true);
    }
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div 
        ref={triggerRef}
        className="tooltip-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {React.cloneElement(children as React.ReactElement, {
          ...(isVisible ? { 'aria-describedby': `${testId}-content` } : {})
        })}
      </div>
      
      {isVisible && !disabled && typeof document !== 'undefined' && createPortal(
        <div
          ref={tooltipRef}
          id={`${testId}-content`}
          className={`
            tooltip-content 
            tooltip-${actualPlacement}
            tooltip-variant-${variant}
            ${isVisible ? 'tooltip-visible' : ''}
            ${multiline ? 'tooltip-multiline' : ''}
            ${className}
          `}
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
          role="tooltip"
          data-testid={testId}
        >
          {content}
          <div className="tooltip-arrow" />
        </div>,
        document.body
      )}
    </>
  );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;