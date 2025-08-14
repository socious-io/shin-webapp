import { PaginateRes } from '..';
import { Organization } from '../organizations/organizations.types';
import { RecipientReq, RecipientRes } from '../recipients/recipients.types';
import { SchemaRes } from '../schemas/schemas.types';
import { User } from '../users/users.types';

export interface CredentialClaims {
  name: string;
  value: string;
}

export interface CredentialReq {
  name: string;
  description: string;
  schema_id: string;
  recipient_id: string;
  claims: CredentialClaims[];
}

export interface CredentialRes extends CredentialReq {
  id: string;
  schema: SchemaRes;
  created: User;
  recipient: RecipientRes;
  organization: Organization;
  connection_url?: string;
  connection_id?: string;
  status: 'CREATED' | 'ISSUED' | 'CLAIMED' | 'FAILED' | 'REVOKED';
  created_at: Date;
  updated_at: Date;
  expired_at?: Date;
  revoked_at?: Date;
  connection_at?: Date;
}

export interface CredentialListRes extends PaginateRes {
  results: CredentialRes[];
}

export interface CredentialRecipientReq {
  credential: Omit<CredentialReq, 'recipient_id'>;
  recipient: RecipientReq;
}

export interface CredentialIds {
  credentials: string[];
}

export interface SendCredentialsReq {
  schema_id: string;
  message?: string;
}

export interface ImportFileReq {
  file: File;
  schema_id: string;
}

export interface ImportFileRes {
  id: string;
  total_count: number;
  status: 'INITIATED' | 'COMPLETED';
}
