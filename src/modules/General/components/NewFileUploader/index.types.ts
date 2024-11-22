export interface FileUploaderProps {
  files: File[];
  fileTypes: string[];
  onDropFiles: (files: File[]) => void;
  onDeleteFiles: (fileIndex?: number) => void;
  maxSize?: number;
  maxFiles?: number;
  error?: string;
  loadingMessage?: string;
  customText?: string;
  showSubtitle?: boolean;
  customStyle?: string;
}
