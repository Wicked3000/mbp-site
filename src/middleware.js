import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('mbp_admin_session');

  // Protect admin pages (except login)
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    if (!sessionCookie) {
      const loginUrl = new URL('/admin', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect admin API routes
  if (pathname.startsWith('/api/students') || pathname.startsWith('/api/contacts')) {
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/students/:path*',
    '/api/contacts/:path*',
  ],
};