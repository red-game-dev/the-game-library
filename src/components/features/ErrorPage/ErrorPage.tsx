/**
 * ErrorPage Component
 * A comprehensive error page component for displaying various error states
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Home, RefreshCw, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Link } from '@/components/ui/Link';
import { ERROR_CONFIGS, type ErrorType, type ErrorConfig } from '@/lib/core/config/constants/error.constants';
import '@/styles/components/features/error-page.css';

export interface ErrorPageProps {
  /** Error type to display */
  errorType?: ErrorType;
  /** Custom error configuration (overrides default config) */
  errorConfig?: ErrorConfig;
  /** Custom error title (overrides default) */
  title?: string;
  /** Custom error description (overrides default) */
  description?: string;
  /** Custom icon (overrides default) */
  icon?: React.ReactNode;
  /** Show retry button */
  showRetry?: boolean;
  /** Show go back button */
  showGoBack?: boolean;
  /** Show go home button */
  showGoHome?: boolean;
  /** Custom retry handler */
  onRetry?: () => void;
  /** Custom go back handler */
  onGoBack?: () => void;
  /** Custom go home handler */
  onGoHome?: () => void;
  /** Additional content to display */
  children?: React.ReactNode;
  /** Custom badge text */
  badgeText?: string;
  /** Custom badge variant */
  badgeVariant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  /** Show shield icon for security-related errors */
  showSecurityBadge?: boolean;
  /** Custom className */
  className?: string;
  /** Test ID */
  testId?: string;
}

/**
 * ErrorPage Component
 */
export const ErrorPage: React.FC<ErrorPageProps> = ({
  errorType = '404',
  errorConfig,
  title,
  description,
  icon,
  showRetry,
  showGoBack,
  showGoHome,
  onRetry,
  onGoBack,
  onGoHome,
  children,
  badgeText,
  badgeVariant,
  showSecurityBadge = false,
  className = '',
  testId = 'error-page'
}) => {
  const router = useRouter();
  // Use provided config or fallback to default config
  const config = errorConfig || ERROR_CONFIGS[errorType];

  // Use custom values or fallback to config
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;
  const displayIcon = icon || config.icon;
  const displayBadgeText = badgeText || config.badgeText;
  const displayBadgeVariant = badgeVariant || config.badgeVariant;
  const displayShowRetry = showRetry !== undefined ? showRetry : config.showRetry;
  const displayShowGoBack = showGoBack !== undefined ? showGoBack : config.showGoBack;
  const displayShowGoHome = showGoHome !== undefined ? showGoHome : config.showGoHome;

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      router.back();
    }
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      router.push('/');
    }
  };

  return (
    <div 
      className={`error-page error-page-${errorType} ${className}`}
      data-testid={testId}
    >
      <div className="error-page-container">
        {/* Decorative Elements */}
        <div className="error-page-decoration">
          <div className="error-page-decoration-glow" />
          <div className="error-page-decoration-pattern" />
        </div>

        {/* Content */}
        <div className="error-page-content">
          {/* Icon */}
          <div className="error-page-icon-wrapper">
            {displayIcon}
            {showSecurityBadge && (
              <Shield className="error-page-security-badge" />
            )}
          </div>

          {/* Badge */}
          {displayBadgeText && (
            <Badge 
              variant={displayBadgeVariant}
              size="lg"
              className="error-page-badge"
            >
              {displayBadgeText}
            </Badge>
          )}

          {/* Title */}
          <h1 className="error-page-title">
            {displayTitle}
          </h1>

          {/* Description */}
          <p className="error-page-description">
            {displayDescription}
          </p>

          {/* Additional Content */}
          {children && (
            <div className="error-page-extra">
              {children}
            </div>
          )}

          {/* Actions */}
          <div className="error-page-actions">
            {displayShowRetry && (
              <Button
                variant="primary"
                size="lg"
                onClick={handleRetry}
                leftIcon={<RefreshCw className="w-4 h-4" />}
                className="error-page-button"
              >
                Try Again
              </Button>
            )}
            
            {displayShowGoBack && (
              <Button
                variant={displayShowRetry ? 'secondary' : 'primary'}
                size="lg"
                onClick={handleGoBack}
                className="error-page-button"
              >
                Go Back
              </Button>
            )}
            
            {displayShowGoHome && (
              <Button
                variant="ghost"
                size="lg"
                onClick={handleGoHome}
                leftIcon={<Home className="w-4 h-4" />}
                className="error-page-button"
              >
                Go Home
              </Button>
            )}
          </div>

          {/* Help Text */}
          <div className="error-page-help">
            <p className="error-page-help-text">
              Need help? <Link href="/contact" className="error-page-help-link">Contact Support</Link>
            </p>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="error-page-bg-elements">
          <div className="error-page-bg-circle error-page-bg-circle-1" />
          <div className="error-page-bg-circle error-page-bg-circle-2" />
          <div className="error-page-bg-circle error-page-bg-circle-3" />
        </div>
      </div>
    </div>
  );
};

ErrorPage.displayName = 'ErrorPage';

export default ErrorPage;