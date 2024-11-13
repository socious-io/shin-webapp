import { Schema } from 'src/core/adaptors';

export interface CredentialRecipientModalProps {
  open: boolean;
  handleClose: () => void;
  selectedSchema: Schema;
  onAddCredentialRecipient: () => void;
}
