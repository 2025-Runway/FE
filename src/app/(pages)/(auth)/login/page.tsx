import Image from 'next/image';
import LoginLogo from '@/public/svg/login/login-logo.svg';
import { LoginIntroTextEffect } from '../_components/login-intro-text-effect';
import { LoginBtnSection } from '../_components/login-btn-section';

export default function LoginPage() {
  return (
    <>
      {/* login page background image */}
      <div className='mobile-area fixed inset-0 h-screen'>
        <div className='relative h-full w-full'>
          <Image
            src='/img/login/login-background.png'
            alt='login background'
            fill
            priority
            className='h-full w-full object-cover'
          />
        </div>
      </div>
      {/* login logo */}
      <div className='mobile-area flex-center fixed top-27'>
        <LoginLogo />
      </div>

      <div className='relative h-full w-full'>
        <div className='flex h-full w-full flex-col justify-end gap-9'>
          <LoginIntroTextEffect />
          <LoginBtnSection />
        </div>
      </div>

      {/* login background gradient */}
      <div className='mobile-area fixed bottom-0 h-[50vh] bg-[linear-gradient(0deg,#0B111A_60%,rgba(14,47,47,0)_100%)] opacity-60' />
    </>
  );
}
