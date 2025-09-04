import RestaurantIcon from '@/public/svg/course/restaurant.svg';
import RestaurantActiveIcon from '@/public/svg/course/restaurant-active.svg';
import TourIcon from '@/public/svg/course/tour.svg';
import TourActiveIcon from '@/public/svg/course/tour-active.svg';
import CultureIcon from '@/public/svg/course/culture.svg';
import CultureActiveIcon from '@/public/svg/course/culture-active.svg';
import LeportsIcon from '@/public/svg/course/leports.svg';
import LeportsActiveIcon from '@/public/svg/course/leports-active.svg';
import ShoppingIcon from '@/public/svg/course/shopping.svg';
import ShoppingActiveIcon from '@/public/svg/course/shopping-active.svg';
import HotelIcon from '@/public/svg/course/hotel.svg';
import HotelActiveIcon from '@/public/svg/course/hotel-active.svg';
import FestivalIcon from '@/public/svg/course/festival.svg';
import FestivalActiveIcon from '@/public/svg/course/festival-active.svg';
import { useState } from 'react';
import { cn } from '@/utils/cn';

const TAB_LIST = [
  {
    icon: null,
    name: '전체',
  },
  {
    icon: RestaurantIcon,
    activeIcon: RestaurantActiveIcon,
    name: '음식점',
  },
  {
    icon: TourIcon,
    activeIcon: TourActiveIcon,
    name: '관광지',
  },
  {
    icon: CultureIcon,
    activeIcon: CultureActiveIcon,
    name: '문화시설',
  },
  {
    icon: FestivalIcon,
    activeIcon: FestivalActiveIcon,
    name: '축제/공연/행사',
  },
  {
    icon: LeportsIcon,
    activeIcon: LeportsActiveIcon,
    name: '레포츠',
  },
  {
    icon: HotelIcon,
    activeIcon: HotelActiveIcon,
    name: '숙박',
  },
  {
    icon: ShoppingIcon,
    activeIcon: ShoppingActiveIcon,
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
          {!item.icon ? null : activeTab.name === item.name ? (
            <item.activeIcon />
          ) : (
            <item.icon />
          )}
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
