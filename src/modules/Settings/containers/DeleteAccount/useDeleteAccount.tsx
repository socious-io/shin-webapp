import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { removeAccountAdaptor, UserProfileRes } from 'src/core/adaptors';

export const useDeleteAccount = () => {
  const { t: translate } = useTranslation();
  const { userProfile } = (useLoaderData() as { userProfile: UserProfileRes }) || {};

  const onDeleteAccount = async () => {
    await removeAccountAdaptor(userProfile.id);
  };

  return { data: { translate }, operations: onDeleteAccount };
};
