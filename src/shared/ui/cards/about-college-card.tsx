interface AboutCollegeProps {
  text: string;
  index: number;
}

export function AboutCollege({ text, index }: AboutCollegeProps) {
  return (
    <div className="relative h-full overflow-hidden rounded-md border bg-white pb-[100px] pl-[16px] pr-[48px] pt-[16px]">
      <span className="font-medium text-gray-800">{text}</span>
      <span className="absolute bottom-[-2.25rem] left-auto right-0 top-auto h-[1em] w-full text-[10.6rem] font-bold">
        <span className="absolute left-auto right-[-0.312rem] top-[-2.8rem] text-slate-100">
          {index}
        </span>
        <span className="absolute left-auto right-0 top-[-2.5rem] text-slate-200">
          {index}
        </span>
      </span>
    </div>
  );
}
