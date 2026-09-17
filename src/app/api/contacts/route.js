import { NextResponse } from 'next/server';
import { fetchContacts, deleteContact } from '@/lib/data';

export async function GET() {
  try {
    const contacts = await fetchContacts();
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Contact ID required' }, { status: 400 });
    }
    await deleteContact(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
