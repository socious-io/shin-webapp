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
        path: 'sign-up',
        children: [
          {
            path: 'email',
            async lazy() {
              const { Email } = await import('src/pages/signUp/Email');
              return {
                Component: Email,
              };
            },
          },
          {
            path: 'verification',
            async lazy() {
              const { Verification } = await import('src/pages/signUp/Verification');
              return {
                Component: Verification,
              };
            },
          },
          {
            path: 'detail',
            async lazy() {
              const { Detail } = await import('src/pages/signUp/Detail');
              return {
                Component: Detail,
              };
            },
          },
          {
            path: 'profile',
            async lazy() {
              const { Profile } = await import('src/pages/signUp/Profile');
              return {
                Component: Profile,
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
