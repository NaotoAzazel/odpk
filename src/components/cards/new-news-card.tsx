import { Post } from "@/types";

import { Picture } from "@/components/picture";

import Link from "next/link";

interface NewsCardProps {
  post: Post;
}

export function NewNewsCard({ post }: NewsCardProps) {
  return (
    <Link href={`/news/${post.id}`}>
      <div className="shadow hover:shadow-lg transition-shadow duration-400 border overflow-hidden rounded-lg bg-background">
        <div className="flex flex-col">
          <div className="relative pb-72 flex inset-0">
            <div className="flex w-full h-full absolute">
              <Picture
                src={post.images[0]}
                className="object-cover inset-0 border-b rounded-none"
              />
            </div>
          </div>
        </div>

        <div className="p-4 overflow-hidden">
          <h1 className="overflow-hidden whitespace-nowrap text-ellipsis font-medium">
            {post.title}
          </h1>
        </div>
      </div>
    </Link>
  );
}
