export interface PreRegisterRes {
  email: 'EXISTS' | null;
  username: 'EXISTS' | null;
}

export interface OtpConfirmRes {
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
}

export interface detailsReq {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  password: string;
}

export interface profileReq {
  imageUrl?: string;
  name: string;
  description?: string;
}
