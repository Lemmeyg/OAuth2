'use client';

import { Button } from '@/components/ui/button';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await signIn('google', {
        callbackUrl: '/dashboard'
      });
    } catch (error) {
      console.error('Sign in error:', error);
      setError('An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg m-4">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Welcome
        </h1>
        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}
        <Button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading || status === 'loading'}
        >
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </Button>
      </div>
    </div>
  );
}