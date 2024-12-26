import { createUser, getUserByEmail } from "@/lib/actions/users";
import { ApiError } from "@/lib/api/exceptions";
import { handleApiError, successResponse, validateUser } from "@/lib/api/lib";
import { authOptions } from "@/lib/auth";
import { hashPassword } from "@/lib/bcrypt";
import { userAuthSchema } from "@/lib/validation/auth";

export async function POST(req: Request) {
  try {
    await validateUser(authOptions);

    const json = await req.json();
    const body = userAuthSchema.parse(json);

    const existingUserByEmail = await getUserByEmail(body.email);
    if (existingUserByEmail) {
      throw new ApiError("USER_WITH_THIS_EMAIL_EXISTS", 409);
    }

    const hashedPassword = hashPassword(body.password);
    await createUser({ email: body.email, hashedPassword });

    return successResponse(200, { message: "USER_CREATED_SUCCESSFULLY" });
  } catch (error) {
    return handleApiError(error);
  }
}
