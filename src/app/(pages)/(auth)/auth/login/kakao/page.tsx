'use client';

import { LoadingSpinner } from '@/components/loading-spinner';
import { api } from '@/lib/api';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function LoginKakaoContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!code) {
    console.error('No authorization code received');
    redirect('/login?error=no_code');
  }
  const handleKakaoLogin = async (): Promise<string> => {
    const result = await api.get<{ accessToken: string; nickname: string }>(
      `/auth/login/kakao?code=${code}`,
    );
    if (result.data?.accessToken) {
      await fetch('/api/cookie-set', {
        method: 'POST',
        body: JSON.stringify({
          token: result.data?.accessToken,
        }),
      });
      localStorage.setItem('nickname', result.data.nickname);
      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('role', 'user');
      router.push('/home');
    }
    return result.data?.accessToken ?? '';
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

export default function LoginKakaoPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginKakaoContent />
    </Suspense>
  );
}
