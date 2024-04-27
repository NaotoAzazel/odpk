import { EmptyPlaceholder } from "@/components/empty-placeholder";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function NotFound() {
  return (
    <MaxWidthWrapper className="grid items-center justify-center">
      <div className="grid place-items-center pt-40">
        <EmptyPlaceholder className="w-full px-24">
          <EmptyPlaceholder.Icon name="warning" />
          <EmptyPlaceholder.Title>
            Помилка 404
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Упс, здається ми не знайшли таку новину
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      </div>
    </MaxWidthWrapper>
  );
}