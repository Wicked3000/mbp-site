import { NextResponse } from 'next/server';
import { addWhatsappSubscriber } from '@/lib/data';

export async function POST(request) {
  try {
    const body = await request.json();
    const phone = String(body.phone || '').trim();
    const name = String(body.name || '').trim();

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Basic phone sanity check: digits, optional leading +, spaces/dashes
    const cleaned = phone.replace(/[\s\-()]/g, '');
    if (!/^\+?\d{6,15}$/.test(cleaned)) {
      return NextResponse.json({ error: 'Please enter a valid phone number' }, { status: 400 });
    }

    const subscriber = await addWhatsappSubscriber({
      phone,
      name,
      source: body.source || 'homepage'
    });

    return NextResponse.json({ success: true, subscriber });
  } catch (error) {
    console.error('WhatsApp subscribe error:', error);
    return NextResponse.json({ error: error.message || 'Could not save subscription' }, { status: 500 });
  }
}