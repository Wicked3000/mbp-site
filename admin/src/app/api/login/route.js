import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body || {};

    if (username === 'admin' && password === 'mbp-admin-2026') {
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
      { success: false, message: 'Invalid credentials. Expected: admin / mbp-admin-2026' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ success: true, message: 'Login API active' });
}
