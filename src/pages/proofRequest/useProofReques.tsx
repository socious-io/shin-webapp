import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AdaptorRes, Verification, verifyActionAdaptor } from 'src/core/adaptors';

export const useProofRequest = () => {
  const [connectUrl, setConnectUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'succeed' | 'failed' | 'error' | undefined>();

  const loaderData = useLoaderData() as AdaptorRes<Verification>;
  const verification = loaderData?.data;

  useEffect(() => {
    verifyActionAdaptor(setConnectUrl, setLoading, setVerificationStatus);
  }, []);

  return { connectUrl, loading, verificationStatus, verification, setVerificationStatus };
};
