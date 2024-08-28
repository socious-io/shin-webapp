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
      onClick={onClick}
      block={block}
      fullWidth
      className={`${css['button']} ${customStyle}`}
    >
      <Icon name="arrow-left" fontSize={20} className="text-Gray-light-mode-600" />
      {title}
    </Button>
  );
};

export default BackLink;
