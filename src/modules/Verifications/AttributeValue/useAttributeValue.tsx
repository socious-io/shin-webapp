import { useState } from 'react';

export const useAttributeValue = (onChange: (value: string) => void) => {
  const booleanOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];

  const onChangeBoolean = option => {
    onChange(option.value);
  };

  return { booleanOptions, onChangeBoolean };
};
