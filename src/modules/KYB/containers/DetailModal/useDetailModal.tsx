import { useState } from 'react';
import { UploadMediaRes, verifyOrganizationAdaptor } from 'src/core/adaptors';

export const useDetailModal = (handleSuccess: () => void) => {
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
    operations: { handleContinue, setFiles },
  };
};
