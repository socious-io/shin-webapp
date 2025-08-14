import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  connectCredentialAdaptor,
  connectVerificationAdaptor,
  ProofRequestStatus,
  verifyActionAdaptor,
} from 'src/core/adaptors';
import { CredentialRes, VerificationIndividualRes } from 'src/core/api';
import { RootState } from 'src/store';

export const useProofRequest = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id: connectId } = useParams();
  const [data, setData] = useState<CredentialRes | VerificationIndividualRes>();
  const [dataStatus, setDataStatus] = useState<ProofRequestStatus | ''>('');
  const orgId = useSelector((state: RootState) => state.identity.currentId);
  const EXPIRED_QR_CODE = 120_000;
  const isVerification = pathname.includes('verification');
  const returnURL = isVerification ? '/verifications' : `/credentials/${orgId}`;

  const getConnectData = useCallback(async () => {
    if (!connectId) return;
    const { data } = isVerification
      ? await connectVerificationAdaptor(connectId)
      : await connectCredentialAdaptor(connectId);
    data && setData(data);
  }, [connectId, isVerification]);

  useEffect(() => {
    getConnectData();
    const interval = setInterval(getConnectData, EXPIRED_QR_CODE);
    return () => clearInterval(interval);
  }, [getConnectData]);

  useEffect(() => {
    const getStatus = async () => {
      if (data?.id) {
        const res = await verifyActionAdaptor(data.id);
        setDataStatus(res);
      }
    };
    isVerification && getStatus();
  }, [data]);

  return {
    data: {
      data,
      dataStatus,
      returnURL,
    },
    operations: { setDataStatus, navigate },
  };
};
