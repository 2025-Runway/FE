'use client';

import { LoadingSpinner } from '@/components/loading-spinner';
import { api } from '@/lib/api';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const [isLoading, setIsLoading] = useState(false);

  console.log(code);

  if (!code) {
    console.error('No authorization code received');
    redirect('/login?error=no_code');
  }
  const handleKakaoLogin = async (): Promise<string> => {
    const result = await api.post<{ accessToken: string }>(
      '/auth/kakao/login',
      {
        data: {
          authorizationCode: code,
        },
      },
    );
    if (!result.success) {
      console.error('Failed to set cookie:', result.message);
      redirect('/login?error=cookie_failed');
    }
    return result.data?.accessToken!;
  };
  useEffect(() => {
    let isMounted = true;
    void (async () => {
      void setIsLoading(true);
      try {
        await handleKakaoLogin();
      } finally {
        if (!isMounted) return;
        void setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [code]);

  return <LoadingSpinner />;
}
