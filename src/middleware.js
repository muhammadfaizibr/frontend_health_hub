// middleware.js

import { NextResponse } from 'next/server';

/**
 * Middleware for authentication and role-based access control
 * Runs on every request to protected routes
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token')?.value;

  console.log('🔍 Middleware:', pathname, '| Has Token:', !!accessToken);

  // ==========================================
  // 1. PUBLIC ROUTES - No authentication required
  // ==========================================
  const publicPaths = ['/', '/login', '/register', '/forget-password'];

  const publicPathPatterns = [
    /^\/reset-password\/[^/]+\/[^/]+$/, // Matches /reset-password/{userId}/{token}
  ];

  /**
   * Check if the path is public
   */
  const isPublicPath = (path) => {
    // Check exact matches
    if (publicPaths.includes(path)) {
      return true;
    }
    // Check pattern matches
    return publicPathPatterns.some((pattern) => pattern.test(path));
  };

  if (isPublicPath(pathname)) {
    // If user is already logged in and tries to access login/register/forget-password
    // Redirect them to their role-based dashboard
    const authPages = ['/login', '/register', '/forget-password'];
    
    if (authPages.includes(pathname) && accessToken) {
      try {
        const userRole = getUserRoleFromToken(accessToken);
        
        console.log('✅ User already logged in, redirecting to:', userRole, 'dashboard');
        
        // Redirect to appropriate dashboard
        const dashboardUrl = getRoleDashboardUrl(userRole, request.url);
        if (dashboardUrl) {
          return NextResponse.redirect(dashboardUrl);
        }
      } catch (error) {
        console.error('❌ Token decode error:', error.message);
        // Invalid token - clear it and allow access to login
        const response = NextResponse.next();
        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');
        return response;
      }
    }
    
    console.log('✅ Public route access granted');
    return NextResponse.next();
  }

  // ==========================================
  // 2. PROTECTED ROUTES - Authentication required
  // ==========================================
  if (!accessToken) {
    console.log('❌ No token found, redirecting to login');
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ==========================================
  // 3. ROLE-BASED ACCESS CONTROL
  // ==========================================
  try {
    const userRole = getUserRoleFromToken(accessToken);
    
    console.log('👤 User Role:', userRole);

    // Check if user has permission to access this route
    const hasPermission = checkRoutePermission(pathname, userRole);
    
    if (!hasPermission) {
      console.log('❌ Access denied for role:', userRole, 'on path:', pathname);
      
      // Redirect to user's own dashboard
      const dashboardUrl = getRoleDashboardUrl(userRole, request.url);
      return NextResponse.redirect(dashboardUrl);
    }

    console.log('✅ Access granted for role:', userRole);
    return NextResponse.next();

  } catch (error) {
    console.error('❌ Token validation error:', error.message);
    
    // Invalid token - clear cookies and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    return response;
  }
}

/**
 * Extract user role from JWT token
 * @param {string} token - JWT access token
 * @returns {string} - User role (lowercase)
 */
function getUserRoleFromToken(token) {
  try {
    // Decode JWT payload (middle part of token)
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString()
    );
    
    // Extract role and normalize to lowercase
    const role = (payload.role || payload.user_type || payload.userType || '').toLowerCase();
    
    if (!role) {
      throw new Error('Role not found in token');
    }
    
    return role;
  } catch (error) {
    throw new Error('Invalid token format');
  }
}

/**
 * Check if user has permission to access a route based on their role
 * @param {string} pathname - Request pathname
 * @param {string} userRole - User's role
 * @returns {boolean} - Whether user has permission
 */
function checkRoutePermission(pathname, userRole) {
  // Define role-based route permissions
  const routePermissions = {
    '/doctor': ['doctor'],
    '/patient': ['patient'],
    '/translator': ['translator'],
    '/organization': ['organization'],
  };

  // Check if pathname starts with any protected route
  for (const [route, allowedRoles] of Object.entries(routePermissions)) {
    if (pathname.startsWith(route)) {
      return allowedRoles.includes(userRole);
    }
  }

  // If route not found in permissions map, allow access (e.g., /profile)
  return true;
}

/**
 * Get dashboard URL based on user role
 * @param {string} userRole - User's role
 * @param {string} baseUrl - Base URL for redirect
 * @returns {URL} - Dashboard URL
 */
function getRoleDashboardUrl(userRole, baseUrl) {
  const dashboardMap = {
    'doctor': '/doctor',
    'patient': '/patient',
    'translator': '/translator',
    'organization': '/organization',
  };

  const dashboardPath = dashboardMap[userRole.toLowerCase()];
  
  if (!dashboardPath) {
    // Fallback to login if role is invalid
    return new URL('/login', baseUrl);
  }

  return new URL(dashboardPath, baseUrl);
}

/**
 * Middleware configuration
 * Matches all routes except static files and API routes
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next/data).*)',
  ],
};