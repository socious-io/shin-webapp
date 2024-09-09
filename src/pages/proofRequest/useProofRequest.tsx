import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { AdaptorRes, verifyActionAdaptor } from 'src/core/adaptors';
import { VerificationRes } from 'src/core/api';

export const useProofRequest = () => {
  const { t: translate } = useTranslation();
  const [verificationStatus, setVerificationStatus] = useState<'succeed' | 'failed' | 'error' | undefined>();

  const loaderData = useLoaderData() as AdaptorRes<VerificationRes>;
  const verification = loaderData?.data;

  useEffect(() => {
    if (verification?.id) verifyActionAdaptor(verification.id, setVerificationStatus);
  }, []);

  return { verificationStatus, verification, setVerificationStatus, translate };
};
