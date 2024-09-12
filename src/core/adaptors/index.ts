export * from './signIn/index.adaptors';
export * from './signIn/index.types';
export * from './identity/index.adaptors';
export * from './identity/index.types';
export * from './media/index.adaptors';
export * from './media/index.types';
export * from './signUp/index.adaptors';
export * from './signUp/index.types';
export * from './schemas/index.adaptors';
export * from './schemas/index.types';
export * from './organizations/index.adaptors';
export * from './organizations/index.types';
export * from './forgetPassword/index.adaptors';
export * from './settings/index.adaptors';
export * from './settings/index.types';
export * from './verifications/index.adaptor';
export * from './verifications/index.type';
export * from './proofRequests/index.adaptors';
export * from './proofRequests/index.types';
export * from './credentials/index.adaptors';
export * from './credentials/index.types';

export interface CustomError {
  response: { data: { error: string } };
}

export interface SuccessRes {
  message?: string;
}

export type AdaptorRes<T = null> = {
  data: T | null;
  error: string | null;
};

export interface OptionType {
  label: string;
  value: string;
}
