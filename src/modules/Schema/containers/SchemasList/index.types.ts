import { Schema } from 'src/core/adaptors';

export interface SchemasListProps {
  list: Schema[];
  onUpdateList?: (newList: Schema[]) => void;
}
