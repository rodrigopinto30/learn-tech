import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('user_role')?.value;
  const { pathname } = request.nextUrl;

  const studentHome = '/learn';
  const adminHome = '/admin/dashboard';

  if (!token && (pathname.startsWith('/learn') || pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && (pathname === '/login' || pathname === '/')) {
    const target = userRole === 'admin' ? adminHome : studentHome;
    return NextResponse.redirect(new URL(target, request.url));
  }

  const isKnownArea = pathname.startsWith('/admin') || pathname.startsWith('/learn') || pathname === '/login';

  if (token && !isKnownArea) {
    const target = userRole === 'admin' ? adminHome : studentHome;
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};