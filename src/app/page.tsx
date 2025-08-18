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

          {/* Border System */}
          <div className="p-8 bg-surface rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Border System</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="p-6 border border-gray-300 rounded">Default Border</div>
              <div className="p-6 border-2 border-primary rounded-lg">Primary Border</div>
              <div className="p-6 border-4 border-accent rounded-xl">Accent Border</div>
              <div className="p-6 border border-dashed border-warning rounded-2xl">Dashed Warning</div>
              <div className="p-6 border-2 border-dotted border-info rounded-3xl">Dotted Info</div>
              <div className="p-6 border-8 border-error rounded-full">Thick Error</div>
            </div>
          </div>

          {/* Text Colors Demo */}
          <div className="p-8 bg-surface rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Text Color System</h3>
            <div className="grid grid-cols-4 gap-4">
              <p className="text-gray-500">Gray 500</p>
              <p className="text-red-500">Red 500</p>
              <p className="text-orange-500">Orange 500</p>
              <p className="text-yellow-500">Yellow 500</p>
              <p className="text-green-500">Green 500</p>
              <p className="text-emerald-500">Emerald 500</p>
              <p className="text-cyan-500">Cyan 500</p>
              <p className="text-blue-500">Blue 500</p>
              <p className="text-purple-500">Purple 500</p>
              <p className="text-violet-500">Violet 500</p>
              <p className="text-pink-500">Pink 500</p>
              <p className="text-lime-500">Lime 500</p>
            </div>
          </div>

          {/* Layout Utilities */}
          <div className="p-8 bg-surface rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Layout Utilities</h3>
            
            {/* Flexbox Demo */}
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-3">Flexbox</h4>
              <div className="flex justify-between items-center p-4 bg-surface-elevated rounded-lg">
                <div className="px-4 py-2 bg-primary text-white rounded">Start</div>
                <div className="px-4 py-2 bg-accent text-black rounded">Center</div>
                <div className="px-4 py-2 bg-info text-white rounded">End</div>
              </div>
            </div>

            {/* Position Demo */}
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-3">Position</h4>
              <div className="relative h-32 bg-surface-elevated rounded-lg">
                <div className="absolute top-2 left-2 px-3 py-1 bg-purple-500 text-white rounded text-sm">Top Left</div>
                <div className="absolute top-2 right-2 px-3 py-1 bg-cyan-500 text-white rounded text-sm">Top Right</div>
                <div className="absolute bottom-2 left-2 px-3 py-1 bg-pink-500 text-white rounded text-sm">Bottom Left</div>
                <div className="absolute bottom-2 right-2 px-3 py-1 bg-lime-500 text-black rounded text-sm">Bottom Right</div>
              </div>
            </div>

            {/* Size Demo */}
            <div>
              <h4 className="text-lg font-medium mb-3">Sizing</h4>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gradient-primary rounded"></div>
                <div className="w-24 h-24 bg-gradient-accent rounded-lg"></div>
                <div className="w-32 h-32 bg-gradient-ocean rounded-xl"></div>
              </div>
            </div>
          </div>

          {/* Opacity Demo */}
          <div className="p-8 bg-surface rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Opacity System</h3>
            <div className="flex gap-4">
              <div className="p-4 bg-primary opacity-10 rounded">10%</div>
              <div className="p-4 bg-primary opacity-20 rounded">20%</div>
              <div className="p-4 bg-primary opacity-30 rounded">30%</div>
              <div className="p-4 bg-primary opacity-40 rounded">40%</div>
              <div className="p-4 bg-primary opacity-50 rounded">50%</div>
              <div className="p-4 bg-primary opacity-60 rounded">60%</div>
              <div className="p-4 bg-primary opacity-70 rounded">70%</div>
              <div className="p-4 bg-primary opacity-80 rounded">80%</div>
              <div className="p-4 bg-primary opacity-90 rounded">90%</div>
              <div className="p-4 bg-primary opacity-100 rounded">100%</div>
            </div>
          </div>

          {/* Note */}
          <div className="p-8 bg-surface-elevated rounded-lg border-2 border-primary">
            <h3 className="text-xl font-bold mb-4 text-primary">✅ Design System Complete</h3>
            <p className="text-lg mb-2">
              Our custom CSS design system is fully functional with:
            </p>
            <ul className="list-disc list-inside space-y-1 text-secondary">
              <li>110+ color utilities across 11 color scales</li>
              <li>Comprehensive spacing system (0-96)</li>
              <li>Complete typography scale</li>
              <li>Flexbox and Grid utilities</li>
              <li>Border and radius system</li>
              <li>Theme switching (try the buttons above!)</li>
              <li>Gaming-specific effects (glows, glass morphism)</li>
              <li>Full accessibility support</li>
            </ul>
            <p className="text-base mt-4 text-tertiary">
              Next: Build the Game Library UI at <code className="px-2 py-1 bg-surface rounded">/games</code> route using these utilities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}