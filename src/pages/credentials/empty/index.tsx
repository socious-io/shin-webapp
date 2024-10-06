import { Navigate } from 'react-router-dom';
import Banner from 'src/modules/KYB/containers/Banner';

import { useEmpty } from './useEmpty';

export const Empty = () => {
  const {
    data: { translate, navigateToOrgProfile, orgId },
  } = useEmpty();

  if (orgId) {
    return <Navigate to={`/credentials/${orgId}`} />;
  } else {
    return (
      <div className="p-8">
        <Banner
          iconName="alert-circle"
          title={translate('credential-empty-title')}
          subtitle={translate('credential-empty-subtitle')}
          primaryBtnLabel={translate('credential-empty-link')}
          primaryBtnAction={navigateToOrgProfile}
          theme="error"
        />
      </div>
    );
  }
};
