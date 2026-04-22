import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Protect /dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const accessToken = request.cookies.get('accessToken')
    const refreshToken = request.cookies.get('refreshToken')

    // If no access token AND no refresh token
    if (!accessToken && !refreshToken) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('message', 'Please sign in to access your dashboard.')
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*'],
}
