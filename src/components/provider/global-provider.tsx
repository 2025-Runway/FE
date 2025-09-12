'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import React from 'react';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from 'sonner';

// QueryClient 인스턴스를 컴포넌트 외부에서 생성하여 재생성 방지
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true, // macOS 네트워크 재연결 시 위치 재요청 허용
      staleTime: 5 * 60 * 1000,
      // Geolocation 전용 설정
      retry: (failureCount, error) => {
        // Geolocation 오류는 특별 처리
        if (error?.message?.includes('위치')) {
          return failureCount < 2;
        }
        return failureCount < 3;
      },
    },
  },
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        {children}
        <Analytics />
        <Toaster />
      </NuqsAdapter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
