import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className='w-full h-full flex-center'>
      <Loader2 className='size-12 text-point-400 rounded-full animate-spin' />
    </div>
  );
}
