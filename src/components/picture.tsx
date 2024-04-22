import { cn } from "@/lib/utils";
import Image from "next/image";

interface PictureProps 
  extends React.ImgHTMLAttributes<HTMLImageElement> {};

export function Picture({
  className,
  src
}: PictureProps) {
  if(!src) {
    return (
      <div 
        className={cn(
          "rounded py-32 w-full flex flex-col items-center", 
          className
        )}
      >
        <p className="text-muted-foreground text-sm">
          Картинку не знайдено
        </p>
      </div>
    );
  }

  return (
    <Image
      fill
      // src={"src-image"}
      src={`https://ucarecdn.com/${src}/-/preview/1600x1200/`}
      alt="News-card-image"
      loading="lazy"
      sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
      className={cn(
        "inset-0 object-cover rounded",
        className
      )}
    />
  );
}

interface PictureContainerProps 
  extends React.ImgHTMLAttributes<HTMLImageElement> {};

Picture.Container = function PictureContainer({
  children
}: PictureContainerProps) {
  return (
    <div className="flex flex-col p-0">
      <div className="relative flex pb-72 inset-0">
        <div className="absolute inset-0">
          <div className="flex w-full h-full items-center justify-center absolute">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}