import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrgProfileAdaptor } from 'src/core/adaptors';
import { translate } from 'src/core/helpers/utils';
import IssuedTab from 'src/modules/Credential/containers/IssuedTab';
import { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

export const useCredentials = () => {
  const dispatch = useDispatch();
  const { entities: identities, currentId } = useSelector((state: RootState) => state.identity);
  const currentIdentity = identities.find(i => i.current);
  const isVerified = currentIdentity?.isVerified || false;
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<{
    name: '' | 'verify' | 'detail' | 'success' | 'pending' | 'rejected';
    open: boolean;
  }>({ name: '', open: false });

  const onCreateCredential = () => navigate('../create');

  const tabs = [
    {
      label: translate('credential-tab1'),
      content: <IssuedTab setOpenModal={setOpenModal} />,
    },
  ];

  const onCloseModal = () => setOpenModal({ ...openModal, open: false });

  const onComplete = async () => {
    if (!currentId) return;
    const { data } = await getOrgProfileAdaptor(currentId);
    if (data) {
      const filteredIdentities = identities.map(identity => {
        return identity.id === currentId ? { ...data, current: true } : identity;
      });
      dispatch(setIdentityList({ entities: filteredIdentities, currentId }));
    }

    onCloseModal();
  };

  return {
    data: { translate, tabs, isVerified, openModal },
    operations: { onCreateCredential, setOpenModal, onCloseModal, onComplete },
  };
};
