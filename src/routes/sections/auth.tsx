import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { GuestGuard } from 'src/auth/guard';
// layouts
import AuthClassicLayout from 'src/layouts/auth/classic';
// components
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));
const ForgotPasswordClassicPage = lazy(() => import('src/pages/auth/jwt/forgot-password'));
const ClassicVerifyPage = lazy(() => import('src/pages/auth/jwt/verify'));
const NewPasswordClassicPage = lazy(() => import('src/pages/auth/jwt/new-password'));
// ----------------------------------------------------------------------

const authJwt = {
  path: 'jwt',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthClassicLayout>
          <JwtLoginPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthClassicLayout title="Manage the job more effectively with Minimal">
          <JwtRegisterPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'forgot-password',
      element: (
        <AuthClassicLayout>
          <ForgotPasswordClassicPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'verify',
      element: (
        <AuthClassicLayout>
          <ClassicVerifyPage />
        </AuthClassicLayout>
      ),
    },
    {
      path: 'new-password',
      element: (
        <AuthClassicLayout>
          <NewPasswordClassicPage />
        </AuthClassicLayout>
      ),
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authJwt],
  },
];
