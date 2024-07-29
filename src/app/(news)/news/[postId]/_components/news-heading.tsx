import { getNewsById } from "@/lib/actions/news";

interface HeadingLoadingProps {
  postPromise: ReturnType<typeof getNewsById>;
}

export async function NewsHeading({ postPromise }: HeadingLoadingProps) {
  const post = await postPromise;

  return (
    <div>
      <span className="font-heading font-semibold tracking-normal text-2xl md:text-4xl text-gray-800">
        {post!.title}
      </span>
    </div>
  );
}
