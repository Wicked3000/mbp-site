import { NextResponse } from 'next/server';
import { getWelcomeMessage, updateWelcomeMessage } from '@/lib/data';

export async function GET() {
  try {
    const message = await getWelcomeMessage();
    return NextResponse.json(message);
  } catch (error) {
    console.error('Fetch welcome message error:', error);
    return NextResponse.json({ error: 'Failed to fetch welcome message' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Message ID required' }, { status: 400 });
    }
    const body = await request.json();
    const message = await updateWelcomeMessage(id, {
      kicker: (body.kicker || '').trim(),
      title: (body.title || '').trim(),
      message: (body.message || '').trim(),
      image_url: (body.image_url || '').trim(),
      active: body.active ? 1 : 0
    });
    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error('Update welcome message error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update welcome message' }, { status: 500 });
  }
}