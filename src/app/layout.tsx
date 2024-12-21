'use client';
import { Geist } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ListTodo } from 'lucide-react';
import Link from 'next/link';
import { APP_NAME, ROUTES } from '@/constants';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'sonner';

const geist = Geist({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={geist.className}>
        <Providers>
          <div className='min-h-screen flex flex-col bg-background'>
            {/* Header */}
            <Navbar
              maxWidth='xl'
              position='sticky'
              className='bg-background/60 backdrop-blur-lg backdrop-saturate-150'
            >
              <NavbarBrand>
                <Link href={ROUTES.HOME} className='flex items-center gap-2'>
                  <div className='p-2 rounded-xl bg-primary/10'>
                    <ListTodo className='h-5 w-5 text-primary' />
                  </div>
                  <p className='font-bold text-xl bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent'>
                    {APP_NAME}
                  </p>
                </Link>
              </NavbarBrand>
              <NavbarContent justify='end'>
                <ThemeToggle />
              </NavbarContent>
            </Navbar>

            {/* Main Content */}
            <main className='flex-1 container mx-auto px-6 py-8 max-w-[1200px]'>
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--background)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
