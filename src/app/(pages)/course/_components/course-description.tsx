import { formatDescriptionWithIndent } from '@/utils/text-formatter';

export function CourseDescription({ description }: { description: string }) {
  const formattedDescription = formatDescriptionWithIndent(description);
  return (
    <div className='flex w-full flex-col items-start gap-2 px-5'>
      <h2 className='text-title2 text-gray-bk'>코스 정보</h2>
      <p className='text-body5 text-gray-bk pb-2'>{formattedDescription}</p>
    </div>
  );
}
