import { OptionType } from 'src/core/adaptors';

export interface AttributeProps {
  index: number;
  options: OptionType[];
  selectedAttribute?: OptionType;
  onChangeAttribute: (index: number, attribute?: OptionType, operator?: OptionType, value?: string) => void;
  onDeleteAttribute: (index: number) => void;
  errors?: {
    id?: { message?: string };
    name?: { message?: string };
    value?: { message?: string };
  };
}
