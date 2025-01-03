import { CredentialClaims, PaginateRes } from 'src/core/api';

export type CredentialStatus = 'ACTIVE' | 'PENDING' | 'REVOKED' | 'ISSUED' | 'CREATED' | 'CLAIMED';

export type Credential = {
  id: string;
  recipient_name: string;
  issuer: string;
  type: string;
  issuance_date: Date;
  expiration_date: Date | null;
  status: CredentialStatus;
};

export interface CredentialsRes extends PaginateRes {
  items: Credential[];
}

export type CredentialReq = {
  name: string;
  description: string;
  selectedSchema: string;
  selectedRecipient: string;
  claims: CredentialClaims[];
};

export type Recipient = {
  id: string;
  firstName?: string;
  lastName?: string;
  name: string;
  email: string;
  created_date: Date;
};

export interface RecipientRes extends PaginateRes {
  items: Recipient[];
}

export type RecipientReq = {
  email: string;
  firstName: string;
  lastName: string;
};

export type CredentialRecipientReq = Omit<CredentialReq, 'selectedRecipient'> & RecipientReq;

export interface SendCredentialReq {
  schema_id: string;
  message?: string;
}

export interface ImportFileReq {
  file: File;
  schema_id: string;
}

export interface ImportFileRes {
  id: string;
  total: number;
}

export type ImportStatus = 'INITIATED' | 'COMPLETED';
