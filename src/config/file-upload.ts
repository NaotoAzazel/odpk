import { join } from "path";

// make sure change upload directory also in `.gitignore` and `./constants`
export const absoluteUploadsDirection = join(process.cwd(), "uploads");
