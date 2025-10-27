import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CourseCardProps {
  title: string;
  location: string;
  imageUrl: string;
  crsIdx: string;
}

export function CourseCard({
  title,
  location,
  imageUrl,
  crsIdx,
}: CourseCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/course/${crsIdx}`);
  };

  return (
    <div
      className='relative h-[196px] w-[168px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[20px] transition-transform hover:scale-105'
      onClick={handleClick}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`${title} 코스 이미지`}
          fill
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='object-cover'
        />
      ) : (
        <div className='bg-gray-1 h-full w-full' />
      )}

      <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />

      <div className='absolute bottom-4 px-4 break-keep text-white'>
        <p className='text-white000 text-[18px] leading-[140%] font-bold'>
          {title}
        </p>
        <p className='text-white000 text-[14px] font-light'>{location}</p>
      </div>
    </div>
  );
}
