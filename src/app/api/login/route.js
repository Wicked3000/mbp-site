import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body || {};

    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (username === validUsername && password === validPassword) {
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
