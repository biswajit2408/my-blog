import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard'; // Ensure DashboardLayout exists and matches your file structure
import AuthGuard from './AuthGuard'; // AuthGuard to protect dashboard routes
import PATH from './path'; // Importing path.js for route paths

// Lazy load the components
const LoginPage = lazy(() => import('src/pages/login'));
const Page404 = lazy(() => import('src/pages/page-not-found'));
const IndexPage = lazy(() => import('src/pages/app'));
const UserPage = lazy(() => import('src/pages/user'));
// const ProductsPage = lazy(() => import('src/pages/products'));
// const BlogPage = lazy(() => import('src/pages/blog'));

// Loader for Suspense
const Loader = () => <div>Loading...</div>;

export default function MainRoutes() {
  const routes = useRoutes([
    {
      path: PATH.login,
      element: <LoginPage />,
    },
    {
      path: '/',
      element: (
          <AuthGuard>
            <DashboardLayout>
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          </AuthGuard>
      ),
      children: [
        { path: PATH.dashboard.root, element: <IndexPage /> },
        { path: PATH.dashboard.user, element: <UserPage /> },
        // { path: PATH.dashboard.products, element: <ProductsPage /> },
        // { path: PATH.dashboard.blog, element: <BlogPage /> },
      ],
    },
    {
      path: PATH.error.page404,
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to={PATH.error.page404} replace />,
    },
  ]);

  return routes;
}
