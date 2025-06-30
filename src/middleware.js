// import { NextResponse } from 'next/server';

// const PUBLIC_ROUTES = ['/', '/login', '/signup', '/posts'];

// export function middleware(request) {
//   const { pathname } = request.nextUrl;
//   const token = request.cookies.get('token')?.value;

//   const isPublic = PUBLIC_ROUTES.some((route) =>
//     pathname === route || pathname.startsWith(route + '/')
//   );

//   const isStatic = pathname.startsWith('/_next') || pathname.includes('.');

//   if (!token && !isPublic && !isStatic) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   if (token && (pathname === '/login' || pathname === '/signup')) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   return NextResponse.next();
// }

import { NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/signup'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isApi = pathname.startsWith('/api');
  const isPublic = PUBLIC_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(route + '/')
  );
  const isStatic = pathname.startsWith('/_next') || pathname.includes('.');

  // ⛔ Skip API routes from middleware auth
  if (isApi || isStatic) return NextResponse.next();

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};

