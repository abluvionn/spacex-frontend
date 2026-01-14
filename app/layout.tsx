import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import '@/styles/style.css';
import ConditionalShell from '@/components/ConditionalShell';
import ReduxProvider from '@/providers/ReduxProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-inter',
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
    <html
      lang='en'
      className={`${poppins.variable} ${inter.variable} antialiased scroll-smooth`}
    >
      <body>
        <ReduxProvider>
          <ConditionalShell>{children}</ConditionalShell>
        </ReduxProvider>
      </body>
    </html>
  );
}
