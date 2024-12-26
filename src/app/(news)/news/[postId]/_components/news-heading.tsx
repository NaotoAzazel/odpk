import { getNewsItemById } from "@/lib/actions/news";
import { Header } from "@/components/header";

interface HeadingLoadingProps {
  postPromise: ReturnType<typeof getNewsItemById>;
}

export async function NewsHeading({ postPromise }: HeadingLoadingProps) {
  const post = await postPromise;

  return <Header heading={post!.title} />;
}
