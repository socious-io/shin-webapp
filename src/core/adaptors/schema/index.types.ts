import { PaginationRes } from 'src/core/api';

export type AttributeOption = {
  value?: string;
  label?: string;
};

export type Attribute = {
  name: string;
  option?: AttributeOption | null;
  description?: string;
};

export type Schema = {
  id: string;
  name: string;
  description: string;
  deletable: boolean;
  created: string;
  created_at: Date;
  attributes: Attribute[];
};

export interface SchemaRes extends PaginationRes {
  items: Schema[];
}

export type SchemaReq = {
  name: string;
  description?: string;
  attributes: Attribute[];
};
