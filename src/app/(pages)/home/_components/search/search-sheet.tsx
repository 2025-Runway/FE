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
import { SearchResult } from '@/interfaces/home/home.types';
import { useSearch } from '../../_hooks/use-search';
import { useRecentSearches } from '../../_hooks/use-recent-searches';

export function SearchSheet() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<SearchResult | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { data: searchResponse, isLoading } = useSearch(searchQuery);
  const searchResults = searchResponse?.data?.content || [];

  /**
   * 최근 검색어 관련 훅
   */
  const { recentSearches, addToRecentSearches, removeFromRecentSearches } =
    useRecentSearches();

  const handleCourseClick = (course: SearchResult) => {
    addToRecentSearches(course);
    setSelectedCourse(course);
    setIsDetailOpen(true);
  };

  const handleRemoveSearch = (crsIdx: string) => {
    removeFromRecentSearches(crsIdx);
  };

  const handleSheetOpenChange = (open: boolean) => {
    // Sheet가 열릴 때 검색어 초기화
    if (open) {
      setSearchQuery('');
    }
  };

  const hasSearchQuery = searchQuery.trim().length > 0;
  const displayResults = hasSearchQuery ? searchResults : recentSearches;

  return (
    <Sheet onOpenChange={handleSheetOpenChange}>
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
              results={displayResults}
              onCourseClick={handleCourseClick}
              isLoading={isLoading && hasSearchQuery}
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
