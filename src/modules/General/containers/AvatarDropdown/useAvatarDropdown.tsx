import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrganizationsAdaptor } from 'src/core/adaptors';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { RootState } from 'src/store';
import { setOrganizationsList } from 'src/store/reducers/organizations.reducer';

export const useAvatarDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accounts = useSelector((state: RootState) => state.organizations.entities);
  const selectedAccount = accounts.find(account => account.current);
  const otherAccounts = accounts.filter(account => !account.current);
  const [open, setOpen] = useState(false);

  const handleAvatarClick = () => setOpen(!open);

  const switchAccount = async (accountId: string) => {
    await nonPermanentStorage.set({ key: 'identity', value: accountId });
    const { error, data } = await getOrganizationsAdaptor(accountId);
    if (error) return;
    else if (data) {
      dispatch(setOrganizationsList(data));
      navigate('/');
      setOpen(false);
    }
  };

  return { switchAccount, open, handleAvatarClick, accountList: accounts, selectedAccount, otherAccounts };
};
