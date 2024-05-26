import { Post } from "@/types";

import { Picture } from "@/components/picture";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import Link from "next/link";

interface NewsCardProps {
  post: Post;
}

export function NewNewsCard({ post }: NewsCardProps) {
  return (
    <div className="drop-shadow overflow-hidden rounded-lg bg-background">
      <div className="flex flex-col">
        <div className="relative pb-72 flex inset-0">
          <div className="flex w-full h-full absolute">
            <Picture
              src={post.images[0]}
              className="object-cover inset-0"
            />
          </div>
        </div>
      </div>

      <div className="p-4 overflow-hidden">
        <h1 className="overflow-hidden whitespace-nowrap text-ellipsis">
          {post.title}
        </h1>
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
