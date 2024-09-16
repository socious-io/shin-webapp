import { useState } from 'react';
import { OptionType } from 'src/core/adaptors';

export const useAttribute = (
  index: number,
  options: OptionType[],
  onChangeAttribute: (index: number, attribute?: OptionType, operator?: OptionType, value?: string | number) => void,
  attribute?: OptionType,
  operator?: OptionType,
) => {
  const [selected, setSelected] = useState(attribute);
  const [selectedOperator, setSelectedOperator] = useState(operator);
  const [attributeValue, setAttributeValue] = useState('');

  const operators: OptionType[] = [
    { value: 'EQUAL', label: 'Is equal to' },
    { value: 'NOT', label: 'Is not' },
    { value: 'BIGGER', label: 'Is greater than' },
    { value: 'SMALLER', label: 'Is less than' },
  ];
  const onSelectAttribute = attribute => {
    setSelected(attribute);
    onChangeAttribute(index, attribute);
  };

  const onSelectOperator = option => {
    setSelectedOperator(option);
    onChangeAttribute(index, undefined, option);
  };

  const handleChangeValue = (val: string) => {
    setAttributeValue(val);
    onChangeAttribute(index, undefined, undefined, val);
  };

  return {
    selected,
    onSelectAttribute,
    operators,
    selectedOperator,
    onSelectOperator,
    attributeValue,
    handleChangeValue,
  };
};
