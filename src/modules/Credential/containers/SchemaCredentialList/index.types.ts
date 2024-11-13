import { Schema } from 'src/core/adaptors';

export interface SchemaCredentialListProps {
  selectedSchema: Schema;
  selectedCredential: string;
  onSelectCredential: (credentialId: string) => void;
}
