import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export const metadata = {
  title: "MapleKit",
  description: "MapleKit為新楓之谷玩家提供的一個工具平台",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "MapleKit",
    description: "MapleKit為新楓之谷玩家提供的一個工具平台",
    url: "https://maple-kit.vercel.app/",
    siteName: "MapleKit",
    images: [
      {
        url: "https://maple-kit.vercel.app/Destiny_Ritual_Fan_icon.png",
        width: 41,
        height: 37,
        alt: "MapleKit"
      }
    ],
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
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
    </html>
  );
}
