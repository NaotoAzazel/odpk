import { env } from "@/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

import { authConfig } from "@/config/constants";
import { getUserByEmail } from "@/lib/actions/users";
import { ApiError } from "@/lib/api/exceptions";
import { comparePasswords } from "@/lib/bcrypt";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: authConfig.sessionMaxAge,
  },
  adapter: PrismaAdapter(db) as any,
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  providers: [
    CredentialProvider({
      name: "Credential",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new ApiError("INVALID_CREDENTIALS", 401);
        }

        const user = await getUserByEmail(credentials.email);
        if (!user) {
          throw new ApiError("INCORRECT_PASSWORD_OR_EMAIL", 401);
        }

        const isPasswordsMatch = comparePasswords(
          credentials.password,
          user.password,
        );
        if (!isPasswordsMatch) {
          throw new ApiError("INCORRECT_PASSWORD_OR_EMAIL", 401);
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (!token.id) {
        session.user = { id: "", email: "" };
        return session;
      }

      session.user = { id: token.id, email: token.email };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? "";
        token.email = user.email ?? "";
      }

      try {
        const dbUser = await getUserByEmail(token.email);
        if (!dbUser) {
          return { id: "", email: "" };
        }

        return token;
      } catch (error) {
        return { id: "", email: "" };
      }
    },
  },
  secret: env.NEXTAUTH_SECRET,
};
