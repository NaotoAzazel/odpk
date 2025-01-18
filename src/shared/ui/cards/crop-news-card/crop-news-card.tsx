import { Post } from "@prisma/client";
import Link from "next/link";

import { REDIRECTS } from "@/shared/constants";
import { formatDate } from "@/shared/lib";

interface SliceNewsCardProps {
  post: Post;
}

export function CropNewsCard({ post }: SliceNewsCardProps) {
  return (
    <Link href={`${REDIRECTS.toNewsItem}/${post.id}`}>
      <div className="group flex flex-col overflow-hidden rounded-md border bg-slate-50 p-5">
        <div className="overflow-hidden">
          <h1 className="mb-4 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium text-gray-800">
            {post.title}
          </h1>
        </div>
        <span className="mb-2 text-muted-foreground">
          {formatDate(post.createdAt)}
        </span>
        <span className="font-semibold text-primary transition-colors duration-200 group-hover:text-gray-800">
          Читати докладніше
        </span>
      </div>
    </Link>
  );
}
