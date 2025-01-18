"use server";

import { db } from "@/shared/lib";

export async function getUsers() {
  const users = await db.users.findMany();
  return users;
}

export async function getUserByEmail(email: string) {
  const user = await db.users.findFirst({
    where: { email },
  });

  return user;
}

interface CreateUser {
  email: string;
  hashedPassword: string;
}

export async function createUser({ email, hashedPassword }: CreateUser) {
  const createdUser = await db.users.create({
    data: { email, password: hashedPassword },
  });
  return createdUser;
}

interface DeleteUserById {
  userId: string;
}

export async function deleteUserById({ userId }: DeleteUserById) {
  const deletedUser = await db.users.delete({ where: { id: userId } });
  return deletedUser;
}
