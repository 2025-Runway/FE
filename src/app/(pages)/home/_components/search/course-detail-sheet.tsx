import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { SearchResult, CourseDetail } from '@/interfaces/home/home.types';
import { getCourseDetail } from '@/lib/api/home';
import { SearchCourseMap } from './search-course-map';

interface CourseDetailSheetProps {
  course: SearchResult;
  isOpen: boolean;
  onClose: () => void;
}

export function CourseDetailSheet({
  course,
  isOpen,
  onClose,
}: CourseDetailSheetProps) {
  const router = useRouter();
  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 코스 상세 정보 가져오기
  useEffect(() => {
    if (!isOpen || !course.crsIdx) return;

    const fetchCourseDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getCourseDetail(course.crsIdx);
        setCourseDetail(response.data);
      } catch (err) {
        console.error('코스 상세 정보 로드 실패:', err);
        setError('코스 정보를 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetail();
  }, [isOpen, course.crsIdx]);

  const handleDetailView = () => {
    router.push(`/course/${course.crsIdx}`);
    onClose();
  };

  const renderMapContent = () => {
    if (isLoading) {
      return (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
          <div className='text-center'>
            <div className='mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent' />
            <p className='text-gray-600'>코스 정보를 불러오는 중...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
          <p className='text-center text-red-500'>{error}</p>
        </div>
      );
    }

    if (courseDetail?.gpxPath) {
      return <SearchCourseMap gpxUrl={courseDetail.gpxPath} />;
    }

    return (
      <div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
        <p className='text-gray-600'>지도 정보가 없습니다</p>
      </div>
    );
  };

  const courseTitle = courseDetail?.crsName || course.crsName;
  const courseDescription =
    courseDetail?.content || '남쪽의 쪽빛 바다와 함께 걷는 길';

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side='left' className='flex h-full w-full flex-col p-0'>
        <SheetHeader className='sr-only'>
          <SheetTitle>{courseTitle}</SheetTitle>
        </SheetHeader>

        {/* 상단 헤더 */}
        <header className='z-10 flex-shrink-0 bg-white'>
          <div className='flex h-[52px] items-center gap-3 px-4 py-3'>
            <SheetClose asChild>
              <ChevronLeft className='text-gray-bk h-6 w-6 cursor-pointer' />
            </SheetClose>
            <div className='flex flex-1 items-center'>
              <span className='text-body1 font-semibold'>{courseTitle}</span>
            </div>
          </div>
        </header>

        {/* 지도 영역 */}
        <main className='relative flex-1'>{renderMapContent()}</main>

        {/* 하단 정보 드로어 */}
        <aside className='absolute right-0 bottom-0 left-0 z-50 rounded-t-2xl bg-white shadow-lg'>
          <div className='flex justify-center pt-3 pb-2'>
            <div className='h-1 w-10 rounded-full bg-gray-300' />
          </div>
          {/* 코스 정보 */}
          <div className='px-5 pb-6'>
            <h2 className='text-title1 text-black'>{courseTitle}</h2>
            <p className='text-body2 text-gray-4'>{courseDescription}</p>

            <button
              onClick={handleDetailView}
              className='bg-point-400 text-title3 mt-5 w-full rounded-[12px] py-3 font-semibold text-white'
            >
              자세히 보기
            </button>
          </div>
        </aside>
      </SheetContent>
    </Sheet>
  );
}
