import { NextResponse } from 'next/server';
import { fetchAllNewsBanners, addNewsBanner, updateNewsBanner, deleteNewsBanner } from '@/lib/data';

export async function GET() {
  try {
    const banners = await fetchAllNewsBanners();
    return NextResponse.json(banners);
  } catch (error) {
    console.error('Fetch news banners error:', error);
    return NextResponse.json({ error: 'Failed to fetch news banners' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const image_url = (body.image_url || '').trim();
    const title = (body.title || '').trim();
    if (!image_url) {
      return NextResponse.json({ error: 'Banner image is required' }, { status: 400 });
    }
    const banner = await addNewsBanner({
      image_url,
      title,
      subtitle: (body.subtitle || '').trim(),
      order_index: body.order_index != null ? Number(body.order_index) : 0,
      active: body.active ? 1 : 0
    });
    return NextResponse.json({ success: true, banner });
  } catch (error) {
    console.error('Add news banner error:', error);
    return NextResponse.json({ error: 'Failed to add news banner' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Banner ID required' }, { status: 400 });
    }
    const body = await request.json();
    const image_url = (body.image_url || '').trim();
    const title = (body.title || '').trim();
    if (!image_url) {
      return NextResponse.json({ error: 'Banner image is required' }, { status: 400 });
    }
    const banner = await updateNewsBanner(id, {
      image_url,
      title,
      subtitle: (body.subtitle || '').trim(),
      order_index: body.order_index != null ? Number(body.order_index) : 0,
      active: body.active ? 1 : 0
    });
    return NextResponse.json({ success: true, banner });
  } catch (error) {
    console.error('Update news banner error:', error);
    return NextResponse.json({ error: 'Failed to update news banner' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Banner ID required' }, { status: 400 });
    }
    await deleteNewsBanner(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete news banner error:', error);
    return NextResponse.json({ error: 'Failed to delete news banner' }, { status: 500 });
  }
}