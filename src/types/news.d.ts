// When you add additional types or modify the current ones,
// the schema in "/src/lib/validation/post.ts" should be updated accordingly

type BaseBlock = {
  id: string;
};

type ImageBlock = BaseBlock & {
  data: {
    file: {
      url: string;
    };
    caption: string;
    stretched: boolean;
    withBorder: boolean;
    withBackground: boolean;
  };
  type: "image";
};

type HeaderBlock = BaseBlock & {
  data: {
    text: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
  };
  type: "header";
};

type ListBlock = BaseBlock & {
  data: {
    items: string[];
  };
  style: "ordered" | "unordered";
  type: "list";
};

type Paragraph = BaseBlock & {
  id: string;
  data: {
    text: string;
  };
  type: "paragraph";
};

export type Blocks = ImageBlock | HeaderBlock | ListBlock | Paragraph;
