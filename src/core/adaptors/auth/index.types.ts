export interface Auth {
  url: string;
}

export interface AuthRes {
  error?: string;
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
}
