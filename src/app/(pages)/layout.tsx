import type { Metadata } from 'next';
import '@/styles/globals.css';
import NavigationBar from '@/components/navigation-bar';
import { GlobalProvider } from '@/components/provider/global-provider';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Runway',
  description: '여행 코스 추천 서비스',
  keywords: [
    'Runway',
    'running',
    'trip',
    'course',
    'recommend',
    '여행',
    '코스',
    '추천',
    '서비스',
    'runway',
  ],
  openGraph: {
    title: 'Runway',
    description: '여행 코스 추천 서비스',
    type: 'website',
    siteName: 'Runway',
    url: 'https://runway.site',
    locale: 'ko-KR',
    countryName: '대한민국',
    images: [
      {
        url: 'https://runway.site/img/og/og-image.png',
        width: 1200,
        height: 630,
        alt: '여행 코스 추천 서비스',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Runway',
    description: '여행 코스 추천 서비스',
    images: ['https://runway.site/img/og/og-image.png'],
    creator: '@runway',
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Runway', url: 'https://runway.site' }],
  creator: 'Runway',
  publisher: 'Runway',
  category: 'technology',
  applicationName: 'Runway',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.json',
  themeColor: '#fa502e',
  appleWebApp: {
    title: 'Runway',
    statusBarStyle: 'default',
  },
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

        <Script
          type='text/javascript'
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_X_NCP_APIGW_API_KEY_ID}&submodules=geocoder`}
        />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body className='bg-gray-bg h-screen w-screen antialiased'>
        <GlobalProvider>
          <main className='bg-gray-bg mobile-area scrollbar-hide h-full overflow-y-auto pb-16'>
            {children}
            <NavigationBar />
          </main>
        </GlobalProvider>
      </body>
    </html>
  );
}
