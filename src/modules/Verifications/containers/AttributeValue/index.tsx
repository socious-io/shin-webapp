import dayjs from 'dayjs';
import React from 'react';
import DateTimePicker from 'src/modules/General/components/DateTimePicker';
import Input from 'src/modules/General/components/Input';
import SearchDropdown from 'src/modules/General/components/SearchDropdown';

import { AttributeValueProps } from './index.types';
import { useAttributeValue } from './useAttributeValue';

const AttributeValue: React.FC<AttributeValueProps> = ({ type, value, onChange, containerClassName, error }) => {
  const { booleanOptions, onChangeBoolean, selectedBooleanOption } = useAttributeValue(value, onChange);
  const inputs = {
    BOOLEAN: (
      <SearchDropdown
        options={booleanOptions}
        isSearchable
        onChange={onChangeBoolean}
        errors={error ? [error] : undefined}
        value={selectedBooleanOption}
      />
    ),
    DATETIME: <DateTimePicker value={dayjs(value)} onChange={onChange} errorMessage={error} />,
  };
  return (
    <div className={containerClassName}>
      {inputs[type] || (
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          containerClassName="flex-1 w-full"
          errors={error ? [error] : undefined}
          type={type === 'NUMBER' ? 'number' : 'text'}
        />
      )}
      {/* {(type === 'TEXT' || type === 'NUMBER' || type === 'URL' || type == 'EMAIL') && (
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          containerClassName="flex-1 w-full"
          errors={error ? [error] : undefined}
          type={type === 'NUMBER' ? 'number' : 'text'}
        />
      )} */}
      {/* {type === 'BOOLEAN' && (
        <SearchDropdown
          options={booleanOptions}
          isSearchable
          onChange={onChangeBoolean}
          errors={error ? [error] : undefined}
          value={selectedBooleanOption}
        />
      )}
      {type === 'DATETIME' && <DateTimePicker value={dayjs(value)} onChange={onChange} errorMessage={error} />} */}
    </div>
  );
};

export default AttributeValue;
