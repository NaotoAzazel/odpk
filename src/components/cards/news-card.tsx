import { Post } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface NewsCardProps {
  post: Post;
}

export function NewsCard({ post }: NewsCardProps) {
  const formattedDate = post.createdAt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <Link href={`/news/${post.id}`}>
      <div className="group border overflow-hidden rounded-md bg-slate-50">
        <div className="flex flex-col">
          <div className="relative pb-72 flex inset-0">
            <div className="flex w-full h-full absolute">
              {/* TODO: fix error when no image in 0 index */}
              <Image
                src={post.images[0]}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                alt="News-Image"
                className="border-b object-cover"
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="overflow-hidden mb-4">
            <h1 className="overflow-hidden whitespace-nowrap text-ellipsis text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200">
              {post.title}
            </h1>
          </div>
          <span className="text-muted-foreground">{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}
