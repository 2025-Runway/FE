import Image from 'next/image';

interface CourseCardProps {
  title: string;
  location: string;
  imageUrl: string;
}

export default function CourseCard({
  title,
  location,
  imageUrl,
}: CourseCardProps) {
  return (
    <div className='relative h-[196px] w-[168px] flex-shrink-0 overflow-hidden rounded-[20px]'>
      <Image
        src={imageUrl}
        alt={`${title} 코스 이미지`}
        fill
        className='object-cover'
      />

      <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />

      <div className='absolute bottom-4 left-4 text-white'>
        <p className='text-white000 text-[18px] leading-[140%] font-bold'>
          {title}
        </p>
        <p className='text-white000 text-[14px] font-light'>{location}</p>
      </div>
    </div>
  );
}
