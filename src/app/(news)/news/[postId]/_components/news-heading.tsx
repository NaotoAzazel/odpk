import { getNewsById } from "@/lib/actions/news";
import { Header } from "@/components/header";

interface HeadingLoadingProps {
  postPromise: ReturnType<typeof getNewsById>;
}

export async function NewsHeading({ postPromise }: HeadingLoadingProps) {
  const post = await postPromise;

  return <Header heading={post!.title} />;
}
