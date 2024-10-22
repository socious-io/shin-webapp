import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { ProofRequestStatus, verifyActionAdaptor } from 'src/core/adaptors';
import { CredentialRes, VerificationIndividualRes } from 'src/core/api';
import { RootState } from 'src/store';
import { OrgState } from 'src/store/reducers/org.reducer';

export const useProofRequest = () => {
  const { t: translate } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const connectVerification = pathname.includes('verification');
  const { data } =
    (useLoaderData() as {
      data: VerificationIndividualRes | CredentialRes;
    }) || {};
  const [dataStatus, setDataStatus] = useState<ProofRequestStatus | ''>('');

  const orgProfileId = useSelector<RootState, OrgState>(state => state.org).id || '';

  let returnURL = '';

  if (pathname.includes('credential')) {
    returnURL = `/credentials/${orgProfileId}`;
  } else if (pathname.includes('verification')) {
    returnURL = '/verifications';
  }

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
      returnURL,
    },
    operations: { setDataStatus, navigate },
  };
};
