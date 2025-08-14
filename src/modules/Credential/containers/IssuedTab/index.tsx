import { VerificationStatusType } from 'src/core/adaptors';
import { translate } from 'src/core/helpers/utils';
import Banner from 'src/modules/KYB/containers/Banner';

import { IssuedTabProps } from './index.types';
import { useIssuedTab } from './useIssuedTab';
import IssuedList from '../IssuedList';

const IssuedTab: React.FC<IssuedTabProps> = ({ setOpenModal }) => {
  const {
    data: { isVerified, currentStatus, showBanner },
    operations: { setDismissed, onCreateCredential },
  } = useIssuedTab();

  const bannerData: Record<
    VerificationStatusType,
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

  return (
    <div className="flex flex-col gap-6">
      {showBanner && <Banner {...bannerData[currentStatus]} />}
      {isVerified && <IssuedList />}
    </div>
  );
};

export default IssuedTab;
