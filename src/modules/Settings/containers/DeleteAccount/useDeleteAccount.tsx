import { useLoaderData } from 'react-router-dom';
import { removeAccountAdaptor, UserProfileRes } from 'src/core/adaptors';

export const useDeleteAccount = () => {
  const { userProfile } = (useLoaderData() as { userProfile: UserProfileRes }) || {};

  const onDeleteAccount = async () => {
    await removeAccountAdaptor(userProfile.id);
  };

  return { operations: { onDeleteAccount } };
};
