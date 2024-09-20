import { Radio, RadioGroup } from '@mui/material';

import css from './index.module.scss';
import { CardRadioButtonProps } from './index.types';

const CardRadioButton: React.FC<CardRadioButtonProps> = ({
  items,
  selectedValue,
  setSelectedValue,
  customStyle = '',
  containerClassName = '',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <RadioGroup className={`gap-3 ${customStyle}`}>
      {items.map(item => (
        <div
          key={item.title}
          className={`${css['container']} ${selectedValue === item.value && css['container--selected']} ${containerClassName}`}
          onClick={() => setSelectedValue(item.value)}
        >
          {item.icon}
          <div className={css['content']}>
            <div className={css['content__title']}>{item.title}</div>
            <div className={css['content__desc']}>{item.description}</div>
          </div>
          <Radio
            id={item.title}
            size={item?.radioSize || 'medium'}
            onChange={handleChange}
            value={item.value}
            checked={selectedValue === item.value}
            className="p-0"
          />
        </div>
      ))}
    </RadioGroup>
  );
};

export default CardRadioButton;
