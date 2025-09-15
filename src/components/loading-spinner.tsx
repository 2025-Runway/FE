import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className='flex-center h-full w-full'>
      <Loader2 className='text-point-400 size-12 animate-spin rounded-full' />
    </div>
  );
}
