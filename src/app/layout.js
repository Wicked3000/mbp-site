import './globals.css';

export const metadata = {
  title: 'Milne Bay Province - Division of Education Portal',
  description: 'Official Portal for Milne Bay Province Division of Education',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="text-slate-100 min-h-screen font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
