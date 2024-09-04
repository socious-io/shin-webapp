import { PaginateRes } from 'src/core/api';

export type CredentialStatus = 'ACTIVE' | 'PENDING' | 'REVOKED';

export type Credential = {
  id: string;
  recipient_name: string;
  issuer: string;
  type: string;
  issuance_date: Date;
  expiration_date: Date;
  status: CredentialStatus;
};

export interface CredentialsRes extends PaginateRes {
  items: Credential[];
}
