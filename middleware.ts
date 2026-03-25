import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define which routes are public (no login required)
const isPublicRoute = createRouteMatcher([
  '/', 
  '/sign-in(.*)', 
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  // 2. If the route is NOT public, protect it
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  // 3. This regex tells Next.js to run middleware on all routes 
  // EXCEPT for static files (images, favicon, etc.) and _next internals
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};