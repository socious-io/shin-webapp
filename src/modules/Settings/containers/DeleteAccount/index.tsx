import { Divider } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';

import css from './index.module.scss';
import { useDeleteAccount } from './useDeleteAccount';

const DeleteAccount = () => {
  const {
    operations: { onDeleteAccount },
  } = useDeleteAccount();

  return (
    <div className={css['container']}>
      <span className={css['title']}>{translate('settings-remove.title')}</span>
      <Divider className="mx-[-1.5rem]" />
      <Button color="error" type="button" customStyle="self-end" onClick={onDeleteAccount}>
        {translate('settings-remove.title')}
      </Button>
    </div>
  );
};

export default DeleteAccount;
