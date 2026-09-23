import { NextResponse } from 'next/server';
import { updateNotice, deleteNotice } from '@/lib/data';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
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

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
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