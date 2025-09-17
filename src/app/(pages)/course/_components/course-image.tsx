'use client';

import Image from 'next/image';
import LeftArrowIcon from '@/public/svg/course/course-left-arrow.svg';
import { useRouter } from 'next/navigation';

interface CourseImageProps {
  imageUrl: string;
}

export function CourseImage({ imageUrl }: CourseImageProps) {
  const router = useRouter();

  return (
    <div className='bg-gray-1 relative aspect-[402/280] h-auto w-full overflow-hidden'>
      <Image
        src={imageUrl}
        alt='course-image'
        fill
        sizes='100%'
        priority
        className='object-cover'
      />
      <span
        className='flex-center bg-point-400/50 absolute top-3 left-4 size-13 cursor-pointer rounded-full'
        onClick={() => router.back()}
      >
        <LeftArrowIcon />
      </span>
    </div>
  );
}
