import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import '@/styles/style.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'SpaceX',
  description:
    'At Spasex Ltd, our mission is to deliver safe, reliable, and efficient transportation solutions across the United States',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${poppins.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
