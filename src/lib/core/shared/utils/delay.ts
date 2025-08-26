/**
 * Delay utilities for simulating network latency
 */

import { API_DELAYS } from '@/lib/core/config/constants/app.constants';

/**
 * Simulate network delay with a specified duration
 * @param ms - Milliseconds to delay
 */
export async function simulateDelay(ms: number = 500): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Simulate random network delay within a range
 * @param min - Minimum delay in milliseconds
 * @param max - Maximum delay in milliseconds
 */
export async function simulateRandomDelay(min: number = 200, max: number = 800): Promise<void> {
  const delay = min + Math.random() * (max - min);
  await simulateDelay(delay);
}

/**
 * Simulate API delay with realistic network latency
 * Uses constants for GET requests
 */
export async function simulateApiDelay(): Promise<void> {
  await simulateRandomDelay(API_DELAYS.MIN_GET, API_DELAYS.MAX_GET);
}

/**
 * Simulate fast API delay for mutations
 * Uses constants for POST/PUT/DELETE
 */
export async function simulateMutationDelay(): Promise<void> {
  await simulateRandomDelay(API_DELAYS.MIN_MUTATION, API_DELAYS.MAX_MUTATION);
}