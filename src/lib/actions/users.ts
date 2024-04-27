import { db } from "@/lib/db";

export function getUserByEmail(email: string) {
  const user = db.users.findFirst({
    where: { email }
  });

  return user;
}