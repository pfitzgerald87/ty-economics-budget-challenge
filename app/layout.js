import './globals.css';

export const metadata = {
  title: 'TY Economics Budget Challenge',
  description: 'A classroom budgeting simulation game for senior students.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
