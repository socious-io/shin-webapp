import { PaginateRes } from 'src/core/api';

export type AttributeOption = {
  value: string;
  label?: string;
};

export type Attribute = {
  id: string;
  name: string;
  option: AttributeOption;
  description?: string;
};

export type Schema = {
  id: string;
  name: string;
  description: string;
  deletable: boolean;
  disabled: boolean;
  created: string;
  created_at: Date;
  attributes: Attribute[];
};

export interface SchemaRes extends PaginateRes {
  items: Schema[];
}

export type SchemaReq = {
  name: string;
  description?: string;
  attributes: Attribute[];
};
