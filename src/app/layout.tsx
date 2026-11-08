import type { Metadata } from 'next';
import { Oswald, Bodoni_Moda, Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import CustomCursor from '@/components/layout/CustomCursor';
import CartDrawer from '@/components/cart/CartDrawer';
import SearchModal from '@/components/navigation/SearchModal';
import GridOverlay from '@/components/layout/GridOverlay';

const monumentalDisplay = Oswald({
  variable: '--font-monumental',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

const highFashionSerif = Bodoni_Moda({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const interfaceSans = Space_Grotesk({
  variable: '--font-interface',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const technicalMono = Space_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AVERON // THE DIGITAL FLAGSHIP — UNIFORM FOR THE UNDEFINED',
  description:
    'Award-level experimental streetwear flagship, digital fashion exhibition, and permanent uniform archive.',
  icons: {
    icon: '/brand/averon-logo-transparent.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${monumentalDisplay.variable} ${highFashionSerif.variable} ${interfaceSans.variable} ${technicalMono.variable} h-full bg-[#080808] text-[#F0EFEB]`}
    >
      <body className="min-h-full flex flex-col bg-[#080808] text-[#F0EFEB] selection:bg-[#F0EFEB] selection:text-[#080808] font-sans relative overflow-x-hidden">
        <SmoothScroll>
          <GridOverlay />
          <CustomCursor />
          <SearchModal />
          <CartDrawer />
          <main className="flex-1 w-full relative">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
