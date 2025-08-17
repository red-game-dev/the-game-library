/**
 * Design System Type Definitions
 * Simple types for our design tokens
 */

import { rawColors, semanticColors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { borderRadius, shadows } from './effects';

// Basic type exports for TypeScript autocomplete
export type RawColorKey = keyof typeof rawColors;
export type SemanticColorKey = keyof typeof semanticColors;
export type SpacingKey = keyof typeof spacing;
export type FontSizeKey = keyof typeof typography.fontSize;
export type FontWeightKey = keyof typeof typography.fontWeight;
export type BorderRadiusKey = keyof typeof borderRadius;
export type ShadowKey = keyof typeof shadows;
