export function CourseDescription({ description }: { description: string }) {
  return (
    <div className='px-5 w-full flex flex-col gap-2 items-start'>
      <h2 className='text-title2 text-gray-bk'>코스 정보</h2>
      <p className='pb-2 text-body5 text-gray-bk whitespace-pre-line'>
        {description}
      </p>
    </div>
  );
}
