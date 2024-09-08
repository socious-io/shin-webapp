import { Navigate, RouteObject, createBrowserRouter, useRouteError } from 'react-router-dom';
import Auth from 'src/modules/Auth';
import Base from 'src/modules/Base';
import Layout from 'src/modules/Layout';
import { FallBack } from 'src/pages/fallback';

import {
  getOrgProfileAdaptor,
  getUserProfileAdaptor,
  getSchemasAdaptor,
  getVerificationByIdAdaptor,
  getVerificationsAdaptor,
} from '../adaptors';

export const blueprint: RouteObject[] = [
  { path: '/', element: <DefaultRoute /> },
  {
    element: <Base />,
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
            children: [
              {
                path: 'create',
                async lazy() {
                  const { Create } = await import('src/pages/schemas/create');
                  return {
                    Component: Create,
                  };
                },
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
                  const data = await getVerificationsAdaptor(1, 10);
                  return data;
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
            path: 'profile',
            children: [
              {
                path: 'org',
                loader: async () => {
                  const { data } = await getOrgProfileAdaptor();
                  return { profile: data };
                },
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
        element: <Auth />,
        children: [
          {
            path: 'sign-in',
            children: [
              {
                path: '',
                async lazy() {
                  const { Email } = await import('src/pages/signIn/email');
                  return {
                    Component: Email,
                  };
                },
              },
              {
                path: 'password',
                async lazy() {
                  const { Password } = await import('src/pages/signIn/password');
                  return {
                    Component: Password,
                  };
                },
              },
              {
                path: 'oauth',
                children: [
                  {
                    path: 'google',
                    async lazy() {
                      const { GoogleOauth2 } = await import('src/pages/oauth/google');
                      return {
                        Component: GoogleOauth2,
                      };
                    },
                  },
                ],
              },
            ],
          },
          {
            path: 'sign-up',
            children: [
              {
                path: '',
                async lazy() {
                  const { Email } = await import('src/pages/signUp/email');
                  return {
                    Component: Email,
                  };
                },
              },
              {
                path: 'verification',
                async lazy() {
                  const { Verification } = await import('src/pages/signUp/verification');
                  return {
                    Component: Verification,
                  };
                },
              },
              {
                path: 'detail',
                async lazy() {
                  const { Detail } = await import('src/pages/signUp/detail');
                  return {
                    Component: Detail,
                  };
                },
              },
              {
                path: 'profile',
                async lazy() {
                  const { Profile } = await import('src/pages/signUp/profile');
                  return {
                    Component: Profile,
                  };
                },
              },
            ],
          },
        ],
      },
      {
        path: 'forget-password',
        children: [
          {
            path: 'email',
            async lazy() {
              const { Email } = await import('src/pages/forgotPassword/email');
              return {
                Component: Email,
              };
            },
          },
          {
            path: 'otp',
            async lazy() {
              const { ForgetPasswordOTP } = await import('src/pages/forgotPassword/otp');
              return {
                Component: ForgetPasswordOTP,
              };
            },
          },
          {
            path: 'new-password',
            async lazy() {
              const { NewPassword } = await import('src/pages/forgotPassword/newPassword');
              return {
                Component: NewPassword,
              };
            },
          },
          {
            path: 'reset',
            async lazy() {
              const { Reset } = await import('src/pages/forgotPassword/reset');
              return {
                Component: Reset,
              };
            },
          },
        ],
      },
    ],
    errorElement: <ErrorBoundary />,
  },
  {
    path: 'proof-request/:id',
    loader: async ({ params }) => {
      if (params.id) {
        const data = await getVerificationByIdAdaptor(params.id);
        return data;
      }
    },
    async lazy() {
      const { ProofRequest } = await import('src/pages/proofRequest/index');
      return {
        Component: ProofRequest,
      };
    },
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
