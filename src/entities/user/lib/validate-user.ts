import { Session } from "next-auth";

export function isValidUser(user: Session["user"] | undefined) {
  if (!user) {
    return false;
  }

  return user.id !== "" && user.email !== "";
}
