import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('user_role')?.value;
  const { pathname } = request.nextUrl;

  if (!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    response.cookies.delete('user_role');
    return response;
  }

  if (userRole !== 'admin' && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  const response = NextResponse.next();

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    response.headers.set('Cache-Control', 'no-store, max-age=0');
  }

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/admin/:path*',
    '/login' 
  ],
};