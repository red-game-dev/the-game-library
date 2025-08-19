/**
 * @fileoverview Alert component for displaying notifications and messages
 * @module components/ui/Alert
 */

import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '../Button';
import '@/styles/components/base/alert.css';
import '@/styles/components/base/button.css';

/**
 * Alert component props
 */
export interface AlertProps {
  /** Alert content */
  children: React.ReactNode;
  /** Alert variant/type */
  variant?: 'info' | 'success' | 'warning' | 'error' | 'default';
  /** Alert type - affects styling and behavior */
  type?: 'inline' | 'toast' | 'banner' | 'card';
  /** Alert title */
  title?: string;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Callback when alert is dismissed */
  onDismiss?: () => void;
  /** Custom icon (overrides variant icon) */
  icon?: React.ReactNode;
  /** Whether to show icon */
  showIcon?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Alert size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Whether alert should fill its container */
  fullWidth?: boolean;
  /** Expandable details content */
  details?: React.ReactNode;
  /** Whether details are initially expanded */
  defaultExpanded?: boolean;
  /** Action buttons to display in the alert */
  actions?: React.ReactNode;
  /** Whether to keep actions inline on mobile (default: false) */
  inlineActions?: boolean;
  /** Whether to animate entrance */
  animate?: boolean;
  /** Custom icon size */
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Icon style - 'default' or 'square' for large square icon on left */
  iconStyle?: 'default' | 'square';
}

/**
 * Get icon based on variant
 */
const getVariantIcon = (variant: AlertProps['variant'], size: AlertProps['size'], customIconSize?: AlertProps['iconSize']) => {
  // Set icon size based on alert size or custom size
  const defaultSize = size === 'xs' ? 14 : size === 'sm' ? 16 : size === 'lg' ? 24 : size === 'xl' ? 28 : 20;
  const customSize = customIconSize === 'xs' ? 12 : customIconSize === 'sm' ? 16 : customIconSize === 'md' ? 20 : customIconSize === 'lg' ? 28 : customIconSize === 'xl' ? 36 : undefined;
  const iconSize = customSize || defaultSize;
  const strokeWidth = 2;
  
  const iconProps = {
    className: "alert-icon",
    size: iconSize,
    strokeWidth: strokeWidth,
    "aria-hidden": true
  };
  
  switch (variant) {
    case 'success':
      return <CheckCircle {...iconProps} />;
    case 'error':
      return <XCircle {...iconProps} />;
    case 'warning':
      return <AlertTriangle {...iconProps} />;
    case 'info':
      return <Info {...iconProps} />;
    default:
      return <AlertCircle {...iconProps} />;
  }
};

/**
 * Get size classes
 */
const getSizeClasses = (size: AlertProps['size']) => {
  switch (size) {
    case 'xs':
      return 'alert-xs';
    case 'sm':
      return 'alert-sm';
    case 'lg':
      return 'alert-lg';
    case 'xl':
      return 'alert-xl';
    default:
      return 'alert-md';
  }
};

/**
 * Alert component for displaying notifications and messages
 * 
 * @example
 * ```tsx
 * <Alert variant="success" title="Success!">
 *   Your changes have been saved.
 * </Alert>
 * ```
 */
export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'default',
  type = 'inline',
  title,
  dismissible = false,
  onDismiss,
  icon,
  showIcon = true,
  className = '',
  size = 'sm',
  fullWidth = false,
  details,
  defaultExpanded = false,
  actions,
  inlineActions = false,
  animate = true,
  iconSize,
  iconStyle = 'default',
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  const sizeClass = getSizeClasses(size);
  const variantClass = `alert-${variant}`;
  const typeClass = `alert-type-${type}`;
  const fullWidthClass = fullWidth ? 'alert-full-width' : '';
  const animateClass = animate ? 'alert-animate' : '';
  const iconStyleClass = iconStyle === 'square' ? 'alert-icon-square' : '';
  
  const hasDetails = Boolean(details);
  
  // Check if this should be a simple inline alert (with or without dismiss)
  const isSimple = !title && !actions && !details;
  
  // Simple inline layout for basic alerts
  if (isSimple) {
    return (
      <div 
        className={`alert alert-simple ${variantClass} ${typeClass} ${sizeClass} ${fullWidthClass} ${animateClass} ${iconStyleClass} ${className}`}
        role="alert"
      >
        {showIcon && (
          <div className="alert-icon-wrapper">
            {icon || getVariantIcon(variant, size, iconSize)}
          </div>
        )}
        <div className="alert-message">
          {children}
        </div>
        {dismissible && (
          <Button
            variant="ghost"
            size="sm"
            className="alert-dismiss"
            onClick={onDismiss}
            aria-label="Dismiss alert"
            iconOnly
          >
            <X size={16} />
          </Button>
        )}
      </div>
    );
  }
  
  // Full layout for complex alerts
  // Square icon style needs special layout
  if (iconStyle === 'square' && showIcon) {
    return (
      <div 
        className={`alert ${variantClass} ${typeClass} ${sizeClass} ${fullWidthClass} ${animateClass} ${iconStyleClass} ${className}`}
        role="alert"
      >
        <div className="alert-icon-wrapper">
          {icon || getVariantIcon(variant, size, iconSize || 'lg')}
        </div>
        <div className="alert-content-wrapper">
          {(title || dismissible) && (
            <div className="alert-header">
              <div className="alert-header-left">
                {title && (
                  <div className="alert-title">
                    {title}
                  </div>
                )}
              </div>
              {dismissible && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="alert-dismiss"
                  onClick={onDismiss}
                  aria-label="Dismiss alert"
                  iconOnly
                >
                  <X size={16} />
                </Button>
              )}
            </div>
          )}
          
          <div className="alert-body">
            <div className="alert-message">
              {children}
            </div>
            
            {hasDetails && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="alert-details-toggle"
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-expanded={isExpanded}
                  aria-controls="alert-details"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp size={16} />
                      <span>Hide details</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      <span>Show details</span>
                    </>
                  )}
                </Button>
                
                {isExpanded && (
                  <div id="alert-details" className="alert-details">
                    {details}
                  </div>
                )}
              </>
            )}
          </div>
          
          {actions && (
            <div className={`alert-actions ${inlineActions ? 'alert-actions-inline' : ''}`}>
              {actions}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Default layout for non-square icons
  return (
    <div 
      className={`alert ${variantClass} ${typeClass} ${sizeClass} ${fullWidthClass} ${animateClass} ${iconStyleClass} ${className}`}
      role="alert"
    >
      {(showIcon || title || dismissible) && (
        <div className="alert-header">
          <div className="alert-header-left">
            {showIcon && (
              <div className="alert-icon-wrapper">
                {icon || getVariantIcon(variant, size, iconSize)}
              </div>
            )}
            {title && (
              <div className="alert-title">
                {title}
              </div>
            )}
          </div>
          {dismissible && (
            <Button
              variant="ghost"
              size="sm"
              className="alert-dismiss"
              onClick={onDismiss}
              aria-label="Dismiss alert"
              iconOnly
            >
              <X size={16} />
            </Button>
          )}
        </div>
      )}
      
      <div className="alert-body">
        <div className="alert-message">
          {children}
        </div>
        
        {hasDetails && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="alert-details-toggle"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-controls="alert-details"
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={16} />
                  <span>Hide details</span>
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  <span>Show details</span>
                </>
              )}
            </Button>
            
            {isExpanded && (
              <div id="alert-details" className="alert-details">
                {details}
              </div>
            )}
          </>
        )}
      </div>
      
      {actions && (
        <div className={`alert-actions ${inlineActions ? 'alert-actions-inline' : ''}`}>
          {actions}
        </div>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';

export default Alert;