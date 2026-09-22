import { NextResponse } from 'next/server';
import { fetchLatestNews, addLatestNewsItem, updateLatestNewsItem, deleteLatestNewsItem } from '@/lib/data';

export async function GET() {
  try {
    const items = await fetchLatestNews();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch latest news' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const title = (body.title || '').trim();
    if (!title) {
      return NextResponse.json({ error: 'Latest news title is required' }, { status: 400 });
    }
    const isExternal = body.is_external === 1 || body.link_type === 'external' ? 1 : 0;
    if (isExternal && !(body.external_url || '').trim()) {
      return NextResponse.json({ error: 'External news requires a link URL' }, { status: 400 });
    }
    if (!isExternal && !body.news_id) {
      return NextResponse.json({ error: 'Internal news requires selecting a news story' }, { status: 400 });
    }
    const item = await addLatestNewsItem({
      title,
      is_external: isExternal,
      external_url: (body.external_url || '').trim(),
      news_id: body.news_id
    });
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Add latest news error:', error);
    return NextResponse.json({ error: error.message || 'Failed to add latest news' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Latest news ID required' }, { status: 400 });
    }
    const body = await request.json();
    const title = (body.title || '').trim();
    if (!title) {
      return NextResponse.json({ error: 'Latest news title is required' }, { status: 400 });
    }
    const isExternal = body.is_external === 1 || body.link_type === 'external' ? 1 : 0;
    if (isExternal && !(body.external_url || '').trim()) {
      return NextResponse.json({ error: 'External news requires a link URL' }, { status: 400 });
    }
    if (!isExternal && !body.news_id) {
      return NextResponse.json({ error: 'Internal news requires selecting a news story' }, { status: 400 });
    }
    const item = await updateLatestNewsItem(id, {
      title,
      is_external: isExternal,
      external_url: (body.external_url || '').trim(),
      news_id: body.news_id
    });
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Update latest news error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update latest news' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Latest news ID required' }, { status: 400 });
    }
    await deleteLatestNewsItem(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete latest news error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete latest news' }, { status: 500 });
  }
}