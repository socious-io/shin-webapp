export type FileState = {
  id: string;
  file: File;
  progress: number;
  error: boolean;
};

export interface DetailModalProps {
  open: boolean;
  handleClose: () => void;
  handleSuccess: () => void;
}
