'use client';

import { toast } from 'sonner';

export function ProfileEditBtn() {
  return (
    <button
      className='text-[14px] font-medium text-gray-3 text-center cursor-pointer'
      onClick={() => {
        toast.success('프로필 편집');
      }}
    >
      프로필 편집
    </button>
  );
}
