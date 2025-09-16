import { getUserDataCached } from '@/lib/api/home';
import Image from 'next/image';
import Link from 'next/link';

export async function ProfileImage() {
  const userResponse = await getUserDataCached();
  const profileImageUrl = userResponse?.data?.profileImageUrl;

  return (
    <Link href="/mypage" className='block'>
      <div className='h-11 w-11 rounded-full overflow-hidden bg-gray-200 cursor-pointer hover:opacity-80 transition-opacity'>
        {profileImageUrl ? (
          <Image
            src={profileImageUrl}
            alt='프로필 이미지'
            width={44}
            height={44}
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='bg-black000 h-full w-full' />
        )}
      </div>
    </Link>
  );
}