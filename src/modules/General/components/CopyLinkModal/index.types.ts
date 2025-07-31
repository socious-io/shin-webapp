export interface CopyLinkModalProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  subtitle?: string;
  copyText?: string;
  link: string;
  onCopy: () => void;
}
