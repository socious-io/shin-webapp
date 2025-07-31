import Icon from 'src/modules/General/components/Icon';
import SearchDropdown from 'src/modules/General/components/SearchDropdown';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { AttributeProps } from './index.types';
import { useAttribute } from './useAttribute';
import AttributeValue from '../AttributeValue';

const Attribute: React.FC<AttributeProps> = ({
  index,
  attributeOptions,
  selectedAttribute,
  onChangeAttribute,
  onDeleteAttribute,
  errors,
}) => {
  const {
    selected,
    onSelectAttribute,
    operatorOptions,
    selectedOperator,
    onSelectOperator,
    attributeValue,
    handleChangeValue,
  } = useAttribute(index, onChangeAttribute, selectedAttribute);
  return (
    <div className={css['container']}>
      <div className={css['container__inputs']}>
        <SearchDropdown
          value={selected}
          options={attributeOptions}
          isSearchable
          onChange={onSelectAttribute}
          containerClassName="flex-1 w-full"
          errors={errors && errors['id']?.message ? [errors['id'].message] : undefined}
        />
        <SearchDropdown
          value={selectedOperator}
          options={operatorOptions}
          isSearchable
          onChange={onSelectOperator}
          containerClassName="flex-1 w-full"
          errors={errors && errors['operator']?.message ? [errors['operator'].message] : undefined}
        />
        <AttributeValue
          value={attributeValue}
          type={selectedAttribute?.type || 'TEXT'}
          onChange={handleChangeValue}
          containerClassName="flex-1 w-full"
          error={errors?.value?.message}
        />
      </div>
      <button className={css['container__delete']} onClick={() => onDeleteAttribute(index)}>
        <Icon name="trash-03" fontSize={20} color={variables.color_grey_700} className="!cursor-pointer" />
      </button>
    </div>
  );
};

export default Attribute;
