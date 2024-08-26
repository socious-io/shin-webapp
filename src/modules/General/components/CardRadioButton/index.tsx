import { RadioGroup } from '@mui/material';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { CardRadioButtonProps } from './index.types';
import Checkbox from '../Checkbox';
import Icon from '../Icon';

const CardRadioButton: React.FC<CardRadioButtonProps> = props => {
  const { items, selectedValue, setSelectedValue } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <RadioGroup sx={{ gap: '12px' }}>
      {items.map(item => (
        <div
          key={item.title}
          className={`${css.container} ${selectedValue === item.value ? css.selectedContainer : css.normalContainer} `}
          onClick={() => setSelectedValue(item.value)}
        >
          {item.img ? (
            item.img
          ) : item.icon ? (
            <div className={css.iconDiv}>
              <Icon
                name={item.icon.name}
                fontSize={item.icon.fontSize}
                color={selectedValue === item.value ? variables.color_primary_600 : variables.color_primary_600}
              />
            </div>
          ) : (
            ''
          )}

          <div className={css.content}>
            <div className={`${css.title} ${selectedValue === item.value ? css.selectedTitle : ''}`}>{item.title}</div>
            <div className={`${css.desc} ${selectedValue === item.value ? css.selectedDesc : ''}`}>
              {item.description}
            </div>
          </div>
          <div className={css.rbContainer}>
            <Checkbox
              id={item.title}
              type="checkCircle"
              size="small"
              onChange={handleChange}
              value={item.value}
              checked={selectedValue === item.value}
            />
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

export default CardRadioButton;
