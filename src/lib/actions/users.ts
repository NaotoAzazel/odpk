import { db } from "@/lib/db";

export async function getUsers() {
  const users = await db.users.findMany();
  return users;
}

export function getUserByEmail(email: string) {
  const user = db.users.findFirst({
    where: { email },
  });

  return user;
}

interface CreateUserParams {
  email: string;
  hashedPassword: string;
}

export async function createUser({ email, hashedPassword }: CreateUserParams) {
  const createdUser = await db.users.create({
    data: { email, password: hashedPassword },
  });
  return createdUser;
}

interface DeleteUserByIdParams {
  userId: string;
}

export async function deleteUserById({ userId }: DeleteUserByIdParams) {
  const deletedUser = await db.users.delete({ where: { id: userId } });
  return deletedUser;
}
