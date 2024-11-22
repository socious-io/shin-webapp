import { Integration } from 'src/core/adaptors';

export interface AddIntegrationModalProps {
  open: boolean;
  handleClose: () => void;
  onAddIntegration: () => void;
  integration?: Integration;
}
