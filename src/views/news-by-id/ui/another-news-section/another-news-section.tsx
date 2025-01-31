import { AnotherNewsCardsHolder } from "../another-news-cards-holder";

interface AnotherNewsSectionProps {
  exceptId: number;
}

export function AnotherNewsSection({ exceptId }: AnotherNewsSectionProps) {
  return (
    <div className="space-y-5 border-t">
      <div className="mt-5">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-gray-800 md:text-4xl">
          Інші новини
        </h2>
      </div>
      <AnotherNewsCardsHolder exceptId={exceptId} />
    </div>
  );
}
