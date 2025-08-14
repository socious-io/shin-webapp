export interface IssuedTabProps {
  setOpenModal: (val: { name: 'verify' | 'detail' | 'success' | 'pending' | 'rejected'; open: boolean }) => void;
}
