import { cn } from '@/utils/cn';
import { ChevronLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  className?: string;
  isLeftIcon?: boolean;
  onClickLeftIcon?: () => void;
}

export function PageHeader({
  title,
  className,
  isLeftIcon = false,
  onClickLeftIcon
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'relative mt-[6px] mb-1 flex h-[52px] shrink-0 items-center justify-center',
        className,
      )}
    >
      {isLeftIcon && (
        <button
          onClick={onClickLeftIcon}
          className="absolute left-4 flex items-center justify-center w-8 h-8"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      <p className='text-title1'>{title}</p>
    </header>
  );
}
