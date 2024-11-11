// ----------------------- Requests -------------------------------

export interface RefreshReq {
  refresh_token: string;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface RegisterReq {
  email: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  password?: string;
}

export interface OTPReq {
  email: string;
}

export interface VerifyOTPReq {
  email: string;
  code: number;
}

export interface PreregisterReq {
  email?: string;
  username?: string;
}

export interface ForgetPasswordReq {
  current_password?: string;
  password: string;
}

// ----------------------- Responses -------------------------------
export interface AuthRes {
  error?: string;
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
}

export interface PreRegisterRes {
  email: 'UNKNOW' | 'AVAILABLE' | 'EXISTS';
  username: 'UNKNOW' | 'AVAILABLE' | 'EXISTS';
}

export interface GoogleAuthRes extends AuthRes {
  registered?: boolean;
}

export interface SociousAuthRes extends AuthRes {
  registered?: boolean;
}
