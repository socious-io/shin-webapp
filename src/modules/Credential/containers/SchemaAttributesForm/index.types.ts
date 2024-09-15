import { Attribute } from 'src/core/adaptors';
import { CredentialClaims } from 'src/core/api';

export interface FormHandles {
  submitForm: () => void;
}

export interface SchemaAttributesFormProps {
  schemaAttributes: Attribute[];
  schemaInfo: { title: string; description: string };
  onSubmitClaims: (claims: CredentialClaims[]) => void;
}
