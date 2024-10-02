import { UploadMediaRes } from 'src/core/adaptors';

export interface FileUploaderMultipleProps {
  fileTypes: string[];
  maxFileNumbers?: number;
  maxSize?: number;
  customStyle?: string;
  uploaded: UploadMediaRes[];
  setUploaded: (newVal: UploadMediaRes[]) => void;
  onDeleteFile?: (deletedIndex: number) => void;
  setShowFiles?: (files: File[]) => void;
  showFiles?: File[];
  loading: boolean;
}

export interface fileInfo {
  name: string;
  type: string;
  size: string;
}
