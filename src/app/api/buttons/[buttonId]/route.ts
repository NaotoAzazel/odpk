import { getServerSession } from "next-auth";
import { z } from "zod";

import {
  deleteHeaderButtonByParams,
  updateButtonByParams,
} from "@/lib/actions/header-buttons";
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
    const { params } = routeContextSchema.parse(context);

    const isAuth = await getServerSession(authOptions);
    if (!isAuth) {
      return Response.json({ message: "Not authorized" }, { status: 403 });
    }

    const deletedButton = await deleteHeaderButtonByParams({
      where: { id: Number(params.buttonId) },
    });
    if (!deletedButton) {
      throw new Error(`Failed to delete button with id: ${params.buttonId}`);
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const json = await req.json();
    const data = HeaderButtonUpdateValidator.parse(json);

    const isAuth = await getServerSession(authOptions);
    if (!isAuth) {
      return Response.json({ message: "Not authorized" }, { status: 403 });
    }

    const updatedButton = await updateButtonByParams({
      where: { id: Number(params.buttonId) },
      data,
    });
    if (!updatedButton) {
      throw new Error(
        `Failed to update the button with id: ${params.buttonId}`,
      );
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }
  }
}
