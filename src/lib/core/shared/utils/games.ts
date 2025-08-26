/**
 * Game Utility Functions
 * Helper functions for working with games
 */

import type { GameType } from '@/lib/core/backend/types/gameTypes';
import { GAME_TYPES } from '@/lib/core/config/constants/app.constants';

/**
 * Type guard to check if a value is a valid GameType
 */
export function isGameType(value: string): value is GameType {
  return GAME_TYPES.includes(value as GameType);
}

/**
 * Check if a game is a slot game
 */
export function isSlotGame(gameType: string): boolean {
  return gameType === 'slots';
}

/**
 * Check if a game is a table game
 */
export function isTableGame(gameType: string): boolean {
  return gameType === 'table';
}

/**
 * Check if a game is a live game
 */
export function isLiveGame(gameType: string): boolean {
  return gameType === 'live';
}

/**
 * Check if a game is an instant game
 */
export function isInstantGame(gameType: string): boolean {
  return gameType === 'instant';
}

/**
 * Check if a game is a jackpot game
 */
export function isJackpotGame(gameType: string): boolean {
  return gameType === 'jackpot';
}

/**
 * Validate if a game title is properly formatted
 */
export function isValidGameTitle(title: string): boolean {
  if (!title || typeof title !== 'string') return false;
  
  const trimmed = title.trim();
  
  // Check length constraints
  if (trimmed.length < 2 || trimmed.length > 100) return false;
  
  // Check for at least one alphanumeric character
  const hasAlphanumeric = /[a-zA-Z0-9]/.test(trimmed);
  
  return hasAlphanumeric;
}

/**
 * Check if RTP (Return to Player) value is valid
 */
export function isValidRTP(rtp: number): boolean {
  return rtp >= 0 && rtp <= 100;
}

/**
 * Format RTP for display
 */
export function formatRTP(rtp?: number): string {
  if (rtp === undefined || rtp === null) return 'N/A';
  return `${rtp.toFixed(2)}%`;
}

/**
 * Get game type display label
 */
export function getGameTypeLabel(gameType: GameType): string {
  const labels: Record<GameType, string> = {
    slots: 'Slots',
    table: 'Table Games',
    live: 'Live Casino',
    instant: 'Instant Win',
    jackpot: 'Jackpot Games'
  };
  
  return labels[gameType] || gameType;
}

/**
 * Get game type icon name (for icon libraries)
 */
export function getGameTypeIcon(gameType: GameType): string {
  const icons: Record<GameType, string> = {
    slots: 'slot-machine',
    table: 'cards',
    live: 'video',
    instant: 'lightning',
    jackpot: 'trophy'
  };
  
  return icons[gameType] || 'game-controller';
}