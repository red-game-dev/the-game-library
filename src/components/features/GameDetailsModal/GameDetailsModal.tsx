/**
 * GameDetailsModal Component
 * Modal component for displaying detailed game information
 */

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Tooltip } from '@/components/ui/Tooltip';
import { Image } from '@/components/ui/Image';
import type { Game } from '@/lib/core/domain/entities';
import { getGameTypeDisplayName } from '@/lib/core/domain/entities';
import { formatCompactNumber, shareContent } from '@/lib/core/shared/utils';
import '@/styles/components/features/game-details-modal.css';
import { DEFAULT_PLACEHOLDER } from '@/lib/core/config/constants/app.constants';

export interface GameDetailsModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
  onPlay?: (game: Game) => void;
  onFavorite?: (game: Game) => void;
  onShare?: (game: Game) => void;
}

export function GameDetailsModal({
  game,
  isOpen,
  onClose,
  onPlay,
  onFavorite,
  onShare
}: GameDetailsModalProps) {
  const [imageError, setImageError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [justCopied, setJustCopied] = useState(false);

  if (!game) return null;

  const handlePlay = () => {
    setIsPlaying(true);
    onPlay?.(game);
    // Simulate play action
    setTimeout(() => {
      setIsPlaying(false);
      onClose();
    }, 1500);
  };

  const handleFavorite = () => {
    onFavorite?.(game);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/games/${game.slug}`;
    
    const result = await shareContent({
      title: game.title,
      text: `Check out ${game.title}!`,
      url: url
    });
    
    if (result.success) {
      if (result.method === 'clipboard') {
        setJustCopied(true);
        setTimeout(() => setJustCopied(false), 2000);
      }
      onShare?.(game);
    }
  };

  // Format RTP percentage
  const rtpDisplay = game.rtp ? `${game.rtp}%` : 'N/A';
  
  // Format play count
  const playCountDisplay = game.playCount 
    ? formatCompactNumber(game.playCount)
    : '0';

  // Format release date
  const releaseDateDisplay = game.releaseDate 
    ? new Date(game.releaseDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    : 'Unknown';
  
  // Use the isComingSoon property from the game data (set by backend)
  const isComingSoon = game.isComingSoon || false;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="lg"
      position="center"
      closeOnOverlayClick
      showCloseButton
    >
      <div className="game-details-modal">
        {/* Hero Image Section */}
        <div className="relative w-full h-64 md:h-80 -m-6 mb-6 overflow-hidden rounded-t-lg bg-gradient-to-br from-purple-600 to-pink-600">
          {!imageError && game.thumbnail ? (
            <div className="absolute inset-0">
              <Image
                src={game.thumbnail}
                alt={game.title}
                fallbackSrc={DEFAULT_PLACEHOLDER(
                  game.provider.name,
                  '8b5cf6',
                  'ffffff'
                )}
                fill
                objectFit="cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                onError={() => setImageError(true)}
                containerClassName="w-full h-full"
                showDefaultFallback={false}
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-6xl">🎮</span>
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black-900 via-transparent to-transparent opacity-60 z-[1]" />
          
          {/* Status badges on image */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            {isComingSoon && (
              <Badge variant="info" size="sm" className="shadow-lg badge-flashy" gap="sm">
                🚀 COMING SOON
              </Badge>
            )}
            {game.isNew && !isComingSoon && (
              <Badge variant="success" size="sm" className="shadow-lg" gap="sm">
                NEW
              </Badge>
            )}
            {game.isHot && (
              <Badge variant="error" size="sm" className="shadow-lg" gap="sm">
                🔥 HOT
              </Badge>
            )}
            {game.isOnSale && (
              <Badge variant="warning" size="sm" className="shadow-lg" gap="sm">
                SALE
              </Badge>
            )}
          </div>
          
          {/* Provider logo */}
          {game.provider.logo && (
            <div className="absolute top-4 right-4 z-10">
              <div className="relative bg-white rounded-full shadow-lg p-1" style={{ width: '60px', height: '60px' }}>
                <Image
                  src={game.provider.logo}
                  alt={game.provider.name}
                  fallbackSrc={DEFAULT_PLACEHOLDER(
                    game.provider.name,
                    '8b5cf6',
                    'ffffff'
                  )}
                  fill
                  objectFit="cover"
                  sizes="60px"
                  containerClassName="w-full h-full rounded-full"
                  showDefaultFallback={false}
                />
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="px-6 pb-6">
          {/* Title and Action Icons */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-3xl font-bold">{game.title}</h2>
              <div className="flex gap-2">
                <Tooltip content={game.isFavorite ? "Remove from favorites" : "Add to favorites"}>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconOnly
                    onClick={handleFavorite}
                    className={game.isFavorite ? 'text-error' : ''}
                    aria-label={game.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {game.isFavorite ? '❤️' : '🤍'}
                  </Button>
                </Tooltip>
                <Tooltip content={justCopied ? "Link copied!" : "Share game"}>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconOnly
                    onClick={handleShare}
                    className={justCopied ? 'text-success' : ''}
                    aria-label="Share game"
                  >
                    {justCopied ? '✓' : '🔗'}
                  </Button>
                </Tooltip>
              </div>
            </div>
            <div className="flex items-center gap-3 text-secondary">
              <Badge variant="secondary" size="sm" gap="sm">
                {getGameTypeDisplayName(game.type)}
              </Badge>
              <span>by {game.provider.name}</span>
            </div>
          </div>

          {/* Description */}
          {game.description && (
            <p className="text-secondary mb-6 leading-relaxed">
              {game.description}
            </p>
          )}

          {/* Game Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-3 text-center">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-xs text-secondary mb-1">RTP</div>
              <div className="font-semibold">{rtpDisplay}</div>
            </Card>
            
            <Card className="p-3 text-center">
              <div className="text-2xl mb-1">🎮</div>
              <div className="text-xs text-secondary mb-1">Plays</div>
              <div className="font-semibold">{playCountDisplay}</div>
            </Card>
            
            <Card className="p-3 text-center">
              <div className="text-2xl mb-1">📅</div>
              <div className="text-xs text-secondary mb-1">Released</div>
              <div className="font-semibold text-sm">{releaseDateDisplay}</div>
            </Card>
            
            <Card className="p-3 text-center">
              <div className="text-2xl mb-1">⭐</div>
              <div className="text-xs text-secondary mb-1">Rating</div>
              <div className="font-semibold">4.5/5</div>
            </Card>
          </div>

          {/* Tags */}
          {game.tags && game.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-secondary mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {game.tags.map(tag => (
                  <Badge key={tag} variant="outline" size="sm" gap="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {isComingSoon ? (
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                disabled
              >
                🔒 Coming Soon
              </Button>
            ) : (
              <>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={handlePlay}
                  disabled={isPlaying}
                >
                  {isPlaying ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      Loading...
                    </>
                  ) : (
                    <>▶ Play Now</>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={handlePlay}
                  disabled={isPlaying}
                >
                  🎮 Demo
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}