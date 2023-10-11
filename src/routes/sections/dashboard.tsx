import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
import EducationEditPage from 'src/pages/dashboard/education/edit';
// import EducationListPage from 'src/pages/dashboard/education/list';
// import EducationCreatePage from 'src/pages/dashboard/education/new';
// import path from 'path';
// import path from 'path';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageTwo = lazy(() => import('src/pages/dashboard/two'));
const PageThree = lazy(() => import('src/pages/dashboard/three'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));
const PageFive = lazy(() => import('src/pages/dashboard/five'));
const PageSix = lazy(() => import('src/pages/dashboard/six'));

// USER
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));

// LEAVE

// const LeaveProfilePage = lazy(() => import('src/pages/dashboard/leave/profile'));
// const LeaveCardsPage = lazy(() => import('src/pages/dashboard/leave/cards'));
const LeaveListPage = lazy(() => import('src/pages/dashboard/leave/list'));
// const LeaveAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const LeaveCreatePage = lazy(() => import('src/pages/dashboard/leave/new'));
const LeaveEditPage = lazy(() => import('src/pages/dashboard/leave/edit'));

// EDUCATION

const EducationListPage = lazy(() => import('src/pages/dashboard/education/list'));
const EducationCreatePage = lazy(() => import('src/pages/dashboard/education/new'));
// const EducationEditPage = lazy(() => import('src/pages/dashboard/education/edit'));

const AssetListPage = lazy(() => import('src/pages/dashboard/asset/list'));

const AssetCreatePage = lazy(() => import('src/pages/dashboard/asset/new'));

const AssetEditPage = lazy(() => import('src/pages/dashboard/asset/edit'));

// ORDER
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));

// PRODUCT
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'two', element: <PageTwo /> },
      { path: 'three', element: <PageThree /> },
      {
        path: 'group',
        children: [
          { element: <PageFour />, index: true },
          { path: 'five', element: <PageFive /> },
          { path: 'six', element: <PageSix /> },
        ],
      },
      {
        path: 'user',
        children: [
          { element: <UserListPage />, index: true },
          { path: 'profile', element: <UserProfilePage /> },

          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':id/edit', element: <UserEditPage /> },
          { path: 'account', element: <UserAccountPage /> },
        ],
      },
      {
        path: 'leave',
        children: [
          // { element: <UserProfilePage />, index: true },
          // { path: 'profile', element: <UserProfilePage /> },

          { path: 'list', element: <LeaveListPage /> },
          { path: 'new', element: <LeaveCreatePage /> },
          { path: ':id/edit', element: <LeaveEditPage /> },
          // { path: 'account', element: <UserAccountPage /> },
        ],
      },

      {
        path: 'education',
        children: [
          // { element: <UserProfilePage />, index: true },
          // { path: 'profile', element: <UserProfilePage /> },

          { path: 'list', element: <EducationListPage /> },
          { path: 'new', element: <EducationCreatePage /> },
          { path: ':id/edit', element: <EducationEditPage /> },
          // { path: 'account', element: <UserAccountPage /> },
        ],
      },

      {
        path: 'asset',

        children: [
          { path: 'list', element: <AssetListPage /> },

          { path: 'new', element: <AssetCreatePage /> },

          { path: ':id/edit', element: <AssetEditPage /> },

          // { path: 'account', element: <UserAccountPage /> },
        ],
      },

      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
        ],
      },
      {
        path: 'order',
        children: [
          { element: <OrderListPage />, index: true },
          { path: 'list', element: <OrderListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
        ],
      },
    ],
  },
];
