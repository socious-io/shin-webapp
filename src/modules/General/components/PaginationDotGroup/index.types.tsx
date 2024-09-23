export interface PaginationDotGroupProps {
  size: 'xs' | 'sm' | 'lg';
  shape?: 'circle' | 'oval';
  titles?: string[];
  count: number;
  transparent?: boolean;
  active: number;
  customStyle?: string;
}
