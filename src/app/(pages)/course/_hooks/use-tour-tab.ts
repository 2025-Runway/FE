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
import { parseAsStringLiteral, useQueryState } from 'nuqs';

export const TAB_LIST = [
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
    name: '행사/공연/축제',
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
export const useTourTab = () => {
  const [activeTab, setActiveTab] = useQueryState(
    'activeTab',
    parseAsStringLiteral(TAB_LIST.map(item => item.name)).withDefault(
      TAB_LIST[0].name,
    ),
  );
  return { activeTab, setActiveTab };
};
