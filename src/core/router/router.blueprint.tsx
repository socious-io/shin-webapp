import { Navigate, RouteObject, createBrowserRouter, useRouteError } from 'react-router-dom';
import Layout from 'src/modules/Layout';
import { FallBack } from 'src/pages/fallback';

export const blueprint: RouteObject[] = [
  { path: '/', element: <DefaultRoute /> },
  {
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/home',
            async lazy() {
              const { Home } = await import('src/pages/home');
              return {
                Component: Home,
              };
            },
          },
        ],
      },
    ],
    errorElement: <ErrorBoundary />,
  },

  {
    path: '*',
    element: <div>Page not found :(</div>,
  },
];

function DefaultRoute() {
  return <Navigate to="/home" />;
}

function ErrorBoundary() {
  const error: any = useRouteError();
  if (error?.response?.status === 401) return <Navigate to="/sign-in" />;
  return <FallBack />;
}

export const routes = createBrowserRouter(blueprint);