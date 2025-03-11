import { authOptions, validateSession } from "@/features/auth";
import {
  getHeaderButtons,
  headerButtonCreateSchema,
} from "@/entities/header-button";
import { db, handleApiError, successResponse } from "@/shared/lib";

export async function POST(req: Request) {
  try {
    await validateSession(authOptions);

    const json = await req.json();
    const body = headerButtonCreateSchema.parse(json);

    await db.headerButtons.create({
      data: {
        title: body.title,
        items: [],
      },
    });

    return successResponse(200, { message: "BUTTON_CREATED_SUCCESSFULLY" });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET() {
  try {
    const buttons = await getHeaderButtons();
    return successResponse(200, { message: "SUCCESS", data: buttons });
  } catch (error) {
    return handleApiError(error);
  }
}
