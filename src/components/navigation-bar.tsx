'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import HomeActive from '@/public/svg/navigation/home-active.svg';
import HomeInactive from '@/public/svg/navigation/home-inactive.svg';
import WeatherActive from '@/public/svg/navigation/weather-active.svg';
import WeatherInactive from '@/public/svg/navigation/weather-inactive.svg';
import TravelActive from '@/public/svg/navigation/travel-active.svg';
import TravelInactive from '@/public/svg/navigation/travel-inactive.svg';
import SaveActive from '@/public/svg/navigation/save-active.svg';
import SaveInactive from '@/public/svg/navigation/save-inactive.svg';
import MyPageActive from '@/public/svg/navigation/mypage-active.svg';
import MyPageInactive from '@/public/svg/navigation/mypage-inactive.svg';
import HeartActive from '@/public/svg/course/heart-black.svg';
import HeartInactive from '@/public/svg/course/heart-blank.svg';
import { CourseSurrondInfo } from '@/app/(pages)/course/_components/course-surrond-info';
import React from 'react';
import { toast } from 'sonner';

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
    href: '/travel',
    activeIcon: <TravelActive />,
    inactiveIcon: <TravelInactive />,
    label: '여행기',
    key: 'travel',
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
  const [isSaveActive, setIsSaveActive] = React.useState(false);

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };
  const isCourseDetail = pathname.startsWith('/course');

  const handleSaveClick = () => {
    setIsSaveActive(!isSaveActive);
    toast.success('찜 완료');
  };
  if (isCourseDetail) {
    return (
      <nav className='fixed bottom-0 left-0 right-0 px-4 pt-5 pb-3 h-20 bg-gray-bg border-t border-gray-1 mobile-area flex items-center gap-2'>
        <span
          className='px-2.5 py-1 flex-col-center gap-1'
          onClick={handleSaveClick}
        >
          {isSaveActive ? <HeartActive /> : <HeartInactive />}
          <span className='text-[10px] leading-3 text-gray-bk'>찜</span>
        </span>
        <CourseSurrondInfo />
      </nav>
    );
  }

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-gray-bg border-t border-gray-1 mobile-area'>
      <div className='px-5 grid grid-cols-5 h-16 pt-1 pb-2'>
        {navItems.map(item => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'w-auto flex-center flex-col text-gray-3 text-[10px]',
                active && 'text-gray-bk',
              )}
            >
              {/* 아이콘 영역 */}
              <span className='pt-2 w-11 h-9 flex-center'>
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
