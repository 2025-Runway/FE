interface CourseTabsProps {
  activeTab: 'nationwide' | 'destinations';
  onTabChange: (tab: 'nationwide' | 'destinations') => void;
}

const tabs = [
  { id: 'nationwide' as const, label: '전국 보기' },
  { id: 'destinations' as const, label: '여행지 보기' },
];

export default function CourseTabs({
  activeTab,
  onTabChange,
}: CourseTabsProps) {
  return (
    <div className='border-gray-2 relative flex border-b px-5'>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 pb-3 text-center text-[16px] font-extrabold transition-colors duration-200 ${
            activeTab === tab.id ? 'text-gray-bk' : 'text-gray-2'
          }`}
        >
          {tab.label}
        </button>
      ))}

      <div
        className={`bg-gray-bk absolute bottom-0 h-[2px] transition-all duration-300 ease-in-out ${
          activeTab === 'nationwide' ? 'right-1/2 left-5' : 'right-5 left-1/2'
        }`}
      />
    </div>
  );
}
