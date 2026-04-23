import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Note: We cannot use Next.js middleware to check authentication when the 
  // backend API is hosted on a different domain (Leapcell vs Vercel). 
  // The browser will only send the httpOnly auth cookies to Leapcell, not Vercel.
  // Authentication will be handled entirely on the client-side inside the dashboard.

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*'],
}
