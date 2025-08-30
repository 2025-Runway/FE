import type { Metadata } from 'next';
import '@/styles/globals.css';
import NavigationBar from '@/components/navigation-bar';

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
        {/* Pretendard 웹폰트 CDN 설정 */}
        <link
          rel='stylesheet'
          as='style'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-dynamic-subset.css'
          crossOrigin='anonymous'
        />
        {/* viewport 설정 */}
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
        />
      </head>
      <body className='select-none antialiased mobile-area h-screen bg-gray-1'>
        <main className='pb-16 w-full h-full bg-gray-bg'>
          {children}
          <NavigationBar />
        </main>
      </body>
    </html>
  );
}
