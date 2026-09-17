import './globals.css';

export const metadata = {
  title: 'MBP Admin Portal - Milne Bay Province Division of Education',
  description: 'Official Administration Portal for Milne Bay Province Division of Education',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-100 min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
