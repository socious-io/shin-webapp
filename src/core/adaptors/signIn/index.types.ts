export interface authAdaptorRes {
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
}

export interface GoogleAuthRes extends authAdaptorRes {
  registered?: boolean;
}

export interface SociousAuthRes extends authAdaptorRes {
  registered?: boolean;
}
