import { NextResponse } from 'next/server';
import { fetchNotices, addNotice, updateNotice, deleteNotice } from '@/lib/data';

export async function GET() {
  try {
    const notices = await fetchNotices();
    return NextResponse.json(notices);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notices' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const title = (body.title || '').trim();
    const text = (body.body || '').trim();
    if (!title || !text) {
      return NextResponse.json({ error: 'Notice title and body are required' }, { status: 400 });
    }
    const notice = await addNotice({ title, body: text });
    return NextResponse.json({ success: true, notice });
  } catch (error) {
    console.error('Add notice error:', error);
    return NextResponse.json({ error: 'Failed to add notice' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Notice ID required' }, { status: 400 });
    }
    const body = await request.json();
    const title = (body.title || '').trim();
    const text = (body.body || '').trim();
    if (!title || !text) {
      return NextResponse.json({ error: 'Notice title and body are required' }, { status: 400 });
    }
    const notice = await updateNotice(id, { title, body: text });
    return NextResponse.json({ success: true, notice });
  } catch (error) {
    console.error('Update notice error:', error);
    return NextResponse.json({ error: 'Failed to update notice' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Notice ID required' }, { status: 400 });
    }
    await deleteNotice(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete notice error:', error);
    return NextResponse.json({ error: 'Failed to delete notice' }, { status: 500 });
  }
}