/**
 * Header Component
 * Main navigation header with responsive drawer for mobile
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Link } from '@/components/ui/Link';
import { ROUTES, ROUTE_VARIANTS } from '@/lib/core/config/constants/routes.constants';
import { 
  Menu, 
  X, 
  Home,
  Gamepad2,
  Trophy,
  Star,
  TrendingUp,
  Sparkles,
  Search,
  Moon,
  Sun,
  Palette
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Drawer } from '@/components/ui/Drawer';
import { useThemeStore } from '@/lib/core/frontend/stores/theme/useThemeStore';
import { useNavigationStore } from '@/lib/core/frontend/stores/navigation/useNavigationStore';
import { useFavoritesStore } from '@/lib/core/frontend/stores/favorites/useFavoritesStore';
import '@/styles/components/layout/header.css';
import { ProfileCard } from '@/components/features/ProfileCard';

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  badgeIcon?: React.ReactNode;
  badgeVariant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  isNew?: boolean;
  isHot?: boolean;
  children?: NavigationItem[];
}

export interface HeaderProps {
  /** Show user section */
  showUser?: boolean;
  /** User data for authenticated state */
  user?: {
    name: string;
    avatar?: string;
    balance?: number;
  };
  /** Custom navigation items */
  navigationItems?: NavigationItem[];
  /** Show search button */
  showSearch?: boolean;
  /** Show theme switcher */
  showThemeSwitcher?: boolean;
  /** Fixed header */
  fixed?: boolean;
  /** Transparent header */
  transparent?: boolean;
  /** Custom logo */
  logo?: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Test ID */
  testId?: string;
}

// Default navigation items
const defaultNavItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: <Home className="w-4 h-4" />
  },
  {
    id: 'games',
    label: 'Games',
    href: '/games',
    icon: <Gamepad2 className="w-4 h-4" />,
    children: [
      { id: 'all-games', label: 'All Games', href: '/games' },
      { id: 'new-games', label: 'New Games', href: '/games?new=true', isNew: true },
      { id: 'popular', label: 'Popular', href: '/games?sort=popular' },
      { id: 'slots', label: 'Slots', href: '/games?types=slots' },
      { id: 'live', label: 'Live Casino', href: '/games?types=live', isHot: true },
      { id: 'table', label: 'Table Games', href: '/games?types=table' },
    ]
  },
  {
    id: 'promotions',
    label: 'Promotions',
    href: '/promotions',
    icon: <Star className="w-4 h-4" />,
    badge: '3'
  },
  {
    id: 'tournaments',
    label: 'Tournaments',
    href: '/tournaments',
    icon: <Trophy className="w-4 h-4" />
  },
  {
    id: 'trending',
    label: 'Trending',
    href: '/games?hot=true',
    icon: <TrendingUp className="w-4 h-4" />,
    isHot: true
  }
];

/**
 * Header Component
 */
export const Header: React.FC<HeaderProps> = ({
  showUser = true,
  user,
  navigationItems = defaultNavItems,
  showSearch = true,
  showThemeSwitcher = true,
  fixed = true,
  transparent = false,
  logo,
  className = '',
  testId = 'header'
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Store hooks
  const { theme, setTheme } = useThemeStore();
  const { setMobileMenuOpen } = useNavigationStore();
  const favoriteCount = useFavoritesStore(state => state.getFavoriteCount());
  
  /**
   * Handle scroll to add background to transparent header
   */
  useEffect(() => {
    if (!transparent) return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [transparent]);
  
  /**
   * Handle drawer toggle
   */
  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen(prev => !prev);
    setMobileMenuOpen(!isDrawerOpen);
  }, [isDrawerOpen, setMobileMenuOpen]);
  
  /**
   * Handle navigation
   */
  const handleNavigate = useCallback((href: string) => {
    router.push(href);
    setIsDrawerOpen(false);
    setActiveDropdown(null);
  }, [router]);
  
  /**
   * Handle theme change
   */
  const handleThemeChange = useCallback(() => {
    const themes = ['light', 'dark', 'neon', 'gold'] as const;
    // Handle system theme by defaulting to light for cycling
    const currentTheme = theme === 'system' ? 'light' : theme;
    const currentIndex = themes.indexOf(currentTheme as typeof themes[number]);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [theme, setTheme]);
  
  /**
   * Check if link is active
   */
  const isActiveLink = useCallback((href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  }, [pathname]);
  
  /**
   * Get theme icon
   */
  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className="w-4 h-4" />;
      case 'neon':
        return <Sparkles className="w-4 h-4" />;
      case 'gold':
        return <Sun className="w-4 h-4 text-yellow-500" />;
      default:
        return <Sun className="w-4 h-4" />;
    }
  };
  
  return (
    <>
      {/* Skip Navigation Link for Accessibility */}
      <Link 
        href="#main-content" 
        className="skip-link"
      >
        Skip to main content
      </Link>
      
      <header
        className={`
          header
          ${fixed ? 'header-fixed' : ''}
          ${transparent && !isScrolled ? 'header-transparent' : ''}
          ${isScrolled ? 'header-scrolled' : ''}
          ${className}
        `}
        data-testid={testId}
      >
        <div className="header-container">
          {/* Logo */}
          <div className="header-logo">
            {logo || (
              <Link href="/" className="header-logo-link">
                <Gamepad2 className="header-logo-icon" />
                <span className="header-logo-text">Game Library</span>
              </Link>
            )}
          </div>
          
          {/* Desktop Navigation */}
          <nav className="header-nav">
            {navigationItems.map(item => (
              <div
                key={item.id}
                className="header-nav-item"
                onMouseEnter={() => item.children && setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <>
                    <Link
                      href={item.href}
                      className={`header-nav-link ${isActiveLink(item.href) ? 'header-nav-link-active' : ''}`}
                      onMouseEnter={() => setActiveDropdown(item.id)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {item.badge && (
                        <Badge 
                          variant={item.badgeVariant || 'primary'} 
                          size="sm"
                          icon={item.badgeIcon}
                          gap="sm"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {item.isNew && (
                        <Badge variant="success" size="sm" gap="sm">NEW</Badge>
                      )}
                      {item.isHot && (
                        <Badge variant="error" size="sm" gap="sm">HOT</Badge>
                      )}
                    </Link>
                    
                    {/* Dropdown Menu */}
                    {activeDropdown === item.id && (
                      <div className="header-dropdown">
                        {item.children.map(child => (
                          <Link
                            key={child.id}
                            href={child.href}
                            className={`header-dropdown-item ${isActiveLink(child.href) ? 'header-dropdown-item-active' : ''}`}
                          >
                            {child.icon}
                            <span>{child.label}</span>
                            {child.isNew && (
                              <Badge variant="success" size="sm" gap="sm">NEW</Badge>
                            )}
                            {child.isHot && (
                              <Badge variant="error" size="sm" gap="sm">HOT</Badge>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`header-nav-link ${isActiveLink(item.href) ? 'header-nav-link-active' : ''}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant={item.badgeVariant || 'primary'} 
                        size="sm"
                        icon={item.badgeIcon}
                        gap="sm"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {item.isNew && (
                      <Badge variant="success" size="sm" gap="sm">NEW</Badge>
                    )}
                    {item.isHot && (
                      <Badge variant="error" size="sm" gap="sm">HOT</Badge>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          
          {/* Right Section */}
          <div className="header-actions">
            {/* Search Button */}
            {showSearch && (
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                onClick={() => router.push(ROUTES.GAMES)}
                className="header-action-btn"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </Button>
            )}
            
            {/* Favorites */}
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              onClick={() => router.push(ROUTE_VARIANTS.GAMES_WITH_FAVORITES)}
              className="header-action-btn"
              aria-label="Favorites"
            >
              <Star className="w-4 h-4" />
              {favoriteCount > 0 && (
                <Badge variant="error" size="sm" className="header-action-badge">
                  {favoriteCount}
                </Badge>
              )}
            </Button>
            
            {/* Theme Switcher */}
            {showThemeSwitcher && (
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                onClick={handleThemeChange}
                className="header-action-btn"
                aria-label="Change theme"
              >
                {getThemeIcon()}
              </Button>
            )}
            
            {/* User Section */}
            {showUser && (
              <div className="header-user">
                {user ? (
                  <ProfileCard
                    name={user.name}
                    avatar={user.avatar}
                    balance={user.balance}
                    variant="compact"
                    showBalanceChange={false}
                    onClick={() => router.push(ROUTES.PROFILE)}
                  />
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(ROUTES.LOGIN)}
                    >
                      Login
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => router.push(ROUTES.REGISTER)}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              onClick={toggleDrawer}
              className="header-menu-btn"
              aria-label="Menu"
            >
              {isDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Mobile Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        position="right"
        size="md"
        showCloseButton
        closeOnOverlay
        closeOnEsc
        lockScroll
        className="header-drawer"
        header={
          <div className="header-drawer-header">
              {user ? (
                <ProfileCard
                  name={user.name}
                  avatar={user.avatar}
                  balance={user.balance}
                  variant="drawer"
                  showBalanceChange={true}
                  previousBalance={user.balance ? user.balance - (Math.random() - 0.5) * 100 : undefined}
                  onClick={() => {
                    router.push(ROUTES.PROFILE);
                    toggleDrawer();
                  }}
                />
              ) : (
                <div className="header-drawer-auth">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => {
                      router.push(ROUTES.LOGIN);
                      toggleDrawer();
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => {
                      router.push(ROUTES.REGISTER);
                      toggleDrawer();
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
          </div>
        }
        footer={
          <div className="header-drawer-footer">
            <div className="header-drawer-actions">
              {showThemeSwitcher && (
                <div className="header-drawer-theme">
                  <span className="header-drawer-theme-label">Theme:</span>
                  <div className="header-drawer-theme-buttons">
                    <Button
                      variant={theme === 'light' ? 'primary' : 'ghost'}
                      size="sm"
                      iconOnly
                      onClick={() => setTheme('light')}
                    >
                      <Sun className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={theme === 'dark' ? 'primary' : 'ghost'}
                      size="sm"
                      iconOnly
                      onClick={() => setTheme('dark')}
                    >
                      <Moon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={theme === 'neon' ? 'primary' : 'ghost'}
                      size="sm"
                      iconOnly
                      onClick={() => setTheme('neon')}
                    >
                      <Sparkles className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={theme === 'gold' ? 'primary' : 'ghost'}
                      size="sm"
                      iconOnly
                      onClick={() => setTheme('gold')}
                    >
                      <Palette className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        }
      >
        {/* Drawer Navigation */}
        <nav className="header-drawer-nav">
              {navigationItems.map(item => (
                <div key={item.id} className="header-drawer-nav-item">
                  <Link
                    href={item.href}
                    className={`header-drawer-nav-link ${isActiveLink(item.href) ? 'header-drawer-nav-link-active' : ''}`}
                    onClick={() => {
                      handleNavigate(item.href);
                      toggleDrawer();
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant={item.badgeVariant || 'primary'} 
                        size="sm"
                        icon={item.badgeIcon}
                        gap="sm"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {item.isNew && (
                      <Badge variant="success" size="sm" gap="sm">NEW</Badge>
                    )}
                    {item.isHot && (
                      <Badge variant="error" size="sm" gap="sm">HOT</Badge>
                    )}
                  </Link>
                  
                  {/* Sub-navigation */}
                  {item.children && (
                    <div className="header-drawer-subnav">
                      {item.children.map(child => (
                        <Link
                          key={child.id}
                          href={child.href}
                          className={`header-drawer-subnav-link ${isActiveLink(child.href) ? 'header-drawer-subnav-link-active' : ''}`}
                          onClick={() => {
                            handleNavigate(child.href);
                            toggleDrawer();
                          }}
                        >
                          {child.icon}
                          <span>{child.label}</span>
                          {child.isNew && (
                            <Badge variant="success" size="sm" gap="sm">NEW</Badge>
                          )}
                          {child.isHot && (
                            <Badge variant="error" size="sm" gap="sm">HOT</Badge>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
        </nav>
      </Drawer>
    </>
  );
};

Header.displayName = 'Header';

export default Header;