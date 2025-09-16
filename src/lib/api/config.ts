export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? '/api',
  // defaultHeaders: {
  //   'Content-Type': 'application/json',
  // },
  // Query 전용 설정
  query: {
    defaultCache: 'force-cache' as RequestCache,
    defaultRevalidate: 3600, // 1시간
  },
  // Mutation 전용 설정
  mutation: {
    defaultCache: 'no-store' as RequestCache,
    timeout: 10000, // 10초
  },
} as const;
