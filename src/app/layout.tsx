import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { defaultMetadata } from "@/lib/core/config/seo.config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <DefaultLayout includeStructuredData>
          {children}
        </DefaultLayout>
      </body>
    </html>
  );
}