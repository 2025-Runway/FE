'use client';

import Image from 'next/image';
import LeftArrowIcon from '@/public/svg/course/course-left-arrow.svg';
import { useRouter } from 'next/navigation';

interface CourseImageProps {
  imageUrl: string;
}

export function CourseImage() {
  const router = useRouter();

  return (
    <div className='relative w-full h-auto aspect-[402/280] overflow-hidden'>
      <Image
        src={'/img/course/course-detail-preview.png'}
        alt='course-image'
        fill
        sizes='100%'
        priority
        className='object-cover'
      />
      <span
        className='absolute top-3 left-4 size-13 rounded-full bg-white/20 flex-center'
        onClick={() => router.back()}
      >
        <LeftArrowIcon />
      </span>
    </div>
  );
}
