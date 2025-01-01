export type Files = {
  id: string;
  file: File;
};

export interface ProgressFileUploaderProps {
  files: Files[];
  fileTypes: string[];
  onDropFiles: (files: File[]) => void;
  onDeleteFiles: (fileId: string) => void;
  showProgress?: boolean;
  progressValues?: Record<string, number>;
  uploadedErrors?: Record<string, boolean>;
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
