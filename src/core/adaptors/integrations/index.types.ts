import { PaginateRes } from 'src/core/api';

export type Integration = {
  id: string;
  name: string;
  base_url: string;
  api_key: string;
  secret_key: string;
};

export interface IntegrationsRes extends PaginateRes {
  items: Integration[];
}

export type IntegrationReq = {
  name: string;
};
