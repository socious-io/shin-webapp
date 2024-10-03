import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { UploadMediaRes, verifyOrganization } from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useDetailModal = (handleSuccess: () => void) => {
  const { t: translate } = useTranslation();
  const [files, setFiles] = useState<UploadMediaRes[]>([]);
  const [loading, setLoading] = useState(false);
  const orgId = useSelector<RootState, string>((state: RootState) => state.org.id);

  const handleContinue = async () => {
    setLoading(true);
    const fileIds = files.map(item => item.id);
    const res = await verifyOrganization(orgId, fileIds);
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
