import { Divider, Typography } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import AvatarLabelGroup from 'src/modules/General/components/AvatarLabelGroup';
import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import { AvatarDropDownProps } from './index.types';
import { useAvatarDropDown } from './useAvatarDropdown';

export const AvatarDropDown: React.FC<AvatarDropDownProps> = ({
  buttonHeight,
  displayOtherAccounts = false,
  onCreateAccount,
}) => {
  const { open, switchAccount, handleAvatarClick, selectedAccount, otherAccounts } = useAvatarDropDown();

  return (
    <div className="w-full flex flex-col justify-center items-center border border-solid border-Gray-light-mode-300 rounded-default overflow-hidden">
      <button
        className={`${buttonHeight ? `h-[${buttonHeight}]` : 'h-16'} w-full flex items-center justify-start bg-Base-White border-none cursor-pointer`}
        onClick={handleAvatarClick}
      >
        {selectedAccount && <AvatarLabelGroup account={selectedAccount} avatarSize="32px" customStyle="px-4 py-3" />}
        {!open && (
          <Icon name="chevron-down" fontSize={20} color={variables.color_grey_700} cursor="pointer" className="pr-4" />
        )}
      </button>
      {open && (
        <div className="w-full max-h-96 bg-Base-White rounded-default overflow-y-auto">
          <div className="w-full">
            <Divider />
          </div>
          <div className="w-full flex flex-col">
            {otherAccounts && (
              <>
                {displayOtherAccounts &&
                  otherAccounts.map(account => (
                    <AvatarLabelGroup
                      key={account.id}
                      account={account}
                      handleClick={() => switchAccount(account.id)}
                      avatarSize="32px"
                      customStyle="py-3 px-4"
                    />
                  ))}
                <div className="flex gap-2 px-4 py-[10px] cursor-pointer" onClick={onCreateAccount}>
                  <Icon name="plus" fontSize={20} color={variables.color_grey_700} className="!p-0" />
                  <Typography variant="subtitle2" className="text-Brand-700">
                    {translate('layout-create-org')}
                  </Typography>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
