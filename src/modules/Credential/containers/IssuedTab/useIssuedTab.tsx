import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerificationStatus } from 'src/core/api';
import { translate } from 'src/core/helpers/utils';

export const useIssuedTab = (
  setOpenModal: (val: { name: 'verify' | 'detail' | 'success' | 'pending' | 'rejected'; open: boolean }) => void,
  verificationStatus: VerificationStatus | null,
) => {
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(Boolean(localStorage.getItem('dismissed-alert')));
  const status = verificationStatus || 'UNDEFINED';
  const showBanner = status !== 'APPROVED' || !dismissed;

  const onCreateCredential = () => navigate('../create');

  const bannerData: Record<
    'UNDEFINED' | 'REJECTED' | 'PENDING' | 'APPROVED',
    {
      iconName: string;
      title: string;
      subtitle: string;
      primaryBtnLabel: string;
      primaryBtnAction: () => void;
      secondaryBtnLabel?: string;
      secondaryBtnAction?: () => void;
      theme: 'success' | 'warning' | 'error';
    }
  > = {
    UNDEFINED: {
      iconName: 'alert-circle',
      title: translate('kyb-verify'),
      subtitle: translate('kyb-verify-subtitle'),
      primaryBtnLabel: translate('kyb-verify-btn'),
      primaryBtnAction: () => {
        setOpenModal({ name: 'verify', open: true });
      },
      theme: 'warning',
    },
    REJECTED: {
      iconName: 'alert-circle',
      title: translate('kyb-failed'),
      subtitle: translate('kyb-failed-subtitle'),
      primaryBtnLabel: translate('kyb-failed-label'),
      primaryBtnAction: () => {
        setOpenModal({ name: 'rejected', open: true });
      },
      theme: 'error',
    },
    PENDING: {
      iconName: 'alert-circle',
      title: translate('kyb-pending'),
      subtitle: translate('kyb-pending-subtitle'),
      primaryBtnLabel: translate('kyb-pending-btn'),
      primaryBtnAction: () => {
        setOpenModal({ name: 'pending', open: true });
      },
      theme: 'warning',
    },
    APPROVED: {
      iconName: 'check-circle',
      title: translate('kyb-success'),
      subtitle: translate('kyb-success-subtitle'),
      primaryBtnLabel: translate('kyb-success-btn'),
      primaryBtnAction: onCreateCredential,
      secondaryBtnLabel: translate('kyb-success-dismiss'),
      secondaryBtnAction: () => {
        localStorage.setItem('dismissed-alert', 'true');
        setDismissed(true);
      },
      theme: 'success',
    },
  };

  return { bannerData, status, showBanner };
};
