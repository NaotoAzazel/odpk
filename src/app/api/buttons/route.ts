import { getHeaderButtons } from "@/lib/actions/header-buttons";
import { handleApiError, successResponse, validateUser } from "@/lib/api/lib";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { HeaderButtonValidator } from "@/lib/validation/header-buttons";

export async function POST(req: Request) {
  try {
    await validateUser(authOptions);

    const json = await req.json();
    const body = HeaderButtonValidator.parse(json);

    await db.headerButtons.create({
      data: {
        title: body.title,
        href: body.href || "",
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
