import { getNewsItemById } from "@/entities/news";
import { Title } from "@/shared/ui";

interface HeadingLoadingProps {
  postPromise: ReturnType<typeof getNewsItemById>;
}

export async function NewsHeading({ postPromise }: HeadingLoadingProps) {
  const post = await postPromise;

  return <Title heading={post!.title} />;
}
