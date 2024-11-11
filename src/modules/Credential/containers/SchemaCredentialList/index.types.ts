import { Credential, Schema } from 'src/core/adaptors';

export interface SchemaCredentialListProps {
  selectedSchema: Schema;
  selectedCredentials: string[];
  onSelectCredential: (credentialId: string) => void;
  onSelectAllCredentials: (checked: boolean, schemaCredentials: Credential[]) => void;
}
