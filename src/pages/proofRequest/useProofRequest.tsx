import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ProofRequestStatus, verifyActionAdaptor } from 'src/core/adaptors';
import { CredentialRes, VerificationRes } from 'src/core/api';

export const useProofRequest = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const { data } =
    (useLoaderData() as {
      data: VerificationRes;
    }) || {};
  const [dataStatus, setDataStatus] = useState<ProofRequestStatus | ''>('');

  useEffect(() => {
    const getStatus = async () => {
      if (data?.id) {
        const res = await verifyActionAdaptor(data.id);
        setDataStatus(res);
      }
    };
    getStatus();
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
