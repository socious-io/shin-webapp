export interface FileUploaderProps {
  fileTypes: string[];
  maxFileNumbers?: number;
  maxFileSize?: number;
  showFileName?: boolean;
  customStyle?: string;
  setAttachments: (newVal: string[]) => void;
  setAttachmentsUrl?: (newVal: string[]) => void;
}
