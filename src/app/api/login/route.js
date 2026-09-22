import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/data';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body || {};

    const dbVerified = await verifyAdmin(username, password);
    if (dbVerified === true) {
      const response = NextResponse.json({ success: true, token: 'admin-session-2026' });
      response.cookies.set('mbp_admin_session', 'admin-session-2026', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      return response;
    }

    // Fallback for when the database is unavailable
    if (dbVerified === null && username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true, token: 'admin-session-2026' });
      response.cookies.set('mbp_admin_session', 'admin-session-2026', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ success: true, message: 'Login API active' });
}
