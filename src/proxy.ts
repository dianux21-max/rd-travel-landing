import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const ADMIN_PREFIX = "/admin";
const ADMIN_LOGIN_PATH = "/admin/login";

// Vercel gives every deployment several working hostnames (the clean
// production domain, plus a per-deployment "*-<hash>-<team>.vercel.app"
// alias that serves identical content). Google can crawl those too and,
// without a strong signal, sometimes picks one of them as canonical
// instead of our real domain ("duplicate, Google chose a different
// canonical" in Search Console). A canonical <link> tag is only a hint;
// this header is the hard instruction: only the real domain may be indexed.
function canonicalHostname(): string | null {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return null;
  try {
    return new URL(siteUrl).hostname;
  } catch {
    return null;
  }
}

// style-src stays on 'unsafe-inline' (no nonce): React/Framer Motion render
// style="" attributes constantly, and Chrome only honors nonces on <style>
// tags, not on style attributes, without also adding 'unsafe-hashes'. CSS
// injection can't execute script, so this is the standard trade-off —
// script-src below stays strict.
function buildCsp(nonce: string) {
  const isDev = process.env.NODE_ENV === "development";
  return `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.supabase.co https://www.facebook.com;
    font-src 'self' data:;
    connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.iconify.design https://api.simplesvg.com https://api.unisvg.com https://www.google-analytics.com https://www.facebook.com https://analytics.tiktok.com;
    frame-src 'self' https://www.facebook.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();
}

export async function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  let response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let userId: string | null = null;

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request: { headers: requestHeaders } });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  }

  const path = request.nextUrl.pathname;
  const isAdminRoute = path.startsWith(ADMIN_PREFIX);
  const isLoginRoute = path === ADMIN_LOGIN_PATH;

  if (isAdminRoute && !isLoginRoute && !userId) {
    const redirectUrl = new URL(ADMIN_LOGIN_PATH, request.url);
    redirectUrl.searchParams.set("next", path);
    return NextResponse.redirect(redirectUrl);
  }

  if (isLoginRoute && userId) {
    return NextResponse.redirect(new URL(ADMIN_PREFIX, request.url));
  }

  response.headers.set("Content-Security-Policy", csp);

  const expectedHost = canonicalHostname();
  const requestHost = request.headers.get("host")?.split(":")[0] ?? null;
  if (
    expectedHost &&
    requestHost &&
    requestHost !== "localhost" &&
    requestHost !== expectedHost
  ) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
