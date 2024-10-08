import { Organization } from '../organizations/organizations.types';
import { RecipientRes } from '../recipients/recipients.types';
import { SchemaRes } from '../schemas/schemas.types';
import { PaginateRes } from '../types';
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
