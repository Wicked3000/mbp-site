import { NextResponse } from 'next/server';
import { fetchNews, addNewsItem, updateNewsItem, deleteNewsItem } from '@/lib/data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const breakingOnly = searchParams.get('breaking') === '1';
    const news = await fetchNews(breakingOnly);
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const title = (body.title || '').trim();
    const summary = (body.summary || '').trim();
    if (!title || !summary) {
      return NextResponse.json({ error: 'News title and short summary are required' }, { status: 400 });
    }
    const item = await addNewsItem({
      title,
      summary,
      full_story: (body.full_story || '').trim(),
      image_url: (body.image_url || '').trim(),
      published_at: body.published_at || undefined,
      is_breaking: body.is_breaking ? 1 : 0
    });
    return NextResponse.json({ success: true, news: item });
  } catch (error) {
    console.error('Add news error:', error);
    return NextResponse.json({ error: error.message || 'Failed to add news' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'News ID required' }, { status: 400 });
    }
    const body = await request.json();
    const title = (body.title || '').trim();
    const summary = (body.summary || '').trim();
    if (!title || !summary) {
      return NextResponse.json({ error: 'News title and short summary are required' }, { status: 400 });
    }
    const item = await updateNewsItem(id, {
      title,
      summary,
      full_story: (body.full_story || '').trim(),
      image_url: (body.image_url || '').trim(),
      published_at: body.published_at || new Date().toISOString(),
      is_breaking: body.is_breaking ? 1 : 0
    });
    return NextResponse.json({ success: true, news: item });
  } catch (error) {
    console.error('Update news error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update news' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'News ID required' }, { status: 400 });
    }
    await deleteNewsItem(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete news error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete news' }, { status: 500 });
  }
}