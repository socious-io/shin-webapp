export interface UserProfileRes {
  id: string;
  imageUrl?: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
}

export interface UserProfileReq {
  imageUrl?: string;
  firstName: string;
  lastName: string;
  jobTitle?: string;
}

export interface PasswordReq {
  currentPass: string;
  newPass: string;
  confirmPass: string;
}
