import { getServerSession } from "next-auth";
import { z } from "zod";

import { absoluteUploadsDirection } from "@/config/file-upload";
import { authOptions } from "@/lib/auth";
import { deleteFileByNameFromDatabase } from "@/lib/files/actions";
import { deleteFileFromLocalDirectory } from "@/lib/files/utils";

const routeContextSchema = z.object({
  params: z.object({
    filename: z.string(),
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
      return new Response("Not authorized", { status: 403 });
    }

    const { success: isDeletedFromDatabase } =
      await deleteFileByNameFromDatabase(params.filename);

    if (!isDeletedFromDatabase) {
      return new Response(
        `Cant delete file from db with name: ${params.filename}`,
        { status: 422 },
      );
    }

    await deleteFileFromLocalDirectory(
      absoluteUploadsDirection,
      params.filename,
    );

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
