import { Schema } from 'src/core/adaptors';

export interface ImportCSVModalProps {
  open: boolean;
  handleClose: () => void;
  selectedSchema: Schema;
  onImportFiles: (importId: string) => void;
}
