import { Post } from "@/types";
import Link from "next/link";

interface SliceNewsCardProps {
  post: Post;
}

export function CropNewsCard({ post }: SliceNewsCardProps) {
  const formattedDate = post.createdAt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return (
    <Link href={`/news/${post.id}`}>
      <div className="group flex flex-col border overflow-hidden rounded-md bg-slate-50 p-5">
        <div className="overflow-hidden">
          <h1 className="overflow-hidden whitespace-nowrap text-ellipsis text-lg font-medium mb-4 text-gray-800">
            {post.title}
          </h1>
        </div>
        <span className="text-muted-foreground mb-2">{formattedDate}</span>
        <span className="text-primary font-semibold group-hover:text-gray-800 transition-colors duration-200">
          Читати докладніше
        </span>
      </div>
    </Link>
  );
}
