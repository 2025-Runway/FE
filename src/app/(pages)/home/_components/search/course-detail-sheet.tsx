import { ChevronLeft } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Course } from '@/interfaces/course.types';

interface CourseDetailSheetProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

export function CourseDetailSheet({
  course,
  isOpen,
  onClose,
}: CourseDetailSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side='left' className='w-full p-0'>
        <SheetHeader className='p-0'>
          <SheetTitle className='sr-only'>검색</SheetTitle>
          <div className='flex items-center gap-3 px-4'>
            <SheetClose asChild>
              <ChevronLeft className='text-gray-bk h-[52px]' />
            </SheetClose>
            <div className='flex flex-1 items-center'>
              <span className='text-body1'>{course.title}</span>
            </div>
          </div>
        </SheetHeader>
        <div></div>
      </SheetContent>
    </Sheet>
  );
}
