import { MaxWidthWrapper, Title } from "@/shared/ui";

import { NewsInfinityList } from "./news-infinity-list";

export function NewsPage() {
  return (
    <MaxWidthWrapper>
      <div className="my-7 grid flex-1 gap-2">
        <Title
          heading="Поточні новини"
          text="Нижче відображаються всі новини"
        />
        <NewsInfinityList />
      </div>
    </MaxWidthWrapper>
  );
}
