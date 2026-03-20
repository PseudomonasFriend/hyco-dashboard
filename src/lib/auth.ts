import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const ALLOWED_EMAIL = 'pioneerchy@gmail.com';
const DEV_MODE = !process.env.GOOGLE_CLIENT_ID;

export const authOptions: NextAuthOptions = {
  providers: DEV_MODE
    ? []
    : [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
      ],
  callbacks: {
    async signIn({ user }) {
      if (DEV_MODE) return true;
      return user.email === ALLOWED_EMAIL;
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET ?? 'dev-secret-not-for-prod',
};
