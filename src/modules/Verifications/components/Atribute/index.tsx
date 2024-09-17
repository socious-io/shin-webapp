import React from 'react';
import Icon from 'src/modules/General/components/Icon';
import Input from 'src/modules/General/components/Input';
import SearchDropdown from 'src/modules/General/components/SearchDropdown';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { AttributeProps } from './index.types';
import { useAttribute } from './useAttribute';

const Attribute: React.FC<AttributeProps> = ({
  index,
  options,
  selectedAttribute,
  onChangeAttribute,
  onDeleteAttribute,
  errors,
}) => {
  const {
    selected,
    onSelectAttribute,
    operators,
    selectedOperator,
    onSelectOperator,
    attributeValue,
    handleChangeValue,
  } = useAttribute(index, options, onChangeAttribute, selectedAttribute);
  return (
    <div className={css['container']}>
      <div className={css['container__inputs']}>
        <SearchDropdown
          value={selected}
          options={options}
          isSearchable
          onChange={onSelectAttribute}
          containerClassName="flex-1 w-full"
          errors={errors && errors['id']?.message ? [errors['id'].message] : undefined}
        />
        <SearchDropdown
          value={selectedOperator}
          options={operators}
          isSearchable
          onChange={onSelectOperator}
          containerClassName="flex-1 w-full"
          errors={errors && errors['operator']?.message ? [errors['operator'].message] : undefined}
        />
        <Input
          value={attributeValue}
          onChange={e => handleChangeValue(e.target.value)}
          containerClassName="flex-1 w-full"
          errors={errors && errors['value']?.message ? [errors['value'].message] : undefined}
        />
      </div>
      <button className={css['container__delete']} onClick={() => onDeleteAttribute(index)}>
        <Icon name="trash-03" fontSize={20} color={variables.color_grey_700} className="!cursor-pointer" />
      </button>
    </div>
  );
};

export default Attribute;
