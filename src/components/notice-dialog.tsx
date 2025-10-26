'use client';

import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface NoticeDialogProps {
  title: string;
  description: string;
  storageKey?: string;
}

export function NoticeDialog({
  title,
  description,
  storageKey = 'notice-dismissed',
}: NoticeDialogProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissedDate = localStorage.getItem(storageKey);
    const today = new Date().toDateString();

    if (dismissedDate !== today) {
      setOpen(true);
    }
  }, [storageKey]);

  const handleDismissToday = () => {
    const today = new Date().toDateString();
    localStorage.setItem(storageKey, today);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className='rounded-3 max-w-[calc(100%-5rem)]'>
        <AlertDialogHeader className='gap-4 sm:text-center'>
          <AlertDialogTitle className='text-title1'>{title}</AlertDialogTitle>
          <AlertDialogDescription className='text-body4 whitespace-pre-line'>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex w-full flex-col gap-4 sm:flex-col'>
          <AlertDialogAction
            onClick={handleClose}
            className='bg-point-400 text-title4 rounded-3 w-full text-white'
          >
            확인
          </AlertDialogAction>
          <button
            onClick={handleDismissToday}
            className='text-caption2 underline'
          >
            오늘은 그만보기
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
