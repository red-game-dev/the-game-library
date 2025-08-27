/**
 * Session Timeout Warning Component
 * Displays a modal warning before session expires for accessibility compliance
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { AlertTriangle } from 'lucide-react';
import { useAuthStore } from '@/lib/core/frontend/stores/auth/useAuthStore';
import '@/styles/components/features/session-timeout.css';

export interface SessionTimeoutProps {
  /** Session timeout in milliseconds (default: 30 minutes) */
  sessionTimeout?: number;
  /** Warning time before timeout in milliseconds (default: 5 minutes) */
  warningTime?: number;
  /** Enable session timeout */
  enabled?: boolean;
  /** Demo mode - for Storybook testing */
  demoMode?: boolean;
}

export const SessionTimeout: React.FC<SessionTimeoutProps> = ({
  sessionTimeout = 30 * 60 * 1000, // 30 minutes
  warningTime = 5 * 60 * 1000, // 5 minutes
  enabled = true,
  demoMode = false
}) => {
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(warningTime);
  const { isAuthenticated, refreshSession } = useAuthStore();
  
  // Track last activity time - in demo mode, set to past to trigger immediately
  const [lastActivity, setLastActivity] = useState(
    demoMode ? Date.now() - sessionTimeout + 1000 : Date.now()
  );
  
  // Demo mode: show warning immediately on mount
  useEffect(() => {
    if (demoMode && enabled && isAuthenticated) {
      setShowWarning(true);
      setTimeRemaining(Math.floor(warningTime / 1000));
    }
  }, [demoMode, enabled, isAuthenticated, warningTime]);
  
  // Update last activity on user interaction
  const updateActivity = useCallback(() => {
    if (!demoMode) {
      setLastActivity(Date.now());
      setShowWarning(false);
    }
  }, [demoMode]);
  
  // Extend session
  const extendSession = useCallback(() => {
    refreshSession?.();
    setLastActivity(Date.now());
    setShowWarning(false);
    
    // In demo mode, show again after 1 second
    if (demoMode) {
      setTimeout(() => {
        setShowWarning(true);
        setTimeRemaining(Math.floor(warningTime / 1000));
      }, 1000);
    }
    
    // Announce to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = 'Session extended successfully';
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }, [refreshSession, demoMode, warningTime]);
  
  // Monitor activity (disabled in demo mode)
  useEffect(() => {
    if (!enabled || !isAuthenticated || demoMode) return;
    
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      window.addEventListener(event, updateActivity);
    });
    
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, updateActivity);
      });
    };
  }, [enabled, isAuthenticated, updateActivity, demoMode]);
  
  // Check for timeout (disabled in demo mode)
  useEffect(() => {
    if (!enabled || !isAuthenticated || demoMode) return;
    
    const checkTimeout = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivity;
      const timeUntilTimeout = sessionTimeout - timeSinceActivity;
      
      if (timeUntilTimeout <= warningTime && timeUntilTimeout > 0) {
        setShowWarning(true);
        setTimeRemaining(Math.floor(timeUntilTimeout / 1000));
      } else if (timeUntilTimeout <= 0) {
        // Session expired - handle logout
        setShowWarning(false);
        // In a real app, this would trigger logout
        console.log('Session expired');
      } else {
        setShowWarning(false);
      }
    }, 1000);
    
    return () => clearInterval(checkTimeout);
  }, [enabled, isAuthenticated, lastActivity, sessionTimeout, warningTime, demoMode]);
  
  // Update countdown
  useEffect(() => {
    if (!showWarning) return;
    
    const countdown = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setShowWarning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(countdown);
  }, [showWarning]);
  
  if (!showWarning || !isAuthenticated) return null;
  
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  return (
    <Modal
      isOpen={showWarning}
      onClose={() => {}} // Don't allow easy closing
      title="Session Expiring Soon"
      size="md"
      closeOnEscape={false}
      closeOnOverlayClick={false}
      showCloseButton={false}
      className="session-timeout-modal"
      classNames={{
        content: 'session-timeout-modal-content'
      }}
    >
      <div 
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        className="flex flex-col items-center text-center py-4"
      >
        {/* Timer Display */}
        <div className="mb-6">
          <div className="flex flex-col items-center">
            <div className="text-xs text-secondary uppercase tracking-widest mb-3 font-medium">
              Time Remaining
            </div>
            <div 
              className={`text-7xl font-bold tracking-wider font-mono transition-all duration-300 ${
                timeRemaining <= 10 ? 'text-error animate-pulse scale-105' : 
                timeRemaining < 60 ? 'text-error' : 
                'text-warning'
              }`}
            >
              {timeDisplay}
            </div>
            <div className={`text-sm mt-3 font-medium ${
              timeRemaining <= 10 ? 'text-error uppercase tracking-wider' : 
              timeRemaining < 60 ? 'text-warning' : 
              'text-secondary'
            }`}>
              {timeRemaining <= 10 ? 'Critical - Act Now!' : 
               timeRemaining < 60 ? 'Less than 1 minute' : 
               'Until automatic logout'}
            </div>
          </div>
        </div>

        {/* Warning Message */}
        <Alert
          variant="warning"
          icon={<AlertTriangle />}
          fullWidth
          className="mb-6"
        >
          <div className="text-left">
            <p className="font-semibold mb-2">Your session is about to expire!</p>
            <p className="text-sm">
              You will be automatically logged out in {timeDisplay}. 
              Please save any unsaved work and click &rdquo;Extend Session&rdquo; to continue working.
            </p>
          </div>
        </Alert>

        {/* Progress Bar */}
        <div className="w-full mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="h-full transition-all duration-1000 ease-linear rounded-full"
              style={{ 
                width: `${(timeRemaining / (warningTime / 1000)) * 100}%`,
                background: timeRemaining < 60 
                  ? 'linear-gradient(90deg, #ef4444, #dc2626)' 
                  : timeRemaining < 120
                  ? 'linear-gradient(90deg, #f59e0b, #d97706)'
                  : 'linear-gradient(90deg, #10b981, #059669)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button
            variant="primary"
            size="lg"
            onClick={extendSession}
            aria-label="Extend session by 30 minutes"
            fullWidth
            className="font-semibold"
          >
            Extend Session
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              setShowWarning(false);
              // Still reset activity to give them more time
              setLastActivity(Date.now());
              
              // In demo mode, show again after 1 second
              if (demoMode) {
                setTimeout(() => {
                  setShowWarning(true);
                  setTimeRemaining(Math.floor(warningTime / 1000));
                }, 1000);
              }
            }}
            aria-label="Continue without extending"
            fullWidth
          >
            I Understand
          </Button>
        </div>

        {/* Additional Info */}
        <p className="text-xs text-secondary mt-4">
          For security reasons, sessions expire after {Math.floor(sessionTimeout / 60000)} minutes of inactivity.
        </p>
      </div>
    </Modal>
  );
};

export default SessionTimeout;