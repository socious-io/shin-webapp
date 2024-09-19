import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getOrgProfileAdaptor, OrgProfileRes } from 'src/core/adaptors';
import IssuedList from 'src/modules/Credential/containers/IssuedList';
import Banner from 'src/modules/KYB/containers/Banner';

export const useCredentials = () => {
  const { orgProfile } = useLoaderData() as { orgProfile: OrgProfileRes };
  const [isVerified, setIsVerified] = useState(orgProfile.isVerified);
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'pending' | 'failed' | 'undone'>(
    orgProfile.verificationStatus,
  );
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
            title="Verify your organization"
            subtitle="Get your organization verified to issue credentials."
            primaryBtnLabel="Verify now"
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
            title="Verification issue"
            subtitle="There was an issue with your application."
            primaryBtnLabel="More details"
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
            title="Verification pending"
            subtitle="We reviewing your submitted documents, we will notify you once it is complete."
            primaryBtnLabel="Check your verification status"
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
              title="Your organization has been successfully verified"
              subtitle="You can now issue credentials."
              primaryBtnLabel="Issue credential"
              primaryBtnAction={onCreateCredential}
              theme="success"
              secondaryBtnLabel="Dismiss"
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
      // TODO: get from API
      setVerificationStatus(res.data.verificationStatus);
    }
    setOpenModal({ name: 'verify', open: false });
  };

  return {
    data: { translate, tabs, isVerified, openModal },
    operations: { onCreateCredential, verificationStatus, setOpenModal, onComplete },
  };
};
