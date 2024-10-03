import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getOrgProfileAdaptor, OrgProfileRes } from 'src/core/adaptors';
import { VerificationStatus } from 'src/core/api';
import IssuedTab from 'src/modules/Credential/containers/IssuedTab';

export const useCredentials = () => {
  const { orgProfile } = useLoaderData() as { orgProfile: OrgProfileRes };
  const [isVerified, setIsVerified] = useState(orgProfile.isVerified);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus | null>(
    orgProfile.verificationStatus,
  );
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<{
    name: 'verify' | 'detail' | 'success' | 'pending' | 'rejected';
    open: boolean;
  }>();

  const onCreateCredential = () => navigate('../create');

  const tabs = [
    {
      label: translate('credential-tab1'),
      content: <IssuedTab setOpenModal={setOpenModal} verificationStatus={verificationStatus} />,
    },
  ];

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
