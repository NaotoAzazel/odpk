import { NewsCard } from "@/components/cards/news-card";
import { CardsHolder } from "@/components/layouts/cards-holder";
import { NoNewsPlaceholder } from "@/components/no-news-placeholder";
import { PaginationControls } from "@/components/pagination-controls";
import { getNewsByParams } from "@/lib/actions/news";

interface NewsContainerProps {
  newsPromise: ReturnType<typeof getNewsByParams>;
  pageNumber: number;
}

export async function NewsContainer({ newsPromise, pageNumber }: NewsContainerProps) {
  const { data: news, metadata } = await newsPromise;

  return (
    <div>
      {news.length ? (
        <div className="flex flex-col gap-2">
          <CardsHolder className="w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item, i) => (
              <NewsCard post={item} key={i} />
            ))}
          </CardsHolder>
          <PaginationControls currentPage={pageNumber} {...metadata} />
        </div>
      ) : (
        <NoNewsPlaceholder />
      )}
    </div>
  );
}
