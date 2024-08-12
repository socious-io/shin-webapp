import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

import styles from './spinner.module.scss';

const Spinner = () => {
  const spinnerVisibility = useSelector<RootState>(state => state.spinner);
  return (
    <div
      className={styles['container']}
      style={{
        opacity: spinnerVisibility ? 1 : 0,
      }}
    >
      <LinearProgress />
    </div>
  );
};

export default Spinner;
