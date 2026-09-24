import { NextResponse } from 'next/server';
import { fetchWhatsappSubscribers, deleteWhatsappSubscriber } from '@/lib/data';

export async function GET() {
  try {
    const subscribers = await fetchWhatsappSubscribers();
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('Fetch whatsapp subscribers error:', error);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Subscriber ID required' }, { status: 400 });
    }
    await deleteWhatsappSubscriber(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete whatsapp subscriber error:', error);
    return NextResponse.json({ error: 'Failed to delete subscriber' }, { status: 500 });
  }
}