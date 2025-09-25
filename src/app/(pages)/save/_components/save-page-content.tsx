import { FavoriteCoursesByRegion } from '@/interfaces/save/save.types';
import { EmptySave } from './empty-save';
import { RegionCoursesList } from './region-courses-list';

export function SavePageContent({
  favoriteCourses,
}: {
  favoriteCourses: FavoriteCoursesByRegion[];
}) {
  const hasAnyCourses = favoriteCourses && favoriteCourses.length > 0;

  if (!hasAnyCourses) {
    return <EmptySave />;
  }

  return <RegionCoursesList regions={favoriteCourses} />;
}
