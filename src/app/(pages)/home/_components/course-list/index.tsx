'use client';

import { useState } from 'react';
import { CourseTabs } from './course-tabs';
import { PopularCourse } from './popular-course';
import { AICourse } from './ai-course';
import { EmptyDestination } from './empty-destination';
import { usePopularCourses } from '../../_hooks/use-popular-courses';
import { useRecommendedCourses } from '../../_hooks/use-recommended-courses';

export function CourseSection() {
  const [activeTab, setActiveTab] = useState<'nationwide' | 'destinations'>(
    'nationwide',
  );
  const { data: popularCoursesResponse, isLoading: popularLoading } =
    usePopularCourses(activeTab === 'nationwide');

  const { data: recommendedCoursesResponse, isLoading: recommendedLoading } =
    useRecommendedCourses(activeTab === 'nationwide');

  const popularCourses = popularCoursesResponse?.data || [];
  const recommendedCourses = recommendedCoursesResponse?.data || [];
  const hasDestination = false;

  const handleTabChange = (tab: 'nationwide' | 'destinations') => {
    if (tab === activeTab) return;

    setActiveTab(tab);
  };

  const currentPopularCourses =
    activeTab === 'nationwide' ? popularCourses : [];

  const currentAICourses = activeTab === 'nationwide' ? recommendedCourses : [];

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
              isLoading={popularLoading}
            />
          </div>

          {/* AI 추천 코스 */}
          <div className='mt-8 pl-5'>
            <AICourse
              courses={currentAICourses}
              isLoading={recommendedLoading}
            />
          </div>
        </>
      )}
    </section>
  );
}
