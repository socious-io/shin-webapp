import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AdaptorRes, VerificationsRes } from 'src/core/adaptors';
import { RootState } from 'src/store';
import { NotificationState, setNotificationState } from 'src/store/reducers/notification.reducer';

export const useVerifications = () => {
  const navigate = useNavigate();
  const { data } = useLoaderData() as AdaptorRes<VerificationsRes>;
  const [list, setList] = useState(data?.items);
  const dispatch = useDispatch();
  const notification = useSelector<RootState, NotificationState>(state => state.notification);
  const handleCreate = () => {
    navigate('/verifications/create');
  };

  const onCloseNotification = () => {
    dispatch(setNotificationState({ title: '', display: false }));
  };
  return {
    data: { list, totalCount: data?.totalCount, notification },
    operations: { setList, handleCreate, onCloseNotification },
  };
};
