import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { signIn } from "@/services";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (credentials == null) return null;
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */
        try {
          const { user, jwt } = await signIn({
            email: credentials.email,
            password: credentials.password,
          });

          return { ...user, jwt };
        } catch (error) {
          // Sign In Fail
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }: any) => {
      session.id = token.id;
      session.jwt = token.jwt;
      session.user = token.user;

      return Promise.resolve(session);
    },
    jwt: async ({ token, user }: any) => {
      user &&
        ((token.user = {
          code: user.code,
          email: user.email,
          id: user.id,
          name: user.username,
          type: user.type,
          isAdmin: user.isAdmin,
          electronicIdentification: user.electronicIdentification,
        }),
        (token.id = user.id),
        (token.jwt = user.jwt));

      return Promise.resolve(token);
    },
  },
});
