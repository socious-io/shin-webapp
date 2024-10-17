import { SchemaAttributeType } from 'src/core/api';

export interface AttributeValueProps {
  type: SchemaAttributeType;
  value: string;
  onChange: (value: string) => void;
  containerClassName?: string;
  error?: string;
}
