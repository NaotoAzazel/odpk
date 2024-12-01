import bcrypt from "bcryptjs";

import { authConfig } from "@/config/constants";

export function comparePasswords(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, authConfig.saltLength);
}
