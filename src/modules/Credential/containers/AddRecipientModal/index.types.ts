import { Recipient } from 'src/core/adaptors';

export interface AddRecipientModalProps {
  open: boolean;
  handleClose: () => void;
  onAddRecipient: () => void;
  recipient?: Recipient;
}
