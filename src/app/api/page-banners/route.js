import { NextResponse } from 'next/server';
import { fetchPageBanners, getPageBanner, updatePageBanner } from '@/lib/data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    if (page) {
      const banner = await getPageBanner(page);
      if (!banner) {
        return NextResponse.json({ error: 'Page banner not found' }, { status: 404 });
      }
      return NextResponse.json(banner);
    }
    const banners = await fetchPageBanners();
    return NextResponse.json(banners);
  } catch (error) {
    console.error('Fetch page banners error:', error);
    return NextResponse.json({ error: 'Failed to fetch page banners' }, { status: 500 });
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
    if (!image_url) {
      return NextResponse.json({ error: 'Banner image is required' }, { status: 400 });
    }
    const banner = await updatePageBanner(id, {
      image_url,
      title: (body.title || '').trim(),
      subtitle: (body.subtitle || '').trim()
    });
    return NextResponse.json({ success: true, banner });
  } catch (error) {
    console.error('Update page banner error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update page banner' }, { status: 500 });
  }
}