interface AboutCollegeProps {
  text: string;
  index: number;
}

export function AboutCollege({ text, index }: AboutCollegeProps) {
  return (
    <div className="pt-[16px] pb-[100px] pl-[16px] pr-[48px] relative h-full overflow-hidden border bg-white rounded-md">
      <span className="font-medium text-gray-800">{text}</span>
      <span className="absolute h-[1em] font-bold left-auto top-auto right-0 w-full bottom-[-2.25rem] text-[10.6rem]">
        <span className="absolute left-auto text-slate-100 top-[-2.8rem] right-[-0.312rem]">
          {index}
        </span>
        <span className="right-0 absolute top-[-2.5rem] left-auto text-slate-200">
          {index}
        </span>
      </span>
    </div>
  );
}
