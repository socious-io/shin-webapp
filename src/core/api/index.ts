export * from './http';

export * from './auth/auth.types';
export * from './auth/auth.api';

export type PaginationRes = {
  page: number;
  totalCount: number;
  limit: number;
};
