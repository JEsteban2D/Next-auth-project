import { db } from "@/_lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({

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

        const matchPassword = await bcrypt.compare(
          credentials.password as string,
          userFound.password
        );

        if (!matchPassword) throw new Error("Contraseña incorrecta");
        return {
          id: userFound.id.toString(),
          name: userFound.name,
          email: userFound.email,
        };
      },
    }),
  ],
//   pages: {
//     signIn: "/auth/signin",
//   },
});
