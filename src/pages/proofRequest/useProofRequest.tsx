import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { ProofRequestStatus } from 'src/core/adaptors';
import { CredentialRes, VerificationRes } from 'src/core/api';

export const useProofRequest = () => {
  const { t: translate } = useTranslation();
  const { data, status } =
    (useLoaderData() as {
      data: VerificationRes | CredentialRes;
      status?: ProofRequestStatus;
    }) || {};
  const [dataStatus, setDataStatus] = useState<ProofRequestStatus | ''>(status || '');

  return {
    data: {
      translate,
      data,
      dataStatus,
    },
    operations: { setDataStatus },
  };
};
