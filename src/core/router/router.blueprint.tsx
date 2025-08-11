import { useSelector } from 'react-redux';
import { Navigate, Outlet, RouteObject, createBrowserRouter, useLocation, useRouteError } from 'react-router-dom';
import Layout from 'src/modules/Layout';
import { FallBack } from 'src/pages/error/fallback';
import { NotFound } from 'src/pages/error/notFound';
import { RootState } from 'src/store';

import {
  getOrgProfileAdaptor,
  getUserProfileAdaptor,
  getSchemasAdaptor,
  getVerificationByIdAdaptor,
  getCredentialsAdaptor,
  getIntegrationsAdaptor,
  createVerificationIndividualAdaptor,
  getSchemaAdaptor,
  getSingleUseVerificationsAdaptor,
  getReusableVerificationsAdaptor,
} from '../adaptors';

export const blueprint: RouteObject[] = [
  { path: '/', element: <DefaultRoute /> },
  {
    element: <GlobalStatusGuard />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: 'credentials',
            children: [
              {
                path: '',
                async lazy() {
                  const { Empty } = await import('src/pages/credentials/empty');
                  return {
                    Component: Empty,
                  };
                },
              },
              {
                path: ':orgId',
                loader: async () => {
                  const credentialRes = await getCredentialsAdaptor();
                  return { credentialList: credentialRes.data };
                },
                async lazy() {
                  const { Credentials } = await import('src/pages/credentials');
                  return {
                    Component: Credentials,
                  };
                },
              },
              {
                path: 'create',
                loader: async () => {
                  const { data } = await getSchemasAdaptor();
                  return { schemaList: data };
                },
                async lazy() {
                  const { Create } = await import('src/pages/credentials/create');
                  return {
                    Component: Create,
                  };
                },
              },
            ],
          },
          {
            path: 'schemas',
            children: [
              {
                path: 'create',
                children: [
                  {
                    path: '',
                    async lazy() {
                      const { Create } = await import('src/pages/schemas/create');
                      return {
                        Component: Create,
                      };
                    },
                  },
                  {
                    path: ':id',
                    loader: async ({ params }) => {
                      if (params.id) {
                        const data = await getSchemaAdaptor(params.id);
                        return data;
                      }
                    },
                    async lazy() {
                      const { Create } = await import('src/pages/schemas/create');
                      return {
                        Component: Create,
                      };
                    },
                  },
                ],
              },
              {
                path: '',
                loader: async () => {
                  const { data } = await getSchemasAdaptor();
                  return { schemaList: data };
                },
                async lazy() {
                  const { Schemas } = await import('src/pages/schemas');
                  return {
                    Component: Schemas,
                  };
                },
              },
            ],
          },
          {
            path: 'verifications',
            children: [
              {
                path: '',
                loader: async () => {
                  const [singleUseListRes, reusableListRes] = await Promise.all([
                    getSingleUseVerificationsAdaptor(1, 10),
                    getReusableVerificationsAdaptor(1, 10),
                  ]);
                  return { singleUseList: singleUseListRes.data, reusableList: reusableListRes.data };
                },
                async lazy() {
                  const { Verifications } = await import('src/pages/verifications/list');
                  return {
                    Component: Verifications,
                  };
                },
              },
              {
                path: 'create',
                async lazy() {
                  const { CreateUpdateVerification } = await import('src/pages/verifications/createUpdateVerification');
                  return {
                    Component: CreateUpdateVerification,
                  };
                },
              },
              {
                path: 'edit/:id',
                loader: async ({ params }) => {
                  if (params.id) {
                    const data = await getVerificationByIdAdaptor(params.id);
                    return data;
                  }
                },
                async lazy() {
                  const { CreateUpdateVerification } = await import('src/pages/verifications/createUpdateVerification');
                  return {
                    Component: CreateUpdateVerification,
                  };
                },
              },
            ],
          },
          {
            path: 'integrations',
            loader: async () => {
              const { data } = await getIntegrationsAdaptor(1, 10);
              return data;
            },
            async lazy() {
              const { Integrations } = await import('src/pages/integrations');
              return {
                Component: Integrations,
              };
            },
          },
          {
            path: 'organization',
            children: [
              {
                path: '',
                async lazy() {
                  const { OrgProfile } = await import('src/pages/organizations');
                  return {
                    Component: OrgProfile,
                  };
                },
              },
              {
                path: ':id',
                loader: async ({ params }) => {
                  const { data } = await getOrgProfileAdaptor(params.id || '');
                  return { profile: data };
                },
                async lazy() {
                  const { OrgProfile } = await import('src/pages/organizations');
                  return {
                    Component: OrgProfile,
                  };
                },
              },
            ],
          },
          {
            path: 'settings',
            loader: async () => {
              const { data } = await getUserProfileAdaptor();
              return { userProfile: data };
            },
            async lazy() {
              const { Settings } = await import('src/pages/settings');
              return {
                Component: Settings,
              };
            },
          },
        ],
      },
      {
        path: 'connect',
        children: [
          {
            path: 'credential/:id',
            async lazy() {
              const { ProofRequest } = await import('src/pages/proofRequest');
              return {
                Component: ProofRequest,
              };
            },
          },
          {
            path: 'redirect/:id',
            loader: async ({ params, request }) => {
              if (params.id) {
                const url = new URL(request.url);
                const customerId = url.searchParams.get('customer') || '';
                const { data } = await createVerificationIndividualAdaptor(params.id, customerId);
                return { data };
              }
            },
            async lazy() {
              const { RedirectToVerification } = await import('src/pages/verifications/redirectToVerification');
              return {
                Component: RedirectToVerification,
              };
            },
          },
          {
            path: 'verification/:id',
            async lazy() {
              const { ProofRequest } = await import('src/pages/proofRequest');
              return {
                Component: ProofRequest,
              };
            },
          },
        ],
      },
      {
        path: 'intro',
        async lazy() {
          const { Intro } = await import('src/pages/intro');
          return {
            Component: Intro,
          };
        },
      },
    ],
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/oauth',
    children: [
      {
        path: 'socious',
        async lazy() {
          const { SociousID } = await import('src/pages/oauth/socious');
          return { Component: SociousID };
        },
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

function DefaultRoute() {
  return <Navigate to="/credentials" />;
}

function GlobalStatusGuard() {
  const status = useSelector((state: RootState) => state.identity.status);
  const location = useLocation();
  const isIntroPage = location.pathname === '/intro';

  if (status === 'loading') return <div></div>;

  if (status === 'failed' || status === 'idle') {
    if (!isIntroPage) return <Navigate to="/intro" replace />;
    return <Outlet />;
  }

  if (isIntroPage) {
    return <Navigate to="/credentials" replace />;
  }

  return <Outlet />;
}

function ErrorBoundary() {
  const error: any = useRouteError();
  if (error?.response?.status === 401) return <Navigate to="/intro" />;
  return <FallBack />;
}

export const routes = createBrowserRouter(blueprint);
