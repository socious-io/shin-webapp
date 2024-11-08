import { Radio, RadioGroup } from '@mui/material';
import React from 'react';
import check from 'src/assets/icons/item-check.svg';

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
                      <img src={check} alt="check" />
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
