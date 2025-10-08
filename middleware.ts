// TEMPORARILY DISABLED TO DEBUG PWA NAVIGATION ISSUE
// The working example has NO middleware at all
// import { type NextRequest } from "next/server";
// import { updateSession } from "@/lib/supabase/middleware";

// export async function middleware(request: NextRequest) {
//   return await updateSession(request);
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - Public routes (/, /docs, /blog, /contact)
//      * - Auth routes (/auth)
//      * - Static files (_next/static, _next/image, etc.)
//      * - Public assets (images, manifest, service worker)
//      */
//     "/((?!$|docs|blog|contact|auth|_next/static|_next/image|favicon.ico|manifest.json|sw.js|app-icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|js)$).*)",
//   ],
// };
