import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import css from './index.module.scss';
import { DatePickerProps } from './index.types';

const DatePicker: React.FC<DatePickerProps> = ({ id, name, label, errorMessage, ...props }) => {
  return (
    <div className={css['container']}>
      {label && (
        <div className={css['label']}>
          <label htmlFor={id} className={css['label__text']} aria-describedby={id}>
            {label}
          </label>
        </div>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MUIDatePicker
          name={name}
          slotProps={{
            textField: {
              id,
              error: !!errorMessage,
              helperText: errorMessage || '',
              className: `${css['input']} ${errorMessage ? css['input--error'] : css['input--normal']}`,
            },
          }}
          {...props}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePicker;
