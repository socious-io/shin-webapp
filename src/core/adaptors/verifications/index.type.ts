import { Schema } from '../schema/index.types';

export interface Verification {
  id: string;
  name: string;
  proofId: string;
  createdBy: string;
  creationDate: string;
  description?: string;
  schema: Schema;
}

export interface VerificationsRes {
  items: Verification[];
  page: number;
  totalCount: number;
}

export interface VerificationReq {
  name: string;
  description?: string;
  schemaId: string;
}

export interface UpdateVerificationReq extends VerificationReq {
  id: string;
}
