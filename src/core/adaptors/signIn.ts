export interface loginRes {
  error?: string;
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
}

export const signInAdaptor = async (email: string, password: string) => {
  // TODO: call api with email and password
  // TODO: get API result and map to loginRes type
  const res: loginRes = {
    error: '',
    access_token: '',
    refresh_token: '',
    token_type: 'Bearer',
  };
  return res;
};
