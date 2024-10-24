import { useState } from 'react';
import { OptionType, VerificationAttribute } from 'src/core/adaptors';

import { AttributeOption } from './index.types';

export const useAttribute = (
  index: number,
  onChangeAttribute: (index: number, attribute?: AttributeOption, operator?: OptionType, value?: string) => void,
  attribute?: VerificationAttribute,
) => {
  const operators = [
    { types: ['TEXT', 'NUMBER', 'BOOLEAN', 'URL', 'EMAIL', 'DATETIME'], value: 'EQUAL', label: 'Is equal to' },
    { types: ['TEXT', 'NUMBER', 'BOOLEAN', 'URL', 'EMAIL', 'DATETIME'], value: 'NOT', label: 'Is not' },
    { types: ['NUMBER', 'DATETIME'], value: 'BIGGER', label: 'Is greater than' },
    { types: ['NUMBER', 'DATETIME'], value: 'SMALLER', label: 'Is less than' },
  ];

  const getOperatorOptionValue = (type: string) => {
    const options = operators
      .filter(item => item.types.includes(type))
      .map(item => {
        const { label, value } = item;
        return { label, value };
      });
    return options;
  };

  const [operatorOptions, setOperatorOptions] = useState<OptionType[]>(
    getOperatorOptionValue(attribute?.type || 'TEXT'),
  );

  const [selected, setSelected] = useState<OptionType>({ label: attribute?.name || '', value: attribute?.id || '' });
  const [selectedOperator, setSelectedOperator] = useState<OptionType>({
    value: attribute?.operator || '',
    label: attribute ? operators.find(item => item.value === attribute.operator)?.label || '' : '',
  });
  const [attributeValue, setAttributeValue] = useState(attribute?.value || '');

  const onSelectAttribute = attribute => {
    setSelected(attribute);
    onChangeAttribute(index, attribute);
    setOperatorOptions(getOperatorOptionValue(attribute.type));
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
    selectedOperator,
    onSelectOperator,
    attributeValue,
    handleChangeValue,
    operatorOptions,
  };
};
