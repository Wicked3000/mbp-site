import { NextResponse } from 'next/server';
import { fetchContacts, deleteContact } from '@/lib/data';

export async function GET() {
  try {
    const contacts = await fetchContacts();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Fetch contacts error:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
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
    console.error('Delete contact error:', error);
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}
