/**
 * Mock API endpoint for providers
 * Supports listing all providers or paginated results
 */

import { NextRequest } from 'next/server';
import { providerService } from '@/lib/core/backend/services/ProviderService';
import { PaginationService } from '@/lib/core/backend/services/PaginationService';
import { providerEntityTransformers } from '@/lib/core/backend/transformers';
import { simulateApiDelay } from '@/lib/core/shared/utils/delay';
import { 
  handleApiError, 
  createPaginatedResponse,
  createSuccessResponse 
} from '@/lib/core/shared/errors/errorHandler';
import { ProviderNotFoundError } from '@/lib/core/shared/errors/AppError';
import { DEFAULT_PAGE_SIZE } from '@/lib/core/config/constants/app.constants';

export async function GET(request: NextRequest) {
  try {
    // Add delay to simulate real API
    await simulateApiDelay();

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    
    // Check if requesting all providers (no pagination)
    const all = searchParams.get('all') === 'true';
    
    if (all) {
      // Return all providers without pagination
      const providers = providerService.getAllProviders();
      // Transform to API response format
      const apiProviders = providerEntityTransformers.toApiGetAllProvidersResponse(providers);
      return createSuccessResponse(apiProviders);
    }
    
    // Check if requesting providers with game count
    const withGames = searchParams.get('withGames') === 'true';
    
    // Validate pagination parameters
    const paginationParams = PaginationService.validateParams({
      page: parseInt(searchParams.get('page') || '1'),
      pageSize: parseInt(searchParams.get('pageSize') || String(DEFAULT_PAGE_SIZE))
    });
    
    // Get sort parameter
    const sortBy = searchParams.get('sort') as 'name' | 'az' | 'za' | 'gameCount' | undefined;
    
    if (withGames) {
      // Get paginated providers with game count
      const result = providerService.getPaginatedProvidersWithGames(
        paginationParams.page!,
        paginationParams.pageSize!,
        sortBy || 'gameCount'
      );
      
      // Transform to API response format
      const apiProviders = providerEntityTransformers.toApiGetAllProvidersResponse(result.data);
      
      return createPaginatedResponse(
        apiProviders,
        result.pagination,
        {
          totalProviders: providerService.getAllProviders().length
        }
      );
    } else {
      // Get paginated providers
      const result = providerService.getPaginatedProviders(
        paginationParams.page!,
        paginationParams.pageSize!,
        sortBy as 'name' | 'az' | 'za' | undefined
      );
      
      // Transform to API response format
      const apiProviders = providerEntityTransformers.toApiGetAllProvidersResponse(result.data);
      
      return createPaginatedResponse(
        apiProviders,
        result.pagination,
        {
          totalProviders: providerService.getAllProviders().length
        }
      );
    }
  } catch (error) {
    return handleApiError(error);
  }
}

// Get single provider by ID
export async function GET_BY_ID(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await simulateApiDelay();
    
    const provider = providerService.getProviderById(params.id);
    
    if (!provider) {
      throw new ProviderNotFoundError(params.id);
    }
    
    return createSuccessResponse(provider);
  } catch (error) {
    return handleApiError(error);
  }
}