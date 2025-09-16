'use client';

import { useState } from 'react';
import { Search, ChevronLeft } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { CourseDetailSheet } from './course-detail-sheet';
import { SearchRecentList } from './search-recent-list';
import { SearchResultList } from './search-result-list';
import { Course } from '@/interfaces/course/course.types';

const RECENT_SEARCHES: Course[] = [
  {
    id: 1,
    title: '밀양강 자전거길',
    location: '경남 밀양시',
  },
  {
    id: 2,
    title: '밀양강 자전거길',
    location: '경남 밀양시',
  },
  {
    id: 3,
    title: '밀양강 자전거길',
    location: '경남 밀양시',
  },
  {
    id: 4,
    title: '밀양강 자전거길',
    location: '경남 밀양시',
  },
];

export function SearchSheet() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [recentSearches, setRecentSearches] =
    useState<Course[]>(RECENT_SEARCHES);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsDetailOpen(true);
  };

  const handleRemoveSearch = (id: number) => {
    setRecentSearches(prev => prev.filter(search => search.id !== id));
  };

  const filteredResults = recentSearches.filter(
    item =>
      item.title.includes(searchQuery) || item.location.includes(searchQuery),
  );

  return (
    <Sheet>
      <SheetTrigger className='flex w-full cursor-pointer items-center rounded-[24px] bg-white/40 px-4 py-[10px]'>
        <Search className='mr-2 size-6 text-white' />
        <span className='text-white000 text-[16px]'>Search</span>
      </SheetTrigger>

      <SheetContent side='left' className='w-full p-0'>
        <SheetHeader className='p-0'>
          <SheetTitle className='sr-only'>검색</SheetTitle>
          <div className='flex items-center gap-3 px-4 py-[6px]'>
            <SheetClose asChild>
              <ChevronLeft className='text-gray-bk h-[52px]' />
            </SheetClose>
            <div className='bg-gray-0 flex flex-1 items-center rounded-[24px] px-4 py-2'>
              <Search className='text-gray-3 mr-2 h-5 w-5' />
              <input
                type='text'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder='Search'
                className='text-gray-bk placeholder-gray-3 flex-1 bg-transparent text-[16px] outline-none'
                autoFocus
              />
            </div>
          </div>
        </SheetHeader>

        <div className='p-5'>
          {!searchQuery ? (
            <SearchRecentList
              searches={recentSearches}
              onRemoveSearch={handleRemoveSearch}
            />
          ) : (
            <SearchResultList
              results={filteredResults}
              onCourseClick={handleCourseClick}
            />
          )}
        </div>
      </SheetContent>

      {selectedCourse && (
        <CourseDetailSheet
          course={selectedCourse}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
        />
      )}
    </Sheet>
  );
}
