import fs from 'fs';
import path from 'path';

export default function CatchAllPublicPage() {
  const filePath = path.join(process.cwd(), 'public', 'site.html');
  let html = '';
  if (fs.existsSync(filePath)) {
    html = fs.readFileSync(filePath, 'utf8');
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
