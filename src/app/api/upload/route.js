import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.pdf', '.doc', '.docx'];
const MAX_SIZE = 15 * 1024 * 1024; // Increased to 15MB for documents

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folderType = formData.get('folder') || 'news';
    
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const originalName = file.name || 'upload';
    const ext = path.extname(originalName).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File must be 15MB or smaller' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Validate folder
    const safeFolder = ['news', 'policies', 'banners'].includes(folderType) ? folderType : 'misc';
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', safeFolder);
    
    await mkdir(uploadDir, { recursive: true });

    const filename = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`;
    await writeFile(path.join(uploadDir, filename), buffer);

    return NextResponse.json({ success: true, url: `/uploads/${safeFolder}/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}