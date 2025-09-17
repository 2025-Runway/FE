'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

export function LogoutDialog() {
  const router = useRouter();
  const handleGuestLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });
    router.push('/login');
    localStorage.removeItem('role');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('nickname');
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className='text-title2 text-point-400 border-point-400 hover:bg-point-000 h-auto w-fit cursor-pointer rounded-[12px] border px-10 py-2 transition-all duration-300'>
          로그아웃
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>로그아웃</AlertDialogTitle>
          <AlertDialogDescription className='text-body2 text-gray-4'>
            로그아웃 하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleGuestLogout}
            className='bg-point-400'
          >
            로그아웃
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
