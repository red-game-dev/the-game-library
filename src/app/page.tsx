'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <main className="min-h-screen bg-background theme-transition">
      {/* Hero Section */}
      <section className="container py-16">
        <div className="text-center">
          <h1 className="text-5xl font-black mb-6 text-gradient">
            The Game Library
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Design system foundation ready for building the Game Library UI.
          </p>
          
          {/* Theme Switcher */}
          <div className="mt-8 flex gap-4 justify-center">
            <button 
              onClick={() => handleThemeChange('dark')}
              className={`px-4 py-2 rounded-lg transition-all ${
                theme === 'dark' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface text-secondary hover:bg-surface-elevated'
              }`}
            >
              Dark Theme
            </button>
            <button 
              onClick={() => handleThemeChange('light')}
              className={`px-4 py-2 rounded-lg transition-all ${
                theme === 'light' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface text-secondary hover:bg-surface-elevated'
              }`}
            >
              Light Theme
            </button>
            <button 
              onClick={() => handleThemeChange('neon')}
              className={`px-4 py-2 rounded-lg transition-all ${
                theme === 'neon' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface text-secondary hover:bg-surface-elevated'
              }`}
            >
              Neon Theme
            </button>
            <button 
              onClick={() => handleThemeChange('gold')}
              className={`px-4 py-2 rounded-lg transition-all ${
                theme === 'gold' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface text-secondary hover:bg-surface-elevated'
              }`}
            >
              Gold Theme
            </button>
          </div>
        </div>
      </section>

      {/* Design System Showcase */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-12">Design System Foundation</h2>
        
        <div className="grid gap-12">
          {/* Typography */}
          <div className="p-8 bg-surface rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Typography Scale</h3>
            <div className="flex flex-col gap-3">
              <p className="text-6xl font-black">Display</p>
              <p className="text-5xl font-bold">Heading 1</p>
              <p className="text-4xl font-bold">Heading 2</p>
              <p className="text-3xl font-semibold">Heading 3</p>
              <p className="text-2xl font-semibold">Heading 4</p>
              <p className="text-xl font-medium">Heading 5</p>
              <p className="text-lg">Large body text</p>
              <p className="text-base">Regular body text</p>
              <p className="text-sm text-secondary">Small text</p>
              <p className="text-xs text-tertiary">Extra small</p>
            </div>
          </div>

          {/* Color Palette */}
          <div className="p-8 bg-surface rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Color System</h3>
            <div className="grid grid-cols-6 gap-4 mb-8">
              <div className="text-center">
                <div className="h-24 bg-primary rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Primary</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-accent rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Accent</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-success rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Success</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-error rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Error</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-warning rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Warning</p>
              </div>
              <div className="text-center">
                <div className="h-24 bg-info rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Info</p>
              </div>
            </div>

            <h4 className="text-lg font-medium mb-4">Gradients</h4>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-24 bg-gradient-primary rounded-lg"></div>
              <div className="h-24 bg-gradient-accent rounded-lg"></div>
              <div className="h-24 bg-gradient-gold rounded-lg"></div>
              <div className="h-24 bg-gradient-ocean rounded-lg"></div>
            </div>
          </div>

          {/* Spacing */}
          <div className="p-8 bg-surface rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Spacing System</h3>
            <div className="flex gap-4 items-end">
              <div className="bg-primary" style={{ width: '0.25rem', height: '2rem' }}></div>
              <div className="bg-primary" style={{ width: '0.5rem', height: '2rem' }}></div>
              <div className="bg-primary" style={{ width: '1rem', height: '2rem' }}></div>
              <div className="bg-primary" style={{ width: '1.5rem', height: '2rem' }}></div>
              <div className="bg-primary" style={{ width: '2rem', height: '2rem' }}></div>
              <div className="bg-primary" style={{ width: '3rem', height: '2rem' }}></div>
              <div className="bg-primary" style={{ width: '4rem', height: '2rem' }}></div>
              <div className="bg-primary" style={{ width: '6rem', height: '2rem' }}></div>
            </div>
          </div>

          {/* Animations */}
          <div className="p-8 bg-surface rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Animations</h3>
            <div className="flex gap-6">
              <div className="h-24 w-24 bg-gradient-primary rounded-lg animate-gradient"></div>
              <div className="h-24 w-24 bg-primary rounded-lg animate-pulse"></div>
              <div className="h-24 w-24 bg-accent rounded-lg animate-bounce"></div>
              <div className="h-24 w-24 bg-info rounded-lg animate-spin-slow"></div>
            </div>
          </div>

          {/* Glass Effects */}
          <div className="p-8 bg-surface rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Glass Effects</h3>
            <div className="grid grid-cols-3 gap-6 relative">
              {/* Add background for glass to show against */}
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-lg"></div>
              <div className="glass p-6 text-center relative">
                <p className="text-lg font-semibold">Light Glass</p>
                <p className="text-sm text-secondary mt-2">Subtle transparency</p>
              </div>
              <div className="glass-medium p-6 text-center relative">
                <p className="text-lg font-semibold">Medium Glass</p>
                <p className="text-sm text-secondary mt-2">Balanced opacity</p>
              </div>
              <div className="glass-heavy p-6 text-center relative">
                <p className="text-lg font-semibold">Heavy Glass</p>
                <p className="text-sm text-secondary mt-2">Strong blur effect</p>
              </div>
            </div>
          </div>

          {/* Glow Effects */}
          <div className="p-8 bg-surface rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Glow Effects</h3>
            <div className="grid grid-cols-4 gap-6">
              <div className="p-6 bg-surface-elevated rounded-lg glow-primary text-center">
                <p className="font-semibold">Primary Glow</p>
              </div>
              <div className="p-6 bg-surface-elevated rounded-lg glow-accent text-center">
                <p className="font-semibold">Accent Glow</p>
              </div>
              <div className="p-6 bg-surface-elevated rounded-lg glow-gold text-center">
                <p className="font-semibold">Gold Glow</p>
              </div>
              <div className="p-6 bg-surface-elevated rounded-lg glow-rainbow text-center">
                <p className="font-semibold">Rainbow Glow</p>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="p-8 bg-surface-elevated rounded-lg">
            <p className="text-lg">
              <strong>Note:</strong> Component styles (buttons, cards, inputs, etc.) will be 
              implemented step-by-step when building the Game Library UI at <code>/games</code> route.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}