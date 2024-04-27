import { NextAuthOptions } from "next-auth"
import CredentialProvider from "next-auth/providers/credentials";

import { getUserByEmail } from "@/lib/actions/users";

import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialProvider({
      name: "Credential",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        const user = await getUserByEmail(credentials?.email as string);

        if(!user) return null;

        const passwordCorrect = await compare(
          credentials?.password || "", 
          user.password
        );

        if(passwordCorrect) {
          return {
            email: user.email,
            id: user.id.toString()
          };
        }

        return null;
      }
    })
  ]
}