/**
 * Error Page Configuration Constants
 * Defines error types and their configurations
 */

import React from 'react';
import { 
  AlertTriangle, 
  Search,
  WifiOff,
  Lock,
  Ban,
  Clock,
  AlertOctagon,
  Server,
  Database,
  Wifi,
  Zap
} from 'lucide-react';

export type ErrorType = '400' | '401' | '403' | '404' | '408' | '429' | '500' | '502' | '503' | 'network' | 'custom';

export interface ErrorConfig {
  icon: React.ReactNode;
  title: string;
  description: string;
  showRetry: boolean;
  showGoBack: boolean;
  showGoHome: boolean;
  badgeText?: string;
  badgeVariant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

export const ERROR_CONFIGS: Record<ErrorType, ErrorConfig> = {
  '400': {
    icon: <AlertOctagon className="error-page-icon" />,
    title: 'Bad Request',
    description: 'The request could not be understood by the server. Please check your input and try again.',
    showRetry: false,
    showGoBack: true,
    showGoHome: true,
    badgeText: '400',
    badgeVariant: 'warning'
  },
  '401': {
    icon: <Lock className="error-page-icon" />,
    title: 'Unauthorized',
    description: 'You need to be logged in to access this page. Please sign in and try again.',
    showRetry: false,
    showGoBack: true,
    showGoHome: true,
    badgeText: '401',
    badgeVariant: 'error'
  },
  '403': {
    icon: <Ban className="error-page-icon" />,
    title: 'Access Forbidden',
    description: "You don't have permission to access this resource. Contact support if you believe this is an error.",
    showRetry: false,
    showGoBack: true,
    showGoHome: true,
    badgeText: '403',
    badgeVariant: 'error'
  },
  '404': {
    icon: <Search className="error-page-icon" />,
    title: 'Page Not Found',
    description: "We couldn't find the page you're looking for. It may have been moved or deleted.",
    showRetry: false,
    showGoBack: true,
    showGoHome: true,
    badgeText: '404',
    badgeVariant: 'info'
  },
  '408': {
    icon: <Clock className="error-page-icon" />,
    title: 'Request Timeout',
    description: 'The request took too long to process. Please check your connection and try again.',
    showRetry: true,
    showGoBack: true,
    showGoHome: false,
    badgeText: '408',
    badgeVariant: 'warning'
  },
  '429': {
    icon: <Zap className="error-page-icon" />,
    title: 'Too Many Requests',
    description: "You've made too many requests. Please wait a moment before trying again.",
    showRetry: true,
    showGoBack: false,
    showGoHome: true,
    badgeText: '429',
    badgeVariant: 'warning'
  },
  '500': {
    icon: <Server className="error-page-icon" />,
    title: 'Internal Server Error',
    description: 'Something went wrong on our end. Our team has been notified and is working on a fix.',
    showRetry: true,
    showGoBack: true,
    showGoHome: true,
    badgeText: '500',
    badgeVariant: 'error'
  },
  '502': {
    icon: <Wifi className="error-page-icon" />,
    title: 'Bad Gateway',
    description: 'We are having trouble connecting to our servers. Please try again in a moment.',
    showRetry: true,
    showGoBack: false,
    showGoHome: true,
    badgeText: '502',
    badgeVariant: 'error'
  },
  '503': {
    icon: <Database className="error-page-icon" />,
    title: 'Service Unavailable',
    description: 'Our service is temporarily unavailable for maintenance. Please check back soon.',
    showRetry: true,
    showGoBack: false,
    showGoHome: true,
    badgeText: '503',
    badgeVariant: 'warning'
  },
  'network': {
    icon: <WifiOff className="error-page-icon" />,
    title: 'Network Error',
    description: 'Unable to connect to the server. Please check your internet connection and try again.',
    showRetry: true,
    showGoBack: true,
    showGoHome: false,
    badgeText: 'Offline',
    badgeVariant: 'default'
  },
  'custom': {
    icon: <AlertTriangle className="error-page-icon" />,
    title: 'Something Went Wrong',
    description: 'An unexpected error occurred. Please try again or contact support if the problem persists.',
    showRetry: true,
    showGoBack: true,
    showGoHome: true,
    badgeText: 'Error',
    badgeVariant: 'error'
  }
};

export default ERROR_CONFIGS;