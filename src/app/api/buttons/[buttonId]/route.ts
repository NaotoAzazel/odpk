import { z } from "zod";

import {
  deleteHeaderButtonById,
  getHeaderButtonById,
  updateButtonById,
} from "@/lib/actions/header-buttons";
import { ApiError } from "@/lib/api/exceptions";
import { handleApiError, successResponse, validateUser } from "@/lib/api/lib";
import { authOptions } from "@/lib/auth";
import { HeaderButtonUpdateValidator } from "@/lib/validation/header-buttons";

const routeContextSchema = z.object({
  params: z.object({
    buttonId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    await validateUser(authOptions);

    const { params } = routeContextSchema.parse(context);

    const isButtonExists = await getHeaderButtonById(Number(params.buttonId));
    if (!isButtonExists) {
      throw new ApiError("BUTTONS_WITH_THIS_ID_NOT_FOUND", 409);
    }

    await deleteHeaderButtonById(Number(params.buttonId));

    return successResponse(200, { message: "BUTTON_DELETED_SUCCESSFULLY" });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    await validateUser(authOptions);

    const { params } = routeContextSchema.parse(context);

    const json = await req.json();
    const data = HeaderButtonUpdateValidator.parse(json);

    const isButtonExists = await getHeaderButtonById(Number(params.buttonId));
    if (!isButtonExists) {
      throw new ApiError("BUTTONS_WITH_THIS_ID_NOT_FOUND", 409);
    }

    await updateButtonById(Number(params.buttonId), data);

    return successResponse(200, { message: "BUTTON_UPDATED_SUCCESSFULLY" });
  } catch (error) {
    return handleApiError(error);
  }
}
