interface HeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function Header({ heading, text, children }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1">
        <h1 className="text-heading text-3xl font-bold tracking-tight text-gray-800 md:text-4xl lg:text-5xl">
          {heading}
        </h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
}
