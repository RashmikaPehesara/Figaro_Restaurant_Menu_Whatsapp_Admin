import NextAuth from "next-auth";

// We define the config inline to ABSOLUTELY ensure no accidental imports of Node.js modules
// like mongodb or bcrypt reach the Edge Runtime through middleware.
const authConfig = {
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
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isLoginPage = nextUrl.pathname === "/admin";

      if (isAdminRoute) {
        if (isLoginPage) {
          if (isLoggedIn) return Response.redirect(new URL("/admin/dashboard", nextUrl));
          return true;
        }
        if (!isLoggedIn) return false; // This will redirect to pages.signIn (/admin)
        return true;
      }
      return true;
    },
  },
  providers: [], // Providers are added in auth.js, not here
};

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
