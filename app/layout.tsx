import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Fathima Collection | Premium Men\'s Fashion Showroom Mangalore',
  description: 'Discover luxury men\'s clothing at Fathima Collection, Mangaluru. Wedding collection, groom sherwanis, tuxedos, Egyptian Giza cotton shirts, and limited edition ethnic wear below Malabar Gold, Falnir Road.',
  keywords: 'Fathima Collection, Men\'s clothing store Mangalore, Wedding sherwani Mangaluru, Premium shirts Falnir road, Groom wear Mangalore, Ethnic clothing store, Below Malabar Gold Attavar',
  openGraph: {
    title: 'Fathima Collection | Premium Men\'s Fashion Showroom',
    description: 'Luxury men\'s wedding suits, sherwanis, blazers, and premium casual wear in Mangalore.',
    url: 'https://fathimacollection.com',
    siteName: 'Fathima Collection',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased bg-slate-50 text-slate-900 selection:bg-brand-green-500 selection:text-white" suppressHydrationWarning>
        <StoreProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
