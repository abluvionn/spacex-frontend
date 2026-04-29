'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const PUBLIC_ROUTES = ['/driver/login', '/driver/signup'];

export default function DriverLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if route is public
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('driver-token');

      if (!token && !isPublicRoute) {
        // Not authenticated and trying to access protected route
        router.push('/driver/login');
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [pathname, router]);

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#090a3f]'>
        <div className='text-white text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4'></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
