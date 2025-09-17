'use client';

import { api } from '@/lib/api';
import KakaoLogo from '@/public/svg/login/kakao-logo.svg';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function LoginBtnSection() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&scope=profile_nickname`;
    router.push(kakaoLoginUrl);
  };
  const handleGuestLogin = async () => {
    const result = await api.post<{ accessToken: string }>('/auth/test', {
      data: {
        email: 'test@run-way.site',
      },
    });
    if (result.data?.accessToken) {
      await fetch('/api/cookie-set', {
        method: 'POST',
        body: JSON.stringify({
          token: result.data?.accessToken,
        }),
      });
      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('role', 'guest');
      router.push('/home');
    }
  };
  return (
    <section className='flex-col-center z-50 h-auto w-full gap-2 px-10'>
      <button
        className='text-body4 text-gray-0 hover:text-white000 h-auto w-full cursor-pointer p-2.5 underline underline-offset-2'
        onClick={handleGuestLogin}
      >
        게스트로 로그인하기
      </button>
      <button className='kakao-btn cursor-pointer' onClick={handleKakaoLogin}>
        <KakaoLogo />
        <span className='kakao-btn-text'>카카오로 시작하기</span>
      </button>
    </section>
  );
}
