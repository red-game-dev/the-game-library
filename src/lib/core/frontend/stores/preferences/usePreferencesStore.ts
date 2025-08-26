/**
 * Preferences Store
 * Manages user preferences and settings
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { ImageQuality, PerformancePreset, AccessibilityPreset } from '@/lib/core/shared/types';

interface PreferencesState {
  // Accessibility preferences
  reducedMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  screenReaderMode: boolean;
  
  // Sound preferences
  soundEnabled: boolean;
  soundVolume: number;
  musicEnabled: boolean;
  musicVolume: number;
  
  // Notification preferences
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  
  // Display preferences
  compactMode: boolean;
  showGameDescriptions: boolean;
  showProviderLogos: boolean;
  autoPlayVideos: boolean;
  imageQuality: ImageQuality;
  
  // Performance preferences
  enableAnimations: boolean;
  enableTransitions: boolean;
  enableParticles: boolean;
  enableBlur: boolean;
  
  // Privacy preferences
  analyticsEnabled: boolean;
  cookiesAccepted: boolean;
  personalizedAds: boolean;
  
  // Actions
  setPreference: <K extends keyof PreferencesState>(key: K, value: PreferencesState[K]) => void;
  toggleSound: () => void;
  toggleMusic: () => void;
  toggleNotifications: () => void;
  toggleAnimations: () => void;
  resetPreferences: () => void;
  applyAccessibilityPreset: (preset: AccessibilityPreset) => void;
  applyPerformancePreset: (preset: PerformancePreset) => void;
}

const initialState: Omit<PreferencesState, 'setPreference' | 'toggleSound' | 'toggleMusic' | 'toggleNotifications' | 'toggleAnimations' | 'resetPreferences' | 'applyAccessibilityPreset' | 'applyPerformancePreset'> = {
  // Accessibility
  reducedMotion: false,
  highContrast: false,
  largeText: false,
  screenReaderMode: false,
  
  // Sound
  soundEnabled: true,
  soundVolume: 0.7,
  musicEnabled: false,
  musicVolume: 0.5,
  
  // Notifications
  notificationsEnabled: true,
  emailNotifications: false,
  pushNotifications: false,
  
  // Display
  compactMode: false,
  showGameDescriptions: true,
  showProviderLogos: true,
  autoPlayVideos: false,
  imageQuality: 'auto',
  
  // Performance
  enableAnimations: true,
  enableTransitions: true,
  enableParticles: true,
  enableBlur: true,
  
  // Privacy
  analyticsEnabled: false,
  cookiesAccepted: false,
  personalizedAds: false,
};

export const usePreferencesStore = create<PreferencesState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        
        setPreference: (key, value) => {
          set({ [key]: value } as Partial<PreferencesState>, false, `setPreference:${key}`);
          
          // Apply side effects for certain preferences
          if (key === 'reducedMotion') {
            document.documentElement.classList.toggle('reduced-motion', value as boolean);
          }
          if (key === 'highContrast') {
            document.documentElement.classList.toggle('high-contrast', value as boolean);
          }
          if (key === 'largeText') {
            document.documentElement.classList.toggle('large-text', value as boolean);
          }
        },
        
        toggleSound: () => {
          set(state => ({ soundEnabled: !state.soundEnabled }), false, 'toggleSound');
        },
        
        toggleMusic: () => {
          set(state => ({ musicEnabled: !state.musicEnabled }), false, 'toggleMusic');
        },
        
        toggleNotifications: () => {
          set(state => ({ notificationsEnabled: !state.notificationsEnabled }), false, 'toggleNotifications');
        },
        
        toggleAnimations: () => {
          set(state => ({ enableAnimations: !state.enableAnimations }), false, 'toggleAnimations');
        },
        
        resetPreferences: () => {
          set(initialState, false, 'resetPreferences');
          document.documentElement.classList.remove('reduced-motion', 'high-contrast', 'large-text');
        },
        
        applyAccessibilityPreset: (preset) => {
          switch (preset) {
            case 'none':
              set({
                reducedMotion: false,
                highContrast: false,
                largeText: false,
                screenReaderMode: false,
              }, false, 'applyAccessibilityPreset:none');
              break;
            case 'reduced-motion':
              set({
                reducedMotion: true,
                enableAnimations: false,
                enableTransitions: false,
                enableParticles: false,
                autoPlayVideos: false,
              }, false, 'applyAccessibilityPreset:reduced-motion');
              break;
            case 'high-contrast':
              set({
                highContrast: true,
                enableBlur: false,
              }, false, 'applyAccessibilityPreset:high-contrast');
              break;
            case 'screen-reader':
              set({
                screenReaderMode: true,
                reducedMotion: true,
                enableAnimations: false,
                autoPlayVideos: false,
              }, false, 'applyAccessibilityPreset:screen-reader');
              break;
          }
        },
        
        applyPerformancePreset: (preset) => {
          switch (preset) {
            case 'low':
              set({
                enableAnimations: false,
                enableTransitions: false,
                enableParticles: false,
                enableBlur: false,
                imageQuality: 'low',
                autoPlayVideos: false,
              }, false, 'applyPerformancePreset:low');
              break;
            case 'medium':
              set({
                enableAnimations: true,
                enableTransitions: true,
                enableParticles: false,
                enableBlur: false,
                imageQuality: 'medium',
                autoPlayVideos: false,
              }, false, 'applyPerformancePreset:medium');
              break;
            case 'high':
              set({
                enableAnimations: true,
                enableTransitions: true,
                enableParticles: true,
                enableBlur: true,
                imageQuality: 'high',
                autoPlayVideos: false,
              }, false, 'applyPerformancePreset:high');
              break;
            case 'ultra':
              set({
                enableAnimations: true,
                enableTransitions: true,
                enableParticles: true,
                enableBlur: true,
                imageQuality: 'high',
                autoPlayVideos: true,
              }, false, 'applyPerformancePreset:ultra');
              break;
          }
        },
      }),
      {
        name: 'preferences-store',
      }
    ),
    {
      name: 'PreferencesStore',
    }
  )
);

// Initialize preferences on mount
if (typeof window !== 'undefined') {
  const store = usePreferencesStore.getState();
  if (store.reducedMotion) {
    document.documentElement.classList.add('reduced-motion');
  }
  if (store.highContrast) {
    document.documentElement.classList.add('high-contrast');
  }
  if (store.largeText) {
    document.documentElement.classList.add('large-text');
  }
  
  // Check system preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches && !store.reducedMotion) {
    store.setPreference('reducedMotion', true);
  }
}