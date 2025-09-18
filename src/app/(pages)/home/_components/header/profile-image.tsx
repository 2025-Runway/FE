import { getUserDataCached } from '@/lib/api/home';
import { UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export async function ProfileImage() {
  const userResponse = await getUserDataCached();
  const profileImageUrl = userResponse?.data?.profileImageUrl;

  return (
    <Link href='/mypage' className='block'>
      <div className='h-11 w-11 cursor-pointer overflow-hidden rounded-full bg-gray-200 transition-opacity hover:opacity-80'>
        {profileImageUrl ? (
          <Image
            src={profileImageUrl}
            alt='프로필 이미지'
            width={44}
            height={44}
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='h-full w-full bg-gray-200 p-2'>
            <UserIcon className='text-gray-4 h-full w-full' />
          </div>
        )}
      </div>
    </Link>
  );
}
