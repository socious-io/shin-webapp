import { ButtonProps } from 'src/modules/General/components/Button/index.types';
import { ModalProps } from 'src/modules/General/components/Modal/index.types';

export interface ConfirmModalProps extends ModalProps {
  open: boolean;
  handleClose: () => void;
  confirmHeader: string;
  confirmSubheader?: string;
  buttons?: ButtonProps[];
}
