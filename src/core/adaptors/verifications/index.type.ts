import { PaginateRes, SchemaAttributeType, SchemaRes, StatusValue, VerificationOperatorType } from 'src/core/api';

export type verificationType = 'reusable' | 'singleUse';

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
  type: verificationType;
  message?: string;
}

export interface UpdateVerificationReq extends VerificationReqAdaptor {
  id: string;
}

export interface VerificationAttribute {
  id: string;
  name?: string;
  operator: VerificationOperatorType;
  value: string;
  type: SchemaAttributeType;
}

export interface VerificationIndividualAdaptor {
  id: string;
  individualId: string;
  connectionUrl?: string;
  status: StatusValue;
  createDate: Date;
}

export interface VerificationIndividualAdaptorList extends PaginateRes {
  results: VerificationIndividualAdaptor[];
}
