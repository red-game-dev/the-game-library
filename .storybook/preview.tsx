import React from 'react'
import type { Preview } from '@storybook/nextjs'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
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
          value: '#030712',
        },
        {
          name: 'light', 
          value: '#ffffff',
        },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'dark';
      
      React.useEffect(() => {
        const root = document.documentElement;
        root.className = theme;
      }, [theme]);
      
      return (
        <div className={`${theme} min-h-screen bg-background text-foreground`}>
          <div className="p-4">
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;