import React from 'react';
import { useNavigate } from 'react-router-dom';

import css from './index.module.scss';
import { BackLinkProps } from './index.types';
import Button from '../Button';
import Icon from '../Icon';

const BackLink: React.FC<BackLinkProps> = props => {
  const navigate = useNavigate();
  const { onBack, title, block = false, customStyle } = props;
  const onClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      color="secondary"
      variant="text"
      startIcon={<Icon fontSize={24} name="arrow-left" className="text-Gray-light-mode-600" />}
      onClick={onClick}
      block={block}
      fullWidth
      className={`${css['button']} ${customStyle}`}
    >
      {title}
    </Button>
  );
};

export default BackLink;
