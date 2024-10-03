import { VerificationStatus } from 'src/core/api';

export interface IssuedTabProps {
  setOpenModal: (val: { name: 'verify' | 'detail' | 'success' | 'pending' | 'rejected'; open: boolean }) => void;
  verificationStatus: VerificationStatus | null;
}
