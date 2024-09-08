interface ButtonElementProps {
  title: string;
  description: string;
  href: string;
}

export function ButtonElement({
  title,
  description,
  href,
}: ButtonElementProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-row items-center">
        <div className="ml-2 grid gap-1">
          <p className="font-heading font-bold">{title}</p>
          <div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
