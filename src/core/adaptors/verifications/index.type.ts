import { SchemaAttributeType, SchemaRes, VerificationOperatorType } from 'src/core/api';

export interface Verification {
  id: string;
  name: string;
  proofId?: string;
  createdBy: string;
  creationDate: Date;
  description?: string;
  schema: SchemaRes;
  attributes: VerificationAttribute[];
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
  attributes: VerificationAttribute[];
}

export interface UpdateVerificationReq extends VerificationReqAdaptor {
  id: string;
}

export interface VerificationAttribute {
  id: string;
  name?: string;
  operator: VerificationOperatorType;
  value: string | number | boolean | Date;
  type: SchemaAttributeType;
}
