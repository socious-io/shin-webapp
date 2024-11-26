import React from 'react';
import Banner from 'src/modules/KYB/containers/Banner';

import { IssuedTabProps } from './index.types';
import { useIssuedTab } from './useIssuedTab';
import IssuedList from '../IssuedList';

const IssuedTab: React.FC<IssuedTabProps> = ({ setOpenModal, verificationStatus }) => {
  const { bannerData, status, showBanner } = useIssuedTab(setOpenModal, verificationStatus);

  return (
    <div className="flex flex-col gap-6">
      {showBanner && <Banner {...bannerData[status]} />}
      {verificationStatus === 'APPROVED' && <IssuedList />}
    </div>
  );
};

export default IssuedTab;
