export * from './signIn/index.adaptors';
export * from './signIn/index.types';
export * from './identity/index.adaptors';
export * from './identity/index.types';
export * from './media/index.adaptors';
export * from './media/index.types';
export * from './signUp/index.adaptors';
export * from './signUp/index.types';

export type AdaptorRes<T = null> = {
  data: T | null;
  error: string | null;
  message?: string;
};
