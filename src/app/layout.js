'use client';
import { usePathname } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const noNavbarRoutes = ['/login', '/signup']; // Add more if needed

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showNavbar = !noNavbarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {showNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}
