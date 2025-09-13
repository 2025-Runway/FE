'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import HomeActive from '@/public/svg/navigation/home-active.svg';
import HomeInactive from '@/public/svg/navigation/home-inactive.svg';
import WeatherActive from '@/public/svg/navigation/weather-active.svg';
import WeatherInactive from '@/public/svg/navigation/weather-inactive.svg';
import ContestActive from '@/public/svg/navigation/contest-active.svg';
import ContestInactive from '@/public/svg/navigation/contest-inactive.svg';
import SaveActive from '@/public/svg/navigation/save-active.svg';
import SaveInactive from '@/public/svg/navigation/save-inactive.svg';
import MyPageActive from '@/public/svg/navigation/mypage-active.svg';
import MyPageInactive from '@/public/svg/navigation/mypage-inactive.svg';

interface NavItem {
  href: string;
  label: string;
  key: string;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: '/home',
    activeIcon: <HomeActive />,
    inactiveIcon: <HomeInactive />,
    label: '홈',
    key: 'home',
  },
  {
    href: '/weather',
    activeIcon: <WeatherActive />,
    inactiveIcon: <WeatherInactive />,
    label: '날씨',
    key: 'weather',
  },
  {
    href: '/contest',
    activeIcon: <ContestActive />,
    inactiveIcon: <ContestInactive />,
    label: '러닝 대회',
    key: 'contest',
  },
  {
    href: '/save',
    activeIcon: <SaveActive />,
    inactiveIcon: <SaveInactive />,
    label: '찜',
    key: 'save',
  },
  {
    href: '/mypage',
    activeIcon: <MyPageActive />,
    inactiveIcon: <MyPageInactive />,
    label: '마이페이지',
    key: 'mypage',
  },
];

export default function NavigationBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };
  if (pathname === '/login') {
    return null;
  }

  return (
    <nav className='bg-gray-bg border-gray-1 mobile-area fixed right-0 bottom-0 left-0 border-t'>
      <div className='grid h-16 grid-cols-5 px-5 pt-1 pb-2'>
        {navItems.map(item => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'flex-center text-gray-3 w-auto flex-col text-[10px]',
                active && 'text-gray-bk',
              )}
            >
              {/* 아이콘 영역 */}
              <span className='flex-center h-9 w-11 pt-2'>
                {active ? item.activeIcon : item.inactiveIcon}
              </span>

              {/* 텍스트 라벨 */}
              <span className='text-center text-[10px]'>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
