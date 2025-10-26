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
        'border-gray-0 bg-gray-bg mobile-area fixed top-0 right-0 left-0 z-50 flex h-[62px] flex-col items-center justify-center border-b-4 pt-1.5 pb-1',
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
