import { SchemaRes } from 'src/core/api';

export interface Verification {
  id: string;
  name: string;
  proofId?: string;
  createdBy: string;
  creationDate: Date;
  description?: string;
  schema: SchemaRes;
}

export interface VerificationsRes {
  items: Verification[];
  page: number;
  totalCount: number;
}

export interface VerificationReqAdaptor {
  name: string;
  description?: string;
  schemaId: string;
}

export interface UpdateVerificationReq extends VerificationReqAdaptor {
  id: string;
}

export type OperatorValue = 'EQUAL' | 'NOT' | 'BIGGER' | 'SMALLER';

export interface VerificationAttribute {
  id: string;
  name: string;
  operator: OperatorValue;
  value: string | number;
  errors?: Record<'attribute' | 'operator' | 'value', string>;
}
