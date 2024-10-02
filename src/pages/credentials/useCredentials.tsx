import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getOrgProfileAdaptor, OrgProfileRes } from 'src/core/adaptors';
import { VerificationStatus } from 'src/core/api';
import IssuedList from 'src/modules/Credential/containers/IssuedList';
import Banner from 'src/modules/KYB/containers/Banner';

export const useCredentials = () => {
  const { orgProfile } = useLoaderData() as { orgProfile: OrgProfileRes };
  const [isVerified, setIsVerified] = useState(orgProfile.isVerified);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus | null>(
    orgProfile.verificationStatus,
  );
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(Boolean(localStorage.getItem('dismissed-alert')));
  const [openModal, setOpenModal] = useState<{
    name: 'verify' | 'detail' | 'success' | 'pending' | 'rejected';
    open: boolean;
  }>();

  const onCreateCredential = () => navigate('../create');

  const bannerData: Record<
    'null' | 'REJECTED' | 'PENDING' | 'APPROVED',
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
    null: {
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
        setDismissed(false);
      },
      theme: 'success',
    },
  };

  const getIssuedListComponent = () => {
    const status = verificationStatus || 'null';
    return (
      <div className="flex flex-col gap-6">
        <Banner
          iconName={bannerData[status].iconName}
          title={bannerData[status].title}
          subtitle={bannerData[status].subtitle}
          primaryBtnLabel={bannerData[status].primaryBtnLabel}
          primaryBtnAction={bannerData[status].primaryBtnAction}
          secondaryBtnLabel={bannerData[status].secondaryBtnLabel}
          secondaryBtnAction={bannerData[status].secondaryBtnAction}
          theme={bannerData[status].theme}
        />
        {isVerified && <IssuedList />}
      </div>
    );
  };

  const tabs = [{ label: translate('credential-tab1'), content: getIssuedListComponent() }];

  const onComplete = async () => {
    const res = await getOrgProfileAdaptor(orgProfile.id);
    if (res?.data) {
      setIsVerified(res.data.isVerified || false);
      setVerificationStatus(res.data.verificationStatus);
    }
    setOpenModal({ name: 'verify', open: false });
  };

  return {
    data: { translate, tabs, isVerified, openModal },
    operations: { onCreateCredential, verificationStatus, setOpenModal, onComplete },
  };
};
