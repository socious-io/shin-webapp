import { useState } from 'react';

export const useCopyLinkModal = (handleClose: () => void, onCopy: () => void) => {
  const [copied, setCopied] = useState(false);

  const handleCloseModal = () => {
    handleClose();
    setCopied(false);
  };

  const onCopyClick = () => {
    onCopy();
    setCopied(true);
  };

  return {
    data: { copied },
    operations: { handleCloseModal, onCopyClick },
  };
};
