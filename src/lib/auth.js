import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./mongodb";
import Admin from "@/models/Admin";

// Full configuration for Node.js runtime (API routes, Server Actions)
export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/admin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.restaurantId = user.restaurantId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.restaurantId = token.restaurantId;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Ensure Mongoose database is fully connected before query
          await connectDB();

          const emailQuery = credentials.email.trim().toLowerCase();
          
          // Query using stable Mongoose model
          const admin = await Admin.findOne({ email: emailQuery });

          if (!admin) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            admin.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: admin._id.toString(),
            email: admin.email,
            name: admin.name,
            restaurantId: admin.restaurantId,
          };
        } catch (error) {
          console.error("Auth authorize credentials error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
});
