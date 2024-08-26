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
            path: 'credentials',
            async lazy() {
              const { Credentials } = await import('src/pages/credentials');
              return {
                Component: Credentials,
              };
            },
          },
          {
            path: 'schemas',
            async lazy() {
              const { Schemas } = await import('src/pages/schemas');
              return {
                Component: Schemas,
              };
            },
          },
          {
            path: 'verifications',
            async lazy() {
              const { Verifications } = await import('src/pages/verifications');
              return {
                Component: Verifications,
              };
            },
          },
          {
            path: 'profile',
            children: [
              {
                path: 'org',
                async lazy() {
                  const { OrgProfile } = await import('src/pages/profile/org');
                  return {
                    Component: OrgProfile,
                  };
                },
              },
            ],
          },
          {
            path: 'settings',
            async lazy() {
              const { Settings } = await import('src/pages/settings');
              return {
                Component: Settings,
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
  return <Navigate to="/credentials" />;
}

function ErrorBoundary() {
  const error: any = useRouteError();
  if (error?.response?.status === 401) return <Navigate to="/sign-in" />;
  return <FallBack />;
}

export const routes = createBrowserRouter(blueprint);
