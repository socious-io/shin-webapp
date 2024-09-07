export interface ProofRequestProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  subtitle: string;
  shortLink?: string;
  loading?: boolean;
}
