'use client';

import { cn } from '@/utils/cn';
import { TAB_LIST, useTourTab } from '../../_hooks/use-tour-tab';

export function CourseSurrondTab() {
  const { activeTab, setActiveTab } = useTourTab();

  const handleTabClick = (tab: string) => {
    void setActiveTab(tab);
    const scrollContainer = document.getElementById(
      'tour-info-scroll-container',
    );

    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <nav className='scrollbar-hide flex h-auto w-auto items-center justify-start gap-2 overflow-x-auto px-6 pt-3 pb-4'>
      {TAB_LIST.map(item => (
        <button
          key={item.name}
          className={cn(
            'border-gray-3 flex h-auto w-auto flex-shrink-0 cursor-pointer items-center gap-2 rounded-[20px] border-2 px-4 py-2 transition-all duration-300',
            activeTab === item.name && 'bg-point-000 border-point-400',
          )}
          onClick={() => handleTabClick(item.name)}
        >
          {!item.icon ? null : activeTab === item.name ? (
            <item.activeIcon />
          ) : (
            <item.icon />
          )}
          <span
            className={cn(
              'text-gray-3 text-[14px] leading-[19.6px] font-medium',
              activeTab === item.name && 'text-point-400 font-bold',
            )}
          >
            {item.name}
          </span>
        </button>
      ))}
    </nav>
  );
}
