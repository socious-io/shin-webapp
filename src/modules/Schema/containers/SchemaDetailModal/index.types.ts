import { Schema } from 'src/core/adaptors';

export interface SchemaDetailModalProps {
  open: boolean;
  handleClose: () => void;
  data: Schema;
}
