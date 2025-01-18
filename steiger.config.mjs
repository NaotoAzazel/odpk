import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: ["./src/shared/**"],
    rules: {
      "fsd/public-api": "off",
    },
  },
  {
    files: ["**/constants/**"],
    rules: {
      "fsd/segments-by-purpose": "off",
    },
  },
  {
    files: ["./src/widgets/**"],
    rules: {
      "fsd/forbidden-imports": "off",
    },
  },
]);
