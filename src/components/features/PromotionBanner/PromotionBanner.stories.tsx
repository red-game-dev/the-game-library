/**
 * PromotionBanner Stories
 */

import type { Meta, StoryObj } from '@storybook/nextjs';
import { PromotionBanner } from './PromotionBanner';
import { Sparkles, Gift, Trophy, Zap } from 'lucide-react';

const meta: Meta<typeof PromotionBanner> = {
  title: 'Features/PromotionBanner',
  component: PromotionBanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Premium promotion banner component for displaying offers and campaigns with eye-catching visuals.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['hero', 'compact', 'featured'],
      description: 'Banner size variant'
    },
    visualVariant: {
      control: 'select',
      options: ['default', 'elevated', 'glowing', 'premium'],
      description: 'Visual style variant'
    },
    showCountdown: {
      control: 'boolean',
      description: 'Show countdown timer if validUntil is set'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Base promotion data
const basePromotion = {
  id: 'promo-1',
  title: 'Welcome Bonus',
  subtitle: 'Get up to $1000',
  description: 'Join today and receive a 100% match bonus on your first deposit up to $1000!',
  imageUrl: 'https://picsum.photos/seed/promo1/1920/1080',
  ctaText: 'Claim Bonus',
  ctaLink: '/promotions/welcome',
  badge: {
    text: 'LIMITED TIME',
    variant: 'success' as const,
    icon: <Sparkles className="w-4 h-4" />
  },
  highlight: '100% BONUS'
};

/**
 * Default hero banner
 */
export const Default: Story = {
  args: {
    promotion: basePromotion,
    variant: 'hero'
  }
};

/**
 * Compact banner for smaller spaces
 */
export const Compact: Story = {
  args: {
    promotion: {
      ...basePromotion,
      title: 'Weekend Special',
      subtitle: undefined,
      description: '50% reload bonus this weekend only!',
      highlight: undefined
    },
    variant: 'compact'
  }
};

/**
 * Featured promotion with countdown
 */
export const WithCountdown: Story = {
  args: {
    promotion: {
      ...basePromotion,
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      badge: {
        text: 'ENDING SOON',
        variant: 'warning',
        icon: <Zap className="w-4 h-4" />
      }
    },
    variant: 'featured',
    showCountdown: true
  }
};

/**
 * VIP exclusive promotion
 */
export const VIPPromotion: Story = {
  args: {
    promotion: {
      id: 'vip-promo',
      title: 'VIP Exclusive',
      subtitle: 'Platinum Members Only',
      description: 'Enjoy exclusive cashback rewards and priority support as a VIP member.',
      imageUrl: 'https://picsum.photos/seed/vip/1920/1080',
      ctaText: 'Learn More',
      ctaLink: '/vip',
      badge: {
        text: 'VIP ONLY',
        variant: 'primary',
        icon: <Trophy className="w-4 h-4" />
      },
      highlight: 'EXCLUSIVE'
    },
    variant: 'hero',
    visualVariant: 'premium'
  }
};

/**
 * Free spins promotion
 */
export const FreeSpins: Story = {
  args: {
    promotion: {
      id: 'free-spins',
      title: 'Free Spins Friday',
      description: 'Get 50 free spins on selected slots every Friday!',
      imageUrl: 'https://picsum.photos/seed/spins/1920/1080',
      ctaText: 'Get Free Spins',
      ctaLink: '/promotions/free-spins',
      badge: {
        text: 'WEEKLY',
        variant: 'info',
        icon: <Gift className="w-4 h-4" />
      },
      highlight: '50 SPINS'
    },
    variant: 'featured',
    visualVariant: 'glowing'
  }
};

/**
 * Tournament promotion
 */
export const Tournament: Story = {
  args: {
    promotion: {
      id: 'tournament',
      title: 'Mega Tournament',
      subtitle: '$100,000 Prize Pool',
      description: 'Compete against other players for your share of the massive prize pool!',
      imageUrl: 'https://picsum.photos/seed/tournament/1920/1080',
      ctaText: 'Join Tournament',
      ctaLink: '/tournaments',
      badge: {
        text: 'LIVE NOW',
        variant: 'error'
      },
      validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    },
    variant: 'hero',
    visualVariant: 'elevated',
    showCountdown: true
  }
};

/**
 * With custom overlay settings
 */
export const WithOverlay: Story = {
  args: {
    promotion: {
      ...basePromotion,
      imageUrl: 'https://images.unsplash.com/photo-1517232115160-ff93364542dd?w=1920&h=1080&q=90',
      title: 'High Roller Bonus',
      description: 'Special rewards for our VIP players'
    },
    variant: 'hero',
    enableOverlay: true,
    overlayOpacity: 0.7
  }
};

/**
 * With light overlay for dark images
 */
export const LightOverlay: Story = {
  args: {
    promotion: {
      ...basePromotion,
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=1080&q=90',
      title: 'Night Tournament',
      description: 'Play in our exclusive midnight tournaments'
    },
    variant: 'featured',
    enableOverlay: true,
    overlayOpacity: 0.4
  }
};

/**
 * With heavy overlay for bright images
 */
export const HeavyOverlay: Story = {
  args: {
    promotion: {
      ...basePromotion,
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&q=90',
      title: 'Bright Lights Casino',
      description: 'Experience the thrill of Vegas from home'
    },
    variant: 'hero',
    enableOverlay: true,
    overlayOpacity: 0.85
  }
};

/**
 * Without overlay (for pre-darkened images)
 */
export const NoOverlay: Story = {
  args: {
    promotion: {
      ...basePromotion,
      imageUrl: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=1920&h=1080&q=90',
      title: 'Premium Experience',
      description: 'Designed for discerning players'
    },
    variant: 'featured',
    enableOverlay: false
  }
};

/**
 * Multiple promotions in carousel
 */
export const CarouselExample: Story = {
  render: () => {
    const promotions = [
      basePromotion,
      {
        id: 'promo-2',
        title: 'Cashback Tuesday',
        description: 'Get 10% cashback on all your losses every Tuesday!',
        imageUrl: 'https://picsum.photos/seed/cashback/1920/1080',
        ctaText: 'Learn More',
        ctaLink: '/promotions/cashback',
        badge: {
          text: 'WEEKLY',
          variant: 'success' as const
        }
      },
      {
        id: 'promo-3',
        title: 'Refer a Friend',
        description: 'Earn $50 for every friend you refer who makes a deposit!',
        imageUrl: 'https://picsum.photos/seed/refer/1920/1080',
        ctaText: 'Start Referring',
        ctaLink: '/referral',
        badge: {
          text: 'UNLIMITED',
          variant: 'primary' as const
        }
      }
    ];

    return (
      <div style={{ display: 'flex', gap: '2rem', padding: '2rem', overflowX: 'auto' }}>
        {promotions.map(promo => (
          <div key={promo.id} style={{ minWidth: '400px' }}>
            <PromotionBanner promotion={promo} variant="compact" />
          </div>
        ))}
      </div>
    );
  }
};

/**
 * Neon theme - Cyberpunk promotions
 */
export const NeonTheme: Story = {
  args: {
    promotion: {
      id: 'neon-promo',
      title: 'Cyber Jackpot',
      subtitle: 'Neural Network Rewards',
      description: 'Connect to the matrix and unlock quantum bonuses beyond imagination!',
      imageUrl: 'https://picsum.photos/seed/neon/1920/1080',
      ctaText: 'Jack In',
      ctaLink: '/promotions/cyber',
      badge: {
        text: 'ONLINE',
        variant: 'success' as const,
        icon: <Zap className="w-4 h-4" />
      },
      highlight: 'QUANTUM BONUS',
      validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    },
    variant: 'hero',
    visualVariant: 'glowing',
    showCountdown: true
  },
  decorators: [
    (Story) => (
      <div data-theme="neon" style={{ background: 'rgb(3, 7, 18)', minHeight: '100vh' }}>
        <Story />
      </div>
    )
  ]
};

/**
 * Gold theme - Premium VIP promotions
 */
export const GoldTheme: Story = {
  args: {
    promotion: {
      id: 'gold-promo',
      title: 'Royal Fortune',
      subtitle: 'VIP Exclusive Rewards',
      description: 'Experience luxury gaming with diamond-tier bonuses and platinum rewards!',
      imageUrl: 'https://picsum.photos/seed/gold/1920/1080',
      ctaText: 'Claim VIP Status',
      ctaLink: '/vip',
      badge: {
        text: 'VIP ONLY',
        variant: 'warning' as const,
        icon: <Trophy className="w-4 h-4" />
      },
      highlight: 'PLATINUM TIER',
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    variant: 'hero',
    visualVariant: 'premium',
    showCountdown: true
  },
  decorators: [
    (Story) => (
      <div data-theme="gold" style={{ background: 'linear-gradient(135deg, #78350f, #422006)', minHeight: '100vh' }}>
        <Story />
      </div>
    )
  ]
};

/**
 * All themes comparison
 */
export const AllThemes: Story = {
  render: () => {
    const lightPromo = {
      ...basePromotion,
      id: 'light-promo',
      title: 'Bright Bonus',
      description: 'Classic gaming rewards in pristine clarity'
    };
    
    const darkPromo = {
      ...basePromotion,
      id: 'dark-promo',
      title: 'Shadow Rewards',
      description: 'Premium bonuses in sleek dark mode'
    };
    
    const neonPromo = {
      id: 'neon-promo',
      title: 'Cyber Bonus',
      description: 'Futuristic rewards in the digital realm',
      imageUrl: 'https://picsum.photos/seed/cyber/800/400',
      ctaText: 'Activate',
      ctaLink: '/cyber',
      badge: {
        text: 'ACTIVE',
        variant: 'success' as const
      }
    };
    
    const goldPromo = {
      id: 'gold-promo',
      title: 'Royal Rewards',
      description: 'Exclusive VIP benefits for elite players',
      imageUrl: 'https://picsum.photos/seed/royal/800/400',
      ctaText: 'Join VIP',
      ctaLink: '/vip',
      badge: {
        text: 'EXCLUSIVE',
        variant: 'warning' as const
      }
    };
    
    return (
      <div className="space-y-8">
        <div data-theme="light" className="p-6 bg-white">
          <h3 className="text-lg font-semibold mb-4">Light Theme</h3>
          <PromotionBanner promotion={lightPromo} variant="compact" />
        </div>
        
        <div data-theme="dark" className="p-6 bg-gray-900">
          <h3 className="text-lg font-semibold text-white mb-4">Dark Theme</h3>
          <PromotionBanner promotion={darkPromo} variant="compact" />
        </div>
        
        <div data-theme="neon" className="p-6" style={{ background: 'rgb(3, 7, 18)' }}>
          <h3 className="text-lg font-semibold text-purple-400 mb-4">Neon Theme</h3>
          <PromotionBanner promotion={neonPromo} variant="compact" />
        </div>
        
        <div data-theme="gold" className="p-6" style={{ background: 'linear-gradient(135deg, #78350f, #422006)' }}>
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">Gold Theme</h3>
          <PromotionBanner promotion={goldPromo} variant="compact" />
        </div>
      </div>
    );
  }
};