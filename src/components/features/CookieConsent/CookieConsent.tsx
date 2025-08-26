'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { Drawer } from '@/components/ui/Drawer';
import { Modal } from '@/components/ui/Modal';
import { FormFieldCheckbox } from '@/components/ui/FormField';
import { Cookie, Settings } from 'lucide-react';
import '@/styles/components/features/cookie-consent.css';

interface CookieConsentProps {
  /** Size of the cookie banner drawer (desktop only) */
  bannerSize?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to lock scroll when banner is open */
  lockScroll?: boolean;
  /** Whether to keep drawer open when showing preferences modal (desktop only) */
  persistent?: boolean;
  /** Breakpoint for switching between mobile and desktop view */
  mobileBreakpoint?: number;
}

/**
 * Cookie consent banner for GDPR compliance
 * Provides options for accepting all, necessary only, or managing preferences
 * Uses Modal on mobile/tablet and Drawer on desktop for better UX
 */
export function CookieConsent({ 
  bannerSize = 'sm',
  lockScroll = false,
  persistent = true,
  mobileBreakpoint = 1025  // Show modal on mobile and tablet (including iPad Pro), drawer only on desktop
}: CookieConsentProps = {}) {
  const [show, setShow] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    // Initialize with correct value if window is available
    if (typeof window !== 'undefined') {
      return window.innerWidth < mobileBreakpoint;
    }
    return true; // Default to mobile/modal view for SSR
  });
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    personalization: false,
  });

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    // Check on mount
    checkMobile();

    // Check on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a small delay to not interfere with initial page load
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Shared content strings
  const cookieDescription = "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking \"Accept All\", you consent to our use of cookies.";
  const privacyPolicyLabel = "Privacy Policy";
  const cookieTitle = "We value your privacy";

  const saveConsent = (consentData: typeof preferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShow(false);
    setShowPreferences(false);
    
    // Here you would initialize analytics, marketing, etc. based on consent
    if (consentData.analytics) {
      // Initialize analytics
      console.log('Analytics cookies enabled');
    }
    if (consentData.marketing) {
      // Initialize marketing cookies
      console.log('Marketing cookies enabled');
    }
    if (consentData.personalization) {
      // Initialize personalization
      console.log('Personalization cookies enabled');
    }
  };

  const acceptAll = () => {
    const allEnabled = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
    };
    setPreferences(allEnabled);
    saveConsent(allEnabled);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
    };
    setPreferences(necessaryOnly);
    saveConsent(necessaryOnly);
  };

  const savePreferences = () => {
    saveConsent(preferences);
  };

  // Cookie banner content
  const bannerContent = (
    <div className="cookie-consent-content">
      <div className="cookie-consent-icon">
        <Cookie size={24} />
      </div>
      <div className="cookie-consent-text">
        <h2 className="cookie-consent-title">{cookieTitle}</h2>
        <p className="cookie-consent-description">{cookieDescription}</p>
        <Link 
          href="/privacy" 
          variant="underline"
          size="sm"
          padding="none"
          aria-label="Read our privacy policy"
        >
          {privacyPolicyLabel}
        </Link>
      </div>
    </div>
  );

  // Cookie banner actions
  const bannerActions = (
    <div className="cookie-consent-actions">
      <Button
        variant="ghost"
        size="sm"
        fullWidth={isMobile}
        onClick={() => {
          // On desktop, keep drawer open if persistent
          if (!isMobile && !persistent) {
            setShow(false);
          }
          setShowPreferences(true);
        }}
        aria-label="Manage cookie preferences"
      >
        <Settings size={16} className="mr-2" />
        Preferences
      </Button>
      <Button
        variant="secondary"
        size="sm"
        fullWidth={isMobile}
        onClick={acceptNecessary}
        aria-label="Accept necessary cookies only"
      >
        Necessary Only
      </Button>
      <Button
        variant="primary"
        size="sm"
        fullWidth={isMobile}
        onClick={acceptAll}
        aria-label="Accept all cookies"
      >
        Accept All
      </Button>
    </div>
  );

  // Preferences content (shared between modal)
  const preferencesContent = (
    <div className="cookie-preferences-content">
      <p className="cookie-preferences-intro">
        We use different types of cookies to optimize your experience. 
        Click on the categories below to learn more and change your preferences.
      </p>

      {/* Necessary Cookies */}
      <div className="cookie-category">
        <FormFieldCheckbox
          checkboxLabel="Necessary Cookies"
          rightContent={<span className="cookie-category-badge">Always Enabled</span>}
          checked={preferences.necessary}
          disabled={true}
          helperText="These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas."
          gap="md"
          testId="necessary-cookies"
        />
      </div>

      {/* Analytics Cookies */}
      <div className="cookie-category">
        <FormFieldCheckbox
          checkboxLabel="Analytics Cookies"
          checked={preferences.analytics}
          onChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
          helperText="These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously."
          gap="md"
          testId="analytics-cookies"
        />
      </div>

      {/* Marketing Cookies */}
      <div className="cookie-category">
        <FormFieldCheckbox
          checkboxLabel="Marketing Cookies"
          checked={preferences.marketing}
          onChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
          helperText="These cookies are used to track visitors across websites to display ads that are relevant and engaging for individual users."
          gap="md"
          testId="marketing-cookies"
        />
      </div>

      {/* Personalization Cookies */}
      <div className="cookie-category">
        <FormFieldCheckbox
          checkboxLabel="Personalization Cookies"
          checked={preferences.personalization}
          onChange={(checked) => setPreferences({ ...preferences, personalization: checked })}
          helperText="These cookies allow the website to remember choices you make to provide enhanced, personalized features."
          gap="md"
          testId="personalization-cookies"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Cookie Banner - Modal on mobile, Drawer on desktop */}
      {isMobile ? (
        <Modal
          isOpen={show}
          onClose={() => setShow(false)}
          title={cookieTitle}
          size="lg"
          position="center"
          showCloseButton={false}
          closeOnOverlayClick={false}
          closeOnEscape={false}
          preventScroll={!lockScroll}
          persistent={true}
          validationType="persistent"
          onValidate={() => {
            // Don't allow closing without making a choice
            return localStorage.getItem('cookie-consent') !== null;
          }}
          classNames={{
            content: 'cookie-consent-bg'
          }}
          testId="cookie-consent-mobile"
          footer={bannerActions}
        >
          <div className="cookie-consent-mobile-content">
            <div className="cookie-consent-icon-mobile">
              <Cookie size={32} />
            </div>
            <p className="cookie-consent-description">{cookieDescription}</p>
            <Link 
              href="/privacy" 
              variant="underline"
              size="sm"
              padding="none"
              aria-label="Read our privacy policy"
            >
              {privacyPolicyLabel}
            </Link>
          </div>
        </Modal>
      ) : (
        <Drawer
          isOpen={show}
          onClose={() => {}} // Don't allow closing without making a choice
          position="bottom"
          size={bannerSize}
          showOverlay={false}
          closeOnOverlay={false}
          closeOnEsc={false}
          showCloseButton={false}
          showHeader={false}
          persistent={persistent}
          padding="none"
          lockScroll={lockScroll}
          classNames={{
            drawer: 'cookie-consent-bg cookie-consent-border-top cookie-consent-shadow'
          }}
          testId="cookie-consent-desktop"
        >
          <div className="cookie-consent-container">
            {bannerContent}
            {bannerActions}
          </div>
        </Drawer>
      )}

      {/* Preferences Modal (same for both mobile and desktop) */}
      <Modal
        isOpen={showPreferences}
        onClose={() => {
          setShowPreferences(false);
          // The persistent modal will automatically reopen if needed
          if (!localStorage.getItem('cookie-consent')) {
            setShow(true);
          }
        }}
        title="Cookie Preferences"
        size="lg"
        showCloseButton={true}
        closeOnOverlayClick={true}
        closeOnEscape={true}
        classNames={{
          content: 'cookie-preferences-bg'
        }}
        testId="cookie-preferences"
        footer={
          <>
            <Button
              variant="secondary"
              fullWidth={isMobile}
              onClick={() => {
                setShowPreferences(false);
                // The persistent modal will automatically reopen if needed
                if (!localStorage.getItem('cookie-consent')) {
                  setShow(true);
                }
              }}
              aria-label="Cancel changes"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              fullWidth={isMobile}
              onClick={savePreferences}
              aria-label="Save cookie preferences"
            >
              Save Preferences
            </Button>
          </>
        }
      >
        {preferencesContent}
      </Modal>
    </>
  );
}