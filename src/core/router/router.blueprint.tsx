import { Navigate, RouteObject, createBrowserRouter, useRouteError } from 'react-router-dom';
import { EmptyLayout } from 'src/modules/EmptyLayout';
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
      {
        path: 'sign-in',
        async lazy() {
          const { SignIn } = await import('src/pages/signIn');
          return {
            Component: SignIn,
          };
        },
      },
      {
        path: 'sign-up/email',
        async lazy() {
          const { SignIn } = await import('src/pages/signIn');
          return {
            Component: SignIn,
          };
        },
      },
      {
        element: <EmptyLayout />,
        children: [
          {
            path: 'sign-up',
            children: [
              {
                path: 'verification',
                async lazy() {
                  const { Verification } = await import('src/pages/signUp/verification');
                  return {
                    Component: Verification,
                  };
                },
              },
            ],
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
