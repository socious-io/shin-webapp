import { ImportFileRes, Schema } from 'src/core/adaptors';

export interface ImportCSVModalProps {
  open: boolean;
  handleClose: () => void;
  selectedSchema: Schema;
  totalImportedRecipients: number;
  onImportFiles: (res: ImportFileRes) => void;
}
