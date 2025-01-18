import { Users } from "@prisma/client";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }
}
