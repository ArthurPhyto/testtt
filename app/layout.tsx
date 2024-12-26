import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Film } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | MovieStream',
    default: 'MovieStream - Watch Movies Online',
  },
  description: 'Stream and discover the latest movies online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <Film className="h-6 w-6" />
              <span className="text-xl font-bold">MovieStream</span>
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}