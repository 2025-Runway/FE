'use client';

import { useState } from 'react';
import { CourseTabs } from './course-tabs';
import { PopularCourse } from './popular-course';
import { AICourse } from './ai-course';
import { EmptyDestination } from './empty-destination';

const POPULAR_COURSES = {
  nationwide: [
    {
      id: 1,
      title: '밀양강 자전거길',
      location: '경남 밀양시',
      imageUrl: '/img/home/home.png',
    },
    {
      id: 2,
      title: '밀양강 자전거길',
      location: '경남 밀양시',
      imageUrl: '/img/home/home.png',
    },
    {
      id: 3,
      title: '밀양강 자전거길',
      location: '경남 밀양시',
      imageUrl: '/img/home/home.png',
    },
  ],
  destinations: [
    {
      id: 4,
      title: '제주 올레길',
      location: '제주도',
      imageUrl: '/img/home/home.png',
    },
    {
      id: 5,
      title: '부산 해안길',
      location: '부산광역시',
      imageUrl: '/img/home/home.png',
    },
  ],
};

const AI_RECOMMENDED_COURSES = {
  nationwide: [
    {
      id: 1,
      title: '밀양강 자전거길',
      location: '경남 밀양시',
      imageUrl: '/img/home/home.png',
    },
    {
      id: 2,
      title: '밀양강 자전거길',
      location: '경남 밀양시',
      imageUrl: '/img/home/home.png',
    },
    {
      id: 3,
      title: '밀양강 자전거길',
      location: '경남 밀양시',
      imageUrl: '/img/home/home.png',
    },
  ],
  destinations: [
    {
      id: 4,
      title: '제주 올레길',
      location: '제주도',
      imageUrl: '/img/home/home.png',
    },
    {
      id: 5,
      title: '부산 해안길',
      location: '부산광역시',
      imageUrl: '/img/home/home.png',
    },
  ],
};

export function CourseSection() {
  const [activeTab, setActiveTab] = useState<'nationwide' | 'destinations'>(
    'nationwide',
  );
  const [isLoading, setIsLoading] = useState(false);

  const hasDestination = false;

  const handleTabChange = (tab: 'nationwide' | 'destinations') => {
    if (tab === activeTab) return;

    setActiveTab(tab);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const currentPopularCourses = POPULAR_COURSES[activeTab];
  const currentAICourses = AI_RECOMMENDED_COURSES[activeTab];

  return (
    <section>
      {/* 탭 메뉴 */}
      <CourseTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* 여행지 없으면 Empty 컴포넌트 */}
      {activeTab === 'destinations' && !hasDestination ? (
        <EmptyDestination />
      ) : (
        <>
          {/* 인기 코스 */}
          <div className='mt-8 pl-5'>
            <PopularCourse
              courses={currentPopularCourses}
              isLoading={isLoading}
            />
          </div>

          {/* AI 추천 코스 */}
          <div className='mt-8 pl-5'>
            <AICourse courses={currentAICourses} isLoading={isLoading} />
          </div>
        </>
      )}
    </section>
  );
}
