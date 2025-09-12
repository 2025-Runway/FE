'use client';

import  KakaoLogo from "@/public/svg/login/kakao-logo.svg";
import { useRouter } from "next/navigation";

export function LoginBtnSection() {
    const router = useRouter();

    const handleKakaoLogin = () => {
        const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&scope=profile_nickname`;
        router.push(kakaoLoginUrl);
    }
  return (
    <section className="px-10 z-50 w-full h-auto flex-col-center gap-2">
      <button className="p-2.5 w-full h-auto text-body4 text-gray-0 underline-offset-2 underline hover:text-white000 cursor-pointer">
        로그인 없이 둘러보기
      </button>
      <button className='kakao-btn cursor-pointer' onClick={handleKakaoLogin}>
          <KakaoLogo />
          <span className='kakao-btn-text'>카카오로 시작하기</span>
        </button>
    </section>
  );
}