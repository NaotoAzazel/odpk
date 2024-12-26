import { getServerSession, NextAuthOptions, Session } from "next-auth";
import { ZodError, ZodIssue } from "zod";

import { ApiSuccessKey } from "@/types/api/success";
import { ApiError } from "@/lib/api/exceptions";
import { isValidUser } from "@/lib/utils";

export async function validateUser(
  authOptions: NextAuthOptions,
): Promise<Session["user"]> {
  const session = await getServerSession(authOptions);
  const isValidSession = isValidUser(session?.user);

  if (!isValidSession) {
    throw new ApiError("NOT_AUTHORIZED", 403);
  }

  return session!.user as Session["user"];
}

export function formatZodError(issues: ZodIssue[]) {
  return issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}

export function handleApiError(error: unknown): Response {
  if (error instanceof ZodError) {
    const formattedErrors = formatZodError(error.issues);
    return Response.json(
      { message: "VALIDATION_ERROR", errors: formattedErrors },
      { status: 422 },
    );
  }

  if (error instanceof ApiError) {
    return Response.json({ message: error.message }, { status: error.status });
  }

  if (error instanceof Error) {
    return Response.json(
      { message: error.message, errors: error },
      { status: 500 },
    );
  }

  return Response.json(
    { message: "UNKNOWN_ERROR", errors: error },
    { status: 500 },
  );
}

interface ApiResponse {
  message: ApiSuccessKey;
  data?: unknown;
}

export function successResponse(status: number, response: ApiResponse) {
  return Response.json(response, { status });
}
