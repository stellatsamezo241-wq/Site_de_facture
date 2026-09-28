import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase keys are default/missing, allow navigation during preview mode
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-supabase-project')) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: '', ...options });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({ name, value: '', ...options });
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = request.nextUrl.clone();
  const isAuthRoute = url.pathname === '/login' || url.pathname === '/register';
  const isProtectedRoute =
    url.pathname.startsWith('/dashboard') ||
    url.pathname.startsWith('/invoices') ||
    url.pathname.startsWith('/clients') ||
    url.pathname.startsWith('/settings') ||
    url.pathname.startsWith('/transactions') ||
    url.pathname.startsWith('/wallet') ||
    url.pathname.startsWith('/reports');

  if (!session && isProtectedRoute) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (session && isAuthRoute) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
