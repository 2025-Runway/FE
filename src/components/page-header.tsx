import { cn } from '@/utils/cn';

interface PageHeaderProps {
  title: string;
  className?: string;
}

export function PageHeader({ title, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        'relative mt-[6px] mb-1 flex h-[52px] shrink-0 items-center justify-center',
        className,
      )}
    >
      <p className='text-title1'>{title}</p>
    </header>
  );
}
