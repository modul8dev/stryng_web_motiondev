import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stryng – AI Social Media That Never Sleeps',
  description:
    'Stryng turns your store links into scroll-stopping social posts while you sleep. No complex prompts. Just paste your link, approve your calendar, and watch your brand grow.',
  keywords: ['AI social media', 'ecommerce marketing', 'social media automation', 'content generation'],
  openGraph: {
    title: 'Stryng – AI Social Media That Never Sleeps',
    description: 'Turn store links into scroll-stopping social posts. Automatically.',
    url: 'https://stryng.io',
    siteName: 'Stryng',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stryng – AI Social Media That Never Sleeps',
    description: 'Turn store links into scroll-stopping social posts. Automatically.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-surface text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
