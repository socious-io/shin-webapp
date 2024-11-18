export interface ProgressFileUploaderProps {
  files: File[];
  fileTypes: string[];
  onDropFiles: (files: File[]) => void;
  onDeleteFiles: (fileIndex: number) => void;
  showProgress?: boolean;
  progressValues?: number[];
  uploadedErrors?: boolean[];
  maxSize?: number;
  maxFiles?: number;
  error?: string;
  loading?: boolean;
  multiple?: boolean;
  customText?: string;
  showSubtitle?: boolean;
  customStyle?: string;
}

export interface fileInfo {
  name: string;
  type: string;
  size: string;
}
