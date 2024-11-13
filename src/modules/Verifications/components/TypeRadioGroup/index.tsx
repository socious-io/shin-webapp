import { Radio, RadioGroup } from '@mui/material';
import React from 'react';
import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { TypeRadioGroupProps } from './index.type';
import { useTypeRadioGroup } from './useTypeRadioGroup';

const TypeRadioGroup: React.FC<TypeRadioGroupProps> = ({ selected, setSelected, error }) => {
  const { cardItems } = useTypeRadioGroup();
  return (
    <>
      <RadioGroup className={css['container']}>
        {cardItems.map(item => {
          return (
            <div
              key={item.value}
              className={`${css['card']} ${selected === item.value && css['card--selected']} `}
              onClick={() => setSelected(item.value)}
            >
              <Radio
                id={`verification-${item.value}`}
                size={'medium'}
                onChange={() => setSelected(item.value)}
                value={item.value}
                checked={selected === item.value}
                className="p-0"
              />
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-0.5">
                  <div className={css['card__title']}>{item.title}</div>
                  <div className={css['card__subtitle']}>{item.subtitle}</div>
                </div>
                <div className="flex flex-col gap-2">
                  {item.items.map(chkItem => (
                    <div key={chkItem} className="flex gap-3">
                      <div className={css['card__icon']}>
                        <Icon name="tick" color={variables.color_primary_600} fontSize={12} />
                      </div>
                      <div className={css['card__subtitle']}>{chkItem}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </RadioGroup>
      {error && <p className={css['container__error']}>{error}</p>}
    </>
  );
};

export default TypeRadioGroup;
