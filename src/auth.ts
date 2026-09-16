import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Admin Access",
      credentials: {},
      async authorize() {
        // Bypass authentication entirely for development
        return {
          id: "admin-dev-id",
          name: "Admin User",
          email: "admin@spectrum.agency",
          role: "ADMIN",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        // @ts-ignore
        session.user.role = "ADMIN";
      }
      return session;
    },
  },
});
