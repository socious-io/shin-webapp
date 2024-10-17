import { useState } from 'react';

export const useAttributeValue = (value: string, onChange: (value: string) => void) => {
  const booleanOptions = [
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' },
  ];

  const selectedBooleanOption = booleanOptions.find(item => item.value === value);
  const onChangeBoolean = option => {
    onChange(option.value);
  };

  return { booleanOptions, onChangeBoolean, selectedBooleanOption };
};
