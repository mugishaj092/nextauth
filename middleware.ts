import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req:any) {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const ispublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }
  if (isAuthRoutes){
    if(isLoggedIn){
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
    }
    return null
  }
  if(!isLoggedIn){
    console.log(Response.redirect(new URL("/auth/login", nextUrl)));
    return Response.redirect(new URL("/auth/login",nextUrl));
  }
  else{
    return null
  }
});
