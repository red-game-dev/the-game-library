'use client';

import React, { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Play, 
  Sparkles, 
  TrendingUp, 
  Trophy,
  Star,
  Zap,
  ArrowRight,
  Gamepad2,
  Users,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GameCarousel } from '@/components/features/GameCarousel';
import { GameCard } from '@/components/features/GameCard';
import { PromotionBanner } from '@/components/features/PromotionBanner';
import { GameDetailsModal } from '@/components/features/GameDetailsModal';
import { useGamesQuery } from '@/hooks/useGames';
import { useProvidersQuery } from '@/hooks/useProviders';
import { useFavorites } from '@/hooks/useFavorites';
import type { Game } from '@/lib/core/domain/entities';
import './home.css';

// Hero section stats with animations
const stats = [
  { label: '1000+', sublabel: 'Games', icon: Gamepad2, color: 'purple' },
  { label: '20+', sublabel: 'Providers', icon: Crown, color: 'yellow' },
  { label: '24/7', sublabel: 'Live Games', icon: Users, color: 'red' },
  { label: '96%', sublabel: 'Avg RTP', icon: Trophy, color: 'green' }
];

// Game categories for quick navigation
const categories = [
  { id: 'slots', label: 'Slots', icon: '🎰', color: 'purple', count: '500+' },
  { id: 'live', label: 'Live Casino', icon: '🎲', color: 'red', count: '120+' },
  { id: 'table', label: 'Table Games', icon: '♠️', color: 'green', count: '80+' },
  { id: 'jackpot', label: 'Jackpots', icon: '💰', color: 'yellow', count: '40+' },
  { id: 'instant', label: 'Instant Win', icon: '⚡', color: 'blue', count: '60+' }
];

export default function HomePage() {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = React.useState<Game | null>(null);
  const [isGameModalOpen, setIsGameModalOpen] = React.useState(false);
  
  const { toggleFavorite } = useFavorites();
  
  const { data: hotGames } = useGamesQuery({ 
    isHot: true, 
    pageSize: 20 
  });
  
  const { data: newGames } = useGamesQuery({ 
    isNew: true, 
    pageSize: 20 
  });

  const { data: jackpotGames } = useGamesQuery({ 
    types: ['jackpot'], 
    pageSize: 15 
  });

  const { data: liveGames } = useGamesQuery({ 
    types: ['live'], 
    pageSize: 15 
  });

  const { data: providers } = useProvidersQuery();

  // Memoize providers for carousel to prevent re-renders
  const providersForCarousel = useMemo(() => {
    if (!providers || providers.length === 0) return [];
    const topProviders = providers.slice(0, 8);
    return [topProviders, topProviders]; // Duplicate for seamless infinite scroll
  }, [providers]);

  // Memoize event handlers to prevent child re-renders
  const handleCategoryClick = useCallback((categoryId: string) => {
    router.push(`/games?types=${categoryId}`);
  }, [router]);

  const handleGameClick = useCallback((game: Game) => {
    setSelectedGame(game);
    setIsGameModalOpen(true);
  }, []);

  const handleGamePlay = useCallback((game: Game) => {
    // Navigate to game or open in modal
    console.log('Playing game:', game.title);
    router.push(`/games/${game.slug}`);
  }, [router]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFavoriteToggle = useCallback((gameId: string, _isFavorite: boolean) => {
    // Use the toggleFavorite from the useFavorites hook (it only needs gameId)
    // The second parameter is ignored as the store manages the actual state
    toggleFavorite(gameId);
  }, [toggleFavorite]);
  
  const handleModalClose = useCallback(() => {
    setIsGameModalOpen(false);
    setSelectedGame(null);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient" />
          <div className="hero-glow hero-glow-1" />
          <div className="hero-glow hero-glow-2" />
          <div className="hero-glow hero-glow-3" />
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <Badge 
              variant="success" 
              size="lg" 
              className="hero-badge"
              icon={<Sparkles className="w-4 h-4" />}
              gap="sm"
            >
              Welcome Bonus Available
            </Badge>
            
            <h1 className="hero-title">
              <span className="hero-title-gradient">Premium Gaming</span>
              <br />
              <span className="hero-title-secondary">Experience Awaits</span>
            </h1>
            
            <p className="hero-description">
              Discover over 1000+ games from world-class providers.
              Play slots, live casino, table games and win big!
            </p>
            
            <div className="hero-actions">
              <Link href="/games">
                <Button size="xl" variant="primary" className="hero-cta">
                  <Play className="w-5 h-5" />
                  Play Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              
              <Link href="/games?favorites=true">
                <Button size="xl" variant="outline" className="hero-secondary">
                  <Star className="w-5 h-5" />
                  Favorites
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card stat-card-${stat.color}`}>
                <stat.icon className={`stat-icon stat-icon-${stat.color}`} />
                <div className="stat-content">
                  <div className="stat-value">{stat.label}</div>
                  <div className="stat-label">{stat.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">Find your perfect game</p>
          </div>
          
          <div className="categories-grid">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`category-card category-${category.color}`}
              >
                <div className="category-icon">{category.icon}</div>
                <div className="category-label">{category.label}</div>
                <div className="category-count">{category.count} games</div>
                <div className="category-arrow">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Games Carousel */}
      {hotGames?.games && hotGames.games.length > 0 && (
        <section className="carousel-section">
          <div className="container">
            <div className="section-header">
              <div className="section-title-group">
                <Zap className="section-icon section-icon-hot" />
                <h2 className="section-title">Hot Games</h2>
                <Badge variant="error" size="sm" gap="sm">
                  {hotGames.games.length} Games
                </Badge>
              </div>
              <Link href="/games?hot=true">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <GameCarousel
              autoScroll={false}
              showArrows
              showDots
              featured
              variant="glowing"
              slidesPerView={5}
              slideSpacing={1.5}
              infinite={false}
            >
              {hotGames.games.map((game: Game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onClick={handleGameClick}
                  onPlay={handleGamePlay}
                  onFavoriteToggle={handleFavoriteToggle}
                  size="grid-md"
                  showPlayOnHover={true}
                />
              ))}
            </GameCarousel>
          </div>
        </section>
      )}

      {/* Promotional Banner */}
      <section className="promotion-section">
        <div className="container">
          <PromotionBanner
            promotion={{
              id: 'weekend-special',
              title: 'Weekend Special Bonus',
              subtitle: '50% up to $500',
              description: 'Boost your weekend gaming with our exclusive reload bonus! Available Friday through Sunday.',
              imageUrl: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=1920&h=400&fit=crop',
              ctaText: 'Claim Bonus',
              ctaLink: '/games',
              badge: {
                text: 'THIS WEEKEND',
                variant: 'warning',
                icon: <Zap className="w-4 h-4" />
              },
              highlight: 'LIMITED TIME'
            }}
            visualVariant="glowing"
            variant="featured"
            enableOverlay={true}
            overlayOpacity={0.85}
          />
        </div>
      </section>

      {/* New Games Carousel */}
      {newGames?.games && newGames.games.length > 0 && (
        <section className="carousel-section">
          <div className="container">
            <div className="section-header">
              <div className="section-title-group">
                <Sparkles className="section-icon section-icon-new" />
                <h2 className="section-title">New Releases</h2>
                <Badge variant="success" size="sm" gap="sm">
                  {newGames.games.length} Games
                </Badge>
              </div>
              <Link href="/games?new=true">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <GameCarousel 
              showArrows 
              showDots
              variant="elevated"
              slidesPerView={5}
              slideSpacing={1.5}
              infinite={false}
            >
              {newGames.games.map((game: Game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onClick={handleGameClick}
                  onPlay={handleGamePlay}
                  onFavoriteToggle={handleFavoriteToggle}
                  size="grid-md"
                  showPlayOnHover={true}
                />
              ))}
            </GameCarousel>
          </div>
        </section>
      )}

      {/* Jackpot Games */}
      {jackpotGames?.games && jackpotGames.games.length > 0 && (
        <section className="carousel-section carousel-section-jackpot">
          <div className="jackpot-background" />
          <div className="container">
            <div className="section-header">
              <div className="section-title-group">
                <Trophy className="section-icon section-icon-jackpot" />
                <h2 className="section-title">Mega Jackpots</h2>
                <Badge variant="warning" size="sm" gap="sm">
                  {jackpotGames.games.length} Games
                </Badge>
              </div>
              <Link href="/games?types=jackpot">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <GameCarousel 
              showArrows 
              showDots
              variant="glowing"
              featured
              slidesPerView={4}
              slideSpacing={1.5}
              infinite={false}
            >
              {jackpotGames.games.map((game: Game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onClick={handleGameClick}
                  onPlay={handleGamePlay}
                  onFavoriteToggle={handleFavoriteToggle}
                  size="grid-md"
                  showPlayOnHover={true}
                />
              ))}
            </GameCarousel>
          </div>
        </section>
      )}

      {/* VIP Promotion Banner */}
      <section className="promotion-section">
        <div className="container">
          <PromotionBanner
            promotion={{
              id: 'vip-program',
              title: 'Join Our VIP Club',
              subtitle: 'Exclusive Rewards & Benefits',
              description: 'Get personalized bonuses, faster withdrawals, dedicated support and much more!',
              imageUrl: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=1920&h=400&fit=crop',
              ctaText: 'Become VIP',
              ctaLink: '/games',
              badge: {
                text: 'VIP PROGRAM',
                variant: 'primary',
                icon: <Crown className="w-4 h-4" />
              },
              highlight: 'EXCLUSIVE'
            }}
            visualVariant="premium"
            variant="compact"
            enableOverlay={true}
            overlayOpacity={0.9}
          />
        </div>
      </section>

      {/* Live Casino */}
      {liveGames?.games && liveGames.games.length > 0 && (
        <section className="carousel-section">
          <div className="container">
            <div className="section-header">
              <div className="section-title-group">
                <Users className="section-icon section-icon-live" />
                <h2 className="section-title">Live Casino</h2>
                <Badge variant="info" size="sm" gap="sm">
                  {liveGames.games.length} Tables
                </Badge>
              </div>
              <Link href="/games?types=live">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <GameCarousel 
              showArrows 
              showDots
              variant="elevated"
              slidesPerView={5}
              slideSpacing={1.5}
              infinite={false}
            >
              {liveGames.games.map((game: Game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onClick={handleGameClick}
                  onPlay={handleGamePlay}
                  onFavoriteToggle={handleFavoriteToggle}
                  size="grid-md"
                  showPlayOnHover={true}
                />
              ))}
            </GameCarousel>
          </div>
        </section>
      )}

      {/* Providers Section - Redesigned */}
      <section className="providers-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trusted Partners</h2>
            <p className="section-subtitle">Partnered with industry-leading game providers</p>
          </div>
          
          {/* Provider Logos Carousel */}
          <div className="providers-carousel">
            <div className="providers-track">
              {providersForCarousel.map((providerSet, setIndex) => (
                <div key={setIndex} className="providers-set">
                  {providerSet.map((provider) => (
                    <Link
                      key={provider.id}
                      href={`/games?providers=${provider.id}`}
                      className="provider-logo-card"
                    >
                      <div className="provider-logo-bg">
                        <span className="provider-logo-text">
                          {provider.name}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Provider Stats */}
          <div className="provider-stats-grid">
            <div className="provider-stat-card">
              <Trophy className="provider-stat-icon" />
              <div className="provider-stat-value">{providers?.length || 20}+</div>
              <div className="provider-stat-label">Premium Providers</div>
            </div>
            <div className="provider-stat-card">
              <Gamepad2 className="provider-stat-icon" />
              <div className="provider-stat-value">1000+</div>
              <div className="provider-stat-label">Total Games</div>
            </div>
            <div className="provider-stat-card">
              <Users className="provider-stat-icon" />
              <div className="provider-stat-value">24/7</div>
              <div className="provider-stat-label">Live Support</div>
            </div>
            <div className="provider-stat-card">
              <TrendingUp className="provider-stat-icon" />
              <div className="provider-stat-value">96%</div>
              <div className="provider-stat-label">Average RTP</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Play - Promotional Banner */}
      <section className="promotion-section">
        <div className="container">
          <PromotionBanner
            promotion={{
              id: 'ready-to-play',
              title: 'Ready to Play?',
              subtitle: 'Join thousands of players',
              description: 'Start winning today with our extensive collection of premium casino games!',
              imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&h=500&fit=crop',
              ctaText: 'Explore All Games',
              ctaLink: '/games',
              badge: {
                text: 'START NOW',
                variant: 'success',
                icon: <Gamepad2 className="w-4 h-4" />
              },
              highlight: '1000+ GAMES'
            }}
            visualVariant="elevated"
            variant="hero"
            enableOverlay={true}
            overlayOpacity={0.85}
          />
        </div>
      </section>
      
      {/* Game Details Modal */}
      <GameDetailsModal
        game={selectedGame}
        isOpen={isGameModalOpen}
        onClose={handleModalClose}
        onPlay={handleGamePlay}
        onFavorite={(game) => handleFavoriteToggle(game.id, game.isFavorite || false)}
      />
    </div>
  );
}