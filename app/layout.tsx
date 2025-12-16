import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { DM_Sans } from 'next/font/google';

import './globals.css';

const dm_sans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-dm-sans',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MimiShow',
  description: 'A página inicial do MimiShow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`
          ${dm_sans.className}         
          ${dm_sans.variable} 
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
