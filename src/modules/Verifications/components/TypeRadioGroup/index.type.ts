export type verificationType = 'reusable' | 'singleUse';
export interface TypeRadioGroupProps {
  selected?: verificationType;
  setSelected: (newVal: verificationType) => void;
}
