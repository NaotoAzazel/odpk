export type BasicCard = {
  title: string;
  description: string;
};

export type HelpCard = {
  title: string;
  items: {
    title: string;
    href: string;
  }[];
};

export type SpecialtieCard = {
  name: string;
  href: string;
  label: string;
};
