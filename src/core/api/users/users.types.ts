export interface ProfileReq {
  username: string;
  job_title?: string;
  bio?: string;
  first_name?: string;
  last_name?: string;
  avatar_id?: string;
  phone?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

export interface User extends ProfileReq {
  id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}
