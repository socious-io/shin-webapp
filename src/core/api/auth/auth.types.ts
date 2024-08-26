// ----------------------- Requests -------------------------------

export interface RefreshReq {
  refresh_token: string;
}

// ----------------------- Responses -------------------------------
export interface AuthRes {
  error?: string;
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
}

export interface GoogleAuthRes extends AuthRes {
  registered?: boolean;
}
