export interface FormHandles {
  submitForm: () => void;
}

export type Form = {
  message?: string;
};

export type CredentialDetail = {
  name: string;
  issuer: string;
};

export interface PreviewCredentialProps {
  credentialDetail: CredentialDetail;
  onSendCredential: (message: string) => void;
}
