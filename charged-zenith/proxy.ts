import { NextResponse, type NextRequest } from 'next/server'

// Supported locales
const locales = ['en', 'ar']
const defaultLocale = 'en'

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Basic locale detection - could be enhanced later if this works
    // For now, redirect to default locale to at least get rid of the 404
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
    
    return NextResponse.redirect(url)
  }
}

export const config = {
  // Matcher for all paths except those starting with api, _next, or ending with favicon.ico
  matcher: ['/((?!api|_next|favicon.ico).*)'],
}
