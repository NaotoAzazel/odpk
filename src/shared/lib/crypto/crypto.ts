import bcrypt from "bcryptjs";

import { SALT_LENGTH } from "./constants";

export function comparePasswords(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, SALT_LENGTH);
}
