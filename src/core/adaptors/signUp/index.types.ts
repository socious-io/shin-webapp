export interface RegisterReq {
  email: string;
  password?: string;
}
export interface PreRegisterRes {
  email: 'AVAILABLE' | null;
  username: 'EXISTS' | 'UNKOWN' | null;
}

export interface OtpConfirmRes {
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
}

export interface DetailsReq {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  password: string;
}

export interface ProfileReq {
  imageUrl?: string;
  name: string;
  description?: string;
}
