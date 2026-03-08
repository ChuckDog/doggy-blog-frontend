'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';
import { PawPrint } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login({ email, password });
      // Decode token payload
      const payload = JSON.parse(atob(data.access_token.split('.')[1]));
      authLogin(data.access_token, { 
        id: payload.sub, 
        email: payload.email, 
        username: payload.username || payload.email.split('@')[0] 
      });
      
      router.push('/');
    } catch (err) {
      setError('登录失败，请检查邮箱和密码');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <Link href="/">
            <div className="mx-auto h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-orange-600 transition-colors">
              <PawPrint size={24} />
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            登录你的账户
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="邮箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              登录
            </button>
          </div>
          
          <div className="text-center text-sm">
            <span className="text-gray-600">还没有账号？</span>
            <Link href="/register" className="font-medium text-orange-600 hover:text-orange-500 ml-1">
              立即注册
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
