import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

import { absoluteUploadsDirection } from "@/widgets/file-uploader";
import { getFileFromLocalDirectory } from "@/entities/file";
import { ERROR_MESSAGES } from "@/shared/notices";

const routeContextSchema = z.object({
  params: z.object({
    filename: z.string(),
  }),
});

export async function GET(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const fileBuffer = await getFileFromLocalDirectory(
      absoluteUploadsDirection,
      params.filename,
    );

    const extension = params.filename.split(".").pop()?.toLowerCase();
    const mimeTypes: { [key: string]: string } = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
      pdf: "application/pdf",
    };

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          mimeTypes[extension || "png"] || "application/octet-stream",
        "Content-Disposition": `inline; filename="${encodeURIComponent(params.filename)}"`,
      },
    });
  } catch (error) {
    return new NextResponse(ERROR_MESSAGES["FILE_NOT_FOUND"], {
      status: 404,
    });
  }
}
