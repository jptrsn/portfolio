import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Merriweather } from "next/font/google";
import "./globals.css";

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
  variable: "--font-serrif",
})

export const metadata: Metadata = {
  title: "Educoder Dot Dev",
  description: "Professional portfolio and blog, showcasing a combination of technical achievement and varied interests, with a passion for Education Technology.",
  icons: {
    icon: '/avatar_me.png',
  }
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
