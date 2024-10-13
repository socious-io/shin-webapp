import { SchemaAttributeType } from 'src/core/api';

export interface AttributeValueProps {
  type: SchemaAttributeType;
  value: string | number | boolean | Date;
  onChange: (value: string) => void;
  containerClassName?: string;
  error?: string;
}
