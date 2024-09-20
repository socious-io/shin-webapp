import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadMediaRes, verifyOrganizationAdaptor } from 'src/core/adaptors';

export const useDetailModal = (handleSuccess: () => void) => {
  const { t: translate } = useTranslation();
  const [files, setFiles] = useState<UploadMediaRes[]>([]);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    const res = await verifyOrganizationAdaptor();
    if (res.data) {
      handleSuccess();
    }
    setLoading(false);
  };

  return {
    data: { loading, files },
    operations: { handleContinue, setFiles, translate },
  };
};
