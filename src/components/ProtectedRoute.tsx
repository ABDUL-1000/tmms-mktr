'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Check for the token
    if (!token) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [router]);

  return <>{children}</>; // Render children if authenticated
};

export default ProtectedRoute;
