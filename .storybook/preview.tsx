import React from 'react'
import type { Preview } from '@storybook/nextjs'
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0a0e1a',
        },
        {
          name: 'light', 
          value: '#f8f9fb',
        },
      ],
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
        query: {},
        push: () => Promise.resolve(),
        replace: () => Promise.resolve(),
        forward: () => Promise.resolve(),
        back: () => Promise.resolve(),
        prefetch: () => Promise.resolve(),
        refresh: () => Promise.resolve(),
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark', 'neon', 'gold'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Check if story has forceTheme parameter
      const forceTheme = context.parameters.forceTheme;
      const theme = forceTheme || context.globals.theme || 'dark';
      
      const background = context.parameters.backgrounds?.values?.find(
        bg => bg.name === context.globals.backgrounds?.value
      );
      const backgroundName = background?.name || context.parameters.backgrounds?.default || 'dark';
      
      React.useEffect(() => {
        const root = document.documentElement;
        // Set data-theme attribute for our CSS theme system
        root.setAttribute('data-theme', theme);
        // Set background indicator for CSS overrides
        root.setAttribute('data-storybook-bg', backgroundName);
        // Also add class for compatibility
        root.className = theme;
      }, [theme, backgroundName]);
      
      // Determine if we need to force text colors based on background
      // This solves the issue where dark theme on light background has invisible text
      const forceTextColor = React.useMemo(() => {
        const isDarkTheme = theme === 'dark';
        const isLightBackground = backgroundName === 'light';
        const isLightTheme = theme === 'light';
        const isDarkBackground = backgroundName === 'dark';
        
        if (isDarkTheme && isLightBackground) {
          // Dark theme on light background - force dark text
          return '#0f172a';
        } else if (isLightTheme && isDarkBackground) {
          // Light theme on dark background - force light text
          return '#f1f5f9';
        }
        // Otherwise use theme's default text color
        return 'var(--color-text)';
      }, [theme, backgroundName]);
      
      return (
        <div style={{ 
          minHeight: '100vh',
          backgroundColor: 'var(--color-background)',
          color: forceTextColor,
          transition: 'background-color 0.3s ease, color 0.3s ease'
        }}>
          <div className="p-2">
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;