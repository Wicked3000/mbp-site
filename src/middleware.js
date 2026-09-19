import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('mbp_admin_session');

  // Paths that should not be rewritten to the SPA
  const isAdminPath = pathname.startsWith('/admin');
  const isApiPath = pathname.startsWith('/api');
  const isNextInternal = pathname.startsWith('/_next');
  const isStaticAsset = /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map)$/i.test(pathname);
  const isFavicon = pathname === '/favicon.ico';

  // If the request is for a static asset, Next.js internals, admin, or API, let it pass through.
  if (isAdminPath || isApiPath || isNextInternal || isStaticAsset || isFavicon) {
    // For admin pages (except login), enforce authentication
    if (isAdminPath && pathname !== '/admin') {
      if (!sessionCookie) {
        const loginUrl = new URL('/admin', request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
    // For admin API routes, enforce authentication
    if (isApiPath && (pathname.startsWith('/api/students') || pathname.startsWith('/api/contacts'))) {
      if (!sessionCookie) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
    return NextResponse.next();
  }

  // For all other routes (SPA routes), rewrite to /site.html
  // This allows the SPA router to handle client-side routing.
  const spaUrl = new URL('/site.html', request.url);
  return NextResponse.rewrite(spaUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (e.g. public/assets)
     */
    '/((?!_next/static|_next/image|favicon.ico|assets/).*)',
  ],
};