interface ContestDetailsProps {
  period: string;
  organizer: string;
  fees: Array<{
    distance: string;
    price: number;
    label: string;
  }>;
}

export function ContestDetails({ period, organizer, fees }: ContestDetailsProps) {
  return (
    <div className='flex flex-col gap-2 px-6'>
      <div className='flex'>
        <span className='text-body3 text-gray-4 w-16'>접수기간</span>
        <span className='text-body4 text-black'>{period}</span>
      </div>

      <div className='flex'>
        <span className='text-body3 text-gray-4 w-16'>주최사</span>
        <span className='text-body4 text-black'>{organizer}</span>
      </div>

      <div className='flex'>
        <span className='text-body3 text-gray-4 w-16'>참가비</span>
        <div className='flex flex-col gap-1'>
          {fees.map((fee, index) => (
            <div key={index} className='flex items-center gap-1'>
              <span className='text-body3 text-black'>{fee.price.toLocaleString()}원</span>
              <span className='text-body4 text-black'>{fee.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}