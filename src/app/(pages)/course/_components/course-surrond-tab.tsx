import RestaurantIcon from '@/public/svg/home/restaurant.svg';
import TourIcon from '@/public/svg/home/tour.svg';
import CultureIcon from '@/public/svg/home/culture.svg';
import LeportsIcon from '@/public/svg/home/leports.svg';
import ShoppingIcon from '@/public/svg/home/shopping.svg';
import HotelIcon from '@/public/svg/home/hotel.svg';
import FestivalIcon from '@/public/svg/home/festival.svg';
import { useState } from 'react';
import { cn } from '@/utils/cn';

const TAB_LIST = [
  {
    icon: null,
    name: '전체',
  },
  {
    icon: RestaurantIcon,
    name: '음식점',
  },
  {
    icon: TourIcon,
    name: '관광지',
  },
  {
    icon: CultureIcon,
    name: '문화시설',
  },
  {
    icon: FestivalIcon,
    name: '축제/공연/행사',
  },
  {
    icon: LeportsIcon,
    name: '레포츠',
  },
  {
    icon: HotelIcon,
    name: '숙박',
  },
  {
    icon: ShoppingIcon,
    name: '쇼핑',
  },
];

export function CourseSurrondTab() {
  const [activeTab, setActiveTab] = useState(TAB_LIST[0]);
  return (
    <nav className='px-6 pt-3 pb-4 w-auto h-auto flex items-center justify-start gap-2 overflow-x-auto scrollbar-hide'>
      {TAB_LIST.map(item => (
        <span
          key={item.name}
          className={cn(
            'flex-shrink-0 px-4 py-2 w-auto h-auto flex items-center gap-2 rounded-[20px] border-2 border-gray-3 transition-all duration-300',
            activeTab.name === item.name && 'bg-point-000 border-point-400 ',
          )}
          onClick={() => setActiveTab(item)}
        >
          {item.icon && <item.icon />}
          <span
            className={cn(
              'text-[14px] font-medium text-gray-3 leading-[19.6px]',
              activeTab.name === item.name && 'text-point-400 font-bold',
            )}
          >
            {item.name}
          </span>
        </span>
      ))}
    </nav>
  );
}
