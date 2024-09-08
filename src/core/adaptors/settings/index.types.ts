export interface UserProfileRes {
  id: string;
  avatar: { url?: string; id?: string };
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
}

export interface UserProfileReq {
  avatarId?: string;
  firstName: string;
  lastName: string;
  jobTitle?: string;
}

export interface PasswordReq {
  currentPass: string;
  newPass: string;
  confirmPass: string;
}
