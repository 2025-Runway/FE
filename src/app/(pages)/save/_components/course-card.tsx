'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import Image from 'next/image';

interface CourseCardProps {
  title: string;
  location: string;
  imageUrl: string;
  crsIdx: string;
  className?: string;
}

export function CourseCard({
  title,
  location,
  imageUrl,
  crsIdx,
  className,
}: CourseCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/course/${crsIdx}`);
  };

  // 이미지 URL 유효성 검사
  const hasValidImage = imageUrl && imageUrl.trim() !== '';

  return (
    <div
      className={cn(
        'relative cursor-pointer overflow-hidden rounded-2xl transition-transform hover:scale-101',
        !hasValidImage && 'bg-black',
        className,
      )}
      onClick={handleClick}
    >
      {hasValidImage && (
        <Image
          src={imageUrl}
          alt={title}
          fill
          className='h-full w-full object-cover'
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      )}
      <div className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent p-4'>
        <h3 className='text-title2 text-white'>{title}</h3>
        <p className='text-body4 text-white'>{location}</p>
      </div>
    </div>
  );
}
