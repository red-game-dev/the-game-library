/**
 * App Layout Component
 * Main application layout with Header, Footer and navigation
 * Manages authentication state and provides consistent layout across pages
 */

'use client';

import React, { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/features/CookieConsent';
import { SessionTimeout } from '@/components/features/SessionTimeout';
import { useAuthStore } from '@/lib/core/frontend/stores/auth/useAuthStore';
import { NAVIGATION_ITEMS } from '@/lib/core/config/constants/routes.constants';
import '@/styles/components/layout/app-layout.css';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, isAuthenticated, initializeGuestMode, addToBalance, subtractFromBalance } = useAuthStore();

  // Initialize guest mode on mount if not authenticated
  useEffect(() => {
    if (!user && !isAuthenticated) {
      initializeGuestMode();
    }
  }, [user, isAuthenticated, initializeGuestMode]);

  // Simulate demo balance changes for guest users
  useEffect(() => {
    if (user?.isGuest) {
      const interval = setInterval(() => {
        // Random balance changes for demo effect
        const change = (Math.random() - 0.5) * 10;
        if (change > 0) {
          addToBalance(parseFloat(change.toFixed(2)));
        } else {
          subtractFromBalance(parseFloat(Math.abs(change).toFixed(2)));
        }
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [user?.isGuest, addToBalance, subtractFromBalance]);

  // Format user for Header component
  const headerUser = user ? {
    name: user.name,
    avatar: user.avatar,
    balance: user.balance
  } : undefined;

  return (
    <div className="app-layout">
      <Header
        showUser={true}
        user={headerUser}
        navigationItems={NAVIGATION_ITEMS}
        showSearch={true}
        showThemeSwitcher={true}
        fixed={true}
        transparent={false}
      />
      {/* Spacer for fixed header */}
      <div style={{ height: '64px' }} />
      <main id="main-content" className="app-layout-main">
        {children}
      </main>
      <Footer 
        showThemeSwitcher={true}
        showSocials={true}
        showNewsletter={false}
        compact={false}
      />
      <CookieConsent />
      <SessionTimeout 
        enabled={process.env.NEXT_PUBLIC_ENABLE_SESSION_TIMEOUT === 'true'}
        sessionTimeout={parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '1800000')} // 30 minutes default
        warningTime={parseInt(process.env.NEXT_PUBLIC_SESSION_WARNING_TIME || '300000')} // 5 minutes default
      />
    </div>
  );
};