import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker as MUIDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import css from './index.module.scss';
import { DateTimePickerProps } from './index.types';

const DateTimePicker: React.FC<DateTimePickerProps> = ({ id, name, label, errorMessage, ...props }) => {
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
        <MUIDateTimePicker
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

export default DateTimePicker;
