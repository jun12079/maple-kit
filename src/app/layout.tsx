import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL('https://maple-kit.com'),
  title: {
    default: "MapleKit | 新楓之谷工具平台",
    template: "%s | MapleKit"
  },
  description: "MapleKit 為新楓之谷玩家提供的一個工具平台，提供角色查詢、計算機、Boss 資訊等功能。",
  keywords: ["MapleStory", "新楓之谷", "MapleKit", "角色查詢", "Calculator", "計算機", "Boss", "Tools", "Destiny Weapon", "Genesis Weapon", "HEXA"],
  authors: [{ name: "MapleKit Team" }],
  creator: "MapleKit",
  openGraph: {
    title: "MapleKit | 新楓之谷工具平台",
    description: "MapleKit為新楓之谷玩家提供的一個工具平台，提供角色查詢、進度計算、遊戲資訊等功能。",
    url: "/",
    siteName: "MapleKit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MapleKit"
      }
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "MapleKit | 新楓之谷工具平台",
    description: "MapleKit為新楓之谷玩家提供的一個工具平台",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
              <Analytics />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
