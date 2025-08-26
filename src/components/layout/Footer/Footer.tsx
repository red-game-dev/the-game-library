/**
 * Footer Component
 * Site footer with theme switcher, links, and company information
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import '@/styles/components/layout/footer.css';
import { 
  Sun, 
  Moon, 
  Sparkles, 
  Star,
  Zap,
  Palette,
  Github,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Shield,
  Heart,
  Gamepad2
} from 'lucide-react';
import { useThemeStore } from '@/lib/core/frontend/stores/theme/useThemeStore';
import { ROUTES, SOCIAL_LINKS, getRouteConfig } from '@/lib/core/config/constants/routes.constants';
import '@/styles/components/layout/footer.css';
import { ThemeOption } from '@/lib/core/shared/types';

export interface FooterProps {
  /** Show theme switcher */
  showThemeSwitcher?: boolean;
  /** Show social links */
  showSocials?: boolean;
  /** Show newsletter signup */
  showNewsletter?: boolean;
  /** Custom class name */
  className?: string;
  /** Compact mode for minimal footer */
  compact?: boolean;
}

interface FooterLink {
  label: string;
  href: string;
  badge?: {
    text: string;
    variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    icon?: React.ReactNode;
  };
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const Footer: React.FC<FooterProps> = ({
  showThemeSwitcher = true,
  showSocials = true,
  showNewsletter = true,
  className = '',
  compact = false,
}) => {
  const { theme, setTheme } = useThemeStore();
  const currentYear = new Date().getFullYear();

  // Helper function to get badge for route
  const getRouteBadge = (path: string): { text: string; variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'; icon?: React.ReactNode } | undefined => {
    const config = getRouteConfig(path);
    if (config?.comingSoon) return { text: 'SOON', variant: 'primary', icon: <Sparkles className="w-2 h-2" /> };
    return undefined;
  };

  // Footer navigation sections
  const footerSections: FooterSection[] = [
    {
      title: 'Games',
      links: [
        { label: 'All Games', href: ROUTES.GAMES },
        { label: 'New Releases', href: `${ROUTES.GAMES}?new=true`, badge: { text: 'NEW', variant: 'success' as const, icon: <Star className="w-2 h-2" /> } },
        { label: 'Popular', href: `${ROUTES.GAMES}?hot=true`, badge: { text: 'HOT', variant: 'error' as const, icon: <Zap className="w-2 h-2" /> } },
        { label: 'Slots', href: `${ROUTES.GAMES}?types=slots` },
        { label: 'Table Games', href: `${ROUTES.GAMES}?types=table` },
        { label: 'Live Casino', href: `${ROUTES.GAMES}?types=live` },
        { label: 'Jackpot Games', href: `${ROUTES.GAMES}?types=jackpot` },
        { label: 'Instant Win', href: `${ROUTES.GAMES}?types=instant` },
      ],
    },
    {
      title: 'Features',
      links: [
        { label: 'VIP Program', href: ROUTES.VIP },
        { label: 'Promotions', href: ROUTES.PROMOTIONS },
        { label: 'Tournaments', href: ROUTES.TOURNAMENTS },
        { label: 'Trending', href: ROUTES.TRENDING },
        { label: 'Community', href: ROUTES.COMMUNITY },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: ROUTES.HELP },
        { label: 'Contact Us', href: ROUTES.CONTACT || '#' },
        { label: 'FAQs', href: ROUTES.FAQ || '#' },
        { label: 'Terms of Service', href: ROUTES.TERMS || '#' },
        { label: 'Privacy Policy', href: ROUTES.PRIVACY || '#' },
        { label: 'Play Safe', href: ROUTES.RESPONSIBLE_GAMING || '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: ROUTES.ABOUT || '#' },
        { label: 'Careers', href: ROUTES.CAREERS || '#' },
        { label: 'Press', href: ROUTES.PRESS || '#' },
        { label: 'Partners', href: ROUTES.PARTNERS || '#' },
        { label: 'Affiliates', href: ROUTES.AFFILIATES || '#' },
      ],
    },
  ];

  // Social media links
  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: SOCIAL_LINKS.TWITTER, label: 'Twitter' },
    { icon: <Facebook className="w-5 h-5" />, href: SOCIAL_LINKS.FACEBOOK, label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, href: SOCIAL_LINKS.INSTAGRAM, label: 'Instagram' },
    { icon: <Youtube className="w-5 h-5" />, href: SOCIAL_LINKS.YOUTUBE, label: 'YouTube' },
    { icon: <Github className="w-5 h-5" />, href: SOCIAL_LINKS.GITHUB, label: 'GitHub' },
  ];

  // Theme options
  const themeOptions = [
    { value: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
    { value: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
    { value: 'neon', icon: <Sparkles className="w-4 h-4" />, label: 'Neon' },
    { value: 'gold', icon: <Palette className="w-4 h-4" />, label: 'Gold' },
  ];

  // Compact footer for minimal display
  if (compact) {
    return (
      <footer className={`footer footer-compact ${className}`}>
        <div className="footer-container">
          <div className="footer-compact-content">
            <div className="footer-compact-left">
              <p className="footer-copyright">
                © {currentYear} The Game Library. All rights reserved.
              </p>
            </div>
            {showThemeSwitcher && (
              <div className="footer-compact-right">
                <div className="footer-theme-switcher">
                  {themeOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={theme === option.value ? 'primary' : 'ghost'}
                      size="sm"
                      iconOnly
                      onClick={() => setTheme(option.value as ThemeOption)}
                      aria-label={`Switch to ${option.label} theme`}
                    >
                      {option.icon}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`footer ${className}`}>
      <div className="footer-container">
        {/* Newsletter Section */}
        {showNewsletter && (
          <div className="footer-newsletter">
            <div className="footer-newsletter-content">
              <div className="footer-newsletter-text">
                <h3 className="footer-newsletter-title">
                  <Mail className="w-5 h-5" />
                  Stay in the Game
                </h3>
                <p className="footer-newsletter-description">
                  Get exclusive offers, new game announcements, and gaming tips delivered to your inbox.
                </p>
              </div>
              <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="footer-newsletter-input"
                  aria-label="Email for newsletter"
                />
                <Button type="submit" variant="primary" size="md">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Logo and Description */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Gamepad2 className="w-8 h-8" />
              <span className="footer-logo-text">The Game Library</span>
            </div>
            <p className="footer-brand-description">
              Your ultimate destination for premium gaming entertainment. 
              Discover, play, and win with thousands of exciting games.
            </p>
            {showSocials && (
              <div className="footer-socials">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="footer-social-link"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="footer-links">
            {footerSections.map((section) => (
              <div key={section.title} className="footer-section">
                <h4 className="footer-section-title">{section.title}</h4>
                <ul className="footer-section-links">
                  {section.links.map((link) => {
                    const badge = link.badge || getRouteBadge(link.href);
                    return (
                      <li key={link.label}>
                        <Link href={link.href} className="footer-link">
                          <span>{link.label}</span>
                          {badge && (
                            <Badge 
                              variant={badge.variant} 
                              size="xs"
                              icon={badge.icon}
                              gap="sm"
                            >
                              {badge.text}
                            </Badge>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Theme Switcher */}
        {showThemeSwitcher && (
          <div className="footer-theme">
            <div className="footer-theme-content">
              <span className="footer-theme-label">Choose Theme:</span>
              <div className="footer-theme-buttons">
                {themeOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={theme === option.value ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setTheme(option.value as ThemeOption)}
                    className="footer-theme-button"
                  >
                    {option.icon}
                    <span className="footer-theme-button-label">{option.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-bottom-left">
              <p className="footer-copyright">
                © {currentYear} The Game Library. All rights reserved.
              </p>
              <div className="footer-legal-links">
                <Link href={ROUTES.TERMS || '#'} className="footer-legal-link">Terms</Link>
                <span className="footer-legal-separator">•</span>
                <Link href={ROUTES.PRIVACY || '#'} className="footer-legal-link">Privacy</Link>
                <span className="footer-legal-separator">•</span>
                <Link href={ROUTES.COOKIES || '#'} className="footer-legal-link">Cookies</Link>
              </div>
            </div>
            <div className="footer-bottom-right">
              <div className="footer-badges">
                <div className="footer-badge">
                  <Shield className="w-4 h-4" />
                  <span>Secure Gaming</span>
                </div>
                <div className="footer-badge">
                  <Heart className="w-4 h-4" />
                  <span>Fair Play</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-notice">
          <p className="footer-notice-text">
            🎮 Play responsibly. Gaming should be fun. If you need help, visit our responsible gaming page.
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;