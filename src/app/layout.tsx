import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Merriweather } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/data/site";

const plexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const merriweather = Merriweather({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  icons: {
    icon: SITE_CONFIG.ogImage,
  },
  alternates: {
    types: {
      'application/rss+xml': `${SITE_CONFIG.url}/feed.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${plexSans.variable} ${plexMono.variable} ${merriweather.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
