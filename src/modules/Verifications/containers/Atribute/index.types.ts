import { OptionType, VerificationAttribute } from 'src/core/adaptors';
import { SchemaAttributeType } from 'src/core/api';

export interface AttributeOption {
  label: string;
  value: string;
  type: SchemaAttributeType;
}

export interface AttributeProps {
  index: number;
  attributeOptions: AttributeOption[];
  selectedAttribute?: VerificationAttribute;
  onChangeAttribute: (index: number, attribute?: AttributeOption, operator?: OptionType, value?: string) => void;
  onDeleteAttribute: (index: number) => void;
  errors?: {
    id?: { message?: string };
    name?: { message?: string };
    value?: { message?: string };
  };
}
