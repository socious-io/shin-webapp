export interface Meta {
  id: string;
  name: string;
  email: string;
  image: string;
  description?: string;
}

export interface Identity {
  id: string;
  meta: Meta;
  created_at: string;
}

export interface IdentityAdaptorRes {
  identity?: Identity;
  error?: string;
}

export const getIdentityAdaptor = async (): Promise<IdentityAdaptorRes> => {
  try {
    // TODO: call identity API and map the result
    const res: IdentityAdaptorRes = {
      identity: {
        id: '',
        meta: {
          id: '',
          name: '',
          email: '',
          image: '',
          description: '',
        },
        created_at: '',
      },
    };
    return res;
  } catch {
    const res: IdentityAdaptorRes = {
      error: 'Error is Identity API call',
    };
    return res;
  }
};
