export interface PaginationDotGroupProps {
  size: 'xs' | 'sm' | 'lg';
  shape?: 'circle' | 'oval';
  titles?: string[];
  count: number;
  transparent?: boolean;
  active: number;
  highlightPrevSteps?: boolean;
  containerClassName?: string;
  customStyle?: string;
}
