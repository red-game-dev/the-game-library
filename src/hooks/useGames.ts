/**
 * useGames hook  
 * Simple wrapper around useGamesQuery
 */

import { useGamesQuery as useQuery } from '@/lib/core/frontend/api/games/hooks/useGamesQuery';

export const useGamesQuery = useQuery;