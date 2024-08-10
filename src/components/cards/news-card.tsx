import Link from "next/link";
import { Post } from "@/types";

import { isImageBlock } from "@/lib/editor";
import { formatDate } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ResponsiveImage } from "@/components/responsive-image";

interface NewsCardProps {
  post: Post;
}

export function NewsCard({ post }: NewsCardProps) {
  const imageSrc =
    post.content.blocks.find(isImageBlock)?.data.file.url || undefined;

  return (
    <Link href={`/news/${post.id}`}>
      <div className="group size-full overflow-hidden rounded-md border bg-slate-50">
        <div className="flex flex-col space-y-1.5">
          <AspectRatio ratio={4 / 3}>
            <ResponsiveImage
              // @ts-ignore
              src={imageSrc}
              alt={post.title}
              fill
              className="border-b object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </AspectRatio>
        </div>

        <div className="p-4">
          <div className="mb-4 overflow-hidden">
            <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-gray-800 transition-colors duration-200 group-hover:text-primary">
              {post.title}
            </h1>
          </div>
          <span className="text-muted-foreground">
            {formatDate(post.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
