'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CallToAction from '@/components/CallToAction';

export default function ConditionalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || '';
  const hideShell = pathname.startsWith('/admin');

  if (hideShell) return <>{children}</>;

  return (
    <>
      <Navbar />
      {children}
      <CallToAction />
      <Footer />
    </>
  );
}
