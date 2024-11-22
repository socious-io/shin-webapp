import { CredentialsRes, Schema } from 'src/core/adaptors';

export interface SchemaCredentialListProps {
  selectedSchema: Schema;
  schemaCredentialList: CredentialsRes | null;
  onUpdateSchemaCredentialList: (page: number) => void;
}
