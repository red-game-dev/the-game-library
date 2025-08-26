/**
 * Shared UI Type Definitions
 * Common types used across multiple components and stores
 */

/**
 * Common size options used by multiple UI components
 * Used by: Button, Badge, Card, Input, Modal, Alert, etc.
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Common status/severity levels used across the app
 * Used by: Alert, Toast, Badge, Notifications, etc.
 */
export type StatusVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Image quality settings
 * Used by: Preferences store, Image component, GameCard
 */
export type ImageQuality = 'low' | 'medium' | 'high' | 'auto';

/**
 * Performance preset levels
 * Used by: Preferences store, Settings UI
 */
export type PerformancePreset = 'low' | 'medium' | 'high' | 'ultra';

/**
 * Accessibility preset options
 * Used by: Preferences store, Settings UI, App configuration
 */
export type AccessibilityPreset = 'none' | 'reduced-motion' | 'high-contrast' | 'screen-reader';

/**
 * Theme options
 * Used by: Theme store, Theme provider, Settings UI
 */
export type ThemeOption = 'dark' | 'light' | 'neon' | 'gold' | 'system';

/**
 * Common position options
 * Used by: Tooltip, Popover, Dropdown, Modal
 */
export type Position = 'top' | 'bottom' | 'left' | 'right' | 'center' | 
                       'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' |
                       'left-start' | 'left-end' | 'right-start' | 'right-end';