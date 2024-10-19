import { db } from "@/_lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt-edge";
// import argon2 from "argon2";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt"},
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        console.log("ESTE ES EL UserFound", userFound);

        if (!userFound) throw new Error("Usuario no encontrado");

        const matchPassword = await bcrypt.compareSync(
          credentials.password as string,
          userFound.password
        );

        if (!matchPassword) throw new Error("Contraseña incorrecta");
        
        return {
          id: userFound.id.toString(),
          name: userFound.name,
          email: userFound.email,
          role: userFound.role,
        };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
});
