import { useState, useEffect } from 'react';
import { getCourseTourInfo } from '@/lib/api/courses';
import { CourseTourInfoData } from '@/interfaces/course/tour-info.types';

export function useTourInfo(
  course_id: string,
  contentType: string,
  page: number,
) {
  const [data, setData] = useState<CourseTourInfoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await getCourseTourInfo(course_id, contentType, page);
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [course_id, contentType, page]);

  return { data, loading, error };
}
