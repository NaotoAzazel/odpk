import { TailwindColor } from "@/types";

type ColorItem = {
  bg: string;
  text: string;
  stitch: string;
};

type Colors = {
  [key in TailwindColor]: ColorItem;
};

export const colors: Colors = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-500",
    stitch: "bg-blue-400",
  },
  violet: {
    bg: "bg-violet-100",
    text: "text-violet-500",
    stitch: "bg-violet-400",
  },
  cyan: {
    bg: "bg-cyan-100",
    text: "text-cyan-500",
    stitch: "bg-cyan-400",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-500",
    stitch: "bg-green-400",
  },
};
