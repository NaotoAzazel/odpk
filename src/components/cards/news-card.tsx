import { Post } from "@/types";

import { Picture } from "@/components/picture";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import Link from "next/link";

interface NewsCardProps {
  post: Post;
};

export function NewsCard({ post }: NewsCardProps) {
  return (
    <div className="border overflow-hidden rounded">
      <Picture.Container>
        <Picture 
          src={post.images[0]}
          className="absolute h-full w-full border-b rounded-none"
        />
      </Picture.Container>

      <div className="p-4 overflow-hidden">
        <h1 className="overflow-hidden whitespace-nowrap text-ellipsis">{post.title}</h1>
      </div>

      <div className="flex pt-1 p-4 w-full items-center">
        <Link
          className={cn(buttonVariants({ variant: "outline" }))}
          href={`/news/${post.id}`}
        >
          Переглянути
        </Link>
      </div>
    </div>
  );
}