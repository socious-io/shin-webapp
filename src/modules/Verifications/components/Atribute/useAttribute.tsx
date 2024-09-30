import { useState } from 'react';
import { OptionType, VerificationAttribute } from 'src/core/adaptors';

export const useAttribute = (
  index: number,
  onChangeAttribute: (index: number, attribute?: OptionType, operator?: OptionType, value?: string) => void,
  attribute?: VerificationAttribute,
) => {
  const operators: OptionType[] = [
    { value: 'EQUAL', label: 'Is equal to' },
    { value: 'NOT', label: 'Is not' },
    { value: 'BIGGER', label: 'Is greater than' },
    { value: 'SMALLER', label: 'Is less than' },
  ];

  const [selected, setSelected] = useState<OptionType>({ label: attribute?.name || '', value: attribute?.id || '' });
  const [selectedOperator, setSelectedOperator] = useState<OptionType>({
    value: attribute?.operator || '',
    label: attribute ? operators.find(item => item.value === attribute.operator)?.label || '' : '',
  });
  const [attributeValue, setAttributeValue] = useState(attribute?.value || '');

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
