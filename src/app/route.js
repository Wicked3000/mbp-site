import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'index.html');
    if (fs.existsSync(filePath)) {
      const html = fs.readFileSync(filePath, 'utf8');
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    }
    return new Response('Public site index.html not found', { status: 404 });
  } catch (error) {
    return new Response('Server Error: ' + error.message, { status: 500 });
  }
}
