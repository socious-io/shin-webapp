export type AuthReq = {
  redirect_url: string;
};

export type AuthSessionReq = {
  code: string;
};

export interface Auth {
  auth_url: string;
  session: {
    id: string;
    redirect_url: string;
    access_id: string;
    expire_at: Date;
    verified_at: Date | null;
    updated_at: Date;
    created_at: Date;
  };
}

export interface AuthSession {
  error?: string;
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
}

export interface RefreshReq {
  refresh_token: string;
}

export interface RefreshRes {
  error?: string;
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
}
