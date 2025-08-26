/**
 * API Client Wrapper
 * Abstracts fetch implementation for easy swapping of HTTP libraries
 */

import { ApiError, NetworkError, TimeoutError } from '@/lib/core/shared/errors';
import { ErrorCodes } from '@/lib/core/shared/errors/constants';
import { API_BASE_URL, API_TIMEOUT } from '@/lib/core/config/constants/app.constants';

export interface RequestOptions extends RequestInit {
  timeout?: number;
  params?: Record<string, string | string[] | number | boolean | undefined | null>;
  retry?: number;
}

export interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: HeadersInit;
  interceptors?: {
    request?: (config: RequestOptions) => RequestOptions | Promise<RequestOptions>;
    response?: (response: Response) => Response | Promise<Response>;
    error?: (error: Error) => Promise<never>;
  };
}

class ApiClient {
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig = {}) {
    this.config = {
      baseURL: config.baseURL || API_BASE_URL,
      timeout: config.timeout || API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      interceptors: config.interceptors,
    };
  }

  /**
   * Build URL with query parameters
   */
  private buildURL(endpoint: string, params?: Record<string, string | string[] | number | boolean | undefined | null>): string {
    // For relative URLs (starting with /), just use them directly
    if (endpoint.startsWith('/') && !this.config.baseURL) {
      const url = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach(v => url.append(key, String(v)));
            } else {
              url.append(key, String(value));
            }
          }
        });
      }
      const queryString = url.toString();
      const finalUrl = queryString ? `${endpoint}?${queryString}` : endpoint;
      return finalUrl;
    }
    
    // For absolute URLs, use the URL constructor
    const baseURL = this.config.baseURL || (typeof window !== 'undefined' ? window.location.origin : '');
    const url = new URL(endpoint, baseURL);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => url.searchParams.append(key, String(v)));
          } else {
            url.searchParams.append(key, String(value));
          }
        }
      });
    }
    
    const finalUrl = url.toString();
    return finalUrl;
  }

  /**
   * Execute HTTP request with timeout and error handling
   */
  private async execute<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeout = options.timeout || this.config.timeout;
    
    const timeoutId = setTimeout(() => controller.abort(), timeout!);
    
    try {
      // Build full URL
      const url = this.buildURL(endpoint, options.params);
      
      // Prepare request options
      let requestOptions: RequestInit = {
        ...options,
        headers: {
          ...this.config.headers,
          ...options.headers,
        },
        signal: controller.signal,
      };
      
      // Apply request interceptor
      if (this.config.interceptors?.request) {
        requestOptions = await this.config.interceptors.request(requestOptions);
      }
      
      // Execute request
      let response = await fetch(url, requestOptions);
      
      // Apply response interceptor
      if (this.config.interceptors?.response) {
        response = await this.config.interceptors.response(response);
      }
      
      clearTimeout(timeoutId);
      
      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || `Request failed: ${response.statusText}`,
          errorData.code || ErrorCodes.API_ERROR,
          response.status,
          errorData
        );
      }
      
      // Parse response
      const data = await response.json();
      return data;
      
    } catch (error) {
      clearTimeout(timeoutId);
      
      // Apply error interceptor
      if (this.config.interceptors?.error) {
        return this.config.interceptors.error(error as Error);
      }
      
      // Handle specific errors
      if (error instanceof ApiError) {
        throw error;
      }
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new TimeoutError(`Request timed out after ${timeout}ms`, timeout!);
        }
        throw new NetworkError(`Network error: ${error.message}`);
      }
      
      throw new ApiError('Unknown error occurred', ErrorCodes.UNKNOWN_ERROR);
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, string | string[] | number | boolean | undefined | null>, options?: RequestOptions): Promise<T> {
    return this.execute<T>(endpoint, {
      ...options,
      method: 'GET',
      params,
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.execute<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.execute<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.execute<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.execute<T>(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }

  /**
   * Set authorization header
   */
  setAuthToken(token: string): void {
    this.config.headers = {
      ...this.config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  /**
   * Remove authorization header
   */
  clearAuthToken(): void {
    const headers = { ...this.config.headers } as Record<string, string>;
    delete headers.Authorization;
    this.config.headers = headers;
  }
}

// Create default instance
export const apiClient = new ApiClient();

// Export class for custom instances
export { ApiClient };