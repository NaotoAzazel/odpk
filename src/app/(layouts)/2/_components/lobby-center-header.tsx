interface CenterLobbyHeaderProps {
  heading: string;
  text?: string;
}

export function CenterLobbyHeader({ heading, text }: CenterLobbyHeaderProps) {
  return (
    <div className="mx-auto flex flex-col items-center gap-4 text-center">
      <h2 className="text-center font-heading font-bold text-3xl md:text-4xl lg:text-5xl xl:text-7xl">
        {heading}
      </h2>

      {text && (
        <p className="text-center text-base lg:text-lg text-muted-foreground">
          Коротка інформація про те, що ми надаємо нашим студентам.
        </p>
      )}
    </div>
  );
}
