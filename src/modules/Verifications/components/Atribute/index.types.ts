import { OptionType } from 'src/core/adaptors';

export interface AttributeProps {
  index: number;
  options: OptionType[];
  selectedAttribute?: OptionType;
  onChangeAttribute: (index: number, attribute?: OptionType, operator?: OptionType, value?: string | number) => void;
  onDeleteAttribute: (index: number) => void;
  errors: Record<'attribute' | 'operator' | 'value', string>;
}
