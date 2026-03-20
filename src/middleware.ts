import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token }) {
        // Google OAuth 미설정 시 dev mode — 인증 스킵
        if (!process.env.GOOGLE_CLIENT_ID) return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|login).*)'],
};
