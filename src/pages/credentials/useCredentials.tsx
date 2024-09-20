import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getOrgProfileAdaptor, OrgProfileRes, VerificationStatus } from 'src/core/adaptors';
import IssuedList from 'src/modules/Credential/containers/IssuedList';
import Banner from 'src/modules/KYB/containers/Banner';

export const useCredentials = () => {
  const { orgProfile } = useLoaderData() as { orgProfile: OrgProfileRes };
  const [isVerified, setIsVerified] = useState(orgProfile.isVerified);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(orgProfile.verificationStatus);
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(Boolean(localStorage.getItem('dismissed-alert')));
  const [openModal, setOpenModal] = useState<{ name: 'verify' | 'detail' | 'success'; open: boolean }>();

  const onCreateCredential = () => navigate('create');

  const displayBanner = () => {
    switch (verificationStatus) {
      case 'undone':
        return (
          <Banner
            iconName="alert-circle"
            title={translate('kyb-verify')}
            subtitle={translate('kyb-verify-subtitle')}
            primaryBtnLabel={translate('kyb-verify-btn')}
            primaryBtnAction={() => {
              setOpenModal({ name: 'verify', open: true });
            }}
            theme="warning"
          />
        );
      case 'failed':
        return (
          <Banner
            iconName="alert-circle"
            title={translate('kyb-failed')}
            subtitle={translate('kyb-failed-subtitle')}
            primaryBtnLabel={translate('kyb-failed-label')}
            primaryBtnAction={() => {
              return;
            }}
            theme="error"
          />
        );
      case 'pending':
        return (
          <Banner
            iconName="alert-circle"
            title={translate('kyb-pending')}
            subtitle={translate('kyb-pending-subtitle')}
            primaryBtnLabel={translate('kyb-pending-btn')}
            primaryBtnAction={() => {
              return;
            }}
            theme="warning"
          />
        );
      case 'success':
        if (!dismissed)
          return (
            <Banner
              iconName="check-circle"
              title={translate('kyb-success')}
              subtitle={translate('kyb-success-subtitle')}
              primaryBtnLabel={translate('kyb-success-btn')}
              primaryBtnAction={onCreateCredential}
              theme="success"
              secondaryBtnLabel={translate('kyb-success-dismiss')}
              secondaryBtnAction={() => {
                localStorage.setItem('dismissed-alert', 'true');
                setDismissed(false);
              }}
            />
          );
        return <></>;
    }
  };

  const getIssuedListComponent = () => {
    if (isVerified)
      return (
        <div className="flex flex-col gap-6">
          {displayBanner()}
          <IssuedList />
        </div>
      );
    return displayBanner();
  };

  const tabs = [{ label: translate('credential-tab1'), content: getIssuedListComponent() }];

  const onComplete = async () => {
    const res = await getOrgProfileAdaptor(orgProfile.id);
    if (res.data) {
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
