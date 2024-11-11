import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { OrgState } from 'src/store/reducers/org.reducer';

export const useProofRequest = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id: connectId } = useParams();
  const [data, setData] = useState<CredentialRes | VerificationIndividualRes>();
  const [dataStatus, setDataStatus] = useState<ProofRequestStatus | ''>('');
  const orgProfileId = useSelector<RootState, OrgState>(state => state.org).id || '';
  const EXPIRED_QR_CODE = 120_000;
  const isVerification = pathname.includes('verification');
  const returnURL = isVerification ? '/verifications' : `/credentials/${orgProfileId}`;

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
      translate,
      data,
      dataStatus,
      returnURL,
    },
    operations: { setDataStatus, navigate },
  };
};
