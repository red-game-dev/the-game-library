/**
 * Mock API endpoint for tags
 * Supports listing all tags, paginated results, and searching
 */

import { NextRequest } from 'next/server';
import { tagService } from '@/lib/core/backend/services/TagService';
import { PaginationService } from '@/lib/core/backend/services/PaginationService';
import { tagEntityTransformers } from '@/lib/core/backend/transformers';
import { tagApiTransformers } from '@/lib/core/shared/transformers';
import { simulateApiDelay } from '@/lib/core/shared/utils/delay';
import { 
  handleApiError, 
  createPaginatedResponse,
  createSuccessResponse,
  createNotFoundResponse
} from '@/lib/core/shared/errors/errorHandler';
import { DEFAULT_PAGE_SIZE } from '@/lib/core/config/constants/app.constants';

export async function GET(request: NextRequest) {
  try {
    // Add delay to simulate real API
    await simulateApiDelay();

    // Parse query parameters using transformer
    const searchParams = request.nextUrl.searchParams;
    const queryParams = tagApiTransformers.parseQueryParams(searchParams);
    
    // Check if requesting all tags (no pagination)
    const all = searchParams.get('all') === 'true';
    
    if (all) {
      // Return all tags without pagination
      const tags = tagService.getAllTags();
      // Transform to API response format
      const apiTags = tagEntityTransformers.toApiGetAllTagsResponse(tags);
      return createSuccessResponse(apiTags);
    }
    
    // Check if requesting top tags
    const top = searchParams.get('top');
    
    if (top) {
      const limit = parseInt(top);
      const topTags = tagService.getTopTags(limit);
      const apiTags = tagEntityTransformers.toApiGetAllTagsResponse(topTags);
      return createSuccessResponse(apiTags);
    }
    
    if (queryParams.popular) {
      const popularTags = tagService.getPopularTags(queryParams.minGames || 5);
      const apiTags = tagEntityTransformers.toApiGetAllTagsResponse(popularTags);
      return createSuccessResponse(apiTags);
    }
    
    // Handle search
    if (queryParams.search) {
      const searchResults = tagService.searchTags(queryParams.search);
      
      // Apply category filter if provided
      const filteredResults = queryParams.category 
        ? searchResults.filter(tag => tag.category === queryParams.category)
        : searchResults;
      
      // Apply sorting
      const sortedResults = queryParams.sort 
        ? tagService.sortTags(filteredResults, queryParams.sort)
        : filteredResults;
      
      // Validate pagination parameters
      const paginationParams = PaginationService.validateParams({
        page: queryParams.page || 1,
        pageSize: queryParams.pageSize || DEFAULT_PAGE_SIZE
      });
      
      // Apply pagination
      const result = PaginationService.paginate(
        sortedResults,
        paginationParams
      );
      
      // Transform to API response format
      const apiTags = tagEntityTransformers.toApiGetAllTagsResponse(result.data);
      
      return createPaginatedResponse(
        apiTags,
        result.pagination,
        {
          totalTags: tagService.getAllTags().length,
          search: queryParams.search
        }
      );
    }
    
    // Validate pagination parameters
    const paginationParams = PaginationService.validateParams({
      page: queryParams.page || 1,
      pageSize: queryParams.pageSize || DEFAULT_PAGE_SIZE
    });
    
    // Get paginated tags
    const result = tagService.getPaginatedTags(
      paginationParams.page!,
      paginationParams.pageSize!,
      queryParams.sort || 'count',
      queryParams.category
    );
    
    // Transform to API response format
    const apiTags = tagEntityTransformers.toApiGetAllTagsResponse(result.data);
    
    return createPaginatedResponse(
      apiTags,
      result.pagination,
      {
        totalTags: tagService.getAllTags().length,
        ...(queryParams.category && { category: queryParams.category })
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Get tag by ID with related tags and games
 */
export async function GET_BY_ID(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await simulateApiDelay();
    
    const tag = tagService.getTagById(params.id);
    
    if (!tag) {
      return createNotFoundResponse('Tag', params.id);
    }
    
    // Get additional data based on query params
    const searchParams = request.nextUrl.searchParams;
    const includeGames = searchParams.get('includeGames') === 'true';
    const includeRelated = searchParams.get('includeRelated') === 'true';
    
    const response: Record<string, unknown> = { ...tag };
    
    if (includeGames) {
      response.games = tagService.getGamesByTag(params.id);
    }
    
    if (includeRelated) {
      const limit = parseInt(searchParams.get('relatedLimit') || '5');
      response.relatedTags = tagService.getRelatedTags(params.id, limit);
    }
    
    return createSuccessResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Get tag statistics
 */
export async function GET_STATS() {
  try {
    await simulateApiDelay();
    
    const stats = tagService.getTagStats();
    return createSuccessResponse(stats);
  } catch (error) {
    return handleApiError(error);
  }
}