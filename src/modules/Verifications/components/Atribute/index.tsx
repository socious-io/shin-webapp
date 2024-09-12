import React from 'react';
import Icon from 'src/modules/General/components/Icon';
import Input from 'src/modules/General/components/Input';
import SearchDropdown from 'src/modules/General/components/SearchDropdown';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { AttributeProps } from './index.types';
import { useAttribute } from './useAttribute';

const Attribute: React.FC<AttributeProps> = ({ index, options, selectedAttribute, onChangeAttribute }) => {
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
        />
        <SearchDropdown
          value={selectedOperator}
          options={operators}
          isSearchable
          onChange={onSelectOperator}
          containerClassName="flex-1 w-full"
        />
        <Input
          value={attributeValue}
          onChange={e => handleChangeValue(e.target.value)}
          containerClassName="flex-1 w-full"
        />
      </div>
      <button className={css['container__delete']}>
        <Icon name="trash-03" fontSize={20} color={variables.color_grey_700} />
      </button>
    </div>
  );
};

export default Attribute;
