export interface SuccessRes {
  message: string;
}

export interface PaginateReq {
  page?: number;
  limit?: number;
}

export interface PagniateRes {
  page: number;
  total: number;
  limit: number;
}
