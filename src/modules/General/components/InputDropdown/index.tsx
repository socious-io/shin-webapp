import Select, { components, ControlProps, OptionProps, SingleValueProps } from 'react-select';
import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { InputDropdownProps, OptionType } from './index.types';

const InputDropdown: React.FC<InputDropdownProps> = ({ options, icon, minWidth = '', ...props }) => {
  const CustomControl: React.FC<ControlProps<OptionType, false>> = ({ children, ...props }) => (
    <components.Control {...props}>
      {icon && <Icon className={css['startIcon']} name={icon} fontSize={20} color={variables.color_grey_500} />}
      {children}
    </components.Control>
  );

  const CustomOption: React.FC<OptionProps<OptionType, false>> = ({ data, innerRef, innerProps, isSelected }) => {
    return (
      <div ref={innerRef} {...innerProps} className={`${css['option']} ${isSelected ? css['selecetdOption'] : ''}`}>
        {isSelected && <Icon name="check" fontSize={20} color={variables.color_grey_500} />}
        {data.icon && <span>{data.icon}</span>}
        {data.label}
      </div>
    );
  };

  const CustomSingleValue: React.FC<SingleValueProps<OptionType, false>> = ({ children, data, ...props }) => (
    <components.SingleValue data={data} {...props}>
      <div className="flex">
        {children}
        {data.description && <div className={css['description']}>{data.description}</div>}
      </div>
    </components.SingleValue>
  );

  return (
    <Select
      options={options}
      noOptionsMessage={() => null}
      className={css['container']}
      components={{
        Control: CustomControl,
        Option: CustomOption,
        SingleValue: CustomSingleValue,
        DropdownIndicator: () => (
          <div className={css['dropdown']}>
            <Icon name="chevron-down" fontSize={20} color={variables.color_grey_500} />
          </div>
        ),
      }}
      styles={{
        singleValue: provided => ({
          ...provided,
          color: variables.color_grey_900,
          fontSize: '16px',
          width: 'auto',
          fontWeight: 500,
        }),
        control: provided => ({
          ...provided,
          padding: '0',
          '&:hover': '',
          minWidth,
          border: 'none',
          boxShadow: 'none',
        }),
        indicatorSeparator: () => ({ display: 'none' }),
      }}
      {...props}
    />
  );
};

export default InputDropdown;
