import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { ReusableVerificationsRes, SingleUseVerificationsRes } from 'src/core/adaptors';
import { MenuItem } from 'src/modules/General/components/ThreeDotButton/index.type';
import ReusableList from 'src/modules/Verifications/containers/ReusableList';
import SingleUseList from 'src/modules/Verifications/containers/SingleUseList';
import { RootState } from 'src/store';
import { NotificationState, setNotificationState } from 'src/store/reducers/notification.reducer';

export const useVerifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const { singleUseList: loaderSingleUseList, reusableList: loaderReusableList } = useLoaderData() as {
    reusableList?: ReusableVerificationsRes;
    singleUseList?: SingleUseVerificationsRes;
  };
  const emptyList = loaderSingleUseList?.totalCount === 0 && loaderReusableList?.totalCount === 0;
  const [openModal, setOpenModal] = useState<{ name: 'delete' | 'copy' | 'history'; open: boolean }>();
  const [selectedId, setSelectedId] = useState('');
  const [url, setUrl] = useState('');

  const getMenuItems = (id: string, tab: 'reusable' | 'singleUse'): MenuItem[] => {
    const items = [
      {
        iconName: 'pencil-line',
        label: translate('ver-cell-edit'),
        action: () => {
          navigate(`/verifications/edit/${id}`);
        },
      },

      {
        iconName: 'trash-01',
        label: translate('ver-cell-delete'),
        action: () => {
          setSelectedId(id);
          setOpenModal({ name: 'delete', open: true });
        },
      },
    ];
    if (tab === 'singleUse') return items;

    items.splice(1, 0, {
      iconName: 'clock-fast-forward',
      label: translate('ver-cell-History'),
      action: () => {
        handleOpenHistory(id);
      },
    });
    return items;
  };

  const handleOpenHistory = async (verificationId: string) => {
    setSelectedId(verificationId);
    setOpenModal({ name: 'history', open: true });
  };

  const handleOpenCopy = (id: string) => {
    const copyUrl = `${config.appBaseURL}/connect/redirect/${id}`;
    setUrl(copyUrl);
    setOpenModal({ name: 'copy', open: true });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  const tabs = [
    {
      label: 'Reusable',
      content: (
        <ReusableList
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectedId={selectedId}
          getMenuItems={getMenuItems}
          handleOpenCopy={handleOpenCopy}
        />
      ),
    },
    {
      label: 'Single-use',
      content: (
        <SingleUseList
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectedId={selectedId}
          getMenuItems={getMenuItems}
          handleOpenCopy={handleOpenCopy}
        />
      ),
    },
  ];

  const notification = useSelector<RootState, NotificationState>(state => state.notification);
  const handleCreate = () => {
    navigate('/verifications/create');
  };

  const onCloseNotification = () => {
    dispatch(setNotificationState({ title: '', display: false }));
  };

  return {
    data: { emptyList, notification, tabs, url, openModal, selectedId },
    operations: { handleCreate, onCloseNotification, translate, setOpenModal, handleCopy, handleOpenCopy },
  };
};
