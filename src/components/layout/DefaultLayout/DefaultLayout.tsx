/**
 * Default Layout Component
 * Shared layout wrapper for all pages with SEO structured data, providers, and app layout
 */

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { Providers } from '@/components/providers';
import { AppLayout } from '@/components/layout/AppLayout';
import { getStructuredDataForPage } from '@/lib/core/config/seo.config';

export interface DefaultLayoutProps {
  children: React.ReactNode;
  path?: string;
  includeStructuredData?: boolean;
}

export function DefaultLayout({ 
  children, 
  path,
  includeStructuredData = true 
}: DefaultLayoutProps) {
  // Use the provided path or get current pathname
  const pathname = usePathname();
  const currentPath = path || pathname;
  
  // Get structured data for the current page
  const structuredData = includeStructuredData ? getStructuredDataForPage(currentPath) : [];

  return (
    <>
      {/* Inject JSON-LD structured data for SEO */}
      {includeStructuredData && structuredData.map((data, index) => (
        <Script
          key={`jsonld-${index}`}
          id={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data),
          }}
          strategy="afterInteractive"
        />
      ))}
      
      {/* App Structure with Providers and Layout */}
      <Providers>
        <AppLayout>
          {children}
        </AppLayout>
      </Providers>
    </>
  );
}

export default DefaultLayout;