import { Navigate, RouteObject, createBrowserRouter, useRouteError } from 'react-router-dom';
import Auth from 'src/modules/Auth';
import Base from 'src/modules/Base';
import Layout from 'src/modules/Layout';
import { FallBack } from 'src/pages/fallback';
import store from 'src/store';
import { setOrgProfile } from 'src/store/reducers/org.reducer';
import { setUserProfile } from 'src/store/reducers/user.reducer';

import {
  getOrgProfileAdaptor,
  getUserProfileAdaptor,
  getSchemasAdaptor,
  getVerificationByIdAdaptor,
  getVerificationsAdaptor,
  connectVerificationAdaptor,
  getCredentialsAdaptor,
  getRecipientsAdaptor,
  connectCredentialAdaptor,
  verifyActionAdaptor,
  getOrgIdAdaptor,
} from '../adaptors';

export const blueprint: RouteObject[] = [
  { path: '/', element: <DefaultRoute /> },
  {
    element: <Base />,
    loader: async () => {
      const authenticated = await isAuthenticated();
      return authenticated;
    },
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: 'credentials',
            children: [
              {
                path: 'create',
                loader: async () => {
                  const [schemas, recipients] = await Promise.all([getSchemasAdaptor(), getRecipientsAdaptor()]);
                  return { schemaList: schemas.data, recipientList: recipients.data };
                },
                async lazy() {
                  const { Create } = await import('src/pages/credentials/create');
                  return {
                    Component: Create,
                  };
                },
              },
              {
                path: ':orgId',
                loader: async ({ params }) => {
                  const [credentialRes, orgProfileRes] = await Promise.all([
                    getCredentialsAdaptor(),
                    getOrgProfileAdaptor(params.orgId || ''),
                  ]);
                  return { credentialList: credentialRes.data, orgProfile: orgProfileRes.data };
                },
                async lazy() {
                  const { Credentials } = await import('src/pages/credentials');
                  return {
                    Component: Credentials,
                  };
                },
              },
              {
                path: '',
                async lazy() {
                  const { Empty } = await import('src/pages/credentials/empty');
                  return {
                    Component: Empty,
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
    ],
    errorElement: <ErrorBoundary />,
  },
  {
    element: <Auth />,
    loader: async () => {
      const authenticated = await isAuthenticated();
      return authenticated;
    },
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
    errorElement: <ErrorBoundary />,
  },
  {
    path: 'connect',
    children: [
      {
        path: 'credential/:id',
        loader: async ({ params }) => {
          if (params.id) {
            const { data } = await connectCredentialAdaptor(params.id);
            return { data };
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
        path: 'verification/:id',
        loader: async ({ params }) => {
          if (params.id) {
            let status = '';
            const { data } = await connectVerificationAdaptor(params.id);
            if (data?.id) {
              status = await verifyActionAdaptor(data.id);
            }
            return { data, status };
          }
        },
        async lazy() {
          const { ProofRequest } = await import('src/pages/proofRequest/index');
          return {
            Component: ProofRequest,
          };
        },
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

const isAuthenticated = async () => {
  const userResponse = await getUserProfileAdaptor();
  if (!userResponse.data) return false;
  else if (userResponse.data) {
    store.dispatch(setUserProfile(userResponse.data));
    const orgResponse = await getOrgIdAdaptor();
    if (orgResponse.error == null && orgResponse.data != null) {
      store.dispatch(setOrgProfile(orgResponse.data));
    }
    return true;
  }
};

export const routes = createBrowserRouter(blueprint);
