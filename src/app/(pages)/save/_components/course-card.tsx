import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';

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

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl cursor-pointer transition-transform hover:scale-105',
        className
      )}
      onClick={handleClick}
    >
      <img src={imageUrl} alt={title} className='h-full w-full object-cover' />
      <div className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent p-4'>
        <h3 className='text-title2 text-white'>{title}</h3>
        <p className='text-body4 text-white'>{location}</p>
      </div>
    </div>
  );
}
