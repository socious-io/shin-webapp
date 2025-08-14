import { useEffect, useState } from 'react';
import { config } from 'src/config';
import { getVerificationHistory, VerificationIndividualAdaptor } from 'src/core/adaptors';

export const useHistorySlider = (verificationId: string) => {
  const [history, setHistory] = useState<VerificationIndividualAdaptor[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [url, setUrl] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const PER_PAGE = 10;

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await getVerificationHistory(verificationId, page);
      if (res.data?.results) {
        setHistory(res.data.results);
        setTotal(Math.ceil(res.data.total / PER_PAGE));
      }
    };
    fetchHistory();
  }, [page]);

  const handleOpenCopy = (individualId: string) => {
    const copyUrl = `${config.appBaseURL}/connect/verification/${individualId}`;
    setUrl(copyUrl);
    setOpenModal(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  return {
    data: { history, url, openModal, page, total },
    operations: { handleCopy, handleOpenCopy, setOpenModal, setPage },
  };
};
