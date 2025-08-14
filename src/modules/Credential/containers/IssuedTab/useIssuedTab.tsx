import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VerificationStatusType } from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useIssuedTab = () => {
  const navigate = useNavigate();
  const currentIdentity = useSelector((state: RootState) => {
    return state.identity.entities.find(e => e.current);
  });
  const isVerified = currentIdentity?.isVerified || false;
  const verificationStatus = currentIdentity?.verificationStatus || 'UNDEFINED';
  const [currentStatus, setCurrentStatus] = useState<VerificationStatusType>(verificationStatus);
  const [dismissed, setDismissed] = useState(Boolean(localStorage.getItem('dismissed-alert')));
  const showBanner = !isVerified || !dismissed;

  useEffect(() => {
    setCurrentStatus(isVerified ? 'APPROVED' : verificationStatus);
  }, [isVerified, verificationStatus]);

  const onCreateCredential = () => navigate('../create');

  return {
    data: {
      isVerified,
      currentStatus,
      showBanner,
    },
    operations: {
      setDismissed,
      onCreateCredential,
    },
  };
};
