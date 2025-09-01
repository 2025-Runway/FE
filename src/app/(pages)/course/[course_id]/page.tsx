interface CoursePageProps {
  params: {
    course_id: Promise<string>;
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { course_id } = await params;

  return <div>CoursePage</div>;
}
