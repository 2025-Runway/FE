import type { Metadata } from 'next';
import '@/styles/globals.css';
import NavigationBar from '@/components/navigation-bar';
import { Toaster } from 'sonner';
import { GlobalProvider } from '@/components/provider/global-provider';

export const metadata: Metadata = {
  title: 'Runway',
  description: 'Runway',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        {/* viewport 설정 */}
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
        />
      </head>
      <body className='mobile-area bg-gray-1 h-screen antialiased select-none'>
        <GlobalProvider>
          <main className='bg-gray-bg h-full w-full pb-16'>
            {children}
            <NavigationBar />
          </main>
        </GlobalProvider>
      </body>
    </html>
  );
}
