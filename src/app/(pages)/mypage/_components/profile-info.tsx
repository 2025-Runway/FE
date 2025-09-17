'use client';

import { LogoutDialog } from '@/components/logout-dialog';
import { useQuery } from '@tanstack/react-query';
import { UserIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function ProfileInfo() {
  const [role, setRole] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  useEffect(() => {
    const currentRole = localStorage.getItem('role');
    const nickname = localStorage.getItem('nickname');
    setRole(currentRole ?? '');
    setNickname(nickname ?? '');
  }, []);

  const { data: guestInfo } = useQuery({
    queryKey: ['guest-info'],
    queryFn: () => {
      const currentRole = localStorage.getItem('role');

      if (currentRole === 'guest') {
        return {
          profileImageUrl: '/img/mypage/guest.png',
          nickname: '게스트',
        };
      }
      return null;
    },
    enabled: !!role,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return (
    <div className='flex-col-center h-auto w-full flex-shrink-0 gap-4 px-5 pt-15 pb-5'>
      <div className='relative size-27 overflow-hidden rounded-full'>
        {guestInfo?.profileImageUrl ? (
          <Image
            src={guestInfo?.profileImageUrl}
            alt='profile'
            fill
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='bg-gray-1 flex-center h-full w-full rounded-full'>
            <UserIcon className='text-gray-4 size-16' />
          </div>
        )}
      </div>
      <p className='text-heading1 text-gray-bk'>
        {guestInfo?.nickname ?? nickname}
        <span className='text-gray-4'>님</span>
      </p>
      <LogoutDialog />
    </div>
  );
}
