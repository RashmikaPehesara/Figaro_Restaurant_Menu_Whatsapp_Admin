import NextAuth from "next-auth";

const authConfig = {
  pages: {
    signIn: "/adminfigaro/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/adminfigaro");
      const isLoginPage = 
        nextUrl.pathname === "/adminfigaro/login" || 
        nextUrl.pathname === "/adminfigaro";

      if (isAdminRoute) {
        if (isLoginPage) {
          if (isLoggedIn) {
            return Response.redirect(new URL("/adminfigaro/dashboard", nextUrl));
          }
          return true;
        }
        if (!isLoggedIn) return false; // Redirect to pages.signIn (/adminfigaro/login)
        return true;
      }
      return true;
    },
  },
  providers: [],
};

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/adminfigaro/:path*"],
};
