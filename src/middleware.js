import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('mbp_admin_session');

  // Protect admin pages (except login and /admin itself)
  if (pathname.startsWith('/admin') && pathname !== '/admin' && pathname !== '/login') {
    if (!sessionCookie) {
      const loginUrl = new URL('/admin', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect admin API routes (public read-only access to students, vet-students, fode-students, notices, news, latest news, banners and policies lists)
  if (pathname.startsWith('/api/students') || pathname.startsWith('/api/vet-students') || pathname.startsWith('/api/fode-students') || pathname.startsWith('/api/contacts') || pathname.startsWith('/api/notices') || pathname.startsWith('/api/news') || pathname.startsWith('/api/latest-news') || pathname.startsWith('/api/banners') || pathname.startsWith('/api/policies') || pathname.startsWith('/api/upload')) {
    const isPublicRead =
      (pathname.startsWith('/api/students') || pathname.startsWith('/api/vet-students') || pathname.startsWith('/api/fode-students') || pathname.startsWith('/api/notices') || pathname.startsWith('/api/news') || pathname.startsWith('/api/latest-news') || pathname.startsWith('/api/banners') || pathname.startsWith('/api/policies')) && request.method === 'GET';
    if (!sessionCookie && !isPublicRead) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/students/:path*',
    '/api/vet-students/:path*',
    '/api/fode-students/:path*',
    '/api/contacts/:path*',
    '/api/notices/:path*',
    '/api/news/:path*',
    '/api/latest-news/:path*',
    '/api/banners/:path*',
    '/api/policies/:path*',
    '/api/upload/:path*',
  ],
};