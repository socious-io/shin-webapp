import { TooltipProps as MUITooltipProps } from '@mui/material';

export interface TooltipProps extends MUITooltipProps {
  offset?: { x?: number; y?: number };
  onClickTooltip?: () => void;
  customStyle?: string;
}
