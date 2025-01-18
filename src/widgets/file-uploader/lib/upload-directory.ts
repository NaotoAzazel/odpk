import { join } from "path";

// make sure change upload directory also in `.gitignore` and `@/shared/constants/redirects`
const IMAGES_FOLDER_NAME: string = "uploads";
export const absoluteUploadsDirection = join(process.cwd(), IMAGES_FOLDER_NAME);
