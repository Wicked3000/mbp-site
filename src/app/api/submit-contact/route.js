import { NextResponse } from 'next/server';
import { addContact } from '@/lib/data';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Incomplete data. Please provide name, email, and message.' },
        { status: 400 }
      );
    }

    const newContact = await addContact({ name, email, message });
    return NextResponse.json({
      message: 'Message sent successfully.',
      contact: newContact
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit contact' },
      { status: 500 }
    );
  }
}
