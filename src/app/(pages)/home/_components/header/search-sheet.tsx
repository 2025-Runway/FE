'use client';

import { useState } from 'react';
import { Search, ChevronLeft, X } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const RECENT_SEARCHES = [
  { id: 1, title: '밀양강 자전거길', location: '경남 밀양시' },
  { id: 2, title: '밀양강 자전거길', location: '경남 밀양시' },
  { id: 3, title: '밀양강 자전거길', location: '경남 밀양시' },
  { id: 4, title: '밀양강 자전거길', location: '경남 밀양시' },
];

export function SearchSheet() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Sheet>
      <SheetTrigger className='flex w-full cursor-pointer items-center rounded-[24px] bg-white/40 px-4 py-[10px]'>
        <Search className='mr-2 size-6 text-white' />
        <span className='text-white000 text-[16px]'>Search</span>
      </SheetTrigger>
      <SheetContent side='left' className='w-full p-0'>
        <SheetHeader className='p-0'>
          <SheetTitle className='sr-only'>검색</SheetTitle>
          <div className='flex items-center gap-3 px-4 py-[6pxr]'>
            <SheetClose asChild>
              <button>
                <ChevronLeft className='text-gray-bk w-[52px]s h-[52px]' />
              </button>
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

        {/* Content */}
        <div className='p-5'>
          <div className='text-title2 mb-[2px]'>최근 검색어</div>

          <div className='flex flex-col'>
            {RECENT_SEARCHES.map(item => (
              <div
                key={item.id}
                className='border-gray-1 flex items-center justify-between border-b-1 py-4'
              >
                <div className='flex flex-col gap-1'>
                  <p className='text-body1'>{item.title}</p>
                  <p className='text-body4'>{item.location}</p>
                </div>
                <button className='p-1'>
                  <X className='text-gray-3 h-5 w-5' />
                </button>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
