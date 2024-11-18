import { SingleUseVerification } from 'src/core/adaptors';
import { MenuItem } from 'src/modules/General/components/ThreeDotButton/index.type';

export interface SingleUseListProps {
  openModal?: { name: 'delete' | 'copy' | 'history'; open: boolean };
  setOpenModal: (val: { name: 'delete' | 'copy' | 'history'; open: boolean }) => void;
  selectedId?: string;
  getMenuItems: (id: string, tab: 'reusable' | 'singleUse') => MenuItem[];
  handleOpenCopy: (id: string) => void;
}
