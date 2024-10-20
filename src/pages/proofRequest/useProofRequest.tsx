import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { ProofRequestStatus, verifyActionAdaptor } from 'src/core/adaptors';
import { CredentialRes, VerificationRes } from 'src/core/api';

export const useProofRequest = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const connectVerification = pathname.includes('verification');
  const { data } =
    (useLoaderData() as {
      data: VerificationRes | CredentialRes;
    }) || {};
  const [dataStatus, setDataStatus] = useState<ProofRequestStatus | ''>('');

  useEffect(() => {
    const getStatus = async () => {
      if (data?.id) {
        const res = await verifyActionAdaptor(data.id);
        setDataStatus(res);
      }
    };
    connectVerification && getStatus();
  }, [data]);

  return {
    data: {
      translate,
      data,
      dataStatus,
    },
    operations: { setDataStatus, navigate },
  };
};
